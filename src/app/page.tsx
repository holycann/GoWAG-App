import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brandDarkBlue to-slate-900 text-white p-4">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to WA Gateway</h1>
        <p className="text-xl text-slate-300">Your MVP for managing WhatsApp communications.</p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-white text-brandDarkBlue hover:bg-slate-200 text-lg px-8 py-6">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
