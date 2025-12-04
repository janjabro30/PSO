"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import type { Settings } from "@/lib/types"

const navLinks = [
  { href: "/", label: "HJEM" },
  { href: "/tjenester", label: "TJENESTER" },
  { href: "/artikler", label: "ARTIKLER" },
  { href: "/om-oss", label: "OM PSO" },
  { href: "/kontakt", label: "KONTAKT" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const logoUrl = settings?.company?.logoUrl || "/images/pso-logo.svg";
  const companyName = settings?.company?.name || "PSO Regnskap AS";

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl}
              alt={companyName}
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-dark p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-50 bg-white">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-4 px-4 text-lg text-dark hover:text-primary hover:bg-gray-50 font-medium rounded-lg transition-colors min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
