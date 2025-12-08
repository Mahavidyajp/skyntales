import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High";
  date: string;
  response?: string;
}

const initialTickets: Ticket[] = [
  { id: "TKT-001", name: "Sarah Johnson", email: "sarah@email.com", subject: "Order not received", message: "I placed an order 2 weeks ago but haven't received it yet. Order ID: ORD-001", status: "In Progress", priority: "High", date: "2024-12-02" },
  { id: "TKT-002", name: "Mike Chen", email: "mike@email.com", subject: "Product inquiry", message: "Do you ship internationally? I'm interested in ordering to Canada.", status: "Open", priority: "Low", date: "2024-12-01" },
  { id: "TKT-003", name: "Emma Wilson", email: "emma@email.com", subject: "Return request", message: "I'd like to return my recent purchase. The product doesn't suit my skin type.", status: "Resolved", priority: "Medium", date: "2024-11-30", response: "Return approved. Please ship the product back using the prepaid label sent to your email." },
  { id: "TKT-004", name: "James Brown", email: "james@email.com", subject: "Discount code not working", message: "I tried using code SAVE20 but it says invalid. Can you help?", status: "Open", priority: "Medium", date: "2024-11-29" },
  { id: "TKT-005", name: "Lisa Davis", email: "lisa@email.com", subject: "Product recommendation", message: "I have oily skin and looking for a good moisturizer. What do you recommend?", status: "Closed", priority: "Low", date: "2024-11-28", response: "We recommend our Oil-Free Hydrating Gel. It's perfect for oily skin types!" },
];

const AdminSupport = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [response, setResponse] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (ticketId: string, newStatus: Ticket["status"]) => {
    setTickets(tickets.map((t) => t.id === ticketId ? { ...t, status: newStatus } : t));
    toast({ title: "Ticket updated", description: `Status changed to ${newStatus}` });
  };

  const sendResponse = () => {
    if (!selectedTicket || !response.trim()) return;
    setTickets(tickets.map((t) => 
      t.id === selectedTicket.id 
        ? { ...t, response, status: "Resolved" as const } 
        : t
    ));
    toast({ title: "Response sent", description: "The customer has been notified." });
    setResponse("");
    setSelectedTicket(null);
  };

  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "Open": return <AlertCircle size={16} className="text-yellow-600" />;
      case "In Progress": return <Clock size={16} className="text-blue-600" />;
      case "Resolved": return <CheckCircle size={16} className="text-green-600" />;
      case "Closed": return <CheckCircle size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-gray-100 text-gray-700";
    }
  };

  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Customer Support</h1>
          <p className="text-muted-foreground">Manage support tickets and inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{openTickets}</p>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{inProgressTickets}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{tickets.filter((t) => t.status === "Resolved").length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{tickets.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input placeholder="Search tickets..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(ticket.status)}
                        <span className="font-medium text-foreground">{ticket.subject}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.id} • {ticket.name} • {ticket.date}</p>
                      <p className="text-foreground line-clamp-2">{ticket.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={ticket.status} onValueChange={(v) => updateStatus(ticket.id, v as Ticket["status"])}>
                        <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" onClick={() => setSelectedTicket(ticket)}>
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Ticket Details - {selectedTicket?.id}</DialogTitle></DialogHeader>
            {selectedTicket && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium text-foreground">{selectedTicket.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{selectedTicket.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{selectedTicket.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium text-foreground">{selectedTicket.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Message</p>
                  <p className="text-foreground bg-muted/50 p-3 rounded-lg">{selectedTicket.message}</p>
                </div>
                {selectedTicket.response && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Previous Response</p>
                    <p className="text-foreground bg-green-50 p-3 rounded-lg border border-green-200">{selectedTicket.response}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Response</p>
                  <Textarea
                    placeholder="Type your response..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={sendResponse} className="w-full">Send Response & Resolve</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
