import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Star } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$45,231", change: "+20.1%", icon: DollarSign },
  { title: "Orders", value: "356", change: "+12.5%", icon: ShoppingCart },
  { title: "Products", value: "48", change: "+4", icon: Package },
  { title: "Customers", value: "2,350", change: "+180", icon: Users },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", total: "$125.00", status: "Delivered", date: "Dec 2, 2024" },
  { id: "ORD-002", customer: "Mike Chen", total: "$89.00", status: "Processing", date: "Dec 2, 2024" },
  { id: "ORD-003", customer: "Emma Wilson", total: "$210.00", status: "Shipped", date: "Dec 1, 2024" },
  { id: "ORD-004", customer: "James Brown", total: "$156.00", status: "Pending", date: "Dec 1, 2024" },
  { id: "ORD-005", customer: "Lisa Davis", total: "$78.00", status: "Delivered", date: "Nov 30, 2024" },
];

const topProducts = [
  { name: "Hydrating Face Cream", sales: 245, revenue: "$12,250" },
  { name: "Vitamin C Serum", sales: 189, revenue: "$9,450" },
  { name: "Gentle Cleanser", sales: 156, revenue: "$4,680" },
  { name: "Night Repair Oil", sales: 134, revenue: "$8,040" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp size={14} />
                      {stat.change}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="text-primary" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.id} • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <p className="font-medium text-foreground">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">89%</p>
                <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">+15%</p>
                <p className="text-sm text-muted-foreground">New Users This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
