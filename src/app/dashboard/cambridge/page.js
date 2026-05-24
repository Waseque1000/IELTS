"use client"

import { Book, CheckCircle, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CambridgePractice() {
  const books = [
    { id: 19, title: "Cambridge IELTS 19", status: "In Progress", progress: 65, locked: false },
    { id: 18, title: "Cambridge IELTS 18", status: "Completed", progress: 100, locked: false },
    { id: 17, title: "Cambridge IELTS 17", status: "Start Practice", progress: 0, locked: false },
    { id: 16, title: "Cambridge IELTS 16", status: "Start Practice", progress: 0, locked: false },
    { id: 15, title: "Cambridge IELTS 15", status: "Locked", progress: 0, locked: true },
    { id: 14, title: "Cambridge IELTS 14", status: "Locked", progress: 0, locked: true },
    { id: 13, title: "Cambridge IELTS 13", status: "Locked", progress: 0, locked: true },
    { id: 12, title: "Cambridge IELTS 12", status: "Locked", progress: 0, locked: true },
  ]

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="mb-14 text-center">
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]">Official Practice</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">Cambridge Library</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">Practice with authentic past papers. The ultimate way to prepare for the real computer-delivered IELTS exam.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <Card key={book.id} className={`glass-card overflow-hidden transition-all duration-500 relative group shadow-xl ${book.locked ? 'opacity-60 grayscale hover:grayscale-0' : 'hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] border-white/20'}`}>
            <div className="h-56 bg-gradient-to-br from-[#0A192F] to-[#112240] flex items-center justify-center p-6 relative border-b border-white/10">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cambridge_University_Press_logo.svg/2560px-Cambridge_University_Press_logo.svg.png')] opacity-10 bg-center bg-no-repeat bg-[length:150px] m-4 mix-blend-screen filter invert" />
              <div className="z-10 flex flex-col items-center justify-center gap-2">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/50">Academic</span>
                <h2 className="text-4xl font-serif font-bold text-white tracking-widest drop-shadow-md">{book.id}</h2>
              </div>
              {book.locked && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20 transition-opacity group-hover:bg-black/50">
                  <Lock className="h-12 w-12 text-white/70" />
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col gap-5 bg-white/5 backdrop-blur-xl">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">{book.status}</span>
                {book.progress === 100 && <CheckCircle className="h-5 w-5 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
              </div>
              
              {!book.locked && (
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.8)]" style={{ width: `${book.progress}%` }} />
                </div>
              )}

              <Button 
                disabled={book.locked}
                className={`w-full mt-2 h-12 font-bold tracking-wide rounded-xl transition-all ${book.progress > 0 && book.progress < 100 ? 'bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:bg-primary/90' : book.progress === 100 ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/20' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {book.locked ? 'Upgrade to Unlock' : book.progress === 100 ? 'Review Mistakes' : 'Continue Tests'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
