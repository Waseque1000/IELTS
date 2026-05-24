"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic, UserSquare2, StopCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SpeakingModule() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500 flex flex-col items-center">
      <Badge className="bg-pink-500/10 text-pink-500 border-pink-500/20 mb-4 px-4 py-1.5 text-sm uppercase tracking-widest font-bold shadow-[0_0_10px_rgba(236,72,153,0.2)]">Part 2: Cue Card</Badge>
      <h1 className="text-4xl font-bold tracking-tight mb-3 text-center">Speaking Simulation</h1>
      <p className="text-muted-foreground mb-12 text-center max-w-lg text-lg">AI Examiner Sarah will listen and evaluate your pronunciation, fluency, and vocabulary.</p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Examiner Side */}
        <Card className="glass-card border-white/10 shadow-2xl overflow-hidden relative group h-72">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent z-0" />
          <div className="p-8 relative z-10 flex flex-col items-center justify-center text-center h-full">
            <div className="h-28 w-28 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-6 relative shadow-inner">
              <UserSquare2 className="h-14 w-14 text-pink-400" />
              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-[3px] border-background shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
            </div>
            <h3 className="font-bold text-xl text-white">AI Examiner Sarah</h3>
            <p className="text-sm text-pink-200/80 mt-3 max-w-xs italic leading-relaxed">"Describe a book that had a major influence on you. You have 1 minute to prepare and 2 minutes to speak."</p>
          </div>
        </Card>

        {/* Cue Card Details */}
        <Card className="glass-card border-white/10 shadow-2xl p-8 flex flex-col justify-center h-72 bg-white/5">
          <h4 className="font-bold mb-6 flex items-center gap-2 text-xl border-b border-white/10 pb-4 text-white">
            Topic Card
          </h4>
          <ul className="space-y-4 text-foreground/80 text-lg">
            <li className="flex items-start gap-3"><span className="text-pink-400 font-bold text-xl">•</span> What the book is</li>
            <li className="flex items-start gap-3"><span className="text-pink-400 font-bold text-xl">•</span> How you first heard of it</li>
            <li className="flex items-start gap-3"><span className="text-pink-400 font-bold text-xl">•</span> What the book is about</li>
            <li className="flex items-start gap-3"><span className="text-pink-400 font-bold text-xl">•</span> Why it played such an important role</li>
          </ul>
        </Card>
      </div>

      {/* Recording Area */}
      <Card className="w-full glass-card border-white/10 shadow-2xl overflow-hidden relative mt-6">
        {isRecording && (
          <div className="absolute inset-0 bg-pink-500/5 animate-pulse" />
        )}
        <div className="p-12 flex flex-col items-center justify-center relative z-10">
          
          <div className="text-6xl font-mono font-bold mb-10 tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-sm">
            {isRecording ? "01:45" : "02:00"}
          </div>

          <Button 
            size="lg"
            onClick={() => setIsRecording(!isRecording)}
            className={`h-28 w-28 rounded-full shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:scale-105 transition-transform ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700'}`}
          >
            {isRecording ? <StopCircle className="h-12 w-12 text-white" /> : <Mic className="h-12 w-12 text-white" />}
          </Button>

          <p className="mt-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            {isRecording ? "Recording in progress..." : "Click to start speaking"}
          </p>

          {isRecording && (
            <div className="flex items-center gap-1.5 h-16 mt-10 w-72 justify-center">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ["15%", "100%", "15%"] }}
                  transition={{ repeat: Infinity, duration: 0.4 + Math.random() * 0.6, ease: "easeInOut" }}
                  className="w-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
