"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Edit, Plus, Trash2 } from "lucide-react";
import type { TeamMember } from "@/lib/types";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    const res = await fetch("/api/admin/team");
    const data = await res.json();
    setTeam(data);
  };

  const handleNew = () => {
    setEditingMember({
      id: "",
      name: "",
      title: "",
      office: "Spydeberg",
      phone: "",
      email: "",
      photoUrl: "",
    });
    setIsNew(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsNew(false);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingMember) return;

    if (isNew) {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });
      const newMember = await res.json();
      setTeam([...team, newMember]);
    } else {
      await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });
      setTeam(
        team.map((m) => (m.id === editingMember.id ? editingMember : m))
      );
    }

    setIsDialogOpen(false);
    setEditingMember(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette teammedlemmet?")) return;

    await fetch(`/api/admin/team?id=${id}`, {
      method: "DELETE",
    });
    setTeam(team.filter((m) => m.id !== id));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-500 mt-2">Administrer teammedlemmer</p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nytt medlem
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.title}</p>
                  <p className="text-sm text-primary font-medium mt-1">
                    {member.office}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Telefon:</span> {member.phone}
                </div>
                <div>
                  <span className="text-gray-500">E-post:</span> {member.email}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "Nytt teammedlem" : "Rediger teammedlem"}</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Navn</Label>
                <Input
                  id="name"
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="title">Tittel</Label>
                <Input
                  id="title"
                  value={editingMember.title}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="office">Kontor</Label>
                <select
                  id="office"
                  value={editingMember.office}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, office: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                  <option value="Spydeberg">Spydeberg</option>
                  <option value="Oslo">Oslo</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={editingMember.phone}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-post</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingMember.email}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="photoUrl">Bilde-URL</Label>
                <Input
                  id="photoUrl"
                  value={editingMember.photoUrl}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, photoUrl: e.target.value })
                  }
                  placeholder="/images/team/..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleSave}>
              {isNew ? "Opprett" : "Lagre"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
