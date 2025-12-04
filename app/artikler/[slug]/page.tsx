"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Article } from "@/lib/types"
import Image from "next/image"

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch("/api/articles")
        const articles: Article[] = await res.json()
        const found = articles.find((a) => a.slug === slug)
        setArticle(found || null)
      } catch (error) {
        console.error("Failed to load article:", error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Laster...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Artikkelen ble ikke funnet</h1>
          <Link href="/artikler" className="text-primary hover:underline">
            Tilbake til artikler
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/artikler"
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Tilbake til artikler
          </Link>
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-200">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(article.date).toLocaleDateString("no-NO")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              {article.imageUrl && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                {article.content.split("\n").map((paragraph, index) => {
                  if (paragraph.trim() === "") return null
                  
                  // Handle markdown bold
                  const parts = paragraph.split(/(\*\*.*?\*\*)/)
                  const renderedParts = parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={i}>
                          {part.slice(2, -2)}
                        </strong>
                      )
                    }
                    return part
                  })

                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {renderedParts}
                    </p>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/artikler"
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
            >
              <ArrowLeft className="mr-2" size={20} />
              Se alle artikler
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
