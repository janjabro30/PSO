"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Article } from "@/lib/types"

export default function ArticlesPreview() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(data.slice(0, 3)) // Only show latest 3
      } catch (error) {
        console.error("Failed to load articles:", error)
      }
    }
    loadArticles()
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
            Siste Artikler
          </h2>
          <p className="text-gray-600 text-lg">
            Hold deg oppdatert med våre fagartikler og nyheter
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/artikler/${article.slug}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('no-NO')}</span>
                      <span className="ml-auto bg-gradient-to-r from-primary/10 to-teal-500/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                        {article.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-medium">
                      Les mer <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/artikler">
            <Button size="lg" className="hover:scale-105 transition-transform shadow-lg">
              Se alle artikler <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
