'use client'

import { useCallback, useEffect, useState } from 'react'

export type FontScale = 'default' | 'large' | 'larger'
export type Contrast = 'default' | 'high'
export type MotionSetting = 'system' | 'off'
export type CursorSetting = 'default' | 'custom'

export interface Preferences {
  fontScale: FontScale
  contrast: Contrast
  motion: MotionSetting
  cursor: CursorSetting
}

const STORAGE_KEY = 'naehs.preferences'

const DEFAULTS: Preferences = {
  fontScale: 'default',
  contrast: 'default',
  motion: 'system',
  cursor: 'default',
}

function apply(preferences: Preferences) {
  const root = document.documentElement
  root.dataset.fontScale = preferences.fontScale
  root.dataset.contrast = preferences.contrast
  root.dataset.motion = preferences.motion === 'off' ? 'off' : 'on'
  root.dataset.cursor = preferences.cursor
}

/**
 * Reader preferences for the accessibility panel: text size, contrast, motion
 * and the decorative cursor. Persisted locally and re-applied on load by the
 * inline script in the document head, so there is no flash of default styling.
 */
export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULTS)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = { ...DEFAULTS, ...(JSON.parse(stored) as Partial<Preferences>) }
        setPreferences(parsed)
        apply(parsed)
        return
      }
    } catch {
      /* storage unavailable — fall through to defaults */
    }
    apply(DEFAULTS)
  }, [])

  const update = useCallback((patch: Partial<Preferences>) => {
    setPreferences((previous) => {
      const next = { ...previous, ...patch }
      apply(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* ignore quota / private-mode errors */
      }
      return next
    })
  }, [])

  const reset = useCallback(() => {
    apply(DEFAULTS)
    setPreferences(DEFAULTS)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  return { preferences, update, reset }
}
