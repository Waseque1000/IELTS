import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CambridgeTestsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl font-black mb-6">Cambridge Tests</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Practice with authentic past papers from official Cambridge IELTS books 10 through 19.
        </p>
        <Link href="/dashboard/cambridge">
          <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-full h-14 px-8 text-lg">
            View All Tests
          </Button>
        </Link>
      </main>
    </div>
  )
}
