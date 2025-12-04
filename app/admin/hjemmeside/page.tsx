"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import type { Settings, HomepageStat } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

export default function HjemmesidePage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    
    // Initialize homepage if it doesn't exist
    if (!data.homepage) {
      data.homepage = {
        hero: {
          title: "Situasjonstilpasset Skreddersydd Regnskapshjelp",
          subtitle: "Vi leverer profesjonelle regnskapstjenester tilpasset dine behov",
          backgroundImage: "",
          primaryCta: { text: "Finn din pakke", link: "#quiz" },
          secondaryCta: { text: "Kontakt oss", link: "/kontakt" }
        },
        stats: []
      };
    }
    
    setSettings(data);
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);

    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Hjemmeside lagret!");
    } catch {
      alert("Feil ved lagring");
    } finally {
      setSaving(false);
    }
  };

  const addStat = () => {
    if (!settings || !settings.homepage) return;
    
    const newStat: HomepageStat = {
      id: Date.now().toString(),
      icon: "Users",
      value: "",
      label: "",
      order: settings.homepage.stats.length + 1
    };

    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        stats: [...settings.homepage.stats, newStat]
      }
    });
  };

  const removeStat = (id: string) => {
    if (!settings || !settings.homepage) return;
    
    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        stats: settings.homepage.stats.filter(stat => stat.id !== id)
      }
    });
  };

  const updateStat = (id: string, field: keyof HomepageStat, value: string | number) => {
    if (!settings || !settings.homepage) return;
    
    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        stats: settings.homepage.stats.map(stat => 
          stat.id === id ? { ...stat, [field]: value } : stat
        )
      }
    });
  };

  const moveStatUp = (index: number) => {
    if (!settings || !settings.homepage || index === 0) return;
    
    const newStats = [...settings.homepage.stats];
    [newStats[index - 1], newStats[index]] = [newStats[index], newStats[index - 1]];
    
    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        stats: newStats.map((stat, i) => ({ ...stat, order: i + 1 }))
      }
    });
  };



  if (!settings || !settings.homepage) {
    return <div>Laster...</div>;
  }

  const iconOptions = [
    "Users", "Calendar", "UserCheck", "Headphones", "TrendingUp", 
    "Award", "Target", "CheckCircle", "Star", "ThumbsUp"
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hjemmeside</h1>
          <p className="text-gray-500 mt-2">Administrer innhold på forsiden</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Lagrer..." : "Lagre endringer"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Hero Section Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Hero-seksjon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Tittel</Label>
              <Input
                id="heroTitle"
                value={settings.homepage.hero.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    homepage: {
                      ...settings.homepage!,
                      hero: { ...settings.homepage!.hero, title: e.target.value }
                    }
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="heroSubtitle">Undertittel</Label>
              <Textarea
                id="heroSubtitle"
                value={settings.homepage.hero.subtitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    homepage: {
                      ...settings.homepage!,
                      hero: { ...settings.homepage!.hero, subtitle: e.target.value }
                    }
                  })
                }
                rows={2}
              />
            </div>

            <ImageUpload
              label="Bakgrunnsbilde"
              value={settings.homepage.hero.backgroundImage}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  homepage: {
                    ...settings.homepage!,
                    hero: { ...settings.homepage!.hero, backgroundImage: url }
                  }
                })
              }
              description="Valgfritt bakgrunnsbilde for hero-seksjonen"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primærknapp tekst</Label>
                <Input
                  value={settings.homepage.hero.primaryCta.text}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      homepage: {
                        ...settings.homepage!,
                        hero: {
                          ...settings.homepage!.hero,
                          primaryCta: { ...settings.homepage!.hero.primaryCta, text: e.target.value }
                        }
                      }
                    })
                  }
                />
              </div>
              <div>
                <Label>Primærknapp lenke</Label>
                <Input
                  value={settings.homepage.hero.primaryCta.link}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      homepage: {
                        ...settings.homepage!,
                        hero: {
                          ...settings.homepage!.hero,
                          primaryCta: { ...settings.homepage!.hero.primaryCta, link: e.target.value }
                        }
                      }
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sekundærknapp tekst</Label>
                <Input
                  value={settings.homepage.hero.secondaryCta.text}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      homepage: {
                        ...settings.homepage!,
                        hero: {
                          ...settings.homepage!.hero,
                          secondaryCta: { ...settings.homepage!.hero.secondaryCta, text: e.target.value }
                        }
                      }
                    })
                  }
                />
              </div>
              <div>
                <Label>Sekundærknapp lenke</Label>
                <Input
                  value={settings.homepage.hero.secondaryCta.link}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      homepage: {
                        ...settings.homepage!,
                        hero: {
                          ...settings.homepage!.hero,
                          secondaryCta: { ...settings.homepage!.hero.secondaryCta, link: e.target.value }
                        }
                      }
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Editor */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Statistikk</CardTitle>
            <Button onClick={addStat} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Legg til statistikk
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.homepage.stats.map((stat, index) => (
                <div key={stat.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col gap-2 pt-8">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveStatUp(index)}
                        disabled={index === 0}
                      >
                        <GripVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <Label>Ikon</Label>
                        <select
                          className="w-full border rounded-md px-3 py-2"
                          value={stat.icon}
                          onChange={(e) => updateStat(stat.id, "icon", e.target.value)}
                        >
                          {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Verdi</Label>
                        <Input
                          value={stat.value}
                          onChange={(e) => updateStat(stat.id, "value", e.target.value)}
                          placeholder="500+"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Etikett</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) => updateStat(stat.id, "label", e.target.value)}
                          placeholder="Fornøyde kunder"
                        />
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => removeStat(stat.id)}
                      className="mt-6 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {settings.homepage.stats.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Ingen statistikk lagt til ennå. Klikk &quot;Legg til statistikk&quot; for å legge til.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
