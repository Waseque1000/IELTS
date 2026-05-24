"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Volume2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FocusRoom() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [theme, setTheme] = useState('cyberpunk')

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => { setIsActive(false); setTimeLeft(25 * 60) }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const themes = {
    cyberpunk: "bg-black/50 text-primary border-primary/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] backdrop-blur-md",
    minimal: "bg-white/5 backdrop-blur-2xl border-white/20 text-foreground",
    nature: "bg-green-950/40 backdrop-blur-xl border-green-500/30 text-green-400 shadow-[0_0_50px_rgba(34,197,94,0.1)]",
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] items-center justify-center relative overflow-hidden rounded-3xl p-8 glass-card border-white/10 animate-in zoom-in-95 duration-500">
      {/* Dynamic Backgrounds based on theme */}
      {theme === 'cyberpunk' && <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen" />}
      {theme === 'nature' && <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />}
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Sparkles className="text-yellow-400" /> Deep Focus Room
        </h1>

        <Tabs defaultValue="cyberpunk" onValueChange={setTheme} className="mb-12">
          <TabsList className="glass bg-black/40 border border-white/10 h-12 p-1">
            <TabsTrigger value="cyberpunk" className="rounded-lg h-full px-6">Cyberpunk</TabsTrigger>
            <TabsTrigger value="minimal" className="rounded-lg h-full px-6">Minimal</TabsTrigger>
            <TabsTrigger value="nature" className="rounded-lg h-full px-6">Nature</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className={`p-12 rounded-[3rem] border-2 transition-all duration-1000 ${themes[theme]}`}>
          <div className="flex flex-col items-center">
            <motion.div 
              className="text-8xl md:text-9xl font-mono font-bold tracking-tighter mb-8"
              animate={{ scale: isActive ? [1, 1.02, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </motion.div>

            <div className="flex gap-4">
              <Button 
                onClick={toggleTimer} 
                size="lg" 
                className={`rounded-full h-16 w-16 p-0 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/80'} text-white shadow-xl transition-all`}
              >
                {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>
              <Button onClick={resetTimer} size="lg" variant="outline" className="rounded-full h-16 w-16 p-0 glass border-white/20 hover:bg-white/10">
                <RotateCcw className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-12 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Lofi Study Beats</span>
          <div className="flex gap-1 items-center ml-4">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
            <div className="w-1 h-4 bg-primary/80 rounded-full animate-pulse delay-75" />
            <div className="w-1 h-2 bg-primary/60 rounded-full animate-pulse delay-150" />
            <div className="w-1 h-5 bg-primary rounded-full animate-pulse delay-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
