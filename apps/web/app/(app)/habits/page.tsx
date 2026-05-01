import { getHabits } from "@/lib/actions/habits"
import HabitsPageClient from "./habits-client"

export default async function HabitsPage() {
  const habits = await getHabits()
  
  return <HabitsPageClient initialHabits={habits} />
}
