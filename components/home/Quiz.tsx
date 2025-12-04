"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, CheckCircle2, Users, Briefcase, Clock, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Answer = {
  text: string
  score: { total: number; basic: number; workshop: number; pluss: number }
}

type Question = {
  id: number
  question: string
  answers: Answer[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "Hvor mange ansatte har bedriften din?",
    answers: [
      { text: "Kun meg (enkeltpersonforetak)", score: { total: 0, basic: 2, workshop: 0, pluss: 1 } },
      { text: "1-5 ansatte", score: { total: 1, basic: 1, workshop: 1, pluss: 1 } },
      { text: "6-20 ansatte", score: { total: 2, basic: 0, workshop: 1, pluss: 1 } },
      { text: "20+ ansatte", score: { total: 3, basic: 0, workshop: 2, pluss: 0 } },
    ],
  },
  {
    id: 2,
    question: "Hva trenger du mest hjelp med?",
    answers: [
      { text: "Komplett regnskapshjelp", score: { total: 3, basic: 0, workshop: 0, pluss: 0 } },
      { text: "Enkel bokføring og rapportering", score: { total: 0, basic: 3, workshop: 0, pluss: 0 } },
      { text: "Strategisk rådgivning", score: { total: 0, basic: 0, workshop: 3, pluss: 0 } },
      { text: "Fakturering og personlig rådgiver", score: { total: 0, basic: 0, workshop: 0, pluss: 3 } },
    ],
  },
  {
    id: 3,
    question: "Hvor mye tid bruker du på regnskap i dag?",
    answers: [
      { text: "Flere dager i måneden", score: { total: 2, basic: 1, workshop: 1, pluss: 1 } },
      { text: "Noen timer i måneden", score: { total: 1, basic: 2, workshop: 1, pluss: 1 } },
      { text: "Mindre enn en time", score: { total: 0, basic: 1, workshop: 0, pluss: 2 } },
      { text: "Ingen tid (outsourcer alt)", score: { total: 3, basic: 0, workshop: 2, pluss: 0 } },
    ],
  },
  {
    id: 4,
    question: "Hva er viktigst for deg?",
    answers: [
      { text: "Komplett løsning uten bekymringer", score: { total: 3, basic: 0, workshop: 1, pluss: 0 } },
      { text: "Kostnadseffektivitet", score: { total: 0, basic: 3, workshop: 0, pluss: 1 } },
      { text: "Strategisk vekst", score: { total: 1, basic: 0, workshop: 3, pluss: 0 } },
      { text: "Personlig oppfølging", score: { total: 0, basic: 0, workshop: 1, pluss: 3 } },
    ],
  },
]

const packages = {
  total: {
    name: "Total",
    description: "Komplett regnskapstjeneste for bedrifter som vil overlate alt til oss",
    color: "bg-primary",
  },
  basic: {
    name: "Basic",
    description: "Enkel og kostnadseffektiv løsning for små bedrifter",
    color: "bg-blue-600",
  },
  workshop: {
    name: "Workshop",
    description: "Strategisk rådgivning og workshops for vekstbedrifter",
    color: "bg-accent",
  },
  pluss: {
    name: "Pluss",
    description: "Utvidet tjeneste med personlig rådgiver og fakturering",
    color: "bg-purple-600",
  },
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer

    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const calculateResult = () => {
    const scores = { total: 0, basic: 0, workshop: 0, pluss: 0 }

    answers.forEach((answerIndex, questionIndex) => {
      const answer = questions[questionIndex].answers[answerIndex]
      scores.total += answer.score.total
      scores.basic += answer.score.basic
      scores.workshop += answer.score.workshop
      scores.pluss += answer.score.pluss
    })

    const maxScore = Math.max(scores.total, scores.basic, scores.workshop, scores.pluss)
    const recommended = Object.entries(scores).find(([, score]) => score === maxScore)?.[0] as keyof typeof packages

    return recommended || "total"
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setSelectedAnswer(null)
  }

  if (showResult) {
    const recommended = calculateResult()
    const pkg = packages[recommended]

    return (
      <section id="quiz" className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="relative inline-block mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-primary to-teal-400 rounded-full blur-xl opacity-50"
                    />
                    <CheckCircle2 className="relative w-24 h-24 text-primary mx-auto" />
                  </div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent"
                >
                  Vi anbefaler {pkg.name}!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 text-lg mb-8"
                >
                  {pkg.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button 
                    onClick={resetQuiz} 
                    variant="outline"
                    className="hover:scale-105 transition-transform"
                  >
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                    >
                      🔄
                    </motion.span>
                    <span className="ml-2">Ta quiz på nytt</span>
                  </Button>
                  <a href="/tjenester">
                    <Button className="hover:scale-105 transition-transform">
                      Se alle tjenester <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </a>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const questionIcons = [Users, Briefcase, Clock, Target]
  const QuestionIcon = questionIcons[currentQuestion] || Users

  return (
    <section id="quiz" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
            Finn din ideelle pakke
          </h2>
          <p className="text-gray-600 text-lg">Svar på 4 enkle spørsmål for å finne den beste løsningen</p>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
            <span>Spørsmål {currentQuestion + 1} av {questions.length}</span>
            <span className="text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-teal-500 to-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-2 border-gray-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <QuestionIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold flex-1">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                <div className="space-y-3 mb-8">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                        selectedAnswer === index
                          ? "border-primary bg-gradient-to-r from-primary/10 to-teal-500/10 shadow-lg"
                          : "border-gray-200 hover:border-primary/50 hover:shadow-md bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{answer.text}</span>
                        {selectedAnswer === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          </motion.div>
                        )}
                      </div>
                      {selectedAnswer === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    disabled={currentQuestion === 0}
                    className="hover:scale-105 transition-transform disabled:hover:scale-100"
                  >
                    <ArrowLeft className="mr-2" size={20} />
                    Forrige
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="bg-primary hover:bg-primary-dark disabled:opacity-50 hover:scale-105 transition-transform disabled:hover:scale-100"
                  >
                    {currentQuestion === questions.length - 1 ? "Se resultat" : "Neste"}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
