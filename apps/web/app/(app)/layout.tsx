import { auth } from "@/auth"
import { headers } from "next/headers"
import { Sidebar } from "@/components/sidebar"
import { redirect } from "next/navigation"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={session.user} />
      <main className="flex-1 md:pl-60">
        <div className="h-full pt-16 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
