"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, ArrowRight, Calculator, TrendingUp, Users, Zap, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const packages = [
  {
    name: "Basic",
    description: "Enkel og kostnadseffektiv løsning for små bedrifter",
    icon: Calculator,
    color: "border-slate-300",
    bgGradient: "from-slate-50 to-white",
    accentColor: "text-slate-600",
    iconBgColor: "bg-slate-600/10",
    buttonColor: "bg-slate-600 hover:bg-slate-700",
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
    isPopular: false,
  },
  {
    name: "Pluss",
    description: "Utvidet tjeneste med personlig rådgiver og fakturering",
    icon: TrendingUp,
    color: "border-teal-300",
    bgGradient: "from-teal-50 to-white",
    accentColor: "text-teal-600",
    iconBgColor: "bg-teal-600/10",
    buttonColor: "bg-teal-600 hover:bg-teal-700",
    features: [
      "Alt i Basic pakken",
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
    isPopular: false,
  },
  {
    name: "Total",
    description: "Komplett regnskapspakke for bedrifter som vil overlate alt til oss",
    icon: Zap,
    color: "border-primary",
    bgGradient: "from-primary/10 to-teal-50/50",
    accentColor: "text-primary",
    iconBgColor: "bg-primary/10",
    buttonColor: "bg-primary hover:bg-primary/90",
    features: [
      "Alt i Pluss pakken",
      "Komplett regnskap og bokføring",
      "Årsregnskap og rapportering",
      "Budsjett og prognoser",
      "Skatteplanlegging og rådgivning",
      "Løpende oppfølging",
      "Bilagsbehandling",
      "Revisjonshjelp",
      "Dedikert regnskapsfører",
      "Prioritert telefonsupport",
    ],
    isPopular: true,
  },
  {
    name: "Workshop",
    description: "Strategisk rådgivning og workshops for vekstbedrifter",
    icon: Users,
    color: "border-orange-300",
    bgGradient: "from-orange-50 to-white",
    accentColor: "text-orange-600",
    iconBgColor: "bg-orange-600/10",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
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
    isPopular: false,
  },
]

interface FeatureListProps {
  features: string[];
  accentColor: string;
  bgColor: string;
  maxVisible?: number;
}

function FeatureList({ features, accentColor, bgColor, maxVisible = 6 }: FeatureListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedFeatures = showAll ? features : features.slice(0, maxVisible);
  const hasMore = features.length > maxVisible;

  return (
    <div>
      <ul className="space-y-3 mb-6">
        <AnimatePresence>
          {displayedFeatures.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-start gap-3 group"
            >
              <motion.div
                className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${bgColor}`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Check className={`w-3 h-3 ${accentColor}`} />
              </motion.div>
              <span className="text-sm leading-relaxed group-hover:translate-x-1 transition-transform">
                {feature}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className={`text-sm font-medium ${accentColor} hover:underline flex items-center gap-1 mb-4`}
        >
          {showAll ? 'Vis mindre' : `Se alle ${features.length} funksjoner`}
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
}

export default function TjenesterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-primary to-slate-800 text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4"
          >
            Våre Tjenester
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4"
          >
            Vi tilbyr fire ulike pakker skreddersydd for bedrifter av alle størrelser. 
            Fra enkelt regnskap til full strategisk rådgivning.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={pkg.isPopular ? "lg:col-span-2" : ""}
                >
                  <motion.div
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="h-full"
                  >
                    <Card className={`
                      relative overflow-hidden border-2 ${pkg.color} 
                      bg-gradient-to-br ${pkg.bgGradient}
                      hover:shadow-2xl transition-all duration-500 h-full
                      backdrop-blur-sm
                      ${pkg.isPopular ? 'shadow-xl ring-2 ring-primary/20' : 'shadow-md'}
                    `}>
                      {/* Badge for Popular */}
                      {pkg.isPopular && (
                        <div className="absolute top-0 right-0 z-10">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            <Badge className="rounded-tl-none rounded-br-none bg-primary text-white px-4 py-1.5 text-sm font-semibold shadow-lg">
                              ⭐ ANBEFALT
                            </Badge>
                          </motion.div>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
                      
                      <div className={`relative ${pkg.isPopular ? 'lg:flex lg:gap-8' : ''}`}>
                        <CardHeader className={`pb-4 sm:pb-6 ${pkg.isPopular ? 'lg:w-1/3' : ''}`}>
                          {/* Icon */}
                          <motion.div 
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${pkg.bgGradient} flex items-center justify-center mb-3 sm:mb-4 shadow-lg border-2 ${pkg.color}`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${pkg.accentColor}`} />
                          </motion.div>

                          <CardTitle className={`text-2xl sm:text-3xl mb-2 sm:mb-3 ${pkg.accentColor}`}>
                            {pkg.name}
                          </CardTitle>
                          <CardDescription className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {pkg.description}
                          </CardDescription>

                          {/* Divider */}
                          <div className={`h-1 w-12 sm:w-16 ${pkg.accentColor.replace('text-', 'bg-')} rounded-full mt-3 sm:mt-4`} />
                        </CardHeader>

                        <CardContent className={pkg.isPopular ? 'lg:w-2/3' : ''}>
                          <FeatureList 
                            features={pkg.features} 
                            accentColor={pkg.accentColor}
                            bgColor={pkg.iconBgColor}
                            maxVisible={pkg.isPopular ? 8 : 6}
                          />
                          
                          <Link href="/kontakt">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button 
                                className={`w-full ${pkg.buttonColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                                size="lg"
                              >
                                <Mail className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                                Kontakt oss for pris
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                              </Button>
                            </motion.div>
                          </Link>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white px-4"
          >
            Usikker på hvilken pakke som passer?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-4"
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
            <Link href="/#quiz" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-white text-primary hover:bg-gray-100 shadow-lg hover:scale-105 transition-transform">
                Ta quiz <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/kontakt" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[44px] border-2 border-white text-white hover:bg-white hover:text-primary transition-all hover:scale-105 backdrop-blur-sm bg-white/10">
                Kontakt oss
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
