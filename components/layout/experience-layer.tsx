'use client'

import * as React from 'react'
import { AccessibilityPanel } from '@/components/layout/accessibility-panel'
import { CustomCursor } from '@/components/layout/custom-cursor'
import { FloatingActions } from '@/components/layout/floating-actions'
import { StickyAdmissionBar } from '@/components/layout/sticky-admission-bar'
import type { CursorSetting } from '@/hooks/use-preferences'

/**
 * The persistent interaction layer that sits above every page: quick actions,
 * back-to-top, reader preferences, the optional pointer ring and the sticky
 * admissions bar. Grouped into one client island so the rest of the tree can
 * stay on the server.
 *
 * It also owns the one piece of shared state between them — whether the
 * admissions bar is on screen — so the floating controls can lift clear of it
 * on phones instead of covering its call to action.
 */
export function ExperienceLayer() {
  const [cursor, setCursor] = React.useState<CursorSetting>('default')
  const [admissionBarVisible, setAdmissionBarVisible] = React.useState(false)

  return (
    <>
      <StickyAdmissionBar onVisibilityChange={setAdmissionBarVisible} />
      <FloatingActions raised={admissionBarVisible} />
      <AccessibilityPanel onCursorChange={setCursor} raised={admissionBarVisible} />
      <CustomCursor enabled={cursor === 'custom'} />
    </>
  )
}
