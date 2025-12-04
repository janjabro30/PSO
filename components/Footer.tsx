"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import type { Settings } from "@/lib/types"
import { formatPhoneForTel } from "@/lib/utils"

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const logoUrl = settings?.company?.logoUrl || "/images/pso-logo.svg";
  const companyName = settings?.company?.name || "PSO Regnskap AS";
  const tagline = settings?.company?.tagline || "Profesjonell regnskapshjelp siden 2004";
  const email = settings?.contact?.email || "post@psoregnskap.no";
  const phone = settings?.contact?.phone || "46 91 19 11";
  const spydebergOffice = settings?.offices?.spydeberg || {
    name: "Spydeberg",
    address: "Wilses vei 3",
    postalCode: "1820",
    city: "Spydeberg"
  };
  const osloOffice = settings?.offices?.oslo || {
    name: "Oslo",
    address: "Brynsveien 18",
    postalCode: "0667",
    city: "Oslo"
  };

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Image
              src={logoUrl}
              alt={companyName}
              width={120}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              {tagline}
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
              <li className="flex items-start gap-2 min-h-[44px] items-center">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-400 hover:text-primary transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2 min-h-[44px] items-center">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`tel:${formatPhoneForTel(phone)}`} className="text-gray-400 hover:text-primary transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontorer</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <div className="font-medium text-white">{spydebergOffice.name}</div>
                  <div className="text-sm">{spydebergOffice.address}, {spydebergOffice.postalCode} {spydebergOffice.city}</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <div className="font-medium text-white">{osloOffice.name}</div>
                  <div className="text-sm">{osloOffice.address}, {osloOffice.postalCode} {osloOffice.city}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {companyName}. Alle rettigheter reservert.</p>
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
