"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Award, TrendingUp, MapPin, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import type { TeamMember } from "@/lib/types"

const stats = [
  {
    icon: Building2,
    value: "2004",
    label: "Etablert",
  },
  {
    icon: Users,
    value: "8",
    label: "Ansatte",
  },
  {
    icon: Award,
    value: "4",
    label: "Autoriserte regnskapsførere",
  },
  {
    icon: TrendingUp,
    value: "500+",
    label: "Fornøyde kunder",
  },
]



const offices = [
  {
    name: "Spydeberg",
    address: "Wilses vei 3, 1820 Spydeberg",
    phone: "46 91 19 11",
    email: "post@psoregnskap.no",
  },
  {
    name: "Oslo",
    address: "Brynsveien 18, 0667 Oslo",
    phone: "46 91 19 11",
    email: "post@psoregnskap.no",
  },
]

export default function OmOssPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(console.error);
  }, []);

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
            Om PSO Regnskap AS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4"
          >
            Profesjonell regnskapshjelp siden 2004. Vi er et dedikert team av 8 medarbeidere 
            med erfaring og kompetanse til å hjelpe din bedrift med alt av regnskapstjenester.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <motion.div 
                    className="flex justify-center mb-3 sm:mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-full border-2 border-primary/20">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent px-4"
          >
            Vår Historie
          </motion.h2>
          <div className="prose prose-lg max-w-none">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-700 mb-4 text-lg"
            >
              PSO Regnskap AS ble etablert i 2004 med en klar visjon: å tilby profesjonelle 
              regnskapstjenester tilpasset hver enkelt kunde. Gjennom årene har vi vokst fra 
              en liten oppstart til et veletablert regnskapsfirma med kontorer i både Spydeberg 
              og Oslo.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-700 mb-4 text-lg"
            >
              Vi er stolte av vårt team på 8 dedikerte medarbeidere, inkludert 4 autoriserte 
              regnskapsførere. Vår erfaring spenner over ulike bransjer og bedriftsstørrelser, 
              fra enkeltpersonforetak til større selskaper.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 text-lg"
            >
              Vi holder oss oppdatert på nye regler og regelverk, og investerer kontinuerlig i 
              ny teknologi for å kunne tilby de beste løsningene til våre kunder. Vårt mål er 
              å være mer enn bare en regnskapsfører - vi ønsker å være din strategiske partner 
              i din bedrifts økonomiske reise.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent px-4"
          >
            Møt Teamet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-8 sm:mb-12 px-4"
          >
            Våre dyktige medarbeidere er klar til å hjelpe deg
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-24 h-24 bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-primary/20"
                    >
                      <Users className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                    <p className="text-primary text-sm text-center mb-2 font-medium">{member.title}</p>
                    <p className="text-gray-600 text-sm text-center">{member.office}</p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-1">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${member.email}`} className="hover:text-primary">
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent px-4"
          >
            Våre Kontorer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-8 sm:mb-12 px-4"
          >
            Vi har kontorer i både Spydeberg og Oslo
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100">
                  <div className="h-48 bg-gradient-to-br from-primary via-teal-600 to-primary-dark flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-blob" />
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-300 rounded-full blur-2xl animate-blob animation-delay-2000" />
                    </div>
                    <MapPin className="relative z-10 w-16 h-16 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-primary transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-primary transition-colors">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
