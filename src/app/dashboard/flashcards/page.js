"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, ArrowLeft, ArrowRight, RotateCcw, Check, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const mockCards = [
  { id: 1, front: "What is Machine Learning?", back: "A subset of AI that uses statistical methods to enable machines to improve with experience." },
  { id: 2, front: "What is Deep Learning?", back: "A subset of machine learning based on artificial neural networks with multiple layers." },
  { id: 3, front: "What is a Neural Network?", back: "A computing system inspired by the biological neural networks that constitute animal brains." },
]

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  const nextCard = () => {
    if (currentIndex < mockCards.length - 1) {
      setDirection(1)
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150)
    }
  }

  const slideVariant = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    })
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8 animate-in fade-in duration-500">
      
      <div className="w-full flex justify-between items-end mb-8">
        <div>
          <Badge variant="outline" className="mb-2 text-primary border-primary/30">Deck: AI Basics</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Mastery Progress</p>
          <div className="flex items-center gap-2">
            <Progress value={(currentIndex / mockCards.length) * 100} className="w-32 h-2" />
            <span className="text-sm font-medium">{currentIndex + 1}/{mockCards.length}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-2xl aspect-[3/2] perspective-[1000px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? "back" : "front")}
            custom={direction}
            variants={slideVariant}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            <motion.div 
              className={`w-full h-full rounded-[2.5rem] glass-card border-white/10 p-10 flex flex-col justify-center items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative transition-colors duration-500 ${isFlipped ? 'bg-primary/10 border-primary/30 shadow-[0_0_50px_rgba(168,85,247,0.15)]' : 'bg-white/5'}`}
            >
              <div className="absolute top-8 left-8 text-muted-foreground/30">
                <Brain className="h-10 w-10" />
              </div>
              <div className="absolute top-8 right-8">
                <Button variant="ghost" size="icon" className="text-yellow-500/50 hover:text-yellow-500 hover:bg-yellow-500/10"><Star className="h-6 w-6" /></Button>
              </div>

              <h2 className={`text-2xl md:text-4xl font-medium leading-relaxed ${isFlipped ? 'text-primary' : 'text-foreground'}`}>
                {isFlipped ? mockCards[currentIndex].back : mockCards[currentIndex].front}
              </h2>

              <p className="absolute bottom-8 text-sm text-muted-foreground/50 font-medium tracking-widest uppercase">
                {isFlipped ? "Answer" : "Question"} — Click to flip
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-8 mt-14 w-full max-w-sm">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full glass border-white/20 hover:bg-white/10"
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div className="flex gap-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
          <Button variant="ghost" className="h-12 w-12 rounded-full text-red-500 hover:bg-red-500/20 hover:text-red-400 p-0">
            <X className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="h-12 w-12 rounded-full text-green-500 hover:bg-green-500/20 hover:text-green-400 p-0">
            <Check className="h-6 w-6" />
          </Button>
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full glass border-white/20 hover:bg-white/10"
          onClick={nextCard}
          disabled={currentIndex === mockCards.length - 1}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
