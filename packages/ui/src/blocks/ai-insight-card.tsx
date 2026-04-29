"use client"

import * as React from "react"
import { Sparkles, ArrowRight, Lightbulb, TrendingUp, Brain } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Skeleton } from "@workspace/ui/components/skeleton"
import type { Insight } from "@workspace/ui/types/insight"

interface AIInsightCardProps {
  insight?: Insight
  isLoading?: boolean
  onActionClick?: (insightId: string) => void
}

export function AIInsightCard({ insight, isLoading, onActionClick }: AIInsightCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <CardHeader className="pb-3 flex flex-row items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full rounded-md" />
        </CardFooter>
      </Card>
    )
  }

  if (!insight) return null

  const typeConfig = {
    productivity: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    focus: { icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10" },
    health: { icon: Sparkles, color: "text-green-500", bg: "bg-green-500/10" },
    general: { icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10" }
  }

  const priorityConfig = {
    low: "default",
    medium: "secondary",
    high: "destructive"
  }

  const Icon = typeConfig[insight.type]?.icon || Lightbulb
  const colorClass = typeConfig[insight.type]?.color || "text-foreground"
  const bgClass = typeConfig[insight.type]?.bg || "bg-muted"
  const badgeVariant = priorityConfig[insight.priority] as "default" | "secondary" | "destructive"

  return (
    <Card className="w-full max-w-md overflow-hidden relative border-primary/20 bg-gradient-to-b from-background to-primary/5">
      <div className="absolute top-0 right-0 p-4">
        <Badge variant={badgeVariant} className="uppercase text-[10px]">
          {insight.priority} Priority
        </Badge>
      </div>
      <CardHeader className="pb-3 flex flex-row items-start gap-4">
        <Avatar className={`h-10 w-10 shrink-0 ${bgClass}`}>
          <AvatarFallback className="bg-transparent">
            <Icon className={`h-5 w-5 ${colorClass}`} />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 pr-12">
          <CardTitle className="text-base leading-tight">{insight.title}</CardTitle>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Suggestion
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/90">
          {insight.description}
        </p>
      </CardContent>
      {insight.actionLabel && (
        <CardFooter>
          <Button 
            className="w-full gap-2 group" 
            variant="default"
            onClick={() => onActionClick?.(insight.id)}
          >
            {insight.actionLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
