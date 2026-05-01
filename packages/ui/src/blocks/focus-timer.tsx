"use client"

import * as React from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { Badge } from "@workspace/ui/components/badge"
import { useFocusTimer } from "@workspace/ui/hooks/use-focus-timer"

interface FocusTimerProps {
  onSessionComplete?: (sessionType: "work" | "break", durationMinutes: number) => void
}

export function FocusTimer({ onSessionComplete }: FocusTimerProps = {}) {
  const {
    timeLeft,
    progress,
    isRunning,
    sessionType,
    toggleTimer,
    resetTimer,
  } = useFocusTimer({ onSessionComplete })

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Focus Timer</CardTitle>
          <Badge variant={sessionType === "work" ? "default" : "secondary"}>
            {sessionType === "work" ? "Focus Session" : "Short Break"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="text-6xl font-bold tabular-nums tracking-tighter">
          {formatTime(timeLeft)}
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTimer}
          className="h-12 w-12 rounded-full"
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetTimer}
          className="h-12 w-12 rounded-full text-muted-foreground"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
