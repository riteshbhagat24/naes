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
 */
export function ExperienceLayer() {
  const [cursor, setCursor] = React.useState<CursorSetting>('default')

  return (
    <>
      <StickyAdmissionBar />
      <FloatingActions />
      <AccessibilityPanel onCursorChange={setCursor} />
      <CustomCursor enabled={cursor === 'custom'} />
    </>
  )
}
