import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Git-backed content layer.
 *
 * Everything an editor can change lives as JSON or Markdown under /content and
 * is committed by Decap CMS straight to the repository, which triggers a Vercel
 * deployment. Reads happen at build time inside Server Components, so no
 * database and no runtime filesystem access are ever required in the browser.
 */

const CONTENT_ROOT = path.join(process.cwd(), 'content')

function readFile(relativePath: string): string | null {
  const filePath = path.join(CONTENT_ROOT, relativePath)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf8')
}

/** Reads a single JSON document. Throws at build time if it is missing. */
export function getJson<T>(relativePath: string): T {
  const raw = readFile(relativePath)
  if (raw === null) {
    throw new Error(
      `[content] Missing required file: content/${relativePath}. ` +
        `Create it, or remove the reference — the build refuses to ship a blank page.`,
    )
  }
  return JSON.parse(raw) as T
}

/** Reads a JSON document, falling back to a default when absent. */
export function getJsonOr<T>(relativePath: string, fallback: T): T {
  const raw = readFile(relativePath)
  return raw === null ? fallback : (JSON.parse(raw) as T)
}

export interface MarkdownDoc<T> {
  slug: string
  data: T
  body: string
}

/** The two front-matter keys the default ordering understands, if present. */
interface Sortable {
  date?: string
  order?: number
}

/**
 * Reads every Markdown file in a collection directory.
 *
 * Ordering is newest-date-first where the collection is dated, and by an
 * explicit `order` key otherwise. `T` is deliberately unconstrained: a
 * constraint of `{ date?: …; order?: … }` is an all-optional "weak type", which
 * TypeScript refuses to match against front matter that happens to share none
 * of those keys — the legal documents, for instance.
 */
export function getCollection<T>(directory: string): Array<MarkdownDoc<T>> {
  const dir = path.join(CONTENT_ROOT, directory)
  if (!fs.existsSync(dir)) return []

  const docs = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: (data as { slug?: string }).slug ?? file.replace(/\.md$/, ''),
        data: data as T,
        body: content.trim(),
      }
    })

  return docs.sort((a, b) => {
    const first = a.data as Sortable
    const second = b.data as Sortable
    if (first.date && second.date) {
      return new Date(second.date).getTime() - new Date(first.date).getTime()
    }
    return (first.order ?? 0) - (second.order ?? 0)
  })
}

export function getCollectionItem<T>(directory: string, slug: string): MarkdownDoc<T> | null {
  return getCollection<T>(directory).find((doc) => doc.slug === slug) ?? null
}

/**
 * Minimal, deterministic Markdown → HTML renderer for editor-written prose.
 *
 * Deliberately small: the CMS body fields carry headings, paragraphs, lists,
 * bold/italic, links and blockquotes — nothing that warrants shipping a full
 * parser to the client. All output is escaped before any markup is applied.
 */
export function renderMarkdown(markdown: string): string {
  const escape = (input: string) =>
    input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const inline = (input: string) =>
    escape(input)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, href: string) => {
        const safe = /^(https?:|\/|mailto:|tel:)/i.test(href) ? href : '#'
        const external = /^https?:/i.test(safe)
        return `<a href="${safe}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`
      })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')

  const blocks = markdown.trim().split(/\n{2,}/)
  const html: string[] = []

  for (const block of blocks) {
    const lines = block.split('\n')

    if (/^#{1,6}\s/.test(block)) {
      const level = block.match(/^#+/)![0].length
      html.push(`<h${level}>${inline(block.replace(/^#+\s*/, ''))}</h${level}>`)
      continue
    }

    if (lines.every((line) => /^[-*]\s+/.test(line))) {
      html.push(
        `<ul>${lines.map((line) => `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`,
      )
      continue
    }

    if (lines.every((line) => /^\d+\.\s+/.test(line))) {
      html.push(
        `<ol>${lines.map((line) => `<li>${inline(line.replace(/^\d+\.\s+/, ''))}</li>`).join('')}</ol>`,
      )
      continue
    }

    if (lines.every((line) => line.startsWith('>'))) {
      html.push(
        `<blockquote>${inline(lines.map((line) => line.replace(/^>\s?/, '')).join(' '))}</blockquote>`,
      )
      continue
    }

    if (/^---+$/.test(block.trim())) {
      html.push('<hr />')
      continue
    }

    html.push(`<p>${inline(block.replace(/\n/g, ' '))}</p>`)
  }

  return html.join('\n')
}
