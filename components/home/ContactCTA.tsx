"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-teal-700 to-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Klar til å komme i gang?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Kontakt oss i dag for en uforpliktende samtale om hvordan vi kan hjelpe din bedrift
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.a
            href="mailto:post@psoregnskap.no"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="font-medium">post@psoregnskap.no</span>
          </motion.a>
          <span className="hidden sm:inline text-white/50">|</span>
          <motion.a
            href="tel:46911911"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">46 91 19 11</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/kontakt">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Kontakt oss <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <Link href="/om-oss">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all hover:scale-105 backdrop-blur-sm bg-white/10"
            >
              Om PSO Regnskap
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
