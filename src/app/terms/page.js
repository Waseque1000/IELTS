import { Navbar } from "@/components/navbar"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-700">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using IELTS Mastery AI, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
          <p className="mb-4">Permission is granted to temporarily access the materials on IELTS Mastery AI for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
          <p className="mb-4">The materials on IELTS Mastery AI are provided on an 'as is' basis. We are not officially affiliated with the IELTS partners (British Council, IDP, Cambridge Assessment English).</p>
        </div>
      </main>
    </div>
  )
}
