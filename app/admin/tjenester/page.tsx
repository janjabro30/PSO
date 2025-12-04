"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import type { Service } from "@/lib/types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(data);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFeatures([...service.features]);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingService) return;

    const updatedService = { ...editingService, features };
    const updatedServices = services.map((s) =>
      s.id === updatedService.id ? updatedService : s
    );

    await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedServices),
    });

    setServices(updatedServices);
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tjenester</h1>
        <p className="text-gray-500 mt-2">Administrer tjenestepakkene</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alle tjenester</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Navn</TableHead>
                <TableHead>Beskrivelse</TableHead>
                <TableHead>Pris</TableHead>
                <TableHead>Funksjoner</TableHead>
                <TableHead className="text-right">Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.features.length} funksjoner</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rediger tjeneste</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Navn</Label>
                <Input
                  id="name"
                  value={editingService.name}
                  onChange={(e) =>
                    setEditingService({ ...editingService, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Beskrivelse</Label>
                <Input
                  id="description"
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Pris</Label>
                <Input
                  id="price"
                  value={editingService.price}
                  onChange={(e) =>
                    setEditingService({ ...editingService, price: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="icon">Ikon</Label>
                <Input
                  id="icon"
                  value={editingService.icon}
                  onChange={(e) =>
                    setEditingService({ ...editingService, icon: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="color">Farge (CSS-klasse)</Label>
                <Input
                  id="color"
                  value={editingService.color}
                  onChange={(e) =>
                    setEditingService({ ...editingService, color: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Funksjoner</Label>
                  <Button type="button" size="sm" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-1" />
                    Legg til
                  </Button>
                </div>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Funksjon"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleSave}>Lagre</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
