"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/handshake.svg')" }}
      >
        <div className="absolute inset-0 bg-dark/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Situasjonstilpasset Skreddersydd Regnskapshjelp
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Vi leverer profesjonelle regnskapstjenester tilpasset dine behov
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#quiz">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
              Finn din pakke <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <Link href="/kontakt">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Kontakt oss
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
