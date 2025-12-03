"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

const offices = [
  {
    name: "Spydeberg",
    address: "Wilses vei 3, 1820 Spydeberg",
    phone: "46 91 19 11",
    email: "post@psoregnskap.no",
    hours: "Man-Fre: 08:00-16:00",
  },
  {
    name: "Oslo",
    address: "Brynsveien 18, 0667 Oslo",
    phone: "46 91 19 11",
    email: "post@psoregnskap.no",
    hours: "Man-Fre: 08:00-16:00",
  },
]

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert("Takk for din henvendelse! Vi tar kontakt så snart som mulig.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Kontakt Oss</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Vi er her for å hjelpe deg. Ta kontakt for en uforpliktende samtale om 
            hvordan vi kan bidra til din bedrifts suksess.
          </p>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:post@psoregnskap.no"
              className="flex items-center justify-center gap-3 p-6 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Mail size={24} />
              <div className="text-left">
                <div className="font-semibold">Send oss en e-post</div>
                <div className="text-sm">post@psoregnskap.no</div>
              </div>
            </a>
            <a
              href="tel:46911911"
              className="flex items-center justify-center gap-3 p-6 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
            >
              <Phone size={24} />
              <div className="text-left">
                <div className="font-semibold">Ring oss</div>
                <div className="text-sm">46 91 19 11</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form and Offices */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send oss en melding</CardTitle>
              </CardHeader>
              <CardContent>
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
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2" size={20} />
                    Send melding
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Cards */}
            <div className="space-y-6">
              {offices.map((office, index) => (
                <Card key={index}>
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
                        <p className="text-gray-600">{office.address}</p>
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Finn oss</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-lg">{office.name}</p>
                  <p className="text-gray-600">{office.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
