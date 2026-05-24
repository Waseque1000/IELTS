"use client"

import { Headphones, BookOpen, PenTool, Mic, TrendingUp, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -z-10 rounded-full" />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Welcome back, Alex! 👋</h1>
          <p className="text-foreground/80 text-lg max-w-2xl">Your overall estimated Band Score is <span className="font-bold text-primary text-2xl ml-1">7.5</span>. You are on track for an 8.0!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center shadow-lg">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Study Streak</p>
            <p className="text-2xl font-bold text-yellow-500">14 Days</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-4">Current Band Scores</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card bg-blue-500/5 border-blue-500/20 hover:-translate-y-1 transition-transform shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-foreground/80">Listening</CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-lg"><Headphones className="h-5 w-5 text-blue-400" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-blue-400 drop-shadow-sm">8.0</div>
            <p className="text-sm text-blue-400/70 mt-2 font-medium">Top 10% worldwide</p>
          </CardContent>
        </Card>
        <Card className="glass-card bg-green-500/5 border-green-500/20 hover:-translate-y-1 transition-transform shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-foreground/80">Reading</CardTitle>
            <div className="p-2 bg-green-500/20 rounded-lg"><BookOpen className="h-5 w-5 text-green-400" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-green-400 drop-shadow-sm">8.5</div>
            <p className="text-sm text-green-400/70 mt-2 font-medium">+0.5 from last mock test</p>
          </CardContent>
        </Card>
        <Card className="glass-card bg-purple-500/5 border-purple-500/20 hover:-translate-y-1 transition-transform shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-foreground/80">Writing</CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-lg"><PenTool className="h-5 w-5 text-purple-400" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-purple-400 drop-shadow-sm">6.5</div>
            <p className="text-sm text-purple-400/70 mt-2 font-medium flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Needs Improvement</p>
          </CardContent>
        </Card>
        <Card className="glass-card bg-pink-500/5 border-pink-500/20 hover:-translate-y-1 transition-transform shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-foreground/80">Speaking</CardTitle>
            <div className="p-2 bg-pink-500/20 rounded-lg"><Mic className="h-5 w-5 text-pink-400" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-pink-400 drop-shadow-sm">7.0</div>
            <p className="text-sm text-pink-400/70 mt-2 font-medium">Good Fluency</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <Card className="glass-card border-white/10 shadow-2xl p-2 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-red-400" /> AI Weakness Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex justify-between mb-3 text-sm font-medium">
                <span className="text-white">Task 2 Essay Coherence</span>
                <span className="text-red-400 bg-red-400/10 px-2 py-0.5 rounded text-xs">High Priority</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-red-500 w-[45%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3 text-sm font-medium">
                <span className="text-white">True/False/Not Given</span>
                <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded text-xs">Improving</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-yellow-500 w-[65%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3 text-sm font-medium">
                <span className="text-white">Speaking Lexical Resource</span>
                <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs">Strong</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-green-500 w-[85%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
