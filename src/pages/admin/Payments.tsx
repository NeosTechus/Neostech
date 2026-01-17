import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Link2, 
  FileText, 
  Plus, 
  Copy, 
  ExternalLink, 
  Trash2,
  Loader2,
  DollarSign,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

interface PaymentLink {
  id: string;
  stripeId: string;
  url: string;
  amount: number;
  description: string;
  customerEmail?: string;
  status: string;
  createdAt: string;
}

interface InvoiceItem {
  description: string;
  amount: number;
  quantity: number;
}

interface Invoice {
  id: string;
  stripeId: string;
  customerEmail: string;
  customerName?: string;
  items: InvoiceItem[];
  total: number;
  status: string;
  hostedUrl?: string;
  pdfUrl?: string;
  dueDate?: string;
  createdAt: string;
}

export default function Payments() {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  
  // Payment Link form state
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkAmount, setLinkAmount] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkEmail, setLinkEmail] = useState("");
  
  // Invoice form state
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [invoiceName, setInvoiceName] = useState("");
  const [invoiceMemo, setInvoiceMemo] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: "", amount: 0, quantity: 1 }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [linksRes, invoicesRes] = await Promise.all([
        apiClient.getPaymentLinks(),
        apiClient.getInvoices(),
      ]);
      
      if (linksRes.data) setPaymentLinks(linksRes.data);
      if (invoicesRes.data) setInvoices(invoicesRes.data);
    } catch (error) {
      toast.error("Failed to load payment data");
    }
    setLoading(false);
  };

  const createPaymentLink = async () => {
    if (!linkAmount || parseFloat(linkAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setCreating(true);
    try {
      const result = await apiClient.createPaymentLink({
        amount: parseFloat(linkAmount),
        description: linkDescription,
        customerEmail: linkEmail || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Payment link created!");
        setLinkDialogOpen(false);
        setLinkAmount("");
        setLinkDescription("");
        setLinkEmail("");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to create payment link");
    }
    setCreating(false);
  };

  const createInvoice = async () => {
    if (!invoiceEmail) {
      toast.error("Please enter customer email");
      return;
    }

    const validItems = invoiceItems.filter(item => item.description && item.amount > 0);
    if (validItems.length === 0) {
      toast.error("Please add at least one valid item");
      return;
    }

    setCreating(true);
    try {
      const result = await apiClient.createInvoice({
        customerEmail: invoiceEmail,
        customerName: invoiceName || undefined,
        items: validItems,
        dueDate: invoiceDueDate || undefined,
        memo: invoiceMemo || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Invoice created and sent!");
        setInvoiceDialogOpen(false);
        resetInvoiceForm();
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to create invoice");
    }
    setCreating(false);
  };

  const resetInvoiceForm = () => {
    setInvoiceEmail("");
    setInvoiceName("");
    setInvoiceMemo("");
    setInvoiceDueDate("");
    setInvoiceItems([{ description: "", amount: 0, quantity: 1 }]);
  };

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: "", amount: 0, quantity: 1 }]);
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updated = [...invoiceItems];
    updated[index] = { ...updated[index], [field]: value };
    setInvoiceItems(updated);
  };

  const removeInvoiceItem = (index: number) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const deactivateLink = async (linkId: string) => {
    try {
      const result = await apiClient.deactivatePaymentLink(linkId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Payment link deactivated");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to deactivate link");
    }
  };

  const voidInvoice = async (invoiceId: string) => {
    try {
      const result = await apiClient.voidInvoice(invoiceId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Invoice voided");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to void invoice");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      active: { variant: "default", label: "Active" },
      inactive: { variant: "secondary", label: "Inactive" },
      sent: { variant: "outline", label: "Sent" },
      open: { variant: "outline", label: "Open" },
      paid: { variant: "default", label: "Paid" },
      void: { variant: "destructive", label: "Void" },
      uncollectible: { variant: "destructive", label: "Uncollectible" },
      draft: { variant: "secondary", label: "Draft" },
    };

    const config = statusConfig[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">
          Create payment links and invoices for your clients
        </p>
      </div>

      <Tabs defaultValue="payment-links" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment-links" className="gap-2">
            <Link2 className="h-4 w-4" />
            Payment Links
          </TabsTrigger>
          <TabsTrigger value="invoices" className="gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment-links" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Payment Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Payment Link</DialogTitle>
                  <DialogDescription>
                    Create a shareable link for custom payments
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={linkAmount}
                        onChange={(e) => setLinkAmount(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Payment for services..."
                      value={linkDescription}
                      onChange={(e) => setLinkDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Customer Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={linkEmail}
                      onChange={(e) => setLinkEmail(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createPaymentLink} disabled={creating}>
                    {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Create Link
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Links</CardTitle>
              <CardDescription>Manage your payment links</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentLinks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No payment links created yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentLinks.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className="font-medium">
                          {link.description || "Custom Payment"}
                        </TableCell>
                        <TableCell>{formatCurrency(link.amount)}</TableCell>
                        <TableCell>{link.customerEmail || "-"}</TableCell>
                        <TableCell>{getStatusBadge(link.status)}</TableCell>
                        <TableCell>{formatDate(link.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyLink(link.url)}
                              title="Copy link"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(link.url, '_blank')}
                              title="Open link"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            {link.status === 'active' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deactivateLink(link.id)}
                                title="Deactivate"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Invoice</DialogTitle>
                  <DialogDescription>
                    Create and send an invoice to your client
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">Customer Email *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        placeholder="customer@example.com"
                        value={invoiceEmail}
                        onChange={(e) => setInvoiceEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        placeholder="John Doe"
                        value={invoiceName}
                        onChange={(e) => setInvoiceName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceDueDate}
                      onChange={(e) => setInvoiceDueDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Line Items *</Label>
                    {invoiceItems.map((item, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="flex-1">
                          <Input
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                          />
                        </div>
                        <div className="w-24">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Amount"
                            value={item.amount || ''}
                            onChange={(e) => updateInvoiceItem(index, 'amount', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="w-16">
                          <Input
                            type="number"
                            min="1"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInvoiceItem(index)}
                          disabled={invoiceItems.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addInvoiceItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memo">Memo / Notes</Label>
                    <Textarea
                      id="memo"
                      placeholder="Additional notes for the client..."
                      value={invoiceMemo}
                      onChange={(e) => setInvoiceMemo(e.target.value)}
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>
                        {formatCurrency(
                          invoiceItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createInvoice} disabled={creating}>
                    {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    <Send className="h-4 w-4 mr-2" />
                    Create & Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No invoices created yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{invoice.customerName || "-"}</div>
                            <div className="text-sm text-muted-foreground">{invoice.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(invoice.total)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          {invoice.dueDate ? formatDate(invoice.dueDate) : "-"}
                        </TableCell>
                        <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {invoice.hostedUrl && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(invoice.hostedUrl, '_blank')}
                                title="View invoice"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                            {invoice.pdfUrl && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(invoice.pdfUrl, '_blank')}
                                title="Download PDF"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            )}
                            {invoice.status === 'open' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => voidInvoice(invoice.id)}
                                title="Void invoice"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
