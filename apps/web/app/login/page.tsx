"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { Zap, BarChart3, Brain, Shield, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [googlePending, setGooglePending] = useState(false)

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    setError(null)
    
    await authClient.signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        window.location.href = "/"
      },
      onError: (ctx) => {
        setError(ctx.error.message)
        setPending(false)
      }
    })
  }

  const handleGoogleLogin = async () => {
    setGooglePending(true)
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    })
  }

  const isLoading = pending || googlePending

  return (
    <div className="flex min-h-screen">
      {/* Left — Landing / Marketing Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-12 right-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Zap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">NovaDash</span>
          </div>

          {/* Hero */}
          <div className="space-y-8 max-w-md">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
              Supercharge your
              <br />
              <span className="text-white/90">productivity</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              AI-powered insights, focus timers, habit tracking, and task management — all in one beautiful dashboard.
            </p>

            {/* Feature pills */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI-Powered Insights</p>
                  <p className="text-xs text-primary-foreground/70">Personalised productivity recommendations</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Rich Analytics</p>
                  <p className="text-xs text-primary-foreground/70">Deep-dive charts and progress tracking</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Privacy First</p>
                  <p className="text-xs text-primary-foreground/70">Your data stays yours — encrypted at rest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-primary-foreground/50">
            © 2026 NovaDash. Built with Next.js &amp; MongoDB.
          </p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-background p-6 sm:p-12">
        {/* Mobile brand (hidden on lg+) */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight">NovaDash</span>
        </div>

        <Card className="w-full max-w-sm border-0 shadow-none lg:border lg:shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials or use Google to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {googlePending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {googlePending ? "Redirecting..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button className="w-full gap-2" type="submit" disabled={isLoading}>
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                {pending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline hover:text-primary/90 font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
