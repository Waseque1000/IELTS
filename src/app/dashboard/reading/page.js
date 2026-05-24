"use client"

import { Highlighter, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ReadingModule() {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mb-1">Academic Reading</Badge>
          <h1 className="text-2xl font-bold tracking-tight">Passage 1</h1>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">59:45</div>
          <p className="text-xs text-muted-foreground">Time Remaining</p>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left Panel - Passage */}
        <Card className="flex-1 glass-card border-white/10 overflow-hidden flex flex-col h-[500px] lg:h-auto shadow-xl">
          <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-sm tracking-widest text-muted-foreground">READING PASSAGE 1</h3>
            <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-green-400 hover:bg-green-400/10"><Highlighter className="h-4 w-4 mr-2" /> Highlight</Button>
          </div>
          <div className="p-8 overflow-y-auto flex-1 font-serif text-lg leading-loose text-foreground/90 custom-scrollbar bg-background/50">
            <h2 className="text-3xl font-bold mb-8 text-center font-sans tracking-tight">The Secret of the Yew Tree</h2>
            <p className="mb-6">
              <span className="font-bold mr-3 font-sans text-xl text-green-400">A</span>
              The yew tree (Taxus baccata) is a fascinating evergreen conifer native to western, central and southern Europe. It is known for its incredible longevity, with some specimens estimated to be thousands of years old. Unlike most conifers, which bear cones, the yew produces a highly toxic red berry-like structure called an aril.
            </p>
            <p className="mb-6">
              <span className="font-bold mr-3 font-sans text-xl text-green-400">B</span>
              Historically, the yew was deeply associated with mythology and religion. In ancient Celtic culture, it was considered a sacred tree, symbolizing death and resurrection due to its ability to drop branches that can take root and form new trunks. This is perhaps why they are commonly found in churchyards across Britain.
            </p>
            <p className="mb-6 bg-green-500/20 rounded-md px-2 -mx-2 text-foreground shadow-[inset_4px_0_0_0_rgba(74,222,128,1)] transition-colors">
              <span className="font-bold mr-3 font-sans text-xl text-green-400">C</span>
              In modern medicine, the yew tree has proven to be incredibly valuable. During the 1960s, scientists discovered that the bark of the Pacific yew contained a compound called paclitaxel (Taxol). This compound has powerful anti-cancer properties and has been successfully used to treat ovarian, breast, and lung cancers.
            </p>
            <p className="mb-6">
              <span className="font-bold mr-3 font-sans text-xl text-green-400">D</span>
              However, harvesting paclitaxel from yew bark was highly unsustainable. It required stripping the bark from the tree, which inevitably killed it. Given that yew trees grow exceptionally slowly, mass harvesting threatened the species. Fortunately, researchers later developed a method to synthesize the drug using the needles of the European yew, allowing the trees to be pruned rather than destroyed.
            </p>
          </div>
        </Card>

        {/* Right Panel - Questions */}
        <Card className="flex-1 glass-card border-white/10 overflow-hidden flex flex-col h-[500px] lg:h-auto shadow-xl">
          <div className="p-3 border-b border-white/10 bg-white/5">
            <h3 className="font-semibold text-sm tracking-widest text-muted-foreground">QUESTIONS 1-5</h3>
          </div>
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
            
            <div className="mb-10">
              <h4 className="font-bold text-lg mb-2">Questions 1-4</h4>
              <p className="text-sm text-muted-foreground mb-4 bg-white/5 p-3 rounded-lg border border-white/10">Reading Passage 1 has four paragraphs, A-D.<br/>Choose the correct heading for each paragraph from the list of headings below.</p>
              
              <div className="bg-black/40 p-5 rounded-xl border border-white/10 mb-6 text-sm shadow-inner">
                <p className="font-bold mb-3 text-white">List of Headings</p>
                <ol className="list-[lower-roman] pl-5 space-y-2 text-muted-foreground/90">
                  <li>A sustainable solution to drug production</li>
                  <li>The religious significance of the yew</li>
                  <li>Physical characteristics of the yew</li>
                  <li>A groundbreaking medical discovery</li>
                  <li>The decline of the yew population</li>
                </ol>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="font-medium w-28 text-foreground/80">Paragraph <span className="font-bold text-white">{String.fromCharCode(64 + num)}</span></span>
                    <input type="text" className="bg-black/50 border border-white/20 rounded-md px-3 py-1.5 w-20 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-green-400 font-mono text-center transition-all shadow-inner" placeholder="i-v" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-2">Question 5</h4>
              <p className="text-sm text-muted-foreground mb-4 bg-white/5 p-3 rounded-lg border border-white/10">Choose the correct letter, A, B, C or D.</p>
              
              <div className="bg-black/40 p-5 rounded-xl border border-white/10 shadow-inner">
                <p className="font-medium mb-5 text-white">What was the main problem with extracting paclitaxel from the Pacific yew?</p>
                <div className="space-y-3">
                  {['A. The drug was not effective enough.', 'B. The process resulted in the death of the trees.', 'C. The bark did not contain enough of the compound.', 'D. The trees were difficult to locate.'].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors border border-transparent hover:border-white/20 bg-white/5">
                      <input type="radio" name="q5" className="w-4 h-4 text-green-500 bg-black/50 border-white/20 focus:ring-green-500 focus:ring-offset-background" />
                      <span className="text-sm font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-between">
              <Button variant="outline" className="glass border-white/20"><Flag className="h-4 w-4 mr-2" />Review Later</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)] border-0">Submit Answers</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
