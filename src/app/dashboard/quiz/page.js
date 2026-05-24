"use client"

import { Swords, Users, Trophy, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function QuizBattle() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8 animate-in fade-in duration-500">
      
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[80px] rounded-full -z-10" />
        <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">Multiplayer Mode</Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 flex items-center justify-center gap-4">
          <Swords className="h-10 w-10 text-primary" /> Quiz Battle <Swords className="h-10 w-10 text-primary" />
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Challenge your friends or join a global room to test your AI-generated knowledge in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="glass-card p-8 border-white/10 hover:border-primary/50 transition-all group cursor-pointer relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-soft">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Join Random Match</h2>
            <p className="text-muted-foreground mb-8">Compete against students worldwide on similar topics.</p>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg h-14 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Find Match <Play className="ml-2 h-5 w-5 fill-current" />
            </Button>
          </div>
        </Card>

        <Card className="glass-card p-8 border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-soft">
              <Trophy className="h-12 w-12 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Create Private Room</h2>
            <p className="text-muted-foreground mb-8">Invite your friends and battle on your specific PDFs.</p>
            <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-lg h-14 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)]">
              Create Room <Swords className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
      
    </div>
  )
}
