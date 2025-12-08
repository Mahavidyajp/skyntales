import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Ban, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: "Active" | "Suspended";
  joinDate: string;
  lastOrder: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 234 567 8901", orders: 12, totalSpent: 1250.00, status: "Active", joinDate: "2024-01-15", lastOrder: "2024-12-02" },
  { id: 2, name: "Mike Chen", email: "mike@email.com", phone: "+1 234 567 8902", orders: 8, totalSpent: 780.00, status: "Active", joinDate: "2024-02-20", lastOrder: "2024-12-01" },
  { id: 3, name: "Emma Wilson", email: "emma@email.com", phone: "+1 234 567 8903", orders: 23, totalSpent: 2340.00, status: "Active", joinDate: "2023-11-10", lastOrder: "2024-11-30" },
  { id: 4, name: "James Brown", email: "james@email.com", phone: "+1 234 567 8904", orders: 5, totalSpent: 450.00, status: "Suspended", joinDate: "2024-03-05", lastOrder: "2024-10-15" },
  { id: 5, name: "Lisa Davis", email: "lisa@email.com", phone: "+1 234 567 8905", orders: 15, totalSpent: 1680.00, status: "Active", joinDate: "2024-01-28", lastOrder: "2024-11-28" },
  { id: 6, name: "Tom Harrison", email: "tom@email.com", phone: "+1 234 567 8906", orders: 3, totalSpent: 210.00, status: "Active", joinDate: "2024-06-12", lastOrder: "2024-11-20" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (userId: number) => {
    setUsers(users.map((u) => 
      u.id === userId 
        ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } 
        : u
    ));
    const user = users.find((u) => u.id === userId);
    toast({ 
      title: "User updated", 
      description: `${user?.name} has been ${user?.status === "Active" ? "suspended" : "reactivated"}.` 
    });
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage customer accounts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-3xl font-semibold text-foreground">{totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-3xl font-semibold text-foreground">{activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-3xl font-semibold text-foreground">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input placeholder="Search users..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Orders</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-foreground">{user.orders}</td>
                      <td className="py-4 px-4 text-foreground">${user.totalSpent.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toggleStatus(user.id)}>
                            {user.status === "Active" ? (
                              <Ban size={16} className="text-destructive" />
                            ) : (
                              <CheckCircle size={16} className="text-green-600" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-foreground">{selectedUser.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedUser.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="text-foreground">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Order</p>
                    <p className="text-foreground">{selectedUser.lastOrder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-foreground">{selectedUser.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-foreground">${selectedUser.totalSpent.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
