import { FocusTimer } from "@workspace/ui/blocks/focus-timer"

export default function FocusPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Focus Session</h2>
          <p className="text-muted-foreground">
            Eliminate distractions and execute your tasks using the Pomodoro technique.
          </p>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-12 flex-1 min-h-0">
        <div className="col-span-12 md:col-span-5 lg:col-span-4 flex justify-center items-start">
          <div className="sticky top-8 w-full flex justify-center">
            <FocusTimer />
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col h-full bg-muted/20 rounded-xl border border-border/50 p-6 overflow-hidden">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Session Tasks</h3>
            <p className="text-sm text-muted-foreground">Tasks selected for the current focus session</p>
          </div>
          
          <div className="flex-1 overflow-auto rounded-md border border-dashed flex items-center justify-center text-muted-foreground bg-background">
            {/* TaskBoard placeholder - to be implemented in Week 4 */}
            <div className="text-center space-y-2">
              <p>Task Board will be rendered here.</p>
              <p className="text-sm opacity-70">Use this area to drag and drop tasks into your current sprint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
