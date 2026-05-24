"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, BookOpen, Brain, Target, Mic, Edit3, Headphones } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <Navbar />

      {/* Background Animated Blobs */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-float-delayed" />

      <main className="container mx-auto px-4 pt-20 pb-32 sm:px-8 relative z-10">
        <section className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto min-h-[75vh]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-primary shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>Cambridge Books 10-19 Now Available</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Achieve Your Dream <br className="hidden md:block" />
            <span className="text-neon bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-teal-400">
              IELTS Band Score
            </span>
            {" "}with AI
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed"
          >
            The ultimate AI-powered preparation ecosystem for Academic & General Training. Practice all 4 modules with authentic Cambridge-style tests, receive instant AI evaluations, and track your progress.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] w-full sm:w-auto transition-transform hover:scale-105">
                <Target className="mr-2 h-5 w-5" />
                Start Free Mock Test
              </Button>
            </Link>
            <Link href="/dashboard/cambridge">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full glass border-white/20 hover:bg-white/10 w-full sm:w-auto transition-transform hover:scale-105">
                <BookOpen className="mr-2 h-5 w-5" />
                Cambridge Practice
              </Button>
            </Link>
          </motion.div>

          {/* IELTS Modules Preview Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto"
          >
            {[
              { title: "Listening", icon: Headphones, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
              { title: "Reading", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
              { title: "Writing", icon: Edit3, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
              { title: "Speaking", icon: Mic, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
            ].map((mod, i) => (
              <Link href={`/dashboard/${mod.title.toLowerCase()}`} key={i}>
                <div className={`flex flex-col items-center justify-center p-6 rounded-2xl glass-card border ${mod.border} hover:-translate-y-2 transition-transform cursor-pointer group h-full`}>
                  <div className={`p-4 rounded-full ${mod.bg} ${mod.color} mb-3 group-hover:scale-110 transition-transform`}>
                    <mod.icon className="h-8 w-8" />
                  </div>
                  <span className="font-semibold">{mod.title}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </section>

        {/* Dashboard Preview Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative mx-auto max-w-6xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Real Exam Simulation</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Experience the exact look and feel of the computer-delivered IELTS exam, enhanced with AI insights.</p>
          </div>

          <div className="absolute inset-0 bg-gradient-animated blur-3xl opacity-20 rounded-3xl" />
          <div className="relative glass-card rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-2 md:p-4 bg-background/80 backdrop-blur-2xl">
            <div className="w-full h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-black/40 rounded-t-xl mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Mock Dashboard UI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
              <div className="col-span-1 rounded-xl glass border-white/5 p-4 flex flex-col gap-4">
                <div className="h-8 w-1/2 bg-white/10 rounded-md animate-pulse" />
                <div className="h-12 w-full bg-primary/20 rounded-xl animate-pulse" />
                <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
                <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
                <div className="h-32 w-full bg-blue-500/10 rounded-xl mt-auto animate-pulse" />
              </div>
              <div className="col-span-3 rounded-xl glass border-white/5 p-4 flex flex-col gap-4 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-8 w-1/4 bg-white/10 rounded-md animate-pulse" />
                  <div className="h-8 w-32 bg-primary/20 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/5 flex items-center justify-center flex-col gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
                  <Brain className="h-20 w-20 text-primary/40 animate-bounce" />
                  <p className="text-white/40 font-medium tracking-wide text-lg">AI Evaluator Processing Band Score...</p>
                  <div className="w-64 h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="w-2/3 h-full bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
