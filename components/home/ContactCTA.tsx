"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactCTA() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Klar til å komme i gang?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Kontakt oss i dag for en uforpliktende samtale om hvordan vi kan hjelpe din bedrift
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a href="mailto:post@psoregnskap.no" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <Mail className="w-5 h-5" />
            <span className="font-medium">post@psoregnskap.no</span>
          </a>
          <span className="hidden sm:inline text-white/50">|</span>
          <a href="tel:46911911" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-medium">46 91 19 11</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/kontakt">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Kontakt oss
            </Button>
          </Link>
          <Link href="/om-oss">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Om PSO Regnskap
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
