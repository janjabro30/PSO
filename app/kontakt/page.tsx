"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Office } from "@/lib/types"

export default function KontaktPage() {
  const [offices, setOffices] = useState<Office[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const loadOffices = async () => {
      try {
        const res = await fetch("/api/offices")
        const data = await res.json()
        setOffices(data)
      } catch (error) {
        console.error("Failed to load offices:", error)
      }
    }
    loadOffices()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    }, 3000)
  }

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
            Kontakt Oss
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Vi er her for å hjelpe deg. Ta kontakt for en uforpliktende samtale om 
            hvordan vi kan bidra til din bedrifts suksess.
          </motion.p>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.a
              href="mailto:post@psoregnskap.no"
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-3 p-6 bg-gradient-to-r from-primary to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
            >
              <Mail size={24} />
              <div className="text-left">
                <div className="font-semibold">Send oss en e-post</div>
                <div className="text-sm opacity-90">post@psoregnskap.no</div>
              </div>
            </motion.a>
            <motion.a
              href="tel:46911911"
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-3 p-6 bg-gradient-to-r from-accent to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Phone size={24} />
              <div className="text-left">
                <div className="font-semibold">Ring oss</div>
                <div className="text-sm opacity-90">46 91 19 11</div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Form and Offices */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-xl border-2 border-gray-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Send oss en melding</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-20 h-20 text-primary mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Takk for din henvendelse!</h3>
                      <p className="text-gray-600">Vi tar kontakt så snart som mulig.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Navn *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-post *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="din@epost.no"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ditt telefonnummer"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Bedrift
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Din bedrift"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Melding *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Fortell oss hvordan vi kan hjelpe deg"
                    />
                  </div>
                      <Button 
                        type="submit" 
                        className="w-full hover:scale-105 transition-transform" 
                        size="lg"
                      >
                        <Send className="mr-2" size={20} />
                        Send melding
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Cards */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {offices.map((office) => (
                <motion.div
                  key={office.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="shadow-xl border-2 border-gray-100 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MapPin className="text-primary" />
                        {office.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Adresse</p>
                          <p className="text-gray-600">{office.address}, {office.postalCode} {office.city}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Telefon</p>
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                            {office.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">E-post</p>
                          <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                            {office.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Åpningstider</p>
                          <p className="text-gray-600">{office.hours}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent"
          >
            Finn oss
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-xl border-2 border-gray-100"
              >
                <div className="bg-white p-4">
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <MapPin className="text-primary" />
                    {office.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{office.address}, {office.postalCode} {office.city}</p>
                </div>
                <div className="h-80 bg-gray-100">
                  <iframe
                    src={office.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title={`Kart over ${office.name}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
