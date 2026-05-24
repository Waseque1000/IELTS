"use client"

import { useState } from "react"
import { PenTool, Type, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function WritingModule() {
  const [text, setText] = useState("")

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 mb-1">Academic Writing - Task 2</Badge>
          <h1 className="text-2xl font-bold tracking-tight">Essay</h1>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">40:00</div>
          <p className="text-xs text-muted-foreground">Time Remaining</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Panel - Prompt & Question */}
        <Card className="flex-1 lg:max-w-md glass-card border-white/10 flex flex-col shadow-xl">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-semibold text-sm tracking-widest text-muted-foreground">QUESTION PROMPT</h3>
          </div>
          <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="bg-black/40 p-6 rounded-xl border border-white/10 mb-8 shadow-inner">
              <p className="text-lg leading-relaxed font-serif text-foreground/90">
                Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime.
                <br /><br />
                Discuss both these views and give your own opinion.
              </p>
            </div>
            
            <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/5">
              <h4 className="font-semibold text-sm text-white flex items-center gap-2"><Target className="h-4 w-4 text-purple-400" /> Task Requirements</h4>
              <ul className="text-sm space-y-3 text-muted-foreground pl-6 list-disc marker:text-purple-500">
                <li>Write at least 250 words.</li>
                <li>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Right Panel - Editor & AI */}
        <Card className="flex-[2] glass-card border-white/10 flex flex-col shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-primary to-blue-600" />
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-sm tracking-widest flex items-center gap-2 text-white"><PenTool className="h-4 w-4 text-purple-400" /> YOUR RESPONSE</h3>
            <Badge variant="outline" className="font-mono bg-black/40 border-white/10">{text.split(/\s+/).filter(w => w.length > 0).length} words</Badge>
          </div>
          
          <div className="flex-1 p-0 flex flex-col bg-background/30">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing your essay here..."
              className="flex-1 w-full p-8 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-lg leading-relaxed custom-scrollbar font-serif placeholder:text-muted-foreground/30"
            />
          </div>

          <div className="p-4 border-t border-white/10 bg-black/60 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-3 text-xs text-muted-foreground/70 tracking-wide uppercase">
              <Type className="h-4 w-4" /> Spell check is automatically disabled to simulate exam conditions.
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-primary/90 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] border-0 h-10 px-6 rounded-full">
              <Zap className="h-4 w-4 mr-2" /> Evaluate with AI
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
