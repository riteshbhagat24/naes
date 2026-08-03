/**
 * Emits a JSON-LD block into the document.
 *
 * The payload is serialised on the server and `<` is escaped so a stray
 * character in editor-supplied content can never close the script tag early.
 */
export function JsonLd({ data, id }: { data: Record<string, unknown>; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
