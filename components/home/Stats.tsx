"use client"

import { Users, Calendar, UserCheck, Headphones } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Fornøyde kunder",
  },
  {
    icon: Calendar,
    value: "20+",
    label: "År med erfaring",
  },
  {
    icon: UserCheck,
    value: "4",
    label: "Autoriserte regnskapsførere",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Støtte",
  },
]

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative p-4 bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-full border-2 border-primary/20">
                    <Icon className="w-8 h-8 text-primary" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
