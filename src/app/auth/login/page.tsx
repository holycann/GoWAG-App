"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Mail, KeyRound } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)
  const { login, loading: isLoading, error: authError } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    try {
      await login(email, password)
      // Redirect will happen in auth context
    } catch (error: any) {
      // Error handling is done in auth context
      setLocalError(error.message || "Failed to login. Please check your credentials.")
    }
  }

  // Display either local error or auth error
  const error = localError || authError

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 animate-fadeIn">
      <Card className="w-full max-w-md shadow-xl rounded-xl animate-slideUp">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-brandDarkBlue rounded-full inline-block">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-brandDarkBlue">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access your WA Gateway dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 flex items-center">
                <Mail className="mr-2 h-4 w-4 text-gray-500" /> Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 flex items-center">
                <KeyRound className="mr-2 h-4 w-4 text-gray-500" /> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-brandDarkBlue text-white hover:bg-opacity-90 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <LogIn className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              )}
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/register" className="font-medium text-brandDarkBlue hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
