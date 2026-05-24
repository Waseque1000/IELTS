import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <h1 className="text-4xl font-black mb-4 text-center">Contact Us</h1>
        <p className="text-slate-600 text-center mb-10 text-lg">Have a question or need support? Send us a message.</p>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" id="name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" id="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="How can we help?" />
            </div>
            <Button className="w-full h-12 text-lg bg-slate-900 text-white hover:bg-slate-800 rounded-lg shadow-md">
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
