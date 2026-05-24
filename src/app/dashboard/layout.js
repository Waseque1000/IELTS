"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  GraduationCap, LayoutDashboard, Headphones, 
  BookOpen, Edit3, Mic, Library, Trophy, LogOut
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const sidebarNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Listening", href: "/dashboard/listening", icon: Headphones },
  { title: "Reading", href: "/dashboard/reading", icon: BookOpen },
  { title: "Writing", href: "/dashboard/writing", icon: Edit3 },
  { title: "Speaking", href: "/dashboard/speaking", icon: Mic },
  { title: "Mock Tests", href: "/dashboard/mock-tests", icon: Trophy },
  { title: "Cambridge Books", href: "/dashboard/cambridge", icon: Library },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/10 glass md:flex sticky top-0 h-screen">
        <Link href="/" className="p-6 flex items-center space-x-2 transition-transform hover:scale-105 group">
          <GraduationCap className="h-8 w-8 text-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all" />
          <span className="font-bold text-xl tracking-tight">IELTS Mastery<span className="text-primary">AI</span></span>
        </Link>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {sidebarNavItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all mb-1 ${
                    isActive ? "bg-primary/10 text-primary font-bold shadow-[inset_4px_0_0_0_rgba(168,85,247,1)]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="p-4 mt-auto">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center gap-4 border-b border-white/10 glass px-6 sticky top-0 z-40">
          <div className="flex-1">
            <h2 className="text-xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop().replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer hover:scale-105 transition-transform">
              <span className="text-sm font-bold text-white">S</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {/* Global Dashboard Background Blob */}
          <div className="absolute top-0 left-0 w-[800px] h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-full pointer-events-none" />
          {children}
        </main>
      </div>
    </div>
  )
}
