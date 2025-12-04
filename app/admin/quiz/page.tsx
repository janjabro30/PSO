"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";
import type { QuizData } from "@/lib/types";

export default function QuizPage() {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    const res = await fetch("/api/admin/quiz");
    const data = await res.json();
    setQuiz(data);
  };

  const handleSave = async () => {
    if (!quiz) return;

    await fetch("/api/admin/quiz", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    });

    alert("Quiz lagret!");
    setEditingQuestion(null);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    if (!quiz) return;
    const newQuestions = [...quiz.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    field: string,
    value: string | number
  ) => {
    if (!quiz) return;
    const newQuestions = [...quiz.questions];
    const newAnswers = [...newQuestions[questionIndex].answers];
    
    if (field === "text") {
      newAnswers[answerIndex] = { ...newAnswers[answerIndex], text: value as string };
    } else {
      // Update score fields
      newAnswers[answerIndex] = {
        ...newAnswers[answerIndex],
        score: { ...newAnswers[answerIndex].score, [field]: value as number },
      };
    }
    
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], answers: newAnswers };
    setQuiz({ ...quiz, questions: newQuestions });
  };

  if (!quiz) {
    return <div>Laster...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quiz Editor</h1>
          <p className="text-gray-500 mt-2">Administrer quiz-spørsmål og poengsystem</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Lagre endringer
        </Button>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, qIndex) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Spørsmål {question.id}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setEditingQuestion(editingQuestion === qIndex ? null : qIndex)
                  }
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Spørsmål</Label>
                  <Input
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(qIndex, "question", e.target.value)
                    }
                    disabled={editingQuestion !== qIndex}
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Svaralternativer og poeng</Label>
                  <div className="space-y-4">
                    {question.answers.map((answer, aIndex) => (
                      <Card key={aIndex} className="bg-gray-50">
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Svar {aIndex + 1}</Label>
                              <Input
                                value={answer.text}
                                onChange={(e) =>
                                  updateAnswer(qIndex, aIndex, "text", e.target.value)
                                }
                                disabled={editingQuestion !== qIndex}
                              />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <div>
                                <Label className="text-xs">Total</Label>
                                <Input
                                  type="number"
                                  value={answer.score.total}
                                  onChange={(e) =>
                                    updateAnswer(
                                      qIndex,
                                      aIndex,
                                      "total",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  disabled={editingQuestion !== qIndex}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Basic</Label>
                                <Input
                                  type="number"
                                  value={answer.score.basic}
                                  onChange={(e) =>
                                    updateAnswer(
                                      qIndex,
                                      aIndex,
                                      "basic",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  disabled={editingQuestion !== qIndex}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Workshop</Label>
                                <Input
                                  type="number"
                                  value={answer.score.workshop}
                                  onChange={(e) =>
                                    updateAnswer(
                                      qIndex,
                                      aIndex,
                                      "workshop",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  disabled={editingQuestion !== qIndex}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Pluss</Label>
                                <Input
                                  type="number"
                                  value={answer.score.pluss}
                                  onChange={(e) =>
                                    updateAnswer(
                                      qIndex,
                                      aIndex,
                                      "pluss",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  disabled={editingQuestion !== qIndex}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Hvordan poeng fungerer:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• Hvert svar gir poeng til de fire tjenestepakkene: Total, Basic, Workshop, og Pluss</li>
          <li>• Pakken med høyest total poengsum anbefales til brukeren</li>
          <li>• Juster poengsummene for å påvirke hvilken pakke som anbefales</li>
        </ul>
      </div>
    </div>
  );
}
