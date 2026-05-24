"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, Sparkles, BookOpen, Brain, 
  Target, Mic, Edit3, Headphones, CheckCircle2,
  Zap, BarChart3, Clock, ArrowUpRight, PlayCircle
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-primary/20 font-sans">
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-multiply animate-float" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] mix-blend-multiply animate-float-delayed" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-fuchsia-500/10 blur-[120px] mix-blend-multiply animate-float" />
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <main className="relative z-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 pt-32 md:pt-48 pb-20 sm:px-8 flex flex-col items-center justify-center text-center min-h-[90vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">Cambridge Books 10-19 Now Available</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] max-w-5xl text-slate-900"
          >
            Achieve Your Dream <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 blur-2xl bg-primary/10 rounded-full" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-teal-500">
                IELTS Band Score
              </span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-light"
          >
            The ultimate AI-powered preparation ecosystem. Practice all 4 modules with authentic Cambridge tests, receive <strong className="text-slate-800 font-semibold">instant AI evaluations</strong>, and track your progress daily.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-lg px-10 h-16 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] w-full sm:w-auto transition-all duration-300 hover:scale-105 font-bold group">
                <Target className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Start Practicing Free
              </Button>
            </Link>
            <Link href="/dashboard/listening" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-lg px-10 h-16 rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 w-full sm:w-auto transition-all duration-300 hover:scale-105 font-semibold shadow-sm group">
                <Headphones className="mr-3 h-6 w-6 text-blue-600 group-hover:-translate-y-1 transition-transform" />
                Try a Listening Test
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="container mx-auto px-4 py-24 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">Why Choose IELTS Mastery <span className="text-primary">AI</span>?</h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">Everything you need to boost your score, packed into one beautifully designed platform.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Bento Box 1: AI Grading */}
            <motion.div variants={itemVariants} className="md:col-span-2 bg-white border border-slate-200 shadow-md rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900">Instant AI Evaluation</h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-md">No more waiting for tutors. Submit your Writing and Speaking tasks and receive incredibly detailed, band-accurate feedback in seconds.</p>
                </div>
                
                <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-3">
                    <span className="text-sm font-semibold text-slate-700">Writing Task 2 Result</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">Band 7.5</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[75%]" /></div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[80%]" /></div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[70%]" /></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Box 2: Authentic Content */}
            <motion.div variants={itemVariants} className="bg-blue-50 border border-blue-100 shadow-sm rounded-3xl p-8 relative overflow-hidden group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 border border-blue-200">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Authentic Material</h3>
              <p className="text-slate-600 leading-relaxed mb-8">Practice exclusively with official Cambridge IELTS books 10 through 19. Real past papers mean no surprises on test day.</p>
              
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {[19, 18, 17, 16, 15, 14].map(num => (
                  <div key={num} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-center font-serif font-black text-xl text-slate-700 group-hover:border-blue-300 transition-colors shadow-sm">
                    Vol {num}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento Box 3: All Modules */}
            <motion.div variants={itemVariants} className="bg-fuchsia-50 border border-fuchsia-100 shadow-sm rounded-3xl p-8 relative overflow-hidden group">
               <div className="w-14 h-14 bg-fuchsia-100 rounded-2xl flex items-center justify-center mb-6 border border-fuchsia-200">
                <Target className="h-7 w-7 text-fuchsia-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">All 4 Modules</h3>
              <p className="text-slate-600 leading-relaxed mb-8">A complete ecosystem covering Listening, Reading, Writing, and Speaking in one unified dashboard.</p>
              
              <div className="flex flex-col gap-3 mt-auto">
                {['Listening', 'Reading', 'Writing', 'Speaking'].map(mod => (
                  <div key={mod} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-fuchsia-500" />
                    <span className="font-medium text-slate-700">{mod}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento Box 4: Analytics */}
            <motion.div variants={itemVariants} className="md:col-span-2 bg-white border border-slate-200 shadow-md rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center group">
              <div className="flex-1">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 border border-teal-200">
                  <BarChart3 className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Deep Progress Tracking</h3>
                <p className="text-slate-600 text-lg leading-relaxed">Our AI doesn't just grade you; it learns your weaknesses. Get personalized roadmaps and watch your band score climb week over week.</p>
                <Button variant="link" className="text-teal-600 p-0 mt-4 text-lg group-hover:text-teal-700 font-semibold">
                  View Demo Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-full md:w-1/2 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner relative">
                <div className="flex items-end gap-2 h-40 mb-4 pt-8 border-b border-slate-200">
                  {[40, 55, 45, 70, 65, 85, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-teal-200 to-teal-400 rounded-t-sm group-hover:animate-pulse shadow-sm" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* REAL EXAM SIMULATION (INTERACTIVE MOCKUP) */}
        <section className="container mx-auto px-4 py-24 sm:px-8 mt-10 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-sm mb-6">
              <Clock className="h-4 w-4" /> Exam Interface
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">Pixel-Perfect CBT Simulation</h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">Familiarize yourself with the exact Computer-Delivered IELTS interface. Practice with the same tools, highlighting features, and timing constraints you'll face on test day.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mx-auto max-w-5xl group"
          >
            {/* Glow Behind Mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-primary/30 to-teal-300 blur-[80px] rounded-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
            
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 ring-1 ring-slate-900/5">
              {/* Browser/App Header */}
              <div className="bg-slate-100 text-slate-800 p-4 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="hidden sm:block text-slate-600 text-sm font-medium bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm">
                    IELTS Academic Listening
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-700 font-mono text-lg font-bold bg-white px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    32:45
                  </div>
                </div>
              </div>
              
              {/* Mockup Content */}
              <div className="p-8 md:p-12 text-slate-800 min-h-[400px] relative bg-slate-50">
                <div className="max-w-3xl mx-auto space-y-8">
                  <h3 className="text-2xl font-bold font-serif text-slate-900 border-b-2 border-slate-200 pb-4">Part 1: Questions 1-5</h3>
                  <p className="text-slate-600 font-medium">Complete the notes below. Write <strong className="bg-slate-200 px-1 rounded">ONE WORD ONLY</strong> for each answer.</p>
                  
                  <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <h4 className="text-xl font-black uppercase tracking-widest text-center text-slate-800">Travel Insurance Application</h4>
                    
                    <div className="flex items-center border-b border-slate-100 pb-4">
                      <span className="font-bold text-slate-400 w-8">1.</span>
                      <span className="font-bold w-48 text-slate-700">Name:</span>
                      <span className="text-slate-600 flex items-center gap-2">
                        Mr. <span className="bg-blue-50 border border-blue-200 text-blue-700 font-serif px-3 py-1 rounded shadow-inner min-w-[120px] inline-block animate-pulse">Harrison</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center border-b border-slate-100 pb-4">
                      <span className="font-bold text-slate-400 w-8">2.</span>
                      <span className="font-bold w-48 text-slate-700">Destination:</span>
                      <span className="text-slate-600 flex items-center gap-2">
                        traveling to <span className="bg-slate-100 border border-slate-300 text-slate-500 font-serif px-3 py-1 rounded shadow-inner min-w-[150px] inline-block" />
                      </span>
                    </div>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl">
                    <Link href="/dashboard/listening">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl scale-110 h-16 px-8 text-lg font-bold">
                        <PlayCircle className="mr-2 h-6 w-6" /> Experience It Live
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FINAL CTA & FOOTER */}
        <section className="relative border-t border-slate-200 bg-gradient-to-b from-transparent to-primary/5 mt-20">
          <div className="container mx-auto px-4 py-32 sm:px-8 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">Ready to score a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Band 9</span>?</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-light">Join thousands of students who have already achieved their target score using our AI-driven ecosystem.</p>
            
            <Link href="/dashboard">
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-xl px-12 h-20 rounded-full shadow-xl transition-all hover:scale-105 font-bold group">
                Enter Dashboard <ArrowUpRight className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <footer className="border-t border-slate-200 py-8 text-center text-slate-500 text-sm bg-white">
            <p>© {new Date().getFullYear()} IELTS Mastery build by Wasee</p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="/privacy" className="hover:text-slate-800 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-800 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-slate-800 transition-colors">Contact</Link>
            </div>
          </footer>
        </section>

      </main>
    </div>
  )
}
