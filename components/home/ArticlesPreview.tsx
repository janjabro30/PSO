"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    title: "5 tips for bedre økonomistyring",
    excerpt: "Lær hvordan du kan forbedre din bedrifts økonomistyring med disse enkle tipsene.",
    date: "2024-11-15",
    category: "Økonomi",
  },
  {
    title: "Skatteendringer 2025",
    excerpt: "Alt du trenger å vite om de nye skatteendringene som kommer neste år.",
    date: "2024-11-10",
    category: "Skatt",
  },
  {
    title: "Digitaliser regnskapet ditt",
    excerpt: "Hvorfor digitalisering av regnskap er nøkkelen til suksess i moderne bedrifter.",
    date: "2024-11-05",
    category: "Teknologi",
  },
]

export default function ArticlesPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Siste Artikler</h2>
          <p className="text-gray-600 text-lg">
            Hold deg oppdatert med våre fagartikler og nyheter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString('no-NO')}</span>
                  <span className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="text-primary p-0 h-auto">
                  Les mer <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/artikler">
            <Button size="lg">
              Se alle artikler <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
