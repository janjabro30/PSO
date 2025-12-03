import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Mail } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "Total",
    description: "Komplett regnskapspakke for bedrifter som vil overlate alt til oss",
    color: "border-primary",
    bgColor: "bg-primary/5",
    features: [
      "Komplett regnskap og bokføring",
      "Årsregnskap og rapportering",
      "Budsjett og prognoser",
      "Skatteplanlegging og rådgivning",
      "Løpende oppfølging",
      "Bilagsbehandling",
      "Mva-rapportering",
      "Årsoppgjør",
      "Revisjonshjelp",
      "Dedikert regnskapsfører",
    ],
  },
  {
    name: "Basic",
    description: "Enkel og kostnadseffektiv løsning for små bedrifter",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    features: [
      "Enkel bokføring",
      "Løpende rapportering",
      "Mva-rapporter",
      "Årsoppgjør",
      "E-post support",
      "Grunnleggende rådgivning",
      "Bilagsscanning",
      "Standardrapporter",
    ],
  },
  {
    name: "Workshop",
    description: "Strategisk rådgivning og workshops for vekstbedrifter",
    color: "border-accent",
    bgColor: "bg-orange-50",
    features: [
      "Strategiske workshops",
      "Forretningsutvikling",
      "Økonomisk analyse",
      "Vekstplanlegging",
      "Dedikert konsulent",
      "Kvartalsvise møter",
      "Likviditetsanalyse",
      "Investeringsvurdering",
      "Scenarioplanlegging",
      "Benchmarking",
    ],
  },
  {
    name: "Pluss",
    description: "Utvidet tjeneste med personlig rådgiver og fakturering",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    features: [
      "Fakturering og innkreving",
      "Personlig rådgiver",
      "Prioritert support",
      "Månedlige møter",
      "Tilpassede rapporter",
      "Budsjettkontroll",
      "Regnskapssystem oppsett",
      "Personaladministrasjon",
      "Lønn og rapportering",
    ],
  },
]

export default function TjenesterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Våre Tjenester</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Vi tilbyr fire ulike pakker skreddersydd for bedrifter av alle størrelser. 
            Fra enkelt regnskap til full strategisk rådgivning.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`border-2 ${pkg.color} ${pkg.bgColor} hover:shadow-xl transition-shadow`}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-lg text-gray-700">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/kontakt">
                    <Button className="w-full" size="lg">
                      <Mail className="mr-2" size={20} />
                      Kontakt oss for pris
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Usikker på hvilken pakke som passer?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ta vår quiz eller kontakt oss direkte for en uforpliktende samtale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quiz">
              <Button size="lg">
                Ta quiz
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button size="lg" variant="outline">
                Kontakt oss
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
