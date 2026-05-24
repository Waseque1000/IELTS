"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2 group">
          <GraduationCap className="h-8 w-8 text-primary group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-slate-900">
            IELTS Mastery<span className="text-primary">AI</span>
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#modules" className="transition-colors hover:text-primary text-slate-600 hidden md:inline-block">Modules</Link>
            <Link href="#cambridge" className="transition-colors hover:text-primary text-slate-600 hidden md:inline-block">Cambridge Tests</Link>
            <Link href="#pricing" className="transition-colors hover:text-primary text-slate-600 hidden md:inline-block">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_15px_rgba(168,85,247,0.3)] font-semibold rounded-full px-6 transition-all hover:scale-105">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
