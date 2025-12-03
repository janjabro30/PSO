"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

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
      <section id="quiz" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-primary">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Vi anbefaler {pkg.name}!</h2>
              <p className="text-gray-600 text-lg mb-6">{pkg.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  Ta quiz på nytt
                </Button>
                <a href="/tjenester">
                  <Button>Se alle tjenester</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <section id="quiz" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Finn din ideelle pakke</h2>
          <p className="text-gray-600">Svar på 4 enkle spørsmål for å finne den beste løsningen</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Spørsmål {currentQuestion + 1} av {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  {answer.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2" size={20} />
                Forrige
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1 ? "Se resultat" : "Neste"}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
