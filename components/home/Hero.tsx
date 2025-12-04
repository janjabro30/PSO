"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Settings } from "@/lib/types"

export default function Hero() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  // Default values
  const hero = settings?.homepage?.hero || {
    title: "Situasjonstilpasset Skreddersydd Regnskapshjelp",
    subtitle: "Vi leverer profesjonelle regnskapstjenester tilpasset dine behov",
    backgroundImage: "",
    primaryCta: { text: "Finn din pakke", link: "#quiz" },
    secondaryCta: { text: "Kontakt oss", link: "/kontakt" }
  };
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Professional Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-800 to-slate-900">
        {hero.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
        )}
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 border-2 border-primary/30 rounded-lg"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 size={20} className="text-primary" />
            </motion.div>
            <span className="text-sm font-medium">Profesjonell regnskapshjelp siden 2004</span>
          </div>
        </motion.div>

        {/* Main Heading with Gradient Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          {hero.title.split('\n').map((line, i) => (
            <span key={i}>
              <span className={i === 0 
                ? "bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg"
                : "bg-gradient-to-r from-primary via-teal-400 to-primary bg-clip-text text-transparent animate-gradient"
              }>
                {line}
              </span>
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href={hero.primaryCta.link}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              {hero.primaryCta.text} <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <Link href={hero.secondaryCta.link}>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10"
            >
              {hero.secondaryCta.text}
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badges / Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: "Fornøyde kunder", value: "500+" },
            { icon: TrendingUp, label: "År med erfaring", value: "20+" },
            { icon: Award, label: "Sertifiserte rådgivere", value: "15+" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-primary/50 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}
