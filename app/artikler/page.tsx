"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Tag } from "lucide-react"

const categories = ["Alle", "Økonomi", "Skatt", "Teknologi", "Rådgivning", "Lovverk"]

const articles = [
  {
    id: 1,
    title: "5 tips for bedre økonomistyring",
    excerpt: "Lær hvordan du kan forbedre din bedrifts økonomistyring med disse enkle tipsene for bedre kontroll og oversikt.",
    date: "2024-11-15",
    category: "Økonomi",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Skatteendringer 2025",
    excerpt: "Alt du trenger å vite om de nye skatteendringene som kommer neste år. Vi guider deg gjennom det viktigste.",
    date: "2024-11-10",
    category: "Skatt",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Digitaliser regnskapet ditt",
    excerpt: "Hvorfor digitalisering av regnskap er nøkkelen til suksess i moderne bedrifter. Les om fordelene.",
    date: "2024-11-05",
    category: "Teknologi",
    readTime: "6 min",
  },
  {
    id: 4,
    title: "MVA-endringer i 2024",
    excerpt: "Oversikt over nye MVA-regler og hvordan disse påvirker din bedrift. Viktig informasjon for alle.",
    date: "2024-10-28",
    category: "Skatt",
    readTime: "7 min",
  },
  {
    id: 5,
    title: "Lønnsomhetsanalyse for små bedrifter",
    excerpt: "Hvordan gjennomføre en effektiv lønnsomhetsanalyse og bruke resultatene til bedre beslutninger.",
    date: "2024-10-20",
    category: "Økonomi",
    readTime: "10 min",
  },
  {
    id: 6,
    title: "Regnskapsplikt: Hva må du levere?",
    excerpt: "En komplett guide til regnskapsplikt i Norge. Forstå dine forpliktelser og frister.",
    date: "2024-10-15",
    category: "Lovverk",
    readTime: "9 min",
  },
  {
    id: 7,
    title: "Effektiv fakturahåndtering",
    excerpt: "Beste praksis for fakturering og oppfølging av kundefordringer for bedre likviditet.",
    date: "2024-10-08",
    category: "Rådgivning",
    readTime: "6 min",
  },
  {
    id: 8,
    title: "Årsregnskap: En veiledning",
    excerpt: "Alt du trenger å vite om årsregnskap - fra forberedelse til innlevering og hva som er viktig.",
    date: "2024-10-01",
    category: "Lovverk",
    readTime: "12 min",
  },
]

export default function ArtiklerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Alle")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "Alle" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Artikler og Nyheter</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Hold deg oppdatert med fagartikler, tips og nyheter om regnskap, skatt og økonomi
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Søk i artikler..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Ingen artikler funnet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('no-NO')}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="text-primary font-medium">{article.category}</span>
                      </div>
                      <Button variant="ghost" className="text-primary p-0 h-auto">
                        Les mer →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Meld deg på vårt nyhetsbrev</h2>
          <p className="text-xl mb-8">
            Få de nyeste artiklene og viktige oppdateringer direkte i innboksen din
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Din e-postadresse"
              className="bg-white text-dark"
            />
            <Button className="bg-white text-primary hover:bg-gray-100">
              Meld deg på
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
