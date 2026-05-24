import { Navbar } from "@/components/navbar"

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl font-black mb-6">IELTS Modules</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Explore our comprehensive materials for Listening, Reading, Writing, and Speaking.
        </p>
      </main>
    </div>
  )
}
