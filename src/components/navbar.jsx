"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const NavLinks = () => (
    <>
      <Link href="/modules" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Modules</Link>
      <Link href="/cambridge-tests" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Cambridge Tests</Link>
      <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Pricing</Link>
    </>
  )

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        
        {/* Logo (Left) */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            IELTS<span className="text-primary font-black">Mastery</span>
          </span>
        </Link>
        
        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        {/* Action Buttons (Right) */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Link href="/dashboard">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-md font-bold rounded-full px-8 h-12 transition-all hover:scale-105 hover:shadow-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-l-slate-200 flex flex-col p-8">
                <nav className="flex flex-col space-y-6 mt-12">
                  <NavLinks />
                  <div className="pt-6 border-t border-slate-100">
                    <Link href="/dashboard" className="w-full">
                      <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl h-14 text-lg shadow-md">
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
