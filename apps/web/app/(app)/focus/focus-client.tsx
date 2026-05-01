"use client"

import { FocusTimer } from "@workspace/ui/blocks/focus-timer"
import { createFocusSession } from "@/lib/actions/focus"
import * as React from "react"

export default function FocusClient() {
  const [saving, setSaving] = React.useState(false)
  const [lastSaved, setLastSaved] = React.useState<string | null>(null)

  const handleSessionComplete = React.useCallback(
    async (sessionType: "work" | "break", durationMinutes: number) => {
      setSaving(true)
      try {
        await createFocusSession({
          duration: durationMinutes,
          type: sessionType,
          completed: true,
        })
        setLastSaved(
          `${sessionType === "work" ? "Focus" : "Break"} session saved!`
        )
        // Clear message after 3 seconds
        setTimeout(() => setLastSaved(null), 3000)
      } catch (error) {
        console.error("Failed to save focus session:", error)
      } finally {
        setSaving(false)
      }
    },
    []
  )

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <FocusTimer onSessionComplete={handleSessionComplete} />
      {saving && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Saving session...
        </p>
      )}
      {lastSaved && (
        <p className="text-sm text-green-500 font-medium">{lastSaved}</p>
      )}
    </div>
  )
}
