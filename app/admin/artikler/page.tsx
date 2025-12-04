"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Trash2 } from "lucide-react";
import type { Article } from "@/lib/types";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const res = await fetch("/api/admin/articles");
    const data = await res.json();
    setArticles(data);
  };

  const handleNew = () => {
    setEditingArticle({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
      imageUrl: "",
    });
    setIsNew(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsNew(false);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingArticle) return;

    if (isNew) {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });
      const newArticle = await res.json();
      setArticles([...articles, newArticle]);
    } else {
      await fetch("/api/admin/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });
      setArticles(
        articles.map((a) => (a.id === editingArticle.id ? editingArticle : a))
      );
    }

    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne artikkelen?")) return;

    await fetch(`/api/admin/articles?id=${id}`, {
      method: "DELETE",
    });
    setArticles(articles.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Artikler</h1>
          <p className="text-gray-500 mt-2">Administrer bloggartikler</p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          Ny artikkel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alle artikler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tittel</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Forfatter</TableHead>
                <TableHead>Dato</TableHead>
                <TableHead className="text-right">Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <Badge variant="default">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    {new Date(article.date).toLocaleDateString("no-NO")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
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

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Ny artikkel" : "Rediger artikkel"}</DialogTitle>
          </DialogHeader>
          {editingArticle && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tittel</Label>
                <Input
                  id="title"
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Kort beskrivelse</Label>
                <Textarea
                  id="excerpt"
                  value={editingArticle.excerpt}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, excerpt: e.target.value })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="content">Innhold</Label>
                <Textarea
                  id="content"
                  value={editingArticle.content}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, content: e.target.value })
                  }
                  rows={10}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={editingArticle.category}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="author">Forfatter</Label>
                  <Input
                    id="author"
                    value={editingArticle.author}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, author: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Dato</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingArticle.date}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Bilde-URL</Label>
                  <Input
                    id="imageUrl"
                    value={editingArticle.imageUrl}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, imageUrl: e.target.value })
                    }
                    placeholder="/images/articles/..."
                  />
                </div>
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
