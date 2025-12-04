"use client"

import { useEffect, useState } from "react"
import { Users, Calendar, UserCheck, Headphones, TrendingUp, Award, Target, CheckCircle, Star, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import type { Settings, HomepageStat } from "@/lib/types"

// Icon mapping for type safety
const iconMap = {
  Users,
  Calendar,
  UserCheck,
  Headphones,
  TrendingUp,
  Award,
  Target,
  CheckCircle,
  Star,
  ThumbsUp,
} as const;

export default function Stats() {
  const [stats, setStats] = useState<HomepageStat[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then((data: Settings) => {
        if (data.homepage?.stats) {
          setStats(data.homepage.stats.sort((a, b) => a.order - b.order));
        }
      })
      .catch(console.error);
  }, []);
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${stats.length === 4 ? 'lg:grid-cols-4' : stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
          {stats.map((stat, index) => {
            // Dynamically get the icon component from type-safe map
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Users;
            
            return (
              <motion.div
                key={stat.id}
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
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
