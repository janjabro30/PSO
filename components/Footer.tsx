import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Image
              src="/images/pso-logo.svg"
              alt="PSO Regnskap AS"
              width={120}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Profesjonell regnskapshjelp siden 2004
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hurtiglenker</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="text-gray-400 hover:text-primary transition-colors">
                  Tjenester
                </Link>
              </li>
              <li>
                <Link href="/artikler" className="text-gray-400 hover:text-primary transition-colors">
                  Artikler
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="text-gray-400 hover:text-primary transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <a href="mailto:post@psoregnskap.no" className="text-gray-400 hover:text-primary transition-colors">
                  post@psoregnskap.no
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <a href="tel:46911911" className="text-gray-400 hover:text-primary transition-colors">
                  46 91 19 11
                </a>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontorer</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-gray-400">
                  <div className="font-medium text-white">Spydeberg</div>
                  <div className="text-sm">Wilses vei 3, 1820 Spydeberg</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-gray-400">
                  <div className="font-medium text-white">Oslo</div>
                  <div className="text-sm">Brynsveien 18, 0667 Oslo</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PSO Regnskap AS. Alle rettigheter reservert.</p>
          <p className="mt-2">
            <a 
              href="https://nornex.no" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-primary transition-colors"
            >
              Utviklet av NORNEX
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
