'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Accessibility, RotateCcw, X } from 'lucide-react'
import {
  usePreferences,
  type Contrast,
  type CursorSetting,
  type FontScale,
  type MotionSetting,
} from '@/hooks/use-preferences'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Option<T> {
  value: T
  label: string
}

const FONT_SCALES: Option<FontScale>[] = [
  { value: 'default', label: 'Default' },
  { value: 'large', label: 'Large' },
  { value: 'larger', label: 'Largest' },
]

const CONTRASTS: Option<Contrast>[] = [
  { value: 'default', label: 'Standard' },
  { value: 'high', label: 'High' },
]

const MOTIONS: Option<MotionSetting>[] = [
  { value: 'system', label: 'System' },
  { value: 'off', label: 'Reduced' },
]

const CURSORS: Option<CursorSetting>[] = [
  { value: 'default', label: 'System' },
  { value: 'custom', label: 'Pointer ring' },
]

/**
 * A radio group of preference options.
 *
 * Declared at module scope rather than inside the panel: a component defined in
 * a render body is a brand-new type on every render, so React unmounts and
 * remounts it — which would drop keyboard focus each time a setting changed.
 */
function Group<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-2 text-caption font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </legend>
      <div className="flex gap-1.5" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'min-h-11 flex-1 rounded-lg border px-2.5 py-2 text-caption font-medium transition-colors',
              value === option.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * Reader controls: text size, contrast, motion and the decorative cursor.
 * Choices persist locally and are re-applied before first paint by the inline
 * script in the document head.
 */
export function AccessibilityPanel({
  onCursorChange,
  raised = false,
}: {
  onCursorChange?: (value: CursorSetting) => void
  /** Lifts the control clear of the sticky admissions bar on small screens. */
  raised?: boolean
}) {
  const { preferences, update, reset } = usePreferences()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    onCursorChange?.(preferences.cursor)
  }, [preferences.cursor, onCursorChange])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div
      className={cn(
        'fixed left-5 z-[90] transition-[bottom] duration-300 ease-premium sm:left-7',
        raised ? 'bottom-[5.75rem] sm:bottom-[6.25rem] lg:bottom-7' : 'bottom-5 sm:bottom-7',
      )}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Accessibility settings"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.26, ease: EASE.out }}
            className="absolute bottom-full left-0 mb-3 w-[19rem] rounded-2xl border border-border bg-popover p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-body font-semibold">Display settings</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
                <span className="sr-only">Close display settings</span>
              </button>
            </div>

            <div className="space-y-4">
              <Group
                label="Text size"
                options={FONT_SCALES}
                value={preferences.fontScale}
                onChange={(value) => update({ fontScale: value })}
              />
              <Group
                label="Contrast"
                options={CONTRASTS}
                value={preferences.contrast}
                onChange={(value) => update({ contrast: value })}
              />
              <Group
                label="Motion"
                options={MOTIONS}
                value={preferences.motion}
                onChange={(value) => update({ motion: value })}
              />
              <Group
                label="Cursor"
                options={CURSORS}
                value={preferences.cursor}
                onChange={(value) => update({ cursor: value })}
              />
            </div>

            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex items-center gap-2 text-caption font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Reset to defaults
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="grid size-11 place-items-center rounded-full border border-border bg-surface/90 text-foreground shadow-md backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Accessibility className="size-[1.15rem]" aria-hidden />
        <span className="sr-only">Display and accessibility settings</span>
      </button>
    </div>
  )
}
