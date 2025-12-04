"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  FileText, 
  Users, 
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ContactSubmission } from "@/lib/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    articles: 0,
    team: 0,
    contacts: 0,
  });
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    // Fetch stats and recent contacts
    Promise.all([
      fetch("/api/admin/services").then((r) => r.json()),
      fetch("/api/admin/articles").then((r) => r.json()),
      fetch("/api/admin/team").then((r) => r.json()),
      fetch("/api/admin/contacts").then((r) => r.json()),
    ]).then(([services, articles, team, contacts]) => {
      setStats({
        services: services.length,
        articles: articles.length,
        team: team.length,
        contacts: contacts.length,
      });
      // Get 5 most recent contacts
      setRecentContacts(contacts.slice(0, 5));
    });
  }, []);

  const statsCards = [
    {
      title: "Tjenester",
      value: stats.services,
      icon: Package,
      color: "text-primary",
      href: "/admin/tjenester",
    },
    {
      title: "Artikler",
      value: stats.articles,
      icon: FileText,
      color: "text-blue-600",
      href: "/admin/artikler",
    },
    {
      title: "Teammedlemmer",
      value: stats.team,
      icon: Users,
      color: "text-accent",
      href: "/admin/team",
    },
    {
      title: "Henvendelser",
      value: stats.contacts,
      icon: Mail,
      color: "text-purple-600",
      href: "/admin/kontakt",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Velkommen til PSO Regnskap administrasjonspanel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Contacts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Siste henvendelser</CardTitle>
            <Link href="/admin/kontakt">
              <Button variant="outline" size="sm">
                Se alle
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Ingen henvendelser ennå</p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{contact.name}</h3>
                      <Badge variant={contact.status === "unread" ? "warning" : "default"}>
                        {contact.status === "unread" ? "Ulest" : "Lest"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{contact.message}</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(contact.date).toLocaleDateString("no-NO")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="/admin/artikler">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Ny artikkel</h3>
              <p className="text-sm text-gray-500">Opprett en ny artikkel for bloggen</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/team">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Legg til teammedlem</h3>
              <p className="text-sm text-gray-500">Legg til et nytt teammedlem</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/innstillinger">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Package className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Innstillinger</h3>
              <p className="text-sm text-gray-500">Endre sideinformasjon</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
