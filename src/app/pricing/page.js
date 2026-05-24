import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-black mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16">
          Everything you need to get a Band 9, for a fraction of the cost of a private tutor.
        </p>

        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-primary text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transform rotate-12 shadow-lg">
            Most Popular
          </div>
          <h2 className="text-2xl font-bold mb-2">Pro Mastery</h2>
          <div className="flex justify-center items-end gap-1 mb-8">
            <span className="text-5xl font-black">$29</span>
            <span className="text-slate-500 font-medium pb-1">/month</span>
          </div>

          <div className="space-y-4 text-left mb-10">
            {['Unlimited AI Writing Grading', 'Unlimited AI Speaking Evaluation', 'Access to Cambridge 10-19', 'Detailed Analytics Dashboard', 'Priority Support'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full h-14 text-lg shadow-md hover:scale-105 transition-all">
            Get Started Now
          </Button>
        </div>
      </main>
    </div>
  )
}
