"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const services = [
  {
    name: "Total",
    description: "Komplett regnskapspakke",
    color: "border-primary",
    features: [
      "Komplett regnskap",
      "Årsregnskap og rapportering",
      "Budsjett og prognoser",
      "Skatteplanlegging",
      "Løpende rådgivning",
    ],
  },
  {
    name: "Basic",
    description: "Enkel bokføring",
    color: "border-blue-500",
    features: [
      "Enkel bokføring",
      "Løpende rapportering",
      "Mva-rapporter",
      "E-post support",
      "Årsoppgjør",
    ],
  },
  {
    name: "Workshop",
    description: "Strategisk rådgivning",
    color: "border-accent",
    features: [
      "Strategiske workshops",
      "Forretningsutvkling",
      "Økonomisk analyse",
      "Vekstplanlegging",
      "Dedikert konsulent",
    ],
  },
  {
    name: "Pluss",
    description: "Utvidet tjeneste",
    color: "border-purple-500",
    features: [
      "Fakturering",
      "Personlig rådgiver",
      "Prioritert support",
      "Månedlige møter",
      "Tilpassede rapporter",
    ],
  },
]

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Våre Tjenester</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Vi tilbyr fire ulike pakker tilpasset bedrifter av alle størrelser
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className={`border-2 ${service.color} hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <CardTitle className="text-2xl">{service.name}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tjenester">
                  <Button className="w-full" variant="outline">Les mer</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
