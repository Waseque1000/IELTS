import { Navbar } from "@/components/navbar"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-700">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, such as when you create an account, complete mock tests, or communicate with us.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, including our AI-driven evaluations of your IELTS practice tests.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">We implement appropriate security measures to protect your personal information and testing history against unauthorized access.</p>
        </div>
      </main>
    </div>
  )
}
