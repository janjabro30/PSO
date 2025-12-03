"use client"

import { Users, Calendar, UserCheck, Headphones } from "lucide-react"

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-dark mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
