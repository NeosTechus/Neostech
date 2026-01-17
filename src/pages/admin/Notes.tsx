import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Pin, 
  PinOff, 
  Trash2, 
  Loader2, 
  MoreVertical,
  Pencil,
  StickyNote
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const colorOptions = [
  { value: 'default', label: 'Default', class: 'bg-card' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { value: 'green', label: 'Green', class: 'bg-green-100 dark:bg-green-900/30' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-100 dark:bg-blue-900/30' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-100 dark:bg-purple-900/30' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-100 dark:bg-pink-900/30' },
];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteColor, setNoteColor] = useState("default");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const result = await apiClient.getNotes();
      if (result.data) {
        setNotes(result.data);
      }
    } catch (error) {
      toast.error("Failed to load notes");
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
    setNoteColor("default");
    setDialogOpen(true);
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteColor(note.color);
    setDialogOpen(true);
  };

  const saveNote = async () => {
    if (!noteTitle.trim() && !noteContent.trim()) {
      toast.error("Please enter a title or content");
      return;
    }

    setSaving(true);
    try {
      if (editingNote) {
        const result = await apiClient.updateNote(editingNote.id, {
          title: noteTitle,
          content: noteContent,
          color: noteColor,
        });
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Note updated");
          setDialogOpen(false);
          fetchNotes();
        }
      } else {
        const result = await apiClient.createNote({
          title: noteTitle,
          content: noteContent,
          color: noteColor,
        });
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Note created");
          setDialogOpen(false);
          fetchNotes();
        }
      }
    } catch (error) {
      toast.error("Failed to save note");
    }
    setSaving(false);
  };

  const togglePin = async (note: Note) => {
    try {
      const result = await apiClient.updateNote(note.id, { isPinned: !note.isPinned });
      if (result.error) {
        toast.error(result.error);
      } else {
        fetchNotes();
      }
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const result = await apiClient.deleteNote(noteId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Note deleted");
        fetchNotes();
      }
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const getColorClass = (color: string) => {
    return colorOptions.find(c => c.value === color)?.class || 'bg-card';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notes</h2>
          <p className="text-muted-foreground">
            Your personal notes and reminders
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingNote ? "Edit Note" : "New Note"}</DialogTitle>
              <DialogDescription>
                {editingNote ? "Update your note" : "Create a new personal note"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title (optional)"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="font-medium"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your note here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Color</p>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setNoteColor(color.value)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        color.class,
                        noteColor === color.value 
                          ? "border-primary ring-2 ring-primary/30" 
                          : "border-transparent hover:border-muted-foreground/30"
                      )}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveNote} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingNote ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <StickyNote className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No notes yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first note to keep track of important information
            </p>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card 
              key={note.id} 
              className={cn(
                "relative group transition-shadow hover:shadow-md",
                getColorClass(note.color)
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {note.title && (
                      <CardTitle className="text-base truncate">
                        {note.title}
                      </CardTitle>
                    )}
                    {note.isPinned && (
                      <Badge variant="secondary" className="mt-1">
                        <Pin className="h-3 w-3 mr-1" />
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(note)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => togglePin(note)}>
                        {note.isPinned ? (
                          <>
                            <PinOff className="h-4 w-4 mr-2" />
                            Unpin
                          </>
                        ) : (
                          <>
                            <Pin className="h-4 w-4 mr-2" />
                            Pin
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => deleteNote(note.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                  {note.content || <span className="italic">No content</span>}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-3">
                  {formatDate(note.updatedAt)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
