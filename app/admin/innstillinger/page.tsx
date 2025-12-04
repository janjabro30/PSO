"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import type { Settings } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    setSettings(data);
  };

  const handleSave = async () => {
    if (!settings) return;

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    alert("Innstillinger lagret!");
  };

  if (!settings) {
    return <div>Laster...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Innstillinger</h1>
          <p className="text-gray-500 mt-2">Administrer sideinformasjon</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Lagre endringer
        </Button>
      </div>

      <div className="space-y-6">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle>Selskapsinfo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Selskapsnavn</Label>
              <Input
                id="companyName"
                value={settings.company.name}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="tagline">Slagord</Label>
              <Input
                id="tagline"
                value={settings.company.tagline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, tagline: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Beskrivelse</Label>
              <Textarea
                id="description"
                value={settings.company.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, description: e.target.value },
                  })
                }
                rows={3}
              />
            </div>
            <ImageUpload
              label="Logo"
              value={settings.company.logoUrl}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  company: { ...settings.company, logoUrl: url },
                })
              }
              description="Bedriftslogo som vises i navigasjonen"
            />
            <ImageUpload
              label="Favicon"
              value={settings.company.faviconUrl || ""}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  company: { ...settings.company, faviconUrl: url },
                })
              }
              description="Favicon som vises i nettleserens fane (16x16 eller 32x32 px)"
            />
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Kontaktinfo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">E-post</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={settings.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>Kontoradresser</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Spydeberg */}
            <div>
              <h3 className="font-semibold mb-3">Spydeberg</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="spydebergAddress">Adresse</Label>
                  <Input
                    id="spydebergAddress"
                    value={settings.offices.spydeberg.address}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        offices: {
                          ...settings.offices,
                          spydeberg: {
                            ...settings.offices.spydeberg,
                            address: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="spydebergPostal">Postnummer</Label>
                    <Input
                      id="spydebergPostal"
                      value={settings.offices.spydeberg.postalCode}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          offices: {
                            ...settings.offices,
                            spydeberg: {
                              ...settings.offices.spydeberg,
                              postalCode: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="spydebergCity">Poststed</Label>
                    <Input
                      id="spydebergCity"
                      value={settings.offices.spydeberg.city}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          offices: {
                            ...settings.offices,
                            spydeberg: {
                              ...settings.offices.spydeberg,
                              city: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Oslo */}
            <div>
              <h3 className="font-semibold mb-3">Oslo</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="osloAddress">Adresse</Label>
                  <Input
                    id="osloAddress"
                    value={settings.offices.oslo.address}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        offices: {
                          ...settings.offices,
                          oslo: {
                            ...settings.offices.oslo,
                            address: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="osloPostal">Postnummer</Label>
                    <Input
                      id="osloPostal"
                      value={settings.offices.oslo.postalCode}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          offices: {
                            ...settings.offices,
                            oslo: {
                              ...settings.offices.oslo,
                              postalCode: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="osloCity">Poststed</Label>
                    <Input
                      id="osloCity"
                      value={settings.offices.oslo.city}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          offices: {
                            ...settings.offices,
                            oslo: {
                              ...settings.offices.oslo,
                              city: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Sosiale medier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={settings.social.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, facebook: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={settings.social.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, linkedin: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={settings.social.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, twitter: e.target.value },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
