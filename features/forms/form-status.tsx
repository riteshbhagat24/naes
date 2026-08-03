'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, TriangleAlert } from 'lucide-react'
import { EASE } from '@/lib/motion'
import type { FormResult } from '@/types'

/**
 * Inline result banner. Uses a live region so screen readers announce the
 * outcome without the visitor having to hunt for it.
 */
export function FormStatus({ state }: { state: FormResult | null }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        {state ? (
          <motion.div
            key={state.message}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE.out }}
            className={
              state.status === 'success'
                ? 'flex items-start gap-3 rounded-xl border border-success/30 bg-success/8 px-4 py-3.5 text-body-sm text-success'
                : 'flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/8 px-4 py-3.5 text-body-sm text-danger'
            }
          >
            {state.status === 'success' ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            ) : (
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            )}
            <p className="text-pretty">{state.message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
