import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Edit, Trash2, FileText, Eye } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: "draft" | "published" | "archived";
  author: string;
  createdAt: string;
  publishedAt?: string;
}

const statusColors: Record<string, string> = {
  draft: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  published: "bg-green-500/10 text-green-600 border-green-500/20",
  archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with React",
    slug: "building-scalable-web-applications-react",
    excerpt: "Learn the best practices for building large-scale React applications that perform well.",
    content: "Full article content here...",
    category: "Development",
    status: "published",
    author: "John Doe",
    createdAt: "2024-01-15T10:00:00Z",
    publishedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "2",
    title: "The Future of AI in Software Development",
    slug: "future-ai-software-development",
    excerpt: "Exploring how artificial intelligence is transforming the way we build software.",
    content: "Full article content here...",
    category: "Technology",
    status: "published",
    author: "Jane Smith",
    createdAt: "2024-01-10T14:00:00Z",
    publishedAt: "2024-01-11T08:00:00Z",
  },
  {
    id: "3",
    title: "Case Study: E-commerce Platform Migration",
    slug: "case-study-ecommerce-migration",
    excerpt: "How we helped RetailMax migrate their legacy system to a modern cloud architecture.",
    content: "Full article content here...",
    category: "Case Study",
    status: "draft",
    author: "Mike Johnson",
    createdAt: "2024-01-20T11:00:00Z",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  });

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", content: "", category: "" });
    setEditingPost(null);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleSave = (asDraft = true) => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (editingPost) {
      setPosts(prev =>
        prev.map(post =>
          post.id === editingPost.id
            ? {
                ...post,
                ...formData,
                slug: generateSlug(formData.title),
                status: asDraft ? "draft" : "published",
                publishedAt: !asDraft ? new Date().toISOString() : post.publishedAt,
              }
            : post
        )
      );
      toast({
        title: "Post updated",
        description: asDraft ? "Saved as draft" : "Published successfully",
      });
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        slug: generateSlug(formData.title),
        status: asDraft ? "draft" : "published",
        author: "Admin",
        createdAt: new Date().toISOString(),
        publishedAt: !asDraft ? new Date().toISOString() : undefined,
      };
      setPosts([newPost, ...posts]);
      toast({
        title: "Post created",
        description: asDraft ? "Saved as draft" : "Published successfully",
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
    });
    setEditingPost(post);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast({
      title: "Post deleted",
      description: "The post has been removed",
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog & CMS</h2>
          <p className="text-muted-foreground">
            Manage articles, case studies, and content
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
              <DialogDescription>
                {editingPost ? "Update your blog post" : "Write a new article or case study"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Your article title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Case Study">Case Study</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the article..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your article content..."
                  rows={10}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleSave(true)} className="flex-1">
                  Save as Draft
                </Button>
                <Button onClick={() => handleSave(false)} className="flex-1">
                  Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No posts found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {post.excerpt}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.category}</Badge>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={statusColors[post.status]}
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
