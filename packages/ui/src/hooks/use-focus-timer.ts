import { useState, useEffect, useCallback } from "react"

interface UseFocusTimerOptions {
  onSessionComplete?: (sessionType: "work" | "break", durationMinutes: number) => void
}

export function useFocusTimer(options?: UseFocusTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState<"work" | "break">("work")

  const progress = sessionType === "work" 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100

  const toggleTimer = () => setIsRunning(!isRunning)
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(sessionType === "work" ? 25 * 60 : 5 * 60)
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      
      // Notify parent that session is complete
      const completedType = sessionType
      const durationMinutes = completedType === "work" ? 25 : 5
      options?.onSessionComplete?.(completedType, durationMinutes)
      
      // Switch session type
      setSessionType(prev => prev === "work" ? "break" : "work")
      setTimeLeft(sessionType === "work" ? 5 * 60 : 25 * 60)
    }
  }, [isRunning, timeLeft, sessionType, options])

  return {
    timeLeft,
    progress,
    isRunning,
    sessionType,
    toggleTimer,
    resetTimer
  }
}
