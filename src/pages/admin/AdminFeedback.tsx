import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: "Published" | "Pending" | "Hidden";
}

const initialReviews: Review[] = [
  { id: 1, customer: "Sarah J.", product: "Hydrating Face Cream", rating: 5, comment: "Absolutely love this cream! My skin feels so soft and hydrated.", date: "2024-12-02", status: "Published" },
  { id: 2, customer: "Mike C.", product: "Vitamin C Serum", rating: 4, comment: "Great product, noticed brighter skin after 2 weeks.", date: "2024-12-01", status: "Published" },
  { id: 3, customer: "Emma W.", product: "Gentle Cleanser", rating: 5, comment: "Perfect for my sensitive skin. No irritation at all!", date: "2024-11-30", status: "Published" },
  { id: 4, customer: "James B.", product: "Night Repair Oil", rating: 3, comment: "Good but a bit too oily for my skin type.", date: "2024-11-29", status: "Pending" },
  { id: 5, customer: "Lisa D.", product: "SPF 50 Sunscreen", rating: 5, comment: "Best sunscreen I've ever used. No white cast!", date: "2024-11-28", status: "Published" },
  { id: 6, customer: "Tom H.", product: "Hydrating Face Cream", rating: 2, comment: "Didn't work well for me, broke out after using it.", date: "2024-11-27", status: "Hidden" },
];

const AdminFeedback = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const updateStatus = (id: number, newStatus: Review["status"]) => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, status: newStatus } : r));
    toast({ title: "Review updated", description: `Review status changed to ${newStatus}` });
  };

  const deleteReview = (id: number) => {
    setReviews(reviews.filter((r) => r.id !== id));
    toast({ title: "Review deleted", description: "The review has been removed." });
  };

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Feedback & Ratings</h1>
          <p className="text-muted-foreground">Manage customer reviews and ratings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="text-yellow-600 fill-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-semibold text-foreground">{averageRating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-3">Rating Distribution</p>
              <div className="space-y-2">
                {ratingCounts.map(({ rating, count }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${(count / reviews.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-3xl font-semibold text-foreground">{reviews.length}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm"><span className="text-green-600">{reviews.filter((r) => r.status === "Published").length}</span> Published</p>
                <p className="text-sm"><span className="text-yellow-600">{reviews.filter((r) => r.status === "Pending").length}</span> Pending</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input placeholder="Search reviews..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Rating" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="p-4 border border-border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-foreground">{review.customer}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{review.product}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                      </div>
                      <p className="text-foreground">{review.comment}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={review.status} onValueChange={(v) => updateStatus(review.id, v as Review["status"])}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => deleteReview(review.id)}>
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;
