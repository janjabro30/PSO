"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Eye, Trash2, Download } from "lucide-react";
import type { ContactSubmission } from "@/lib/types";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const res = await fetch("/api/admin/contacts");
    const data = await res.json();
    setContacts(data);
  };

  const handleView = async (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);

    // Mark as read
    if (contact.status === "unread") {
      const updatedContact = { ...contact, status: "read" as const };
      await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      setContacts(
        contacts.map((c) => (c.id === contact.id ? updatedContact : c))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne henvendelsen?")) return;

    await fetch(`/api/admin/contacts?id=${id}`, {
      method: "DELETE",
    });
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const toggleStatus = async (contact: ContactSubmission) => {
    const newStatus: "read" | "unread" = contact.status === "read" ? "unread" : "read";
    const updatedContact: ContactSubmission = { ...contact, status: newStatus };

    await fetch("/api/admin/contacts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    });

    setContacts(
      contacts.map((c) => (c.id === contact.id ? updatedContact : c))
    );
  };

  const exportToCSV = () => {
    const headers = ["Dato", "Navn", "E-post", "Telefon", "Firma", "Melding", "Status"];
    const rows = contacts.map((c) => [
      new Date(c.date).toLocaleString("no-NO"),
      c.name,
      c.email,
      c.phone,
      c.company,
      c.message.replace(/\n/g, " "),
      c.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kontakthenvendelser.csv";
    a.click();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kontakthenvendelser</h1>
          <p className="text-gray-500 mt-2">
            Se og administrer henvendelser fra kontaktskjemaet
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Eksporter CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alle henvendelser ({contacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dato</TableHead>
                <TableHead>Navn</TableHead>
                <TableHead>E-post</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    {new Date(contact.date).toLocaleDateString("no-NO")}
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleStatus(contact)}>
                      <Badge
                        variant={contact.status === "unread" ? "warning" : "success"}
                      >
                        {contact.status === "unread" ? "Ulest" : "Lest"}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(contact)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kontakthenvendelse</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Navn</p>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dato</p>
                  <p className="font-medium">
                    {new Date(selectedContact.date).toLocaleString("no-NO")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">E-post</p>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="font-medium">{selectedContact.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Firma</p>
                <p className="font-medium">{selectedContact.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Melding</p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Lukk</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
