"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Download, Share2, Copy, Search, MessageSquare, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SmartNotes() {
  const [expandedSection, setExpandedSection] = useState(0)

  const notes = [
    {
      title: "Introduction to Artificial Intelligence",
      content: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.",
      keywords: ["Simulation", "Learning", "Problem-solving"]
    },
    {
      title: "Machine Learning vs Deep Learning",
      content: "Machine learning is a subset of AI that uses statistical methods to enable machines to improve with experience. Deep learning is a subset of machine learning that makes the computation of multi-layer neural networks feasible.",
      keywords: ["Neural networks", "Statistical methods", "Subsets"]
    },
    {
      title: "Applications of AI",
      content: "AI is used in various fields including healthcare (diagnosis), finance (algorithmic trading), transportation (autonomous vehicles), and customer service (chatbots).",
      keywords: ["Healthcare", "Finance", "Autonomous vehicles"]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-10 animate-in fade-in duration-500">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">AI Generated</Badge>
            <h1 className="text-3xl font-bold tracking-tight">CS50: AI Basics & Foundations</h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <FileText className="h-4 w-4" /> Based on "Intro_to_AI_Lec1.pdf"
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="glass border-white/10"><Copy className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="glass border-white/10"><Share2 className="h-4 w-4" /></Button>
            <Button className="bg-primary text-white shadow-soft"><Download className="h-4 w-4 mr-2" /> Export</Button>
          </div>
        </div>

        {/* Reading UI */}
        <div className="flex flex-col gap-4 mt-4 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
          
          {notes.map((note, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-14"
            >
              <div className="absolute left-[21px] top-6 w-3 h-3 rounded-full bg-primary border-[3px] border-background shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <Card 
                className={`glass-card border-white/10 transition-all cursor-pointer shadow-xl ${expandedSection === index ? 'ring-1 ring-primary/50 bg-white/10' : 'hover:bg-white/5'}`}
                onClick={() => setExpandedSection(expandedSection === index ? -1 : index)}
              >
                <div className="p-5 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-foreground">{note.title}</h3>
                  {expandedSection === index ? <ChevronDown className="text-muted-foreground" /> : <ChevronRight className="text-muted-foreground" />}
                </div>
                
                {expandedSection === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-5 pb-5 pt-2 text-muted-foreground leading-relaxed border-t border-white/5 mt-2"
                  >
                    <p className="mb-4 text-base">{note.content}</p>
                    <div className="flex gap-2 flex-wrap">
                      {note.keywords.map(kw => (
                        <Badge key={kw} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <Card className="glass-card sticky top-24 border-white/10 shadow-xl">
          <div className="p-4 border-b border-white/10 bg-white/5 rounded-t-xl">
            <h3 className="font-semibold flex items-center gap-2"><Search className="h-4 w-4 text-primary" /> Table of Contents</h3>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {notes.map((note, idx) => (
              <button 
                key={idx}
                onClick={() => setExpandedSection(idx)}
                className={`text-left text-sm px-4 py-2.5 rounded-md transition-colors ${expandedSection === idx ? 'bg-primary/15 text-primary font-medium' : 'text-muted-foreground hover:bg-white/5'}`}
              >
                {idx + 1}. {note.title}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/10 bg-black/20 mt-4 rounded-b-xl flex flex-col gap-3">
            <p className="text-xs text-muted-foreground">Have questions about this topic?</p>
            <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border-0">
              <MessageSquare className="h-4 w-4 mr-2" /> Ask AI Tutor
            </Button>
          </div>
        </Card>
      </div>

    </div>
  )
}
