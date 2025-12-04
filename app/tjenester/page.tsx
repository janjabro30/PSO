"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const packages = [
  {
    name: "Total",
    description: "Komplett regnskapspakke for bedrifter som vil overlate alt til oss",
    color: "border-primary",
    bgColor: "bg-primary/5",
    features: [
      "Komplett regnskap og bokføring",
      "Årsregnskap og rapportering",
      "Budsjett og prognoser",
      "Skatteplanlegging og rådgivning",
      "Løpende oppfølging",
      "Bilagsbehandling",
      "Mva-rapportering",
      "Årsoppgjør",
      "Revisjonshjelp",
      "Dedikert regnskapsfører",
    ],
  },
  {
    name: "Basic",
    description: "Enkel og kostnadseffektiv løsning for små bedrifter",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    features: [
      "Enkel bokføring",
      "Løpende rapportering",
      "Mva-rapporter",
      "Årsoppgjør",
      "E-post support",
      "Grunnleggende rådgivning",
      "Bilagsscanning",
      "Standardrapporter",
    ],
  },
  {
    name: "Workshop",
    description: "Strategisk rådgivning og workshops for vekstbedrifter",
    color: "border-accent",
    bgColor: "bg-orange-50",
    features: [
      "Strategiske workshops",
      "Forretningsutvikling",
      "Økonomisk analyse",
      "Vekstplanlegging",
      "Dedikert konsulent",
      "Kvartalsvise møter",
      "Likviditetsanalyse",
      "Investeringsvurdering",
      "Scenarioplanlegging",
      "Benchmarking",
    ],
  },
  {
    name: "Pluss",
    description: "Utvidet tjeneste med personlig rådgiver og fakturering",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    features: [
      "Fakturering og innkreving",
      "Personlig rådgiver",
      "Prioritert support",
      "Månedlige møter",
      "Tilpassede rapporter",
      "Budsjettkontroll",
      "Regnskapssystem oppsett",
      "Personaladministrasjon",
      "Lønn og rapportering",
    ],
  },
]

export default function TjenesterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-primary to-slate-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Våre Tjenester
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Vi tilbyr fire ulike pakker skreddersydd for bedrifter av alle størrelser. 
            Fra enkelt regnskap til full strategisk rådgivning.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <Card className={`border-2 ${pkg.color} ${pkg.bgColor} hover:shadow-2xl transition-all duration-300 h-full backdrop-blur-sm bg-white/80`}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-lg text-gray-700">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.03 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Link href="/kontakt">
                      <Button className="w-full hover:scale-105 transition-transform" size="lg">
                        <Mail className="mr-2" size={20} />
                        Kontakt oss for pris
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-teal-700 to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Usikker på hvilken pakke som passer?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Ta vår quiz eller kontakt oss direkte for en uforpliktende samtale
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/#quiz">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:scale-105 transition-transform">
                Ta quiz <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all hover:scale-105 backdrop-blur-sm bg-white/10">
                Kontakt oss
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
