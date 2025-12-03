import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Award, TrendingUp, MapPin } from "lucide-react"

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

const team = [
  {
    name: "Ola Nordmann",
    role: "Daglig leder og autorisert regnskapsfører",
    description: "20+ års erfaring med regnskap og økonomirådgivning",
  },
  {
    name: "Kari Hansen",
    role: "Autorisert regnskapsfører",
    description: "Spesialist på skatterett og årsoppgjør",
  },
  {
    name: "Per Jensen",
    role: "Autorisert regnskapsfører",
    description: "Ekspert på digital regnskap og automatisering",
  },
  {
    name: "Lise Andersen",
    role: "Autorisert regnskapsfører",
    description: "Fokuserer på små og mellomstore bedrifter",
  },
  {
    name: "Erik Olsen",
    role: "Regnskapskonsulent",
    description: "Har bred erfaring med bokføring og rapportering",
  },
  {
    name: "Anne Kristiansen",
    role: "Rådgiver",
    description: "Bistår med strategisk økonomirådgivning",
  },
  {
    name: "Martin Berg",
    role: "Regnskapskonsulent",
    description: "Spesialiserer seg på oppstartsbedrifter",
  },
  {
    name: "Nina Johansen",
    role: "Kundeservice",
    description: "Første kontaktpunkt for våre kunder",
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Om PSO Regnskap AS</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Profesjonell regnskapshjelp siden 2004. Vi er et dedikert team av 8 medarbeidere 
            med erfaring og kompetanse til å hjelpe din bedrift med alt av regnskapstjenester.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8">Vår Historie</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              PSO Regnskap AS ble etablert i 2004 med en klar visjon: å tilby profesjonelle 
              regnskapstjenester tilpasset hver enkelt kunde. Gjennom årene har vi vokst fra 
              en liten oppstart til et veletablert regnskapsfirma med kontorer i både Spydeberg 
              og Oslo.
            </p>
            <p className="text-gray-700 mb-4">
              Vi er stolte av vårt team på 8 dedikerte medarbeidere, inkludert 4 autoriserte 
              regnskapsførere. Vår erfaring spenner over ulike bransjer og bedriftsstørrelser, 
              fra enkeltpersonforetak til større selskaper.
            </p>
            <p className="text-gray-700">
              Vi holder oss oppdatert på nye regler og regelverk, og investerer kontinuerlig i 
              ny teknologi for å kunne tilby de beste løsningene til våre kunder. Vårt mål er 
              å være mer enn bare en regnskapsfører - vi ønsker å være din strategiske partner 
              i din bedrifts økonomiske reise.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Møt Teamet</h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Våre dyktige medarbeidere er klar til å hjelpe deg
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                  <p className="text-primary text-sm text-center mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Våre Kontorer</h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Vi har kontorer i både Spydeberg og Oslo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{office.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-primary">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-primary">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
