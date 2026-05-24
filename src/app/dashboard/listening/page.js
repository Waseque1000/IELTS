"use client"

import { useState, useEffect, createContext, useContext } from "react"
import YouTube from "react-youtube"
import { Play, Pause, AlertCircle, Loader2, ChevronRight, ChevronLeft, Headphones, CheckCircle2, BookOpen, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const answerKey10_2 = {
  1: "hardie", 2: "19", 3: "gt8 2lc", 4: "hairdresser", 5: "dentist / dentist's",
  6: "lighting", 7: "trains", 8: "safe", 9: "shower", 10: "training",
  11: "A. local people", 12: "C. its method of water treatment", 13: "C. the size of the facilities", 14: "A. whose statue will be at the door",
  15: "E", 16: "F", 17: "D", 18: "H", 19: "A", 20: "B",
  25: "A. the fact that Eastern countries were far away.", 26: "C. to test a new theory", 27: "C. the support he received from other researchers", 28: "A. to build a stone statue", 29: "B. the development of archaeological methodology", 30: "A. its style is out of date",
  31: "competition", 32: "global", 33: "demand", 34: "customers", 35: "regulation", 36: "project", 37: "flexible", 38: "leadership", 39: "women", 40: "self-employed"
}

const answerKey10_3 = {
  1: "4", 2: "46 wombat", 3: "thursday", 4: "8.30", 5: "red", 6: "lunch", 7: "glasses", 8: "ball", 9: "aunt", 10: "month",
  13: "B. it made the work of the trust better known.", 14: "A. noise.", 15: "C. she read a book about them.",
  16: "B", 17: "C", 18: "D", 19: "D", 20: "A",
  21: "C. the way he imagined his grandfather at work.", 22: "A. repetition of words and phrases.", 23: "A. he likes to have clear guidelines.", 24: "B. changing social attitudes.", 25: "B. an equipment failure.",
  26: "E", 27: "D", 28: "A", 29: "G", 30: "C",
  31: "achievement / achievements", 32: "personality / character", 33: "situational", 34: "friend", 35: "aspirations / ambitions", 36: "style", 37: "development", 38: "vision", 39: "structures", 40: "innovation / innovations"
}

const answerKey10_4 = {
  1: "pargetter", 2: "east", 3: "library", 4: "morning / mornings", 5: "postbox", 6: "prices", 7: "glass", 8: "cooker", 9: "week", 10: "fence",
  11: "B. It was convenient for river transport.", 12: "B. Increase in demand for metals.", 13: "A. Shortage of fuel.", 14: "A. The workers went away.", 15: "C. Restore the area as a historical site.",
  16: "trains", 17: "dark", 18: "games", 19: "guided tour", 20: "ladder / ladders",
  25: "D", 26: "F", 27: "G", 28: "B", 29: "E", 30: "C",
  31: "C. mostly negative.", 32: "B. concerns about safety.", 33: "C. future of research.",
  34: "metal / metals", 35: "space", 36: "memory", 37: "solar", 38: "oil", 39: "waste", 40: "tests"
}

export const ExamContext = createContext();

const checkAnswerText = (num, value, book, test) => {
  if (!value) return false;
  const key = book === 10 && test === 2 ? answerKey10_2[num] : book === 10 && test === 3 ? answerKey10_3[num] : book === 10 && test === 4 ? answerKey10_4[num] : null;
  if (!key) return false;
  
  const normalize = (s) => s.toString().toLowerCase().trim();
  const val = normalize(value);
  
  if (key.includes(' / ')) {
    return key.split(' / ').map(normalize).includes(val);
  }
  return normalize(key) === val;
}

const InlineInput = ({ num, width = "w-40" }) => {
  const { answers, handleAnswerChange, isSubmitted, currentBook, currentTest } = useContext(ExamContext);
  const isCorrect = isSubmitted ? checkAnswerText(num, answers[num], currentBook, currentTest) : null;
  const correctAns = currentBook === 10 && currentTest === 2 ? answerKey10_2[num] : currentBook === 10 && currentTest === 3 ? answerKey10_3[num] : currentBook === 10 && currentTest === 4 ? answerKey10_4[num] : null;

  return (
    <span className="relative inline-flex flex-col mx-1">
      <input 
        type="text" 
        disabled={isSubmitted}
        value={answers[num] || ""}
        onChange={(e) => handleAnswerChange(num, e.target.value)}
        className={`inline-flex border-b-2 px-3 py-1 ${width} text-slate-900 font-bold focus:outline-none transition-all rounded-t-md shadow-inner disabled:opacity-100 ${
          isSubmitted 
            ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700') 
            : 'bg-slate-50 border-slate-300 focus:border-blue-500 focus:bg-blue-50/50'
        }`} 
      />
      {isSubmitted && !isCorrect && correctAns && (
        <span className="absolute -bottom-6 left-0 text-[11px] font-black text-emerald-600 whitespace-nowrap bg-emerald-100 px-2 py-0.5 rounded shadow-sm z-10 border border-emerald-200">
          {correctAns.length > 20 ? correctAns.substring(0, 20) + "..." : correctAns}
        </span>
      )}
    </span>
  )
}

export default function ListeningModule() {
  const [step, setStep] = useState('selectBook') 
  
  const [currentBook, setCurrentBook] = useState(10)
  const [currentTest, setCurrentTest] = useState(1)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime, setTotalTime] = useState(1)
  const [player, setPlayer] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [currentSection, setCurrentSection] = useState(1)
  
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const submitExam = () => {
    if (player) player.pauseVideo();
    setIsPlaying(false);
    
    let total = 0;
    
    if (currentBook === 10 && currentTest === 2) {
      [...Array(40)].forEach((_, i) => {
        const num = i + 1;
        if (num >= 21 && num <= 24) return; 
        if (checkAnswerText(num, answers[num], currentBook, currentTest)) total++;
      })
      
      const ans21_22 = answers['21_22'] || [];
      const key21_22 = ['B. climbing', 'C. collecting'];
      ans21_22.forEach(ans => { if (key21_22.includes(ans)) total++; })
      
      const ans23_24 = answers['23_24'] || [];
      const key23_24 = ['B. to experience an isolated place', 'E. to study the impact of an extreme environment'];
      ans23_24.forEach(ans => { if (key23_24.includes(ans)) total++; })
    }
    else if (currentBook === 10 && currentTest === 3) {
      [...Array(40)].forEach((_, i) => {
        const num = i + 1;
        if (num === 11 || num === 12) return; 
        if (checkAnswerText(num, answers[num], currentBook, currentTest)) total++;
      })
      
      const ans11_12 = answers['11_12'] || [];
      const key11_12 = ['C. It helps finance campaigns for changes in fishing practices.', 'E. Volunteers help in various ways.'];
      ans11_12.forEach(ans => { if (key11_12.includes(ans)) total++; })
    }
    else if (currentBook === 10 && currentTest === 4) {
      [...Array(40)].forEach((_, i) => {
        const num = i + 1;
        if (num >= 21 && num <= 24) return; 
        if (checkAnswerText(num, answers[num], currentBook, currentTest)) total++;
      })
      
      const ans21_22 = answers['21_22'] || [];
      const key21_22 = ['A. Communication', 'E. Organisation'];
      ans21_22.forEach(ans => { if (key21_22.includes(ans)) total++; })
      
      const ans23_24 = answers['23_24'] || [];
      const key23_24 = ['B. Cost savings', 'C. An improved image'];
      ans23_24.forEach(ans => { if (key23_24.includes(ans)) total++; })
    }
    
    setScore(total);
    setIsSubmitted(true);
  }

  const handleAnswerChange = (num, value) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [num]: value }))
  }

  const opts = {
    height: '0',
    width: '0',
    playerVars: { autoplay: 0, controls: 0, rel: 0 },
  }

  const onReady = (event) => {
    setPlayer(event.target)
    setTotalTime(event.target.getDuration())
    setIsReady(true)
  }

  useEffect(() => {
    let interval;
    if (isPlaying && player) {
      interval = setInterval(async () => {
        const time = await player.getCurrentTime()
        setCurrentTime(Math.floor(time))
      }, 1000)
    } else if (!isPlaying && currentTime !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isPlaying, player, currentTime])

  const togglePlay = () => {
    if (!player || !isReady) return
    if (isPlaying) player.pauseVideo()
    else player.playVideo()
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (Math.floor(seconds) % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleCheckboxChange = (groupName, q1, q2, opt) => {
    if (isSubmitted) return;
    const current = answers[groupName] || []
    if (current.includes(opt)) {
      const updated = current.filter(item => item !== opt)
      handleAnswerChange(groupName, updated)
    } else if (current.length < 2) {
      const updated = [...current, opt]
      handleAnswerChange(groupName, updated)
    }
  }

  const handleRadioChange = (num, opt) => {
    if (isSubmitted) return;
    handleAnswerChange(num, opt)
  }

  const renderBookSelection = () => (
    <div className="max-w-7xl mx-auto p-6 md:p-12 animate-in fade-in duration-500 min-h-screen">
      <div className="text-center mb-16">
        <Badge className="bg-blue-50 text-blue-600 border-blue-200 mb-6 px-4 py-1.5 text-sm uppercase tracking-widest font-bold shadow-sm">Listening Library</Badge>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Select a Book</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Choose a Cambridge IELTS book from the library to begin your official listening practice.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(10)].map((_, i) => {
          const bookNum = 10 + i;
          return (
            <Card 
              key={bookNum} 
              onClick={() => { setCurrentBook(bookNum); setStep('selectTest') }} 
              className="cursor-pointer group border-slate-200 shadow-sm hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white"
            >
              <div className="h-40 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border-b border-slate-100 relative overflow-hidden">
                <BookOpen className="h-20 w-20 text-blue-500/10 absolute -right-4 -bottom-4 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-6xl font-serif font-black text-blue-600 tracking-tighter drop-shadow-sm group-hover:scale-110 transition-transform duration-500">{bookNum}</h3>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-slate-800 mb-2">Cambridge IELTS</h4>
                <p className="text-slate-500 text-sm font-medium">4 Listening Tests</p>
                <div className="mt-6 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-0 group-hover:w-full h-full bg-blue-500 transition-all duration-500" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderTestSelection = () => (
    <div className="max-w-5xl mx-auto p-6 md:p-12 animate-in slide-in-from-right-8 duration-500 min-h-screen">
      <Button 
        variant="ghost" 
        onClick={() => setStep('selectBook')} 
        className="mb-8 text-slate-500 hover:text-slate-900 font-bold tracking-wide"
      >
        <ChevronLeft className="mr-2 h-5 w-5" /> Library
      </Button>
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Cambridge {currentBook}</h1>
        <p className="text-slate-500 text-xl font-medium">Select a listening test to start your practice session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(testNum => (
          <Card 
            key={testNum} 
            onClick={() => { 
              setCurrentTest(testNum); 
              setCurrentSection(1); 
              setIsSubmitted(false);
              setAnswers({});
              setScore(0);
              setStep('takeTest'); 
            }} 
            className="cursor-pointer group border-slate-200 shadow-sm hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 p-8 flex items-center justify-between bg-white"
          >
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center font-black text-3xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300 shadow-sm">
                {testNum}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Test {testNum}</h3>
                <p className="text-slate-500 font-medium flex items-center gap-3">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> 40 Qs</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1"><Headphones className="h-4 w-4" /> 40 Min</span>
                </p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTest1 = () => {
    return (
      <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 flex items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50">
          <p className="text-xl font-bold text-slate-400">Test 1 content placeholder...</p>
      </div>
    )
  }

  const renderTest2 = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 1-10</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the notes below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD AND/OR A NUMBER</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 text-lg leading-loose font-serif text-slate-700 shadow-sm">
                <h4 className="font-black text-center text-3xl mb-8 tracking-widest font-sans text-slate-900">Transport Survey</h4>
                
                <div className="space-y-5">
                  <div className="flex items-center text-slate-700 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="font-bold min-w-[200px] text-slate-500 uppercase tracking-widest text-sm">Example: Travelled to town today:</span>
                    <span className="text-slate-900 text-xl font-bold">by <span className="italic font-serif">bus</span></span>
                  </div>

                  <div className="flex items-center border-b border-slate-200 pb-5">
                    <span className="font-bold text-slate-500 w-8 shrink-0">1.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Name:</span>
                    <span>Luisa <InlineInput num="1" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">2.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Address:</span>
                    <span><InlineInput num="2" /> White Stone Rd</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="w-8 shrink-0"></span>
                    <span className="font-bold min-w-[200px] text-slate-800">Area:</span>
                    <span className="font-bold text-slate-900">Bradfield</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">3.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Postcode:</span>
                    <span><InlineInput num="3" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">4.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Occupation:</span>
                    <span><InlineInput num="4" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">5.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Reason for visit to town:</span>
                    <span>to go to the <InlineInput num="5" /></span>
                  </div>

                  <h5 className="font-black mt-10 mb-6 text-blue-600 font-sans text-xl uppercase tracking-widest">Suggestions for improvement:</h5>
                  <div className="border-l-4 border-blue-200 pl-6 space-y-6 ml-2">
                    <ul className="list-none space-y-4">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">6.</span> <span>Better <InlineInput num="6" /></span></li>
                      <li className="flex items-center"><span className="w-8 shrink-0"></span> <span>Have more footpaths</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">7.</span> <span>More frequent <InlineInput num="7" /></span></li>
                    </ul>
                  </div>

                  <h5 className="font-black mt-10 mb-6 text-indigo-600 font-sans text-xl uppercase tracking-widest">Things that would encourage cycling to work:</h5>
                  <div className="border-l-4 border-indigo-200 pl-6 space-y-6 ml-2">
                    <ul className="list-none space-y-4">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">8.</span> <span>Having <InlineInput num="8" /> parking places for bicycles</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">9.</span> <span>Being able to use a <InlineInput num="9" /> at work</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">10.</span> <span>The opportunity to have cycling <InlineInput num="10" /> on busy roads</span></li>
                    </ul>
                  </div>

                </div>
              </div>
            </Card>
          </div>
        )
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 11-14</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose the correct letter, <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">A, B or C</strong>.</p>
              
              <div className="space-y-6">
                {[
                  { num: 11, q: "The idea for the two new developments in the city came from:", opts: ["A. local people", "B. the City Council", "C. the SWRDC"] },
                  { num: 12, q: "What is unusual about Brackenside pool?", opts: ["A. its architectural style", "B. its heating system", "C. its method of water treatment"] },
                  { num: 13, q: "Local newspapers have raised worries about:", opts: ["A. the late opening date", "B. the cost of the project", "C. the size of the facilities"] },
                  { num: 14, q: "What decision has not yet been made about the pool?", opts: ["A. whose statue will be at the door", "B. the exact opening times", "C. who will open it"] }
                ].map(item => (
                  <div key={item.num} className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xl font-bold mb-6 text-slate-900 font-serif flex gap-4">
                      <span className="font-black text-slate-500">{item.num}.</span> <span>{item.q}</span>
                    </p>
                    <div className="space-y-3 pl-10">
                      {item.opts.map(opt => {
                        const isSelected = answers[item.num] === opt;
                        const isActualCorrect = answerKey10_2[item.num] === opt;
                        
                        let labelClass = 'bg-white border-slate-200 hover:border-emerald-300';
                        if (isSubmitted) {
                          if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                          else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                        } else if (isSelected) {
                          labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm scale-[1.01]';
                        }

                        return (
                          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                            <div className="relative flex items-center justify-center">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSubmitted && isActualCorrect ? 'border-emerald-500 bg-emerald-500' :
                                isSubmitted && isSelected && !isActualCorrect ? 'border-rose-500 bg-rose-500' :
                                isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                              }`}>
                                {(isSelected || (isSubmitted && isActualCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className={`text-lg font-serif transition-colors ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                            <input type="radio" disabled={isSubmitted} className="hidden" checked={isSelected} onChange={() => handleRadioChange(item.num, opt)} />
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 15-20</h3>
              <p className="text-slate-500 mb-8 font-medium">Which feature is related to each of the following areas of the world represented in the playground?</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                  <h4 className="font-black text-center text-lg mb-6 tracking-widest text-slate-900 uppercase">Features</h4>
                  <ul className="grid grid-cols-2 gap-4 font-serif text-slate-700">
                    <li><span className="font-bold text-slate-900 mr-2">A</span> ancient forts</li>
                    <li><span className="font-bold text-slate-900 mr-2">B</span> waterways</li>
                    <li><span className="font-bold text-slate-900 mr-2">C</span> ice and snow</li>
                    <li><span className="font-bold text-slate-900 mr-2">D</span> jewels</li>
                    <li><span className="font-bold text-slate-900 mr-2">E</span> local animals</li>
                    <li><span className="font-bold text-slate-900 mr-2">F</span> mountains</li>
                    <li><span className="font-bold text-slate-900 mr-2">G</span> music and film</li>
                    <li><span className="font-bold text-slate-900 mr-2">H</span> space travel</li>
                    <li><span className="font-bold text-slate-900 mr-2">I</span> volcanoes</li>
                  </ul>
                </div>

                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-black text-lg mb-6 tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-4">Areas of the World</h4>
                  <ul className="space-y-6 text-lg font-serif">
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">15.</span> <span>Asia</span> <InlineInput num="15" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">16.</span> <span>Antarctica</span> <InlineInput num="16" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">17.</span> <span>South America</span> <InlineInput num="17" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">18.</span> <span>North America</span> <InlineInput num="18" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">19.</span> <span>Europe</span> <InlineInput num="19" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">20.</span> <span>Africa</span> <InlineInput num="20" width="w-16" /></li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-fuchsia-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 21-24</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">TWO</strong> letters, A-E.</p>
              
              <div className="space-y-8">
                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-2xl font-bold mb-8 text-slate-900 font-serif flex gap-4">
                    <span className="font-black text-slate-500">21-22.</span> Which TWO hobbies was Thor Heyerdahl very interested in as a youth?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                    {['A. camping', 'B. climbing', 'C. collecting', 'D. hunting', 'E. reading'].map((opt, i) => {
                      const isSelected = (answers['21_22'] || []).includes(opt);
                      const isActualCorrect = ['B. climbing', 'C. collecting'].includes(opt);
                      
                      let labelClass = 'bg-white border-slate-200 hover:border-fuchsia-300';
                      if (isSubmitted) {
                        if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                        else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                      } else if (isSelected) {
                        labelClass = 'bg-fuchsia-50 border-fuchsia-500 shadow-sm scale-[1.02]';
                      }

                      return (
                        <label key={i} className={`flex items-center gap-5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                          <input type="checkbox" disabled={isSubmitted} checked={isSelected} onChange={() => handleCheckboxChange('21_22', 21, 22, opt)} className="hidden" />
                          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                            isSubmitted && isActualCorrect ? 'bg-emerald-500 border-emerald-500' :
                            isSubmitted && isSelected && !isActualCorrect ? 'bg-rose-500 border-rose-500' :
                            isSelected ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-white border-slate-300'
                          }`}>
                            {(isSelected || (isSubmitted && isActualCorrect)) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-lg font-serif ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-2xl font-bold mb-8 text-slate-900 font-serif flex gap-4">
                    <span className="font-black text-slate-500">23-24.</span> Which do the speakers say are the TWO reasons why Heyerdahl went to live on an island?
                  </p>
                  <div className="grid grid-cols-1 gap-4 pl-14">
                    {['A. to examine ancient carvings', 'B. to experience an isolated place', 'C. to formulate a new theory', 'D. to learn survival skills', 'E. to study the impact of an extreme environment'].map((opt, i) => {
                      const isSelected = (answers['23_24'] || []).includes(opt);
                      const isActualCorrect = ['B. to experience an isolated place', 'E. to study the impact of an extreme environment'].includes(opt);
                      
                      let labelClass = 'bg-white border-slate-200 hover:border-fuchsia-300';
                      if (isSubmitted) {
                        if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                        else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                      } else if (isSelected) {
                        labelClass = 'bg-fuchsia-50 border-fuchsia-500 shadow-sm scale-[1.01]';
                      }

                      return (
                        <label key={i} className={`flex items-center gap-5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                          <input type="checkbox" disabled={isSubmitted} checked={isSelected} onChange={() => handleCheckboxChange('23_24', 23, 24, opt)} className="hidden" />
                          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                            isSubmitted && isActualCorrect ? 'bg-emerald-500 border-emerald-500' :
                            isSubmitted && isSelected && !isActualCorrect ? 'bg-rose-500 border-rose-500' :
                            isSelected ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-white border-slate-300'
                          }`}>
                            {(isSelected || (isSubmitted && isActualCorrect)) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-lg font-serif ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-pink-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 25-30</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose the correct letter, <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">A, B or C</strong>.</p>
              
              <div className="space-y-6">
                {[
                  { num: 25, q: "According to Victor and Olivia, academics thought that Polynesian migration from the east was impossible due to:", opts: ["A. the fact that Eastern countries were far away.", "B. the lack of materials for boat building.", "C. the direction of the winds and currents."] },
                  { num: 26, q: "Which do the speakers agree was the main reason for Heyerdahl's raft journey?", opts: ["A. to overcome a research setback", "B. to demonstrate a personal quality", "C. to test a new theory"] },
                  { num: 27, q: "What was most important to Heyerdahl about his raft journey?", opts: ["A. the fact that it was the first of its kind", "B. the use of authentic building methods", "C. the support he received from other researchers"] },
                  { num: 28, q: "Why did Heyerdahl go to Easter Island?", opts: ["A. to build a stone statue", "B. to sail a reed boat", "C. to learn the local language"] },
                  { num: 29, q: "In Olivia's opinion, Heyerdahl's greatest influence was on:", opts: ["A. theories about Polynesian origins", "B. the development of archaeological methodology", "C. establishing archaeology as an academic subject"] },
                  { num: 30, q: "Which criticism do the speakers make of William Oliver's textbook?", opts: ["A. its style is out of date", "B. its content is over-simplified", "C. its methodology is flawed"] }
                ].map(item => (
                  <div key={item.num} className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xl font-bold mb-6 text-slate-900 font-serif flex gap-4">
                      <span className="font-black text-slate-500">{item.num}.</span> <span>{item.q}</span>
                    </p>
                    <div className="space-y-3 pl-10">
                      {item.opts.map(opt => {
                        const isSelected = answers[item.num] === opt;
                        const isActualCorrect = answerKey10_2[item.num] === opt;
                        
                        let labelClass = 'bg-white border-slate-200 hover:border-pink-300';
                        if (isSubmitted) {
                          if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                          else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                        } else if (isSelected) {
                          labelClass = 'bg-pink-50 border-pink-500 shadow-sm scale-[1.01]';
                        }

                        return (
                          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                            <div className="relative flex items-center justify-center">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSubmitted && isActualCorrect ? 'border-emerald-500 bg-emerald-500' :
                                isSubmitted && isSelected && !isActualCorrect ? 'border-rose-500 bg-rose-500' :
                                isSelected ? 'border-pink-500 bg-pink-500' : 'border-slate-300 bg-white'
                              }`}>
                                {(isSelected || (isSubmitted && isActualCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className={`text-lg font-serif transition-colors ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                            <input type="radio" disabled={isSubmitted} className="hidden" checked={isSelected} onChange={() => handleRadioChange(item.num, opt)} />
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 31-40</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the notes below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD ONLY</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-10 rounded-2xl border border-slate-200 text-lg leading-loose font-serif text-slate-700 shadow-sm">
                <h4 className="font-black text-center text-3xl mb-10 tracking-widest font-sans text-slate-900 uppercase">The Future of Management</h4>
                
                <div className="space-y-10">
                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Business markets</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">31.</span> <span>Greater <InlineInput num="31" /> among companies</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">32.</span> <span>Increase in power of large <InlineInput num="32" /> companies</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">33.</span> <span>Rising <InlineInput num="33" /> in certain countries</span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">External influences on businesses</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">34.</span> <span>More discussion with <InlineInput num="34" /> before making business decisions</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">35.</span> <span>Environmental concerns which may lead to more <InlineInput num="35" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Business structures</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">36.</span> <span>More teams will be formed to work on a particular <InlineInput num="36" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">37.</span> <span>Businesses may need to offer hours that are <InlineInput num="37" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Management styles</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">38.</span> <span>Increasing need for managers to provide good <InlineInput num="38" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">39.</span> <span>Changes influenced by <InlineInput num="39" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">40.</span> <span>Need for <InlineInput num="40" /> to deal with conflict</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  const renderTest3 = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 1-10</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the form below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD AND/OR A NUMBER</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 text-lg leading-loose font-serif text-slate-700 shadow-sm">
                <h4 className="font-black text-center text-3xl mb-8 tracking-widest font-sans text-slate-900">Early Learning Childcare Centre Enrolment Form</h4>
                
                <div className="space-y-5">
                  <div className="flex items-center text-slate-700 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="font-bold min-w-[200px] text-slate-500 uppercase tracking-widest text-sm">Example: Parent or guardian:</span>
                    <span className="text-slate-900 text-xl font-bold">Carol <span className="italic font-serif">Smith</span></span>
                  </div>

                  <h5 className="font-black mt-10 mb-6 text-blue-600 font-sans text-xl uppercase tracking-widest">Personal Details</h5>
                  <div className="flex items-center border-b border-slate-200 pb-5">
                    <span className="w-8 shrink-0"></span>
                    <span className="font-bold min-w-[200px] text-slate-800">Child's name:</span>
                    <span>Kate</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">1.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Age:</span>
                    <span><InlineInput num="1" width="w-24" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">2.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Address:</span>
                    <span><InlineInput num="2" width="w-48" /> Road, Woodside, 4032</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="w-8 shrink-0"></span>
                    <span className="font-bold min-w-[200px] text-slate-800">Phone:</span>
                    <span>3345 9865</span>
                  </div>

                  <h5 className="font-black mt-10 mb-6 text-blue-600 font-sans text-xl uppercase tracking-widest">Childcare Information</h5>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">3.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Days enrolled for:</span>
                    <span>Monday and <InlineInput num="3" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">4.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Start time:</span>
                    <span><InlineInput num="4" width="w-32" /> am</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">5.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Childcare group:</span>
                    <span>the <InlineInput num="5" width="w-32" /> group</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">6.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Which meal/s are required each day?</span>
                    <span><InlineInput num="6" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">7.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Medical conditions:</span>
                    <span>needs <InlineInput num="7" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">8.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Emergency contact:</span>
                    <span>Jenny <InlineInput num="8" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="w-8 shrink-0"></span>
                    <span className="font-bold min-w-[200px] text-slate-800">Phone:</span>
                    <span>3346 7523</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">9.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Relationship to child:</span>
                    <span><InlineInput num="9" width="w-40" /></span>
                  </div>

                  <h5 className="font-black mt-10 mb-6 text-blue-600 font-sans text-xl uppercase tracking-widest">Fees</h5>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">10.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Will pay each:</span>
                    <span><InlineInput num="10" width="w-40" /></span>
                  </div>

                </div>
              </div>
            </Card>
          </div>
        )
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 11-12</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">TWO</strong> letters, A-E.</p>
              
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
                <p className="text-2xl font-bold mb-8 text-slate-900 font-serif flex gap-4">
                  <span className="font-black text-slate-500">11-12.</span> Which TWO things does Alice say about the Dolphin Conservation Trust?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                  {[
                    'A. Children make up most of the membership.', 
                    'B. It\'s the country\'s largest conservation organisation.', 
                    'C. It helps finance campaigns for changes in fishing practices.', 
                    'D. It employs several dolphin experts full-time.', 
                    'E. Volunteers help in various ways.'
                  ].map((opt, i) => {
                    const isSelected = (answers['11_12'] || []).includes(opt);
                    const isActualCorrect = ['C. It helps finance campaigns for changes in fishing practices.', 'E. Volunteers help in various ways.'].includes(opt);
                    
                    let labelClass = 'bg-white border-slate-200 hover:border-emerald-300';
                    if (isSubmitted) {
                      if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                      else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                    } else if (isSelected) {
                      labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm scale-[1.02]';
                    }

                    return (
                      <label key={i} className={`flex items-center gap-5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                        <input type="checkbox" disabled={isSubmitted} checked={isSelected} onChange={() => handleCheckboxChange('11_12', 11, 12, opt)} className="hidden" />
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          isSubmitted && isActualCorrect ? 'bg-emerald-500 border-emerald-500' :
                          isSubmitted && isSelected && !isActualCorrect ? 'bg-rose-500 border-rose-500' :
                          isSelected ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'
                        }`}>
                          {(isSelected || (isSubmitted && isActualCorrect)) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-lg font-serif ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 13-15</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose the correct letter, <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">A, B or C</strong>.</p>
              <div className="space-y-6 mb-10">
                {[
                  { num: 13, q: "Why is Alice so pleased the Trust has won the Charity Commission award?", opts: ["A. it has brought in extra money.", "B. it made the work of the trust better known.", "C. it has attracted more members."] },
                  { num: 14, q: "Alice says oil exploration causes problems to dolphins because of:", opts: ["A. noise.", "B. oil leaks.", "C. movement of ships."] },
                  { num: 15, q: "Alice became interested in dolphins when:", opts: ["A. she saw one swimming near her home.", "B. she heard a speaker at her school.", "C. she read a book about them."] }
                ].map(item => (
                  <div key={item.num} className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xl font-bold mb-6 text-slate-900 font-serif flex gap-4">
                      <span className="font-black text-slate-500">{item.num}.</span> <span>{item.q}</span>
                    </p>
                    <div className="space-y-3 pl-10">
                      {item.opts.map(opt => {
                        const isSelected = answers[item.num] === opt;
                        const isActualCorrect = answerKey10_3[item.num] === opt;
                        
                        let labelClass = 'bg-white border-slate-200 hover:border-emerald-300';
                        if (isSubmitted) {
                          if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                          else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                        } else if (isSelected) {
                          labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm scale-[1.01]';
                        }

                        return (
                          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                            <div className="relative flex items-center justify-center">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSubmitted && isActualCorrect ? 'border-emerald-500 bg-emerald-500' :
                                isSubmitted && isSelected && !isActualCorrect ? 'border-rose-500 bg-rose-500' :
                                isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                              }`}>
                                {(isSelected || (isSubmitted && isActualCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className={`text-lg font-serif transition-colors ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                            <input type="radio" disabled={isSubmitted} className="hidden" checked={isSelected} onChange={() => handleRadioChange(item.num, opt)} />
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 16-20</h3>
              <p className="text-slate-500 mb-8 font-medium">Which dolphin does Alice make each of the following comments about?</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                  <h4 className="font-black text-center text-lg mb-6 tracking-widest text-slate-900 uppercase">Dolphins</h4>
                  <ul className="grid grid-cols-2 gap-4 font-serif text-slate-700">
                    <li><span className="font-bold text-slate-900 mr-2">A</span> Moondancer</li>
                    <li><span className="font-bold text-slate-900 mr-2">B</span> Echo</li>
                    <li><span className="font-bold text-slate-900 mr-2">C</span> Kiwi</li>
                    <li><span className="font-bold text-slate-900 mr-2">D</span> Samson</li>
                  </ul>
                </div>

                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-black text-lg mb-6 tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-4">Comments</h4>
                  <ul className="space-y-6 text-lg font-serif">
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">16.</span> <span>It has not been seen this year.</span> <InlineInput num="16" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">17.</span> <span>It is photographed more than the others.</span> <InlineInput num="17" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">18.</span> <span>It is always very energetic.</span> <InlineInput num="18" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">19.</span> <span>It is the newest one in the scheme.</span> <InlineInput num="19" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">20.</span> <span>It has an unusual shape.</span> <InlineInput num="20" width="w-16" /></li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-fuchsia-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 21-25</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose the correct letter, <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">A, B or C</strong>.</p>
              
              <div className="space-y-6 mb-10">
                {[
                  { num: 21, q: "What helped Rob to prepare to play the character of a doctor?", opts: ["A. the stories his grandfather told him.", "B. the times when he watched his grandfather working.", "C. the way he imagined his grandfather at work."] },
                  { num: 22, q: "In the play's first scene, the boredom of village life was suggested by", opts: ["A. repetition of words and phrases.", "B. scenery painted in dull colours.", "C. long pauses within conversations."] },
                  { num: 23, q: "What has Rob learned about himself through working in a group?", opts: ["A. he likes to have clear guidelines.", "B. he finds it hard to change his mind.", "C. he thinks better when he is quiet."] },
                  { num: 24, q: "To support the production, research material was used which described", opts: ["A. political developments.", "B. changing social attitudes.", "C. economic transformations."] },
                  { num: 25, q: "What problem did the students overcome in the final rehearsal?", opts: ["A. one person forgetting their words.", "B. an equipment failure.", "C. the injury of one character."] }
                ].map(item => (
                  <div key={item.num} className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xl font-bold mb-6 text-slate-900 font-serif flex gap-4">
                      <span className="font-black text-slate-500">{item.num}.</span> <span>{item.q}</span>
                    </p>
                    <div className="space-y-3 pl-10">
                      {item.opts.map(opt => {
                        const isSelected = answers[item.num] === opt;
                        const isActualCorrect = answerKey10_3[item.num] === opt;
                        
                        let labelClass = 'bg-white border-slate-200 hover:border-fuchsia-300';
                        if (isSubmitted) {
                          if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                          else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                        } else if (isSelected) {
                          labelClass = 'bg-fuchsia-50 border-fuchsia-500 shadow-sm scale-[1.01]';
                        }

                        return (
                          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                            <div className="relative flex items-center justify-center">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSubmitted && isActualCorrect ? 'border-emerald-500 bg-emerald-500' :
                                isSubmitted && isSelected && !isActualCorrect ? 'border-rose-500 bg-rose-500' :
                                isSelected ? 'border-fuchsia-500 bg-fuchsia-500' : 'border-slate-300 bg-white'
                              }`}>
                                {(isSelected || (isSubmitted && isActualCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className={`text-lg font-serif transition-colors ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                            <input type="radio" disabled={isSubmitted} className="hidden" checked={isSelected} onChange={() => handleRadioChange(item.num, opt)} />
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 26-30</h3>
              <p className="text-slate-500 mb-8 font-medium">What does Rob say about each of the following stages of his course?</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                  <h4 className="font-black text-center text-lg mb-6 tracking-widest text-slate-900 uppercase">Actions needed</h4>
                  <ul className="grid grid-cols-1 gap-4 font-serif text-slate-700">
                    <li><span className="font-bold text-slate-900 mr-2">A</span> be on time</li>
                    <li><span className="font-bold text-slate-900 mr-2">B</span> get a letter of recommendation</li>
                    <li><span className="font-bold text-slate-900 mr-2">C</span> plan for the final year</li>
                    <li><span className="font-bold text-slate-900 mr-2">D</span> make sure the institution's focus is relevant</li>
                    <li><span className="font-bold text-slate-900 mr-2">E</span> show ability in Theatre Studies</li>
                    <li><span className="font-bold text-slate-900 mr-2">F</span> make travel arrangements and bookings</li>
                    <li><span className="font-bold text-slate-900 mr-2">G</span> ask for help</li>
                  </ul>
                </div>

                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-black text-lg mb-6 tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-4">Stages of course</h4>
                  <ul className="space-y-6 text-lg font-serif">
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">26.</span> <span>In the second year of the course</span> <InlineInput num="26" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">27.</span> <span>When first choosing where to go</span> <InlineInput num="27" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">28.</span> <span>When sending in your choices</span> <InlineInput num="28" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">29.</span> <span>When writing your personal statement</span> <InlineInput num="29" width="w-16" /></li>
                    <li className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">30.</span> <span>When doing the year abroad</span> <InlineInput num="30" width="w-16" /></li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 31-40</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the notes below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD ONLY</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-10 rounded-2xl border border-slate-200 text-lg leading-loose font-serif text-slate-700 shadow-sm">
                <h4 className="font-black text-center text-3xl mb-10 tracking-widest font-sans text-slate-900 uppercase">Self-regulatory focus theory and leadership</h4>
                
                <div className="space-y-10">
                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Promotion goals</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">31.</span> <span>Promotion goals in different life situations emphasise <InlineInput num="31" width="w-40" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Factors influencing focus</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">32.</span> <span>The chronic factor is connected to a person's <InlineInput num="32" width="w-40" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">33.</span> <span>The <InlineInput num="33" width="w-40" /> factor means the context we are in affects our focus</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">34.</span> <span>We are more likely to have promotion goals when with a <InlineInput num="34" width="w-40" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Effects of focus</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">35.</span> <span>When focusing on promotion goals, people think about their <InlineInput num="35" width="w-40" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Leadership and focus</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">36.</span> <span>Leaders' behaviour or <InlineInput num="36" width="w-40" /> can affect the focus of followers</span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Transformational leaders</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">37.</span> <span>focus on the <InlineInput num="37" width="w-40" /> of their followers</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">38.</span> <span>passionately communicate a clear <InlineInput num="38" width="w-40" /></span></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Transactional leaders</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">39.</span> <span>focus on creating clear <InlineInput num="39" width="w-40" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">40.</span> <span>This focus can lead to more <InlineInput num="40" width="w-40" /></span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  const renderTest4 = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 1-10</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the form below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD ONLY</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 text-lg leading-loose font-serif text-slate-700 shadow-sm">
                <h4 className="font-black text-center text-3xl mb-8 tracking-widest font-sans text-slate-900 uppercase">Thorndyke's Builders</h4>
                
                <div className="space-y-5">
                  <div className="flex items-center text-slate-700 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="font-bold min-w-[200px] text-slate-500 uppercase tracking-widest text-sm">Example: Customer Name:</span>
                    <span className="text-slate-900 text-xl font-bold">Edith <span className="italic font-serif">Pargetter</span></span>
                  </div>

                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">1.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Customer Name:</span>
                    <span>Edith <InlineInput num="1" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">2.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Address:</span>
                    <span>Flat 4, <InlineInput num="2" width="w-32" /> Park</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">3.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Location Details:</span>
                    <span>(located at the back of the <InlineInput num="3" width="w-40" />)</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">4.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Best time to contact:</span>
                    <span>In the <InlineInput num="4" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">5.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Parking instructions:</span>
                    <span>Park by the <InlineInput num="5" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">6.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Quote requirements:</span>
                    <span>A full itemized quote with individual <InlineInput num="6" width="w-40" /></span>
                  </div>

                  <h5 className="font-black mt-10 mb-6 text-blue-600 font-sans text-xl uppercase tracking-widest">Urgent Work</h5>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">7.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Replace:</span>
                    <span>the <InlineInput num="7" width="w-32" /> in the kitchen door</span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">8.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Paint:</span>
                    <span>the area over the <InlineInput num="8" width="w-40" /></span>
                  </div>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">9.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">When to start:</span>
                    <span>Next <InlineInput num="9" width="w-32" /></span>
                  </div>
                  
                  <h5 className="font-black mt-10 mb-6 text-blue-600 font-sans text-xl uppercase tracking-widest">Additional Work</h5>
                  <div className="flex items-center border-b border-slate-200 pb-5 pt-3">
                    <span className="font-bold text-slate-500 w-8 shrink-0">10.</span>
                    <span className="font-bold min-w-[200px] text-slate-800">Replace:</span>
                    <span>the <InlineInput num="10" width="w-40" /> at the far end of the garden</span>
                  </div>

                </div>
              </div>
            </Card>
          </div>
        )
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 11-15</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose the correct letter, <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">A, B or C</strong>.</p>
              
              <div className="space-y-6 mb-10">
                {[
                  { num: 11, q: "Why did a port originally develop at Manham?", opts: ["A. It was safe from enemy attack.", "B. It was convenient for river transport.", "C. It had a good position on the sea coast."] },
                  { num: 12, q: "What caused Manham's sudden expansion during the Industrial Revolution?", opts: ["A. Discovery of new resources.", "B. Increase in demand for metals.", "C. New shipping technologies."] },
                  { num: 13, q: "Why did rocks have to be sent away from Manham to be processed?", opts: ["A. Shortage of fuel.", "B. Lack of local expertise.", "C. Transport was very cheap."] },
                  { num: 14, q: "What happened when the port declined in the twentieth century?", opts: ["A. The workers went away.", "B. Traditional skills were lost.", "C. Buildings were used for new purposes."] },
                  { num: 15, q: "What did the Manham Trust hope to do?", opts: ["A. Rebuild the port.", "B. Start new businesses.", "C. Restore the area as a historical site."] }
                ].map(item => (
                  <div key={item.num} className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xl font-bold mb-6 text-slate-900 font-serif flex gap-4">
                      <span className="font-black text-slate-500">{item.num}.</span> <span>{item.q}</span>
                    </p>
                    <div className="space-y-3 pl-10">
                      {item.opts.map(opt => {
                        const isSelected = answers[item.num] === opt;
                        const isActualCorrect = answerKey10_4[item.num] === opt;
                        
                        let labelClass = 'bg-white border-slate-200 hover:border-emerald-300';
                        if (isSubmitted) {
                          if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                          else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                        } else if (isSelected) {
                          labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm scale-[1.01]';
                        }

                        return (
                          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                            <div className="relative flex items-center justify-center">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSubmitted && isActualCorrect ? 'border-emerald-500 bg-emerald-500' :
                                isSubmitted && isSelected && !isActualCorrect ? 'border-rose-500 bg-rose-500' :
                                isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                              }`}>
                                {(isSelected || (isSubmitted && isActualCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className={`text-lg font-serif transition-colors ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                            <input type="radio" disabled={isSubmitted} className="hidden" checked={isSelected} onChange={() => handleRadioChange(item.num, opt)} />
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 16-20</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the table below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD ONLY</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-10 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <h4 className="font-black text-center text-xl mb-8 tracking-widest text-slate-900 uppercase">Tourist Attraction: Manham Port</h4>
                
                <table className="w-full text-left font-serif text-lg">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-slate-800">
                      <th className="py-4 px-6 font-bold">Attraction</th>
                      <th className="py-4 px-6 font-bold">Special features</th>
                      <th className="py-4 px-6 font-bold">Advice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-6 px-6 font-bold text-emerald-700">Copper mine</td>
                      <td className="py-6 px-6 text-slate-700">Travel on converted mining <br/><span className="font-bold text-slate-500 mr-2">16.</span> <InlineInput num="16" width="w-24" /></td>
                      <td className="py-6 px-6 text-slate-700">The mine is very <br/><span className="font-bold text-slate-500 mr-2">17.</span> <InlineInput num="17" width="w-24" /> and closed in.</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-white">
                      <td className="py-6 px-6 font-bold text-emerald-700">Village school</td>
                      <td className="py-6 px-6 text-slate-700">Display of <br/><span className="font-bold text-slate-500 mr-2">18.</span> <InlineInput num="18" width="w-32" /></td>
                      <td className="py-6 px-6 text-slate-700">Time your visit to coincide with a <br/><span className="font-bold text-slate-500 mr-2">19.</span> <InlineInput num="19" width="w-40" /></td>
                    </tr>
                    <tr>
                      <td className="py-6 px-6 font-bold text-emerald-700">The George</td>
                      <td className="py-6 px-6 text-slate-700"></td>
                      <td className="py-6 px-6 text-slate-700">Take care going down the <br/><span className="font-bold text-slate-500 mr-2">20.</span> <InlineInput num="20" width="w-32" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-fuchsia-500" />
              
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 21-22</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">TWO</strong> letters, A-E.</p>
              
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
                <p className="text-2xl font-bold mb-8 text-slate-900 font-serif flex gap-4">
                  <span className="font-black text-slate-500">21-22.</span> Which TWO skills did Laura improve as a result of her work placement?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                  {[
                    'A. Communication', 'B. Design', 'C. IT', 'D. Marketing', 'E. Organisation'
                  ].map((opt, i) => {
                    const isSelected = (answers['21_22'] || []).includes(opt);
                    const isActualCorrect = ['A. Communication', 'E. Organisation'].includes(opt);
                    
                    let labelClass = 'bg-white border-slate-200 hover:border-fuchsia-300';
                    if (isSubmitted) {
                      if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                      else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                    } else if (isSelected) {
                      labelClass = 'bg-fuchsia-50 border-fuchsia-500 shadow-sm scale-[1.02]';
                    }

                    return (
                      <label key={i} className={`flex items-center gap-5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                        <input type="checkbox" disabled={isSubmitted} checked={isSelected} onChange={() => handleCheckboxChange('21_22', 21, 22, opt)} className="hidden" />
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          isSubmitted && isActualCorrect ? 'bg-emerald-500 border-emerald-500' :
                          isSubmitted && isSelected && !isActualCorrect ? 'bg-rose-500 border-rose-500' :
                          isSelected ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-white border-slate-300'
                        }`}>
                          {(isSelected || (isSubmitted && isActualCorrect)) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-lg font-serif ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800 mt-12">Questions 23-24</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">TWO</strong> letters, A-E.</p>
              
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
                <p className="text-2xl font-bold mb-8 text-slate-900 font-serif flex gap-4">
                  <span className="font-black text-slate-500">23-24.</span> Which TWO immediate benefits did the company get from Laura's work?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                  {[
                    'A. New clients', 'B. Cost savings', 'C. An improved image', 'D. A larger workforce', 'E. Better software'
                  ].map((opt, i) => {
                    const isSelected = (answers['23_24'] || []).includes(opt);
                    const isActualCorrect = ['B. Cost savings', 'C. An improved image'].includes(opt);
                    
                    let labelClass = 'bg-white border-slate-200 hover:border-fuchsia-300';
                    if (isSubmitted) {
                      if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                      else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                    } else if (isSelected) {
                      labelClass = 'bg-fuchsia-50 border-fuchsia-500 shadow-sm scale-[1.02]';
                    }

                    return (
                      <label key={i} className={`flex items-center gap-5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                        <input type="checkbox" disabled={isSubmitted} checked={isSelected} onChange={() => handleCheckboxChange('23_24', 23, 24, opt)} className="hidden" />
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          isSubmitted && isActualCorrect ? 'bg-emerald-500 border-emerald-500' :
                          isSubmitted && isSelected && !isActualCorrect ? 'bg-rose-500 border-rose-500' :
                          isSelected ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-white border-slate-300'
                        }`}>
                          {(isSelected || (isSubmitted && isActualCorrect)) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-lg font-serif ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800 mt-12">Questions 25-30</h3>
              <p className="text-slate-500 mb-8 font-medium">What source of information should Tim use at each of the following stages of the work placement?</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                  <h4 className="font-black text-center text-lg mb-6 tracking-widest text-slate-900 uppercase">Sources of information</h4>
                  <ul className="grid grid-cols-1 gap-4 font-serif text-slate-700">
                    <li><span className="font-bold text-slate-900 mr-2">A</span> Company manager</li>
                    <li><span className="font-bold text-slate-900 mr-2">B</span> Company's personnel department</li>
                    <li><span className="font-bold text-slate-900 mr-2">C</span> Personal tutor</li>
                    <li><span className="font-bold text-slate-900 mr-2">D</span> Psychology department</li>
                    <li><span className="font-bold text-slate-900 mr-2">E</span> Mentor</li>
                    <li><span className="font-bold text-slate-900 mr-2">F</span> University careers officer</li>
                    <li><span className="font-bold text-slate-900 mr-2">G</span> Internet</li>
                  </ul>
                </div>

                <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-black text-lg mb-6 tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-4">Stages of work placement</h4>
                  <ul className="space-y-6 text-lg font-serif">
                    <li className="flex items-center justify-between"><span className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">25.</span> <span>Obtaining booklet</span></span> <InlineInput num="25" width="w-16" /></li>
                    <li className="flex items-center justify-between"><span className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">26.</span> <span>Discussing options</span></span> <InlineInput num="26" width="w-16" /></li>
                    <li className="flex items-center justify-between"><span className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">27.</span> <span>Getting updates</span></span> <InlineInput num="27" width="w-16" /></li>
                    <li className="flex items-center justify-between"><span className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">28.</span> <span>Responding to invitation for interview</span></span> <InlineInput num="28" width="w-16" /></li>
                    <li className="flex items-center justify-between"><span className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">29.</span> <span>Informing about outcome of interview</span></span> <InlineInput num="29" width="w-16" /></li>
                    <li className="flex items-center justify-between"><span className="flex items-center gap-4"><span className="font-bold text-slate-500 w-8 shrink-0">30.</span> <span>Requesting a reference</span></span> <InlineInput num="30" width="w-16" /></li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <Card className="bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
              
              <h3 className="text-3xl font-black mb-2 text-slate-800">Questions 31-33</h3>
              <p className="text-slate-500 mb-8 font-medium">Choose the correct letter, <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">A, B or C</strong>.</p>
              
              <div className="space-y-6 mb-10">
                {[
                  { num: 31, q: "The speaker views the public perception of nanotechnology as...", opts: ["A. overly positive.", "B. completely indifferent.", "C. mostly negative."] },
                  { num: 32, q: "What is the main issue regarding nano-particles?", opts: ["A. high production costs.", "B. concerns about safety.", "C. difficulty in manufacturing."] },
                  { num: 33, q: "What does the speaker predict about nanotechnology?", opts: ["A. immediate consumer adoption.", "B. decline in funding.", "C. future of research."] }
                ].map(item => (
                  <div key={item.num} className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xl font-bold mb-6 text-slate-900 font-serif flex gap-4">
                      <span className="font-black text-slate-500">{item.num}.</span> <span>{item.q}</span>
                    </p>
                    <div className="space-y-3 pl-10">
                      {item.opts.map(opt => {
                        const isSelected = answers[item.num] === opt;
                        const isActualCorrect = answerKey10_4[item.num] === opt;
                        
                        let labelClass = 'bg-white border-slate-200 hover:border-amber-300';
                        if (isSubmitted) {
                          if (isActualCorrect) labelClass = 'bg-emerald-50 border-emerald-500 shadow-sm';
                          else if (isSelected && !isActualCorrect) labelClass = 'bg-rose-50 border-rose-500 shadow-sm opacity-50';
                        } else if (isSelected) {
                          labelClass = 'bg-amber-50 border-amber-500 shadow-sm scale-[1.01]';
                        }

                        return (
                          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${labelClass}`}>
                            <div className="relative flex items-center justify-center">
                              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSubmitted && isActualCorrect ? 'border-emerald-500 bg-emerald-500' :
                                isSubmitted && isSelected && !isActualCorrect ? 'border-rose-500 bg-rose-500' :
                                isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-300 bg-white'
                              }`}>
                                {(isSelected || (isSubmitted && isActualCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                            <span className={`text-lg font-serif transition-colors ${isSelected || (isSubmitted && isActualCorrect) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                            <input type="radio" disabled={isSubmitted} className="hidden" checked={isSelected} onChange={() => handleRadioChange(item.num, opt)} />
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-3xl font-black mb-2 text-slate-800 mt-12">Questions 34-40</h3>
              <p className="text-slate-500 mb-8 font-medium">Complete the notes below. Write <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">ONE WORD ONLY</strong> for each answer.</p>
              
              <div className="bg-[#f8fafc] p-10 rounded-2xl border border-slate-200 text-lg leading-loose font-serif text-slate-700 shadow-sm">
                <h4 className="font-black text-center text-3xl mb-10 tracking-widest font-sans text-slate-900 uppercase">Nanotechnology</h4>
                
                <div className="space-y-10">
                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Transportation</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">34.</span> <span>Development of stronger <InlineInput num="34" width="w-40" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">35.</span> <span>Lighter planes for travel in <InlineInput num="35" width="w-40" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Technology</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">36.</span> <span>Improvements in computers (size, speed, and <InlineInput num="36" width="w-40" />)</span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Energy</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">37.</span> <span>Reducing the cost of <InlineInput num="37" width="w-40" /> cells</span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">38.</span> <span>Less dependence on <InlineInput num="38" width="w-40" /></span></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-black text-amber-600 font-sans text-xl mb-4 border-b border-amber-200 pb-2">Environment</h5>
                    <ul className="list-disc ml-6 space-y-4 marker:text-amber-500">
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">39.</span> <span>Potential uses for nano-robots to eliminate <InlineInput num="39" width="w-40" /></span></li>
                      <li className="flex items-center"><span className="font-bold text-slate-500 w-8 shrink-0">40.</span> <span>More <InlineInput num="40" width="w-40" /> need to be done.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  const renderSectionContent = () => {
    if (currentBook === 10 && currentTest === 2) return renderTest2();
    if (currentBook === 10 && currentTest === 3) return renderTest3();
    if (currentBook === 10 && currentTest === 4) return renderTest4();
    return renderTest1(); 
  }

  const getVideoId = () => {
    if (currentBook === 10 && currentTest === 2) return "nh5Ysyg2Mdw";
    if (currentBook === 10 && currentTest === 3) return "baF-agivhF8";
    if (currentBook === 10 && currentTest === 4) return "jnvpv3PZmz4";
    return "GlPAqNZmuaw"; 
  }

  const renderExamUI = () => (
    <ExamContext.Provider value={{ answers, handleAnswerChange, isSubmitted, currentBook, currentTest }}>
      <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-slate-900 animate-in fade-in duration-500">
      
      <div className="absolute opacity-0 pointer-events-none -z-50">
        <YouTube videoId={getVideoId()} opts={opts} onReady={onReady} onEnd={() => setIsPlaying(false)} />
      </div>

      {/* Top Sticky Audio Player Bar - Clean White */}
      <div className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between gap-4 md:gap-8">
          
          <div className="flex items-center gap-3 md:gap-5 shrink-0 group">
            <Button 
              variant="ghost" 
              onClick={() => { setStep('selectTest'); setIsPlaying(false); if(player) player.pauseVideo(); }} 
              className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-slate-600" />
            </Button>
            <div className="hidden lg:block">
              <h1 className="text-xl md:text-2xl font-black leading-tight text-slate-900 whitespace-nowrap">Cambridge {currentBook}</h1>
              <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Listening Test {currentTest}</p>
            </div>
          </div>

          <div className="flex-1 max-w-4xl min-w-0 flex items-center gap-3 md:gap-8 bg-slate-100/80 rounded-full px-4 md:px-8 py-2 md:py-3 border border-slate-200 shadow-inner">
            <Button 
              size="icon" onClick={togglePlay} disabled={!isReady || isSubmitted}
              className={`h-10 w-10 md:h-14 md:w-14 rounded-full shrink-0 transition-all duration-300 ${isPlaying ? 'bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md border-0'} disabled:opacity-50`}
            >
              {!isReady ? <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin text-slate-400" /> : isPlaying ? <Pause className="h-5 w-5 md:h-6 md:w-6" /> : <Play className="h-5 w-5 md:h-6 md:w-6 ml-1" />}
            </Button>
            
            <div className="flex-1 flex items-center gap-2 md:gap-5 min-w-0">
              <span className="hidden sm:block text-xs md:text-sm font-black text-slate-700 w-10 md:w-12 text-right shrink-0">{formatTime(currentTime)}</span>
              <div className="flex-1 flex items-center gap-[2px] md:gap-[3px] h-6 md:h-10 min-w-0 overflow-hidden">
                {[...Array(80)].map((_, i) => {
                  const isActive = i < (currentTime / totalTime) * 80;
                  const height = isPlaying ? Math.max(15, Math.random() * 100) : isActive ? 40 : 15;
                  return (
                    <div key={i} className={`flex-1 rounded-full transition-all duration-200 ${isActive ? 'bg-blue-500' : 'bg-slate-300'}`} style={{ height: `${height}%` }} />
                  )
                })}
              </div>
              <span className="hidden sm:block text-xs md:text-sm font-black text-slate-500 w-10 md:w-12 shrink-0">{isReady ? formatTime(totalTime) : "--:--"}</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 md:gap-4">
            <div className="hidden xl:flex bg-white border border-slate-200 rounded-xl px-4 md:px-5 py-2 md:py-3 font-mono text-lg md:text-2xl font-black text-slate-800 shadow-sm items-center gap-3">
              Time: 40:00
            </div>
            {!isSubmitted ? (
              <Button onClick={submitExam} className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-transform text-white font-black px-4 md:px-8 h-10 md:h-14 rounded-xl shadow-md text-sm md:text-lg">
                Submit <span className="hidden sm:inline">&nbsp;Test</span>
              </Button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 md:px-6 py-2 md:py-3 font-black text-lg md:text-2xl shadow-sm flex items-center gap-2 md:gap-3">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                Score: {score}/40
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1600px] w-full mx-auto p-6 flex flex-col gap-10 mt-6 relative z-10">
        
        <div className="flex-1 w-full max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10 bg-white p-3 rounded-full border border-slate-200 shadow-sm inline-flex">
            {[1, 2, 3, 4].map(sec => (
              <button
                key={sec}
                onClick={() => setCurrentSection(sec)}
                className={`px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 ${currentSection === sec ? 'bg-slate-900 text-white shadow-md transform -translate-y-1' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                Part {sec}
              </button>
            ))}
          </div>

          {renderSectionContent()}

          <div className="flex justify-between items-center mt-12 mb-12 pt-8 border-t border-slate-200">
            <Button 
              variant="outline" size="lg" 
              onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
              disabled={currentSection === 1}
              className="bg-white border-slate-300 hover:bg-slate-50 text-slate-700 rounded-2xl px-8 h-14 font-bold text-lg shadow-sm"
            >
              <ChevronLeft className="h-6 w-6 mr-2" /> Previous
            </Button>
            <Button 
              size="lg" 
              onClick={() => setCurrentSection(prev => Math.min(4, prev + 1))}
              disabled={currentSection === 4}
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform border-0 shadow-md rounded-2xl px-12 h-14 font-black text-lg text-white uppercase tracking-widest"
            >
              Next <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </div>
    </ExamContext.Provider>
  )

  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      {step === 'selectBook' && renderBookSelection()}
      {step === 'selectTest' && renderTestSelection()}
      {step === 'takeTest' && renderExamUI()}
    </div>
  )
}
