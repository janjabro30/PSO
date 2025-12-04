"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    name: "Total",
    description: "Komplett regnskapspakke",
    color: "border-primary",
    gradient: "from-primary/10 to-teal-500/10",
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
    gradient: "from-blue-500/10 to-cyan-500/10",
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
    gradient: "from-accent/10 to-orange-500/10",
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
    gradient: "from-purple-500/10 to-pink-500/10",
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
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent px-4">
            Våre Tjenester
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Vi tilbyr fire ulike pakker tilpasset bedrifter av alle størrelser
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className={`border-2 ${service.color} hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br ${service.gradient} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold">{service.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/tjenester" className="w-full">
                    <Button className="w-full min-h-[44px] hover:scale-105 transition-transform" variant="outline">
                      Les mer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
