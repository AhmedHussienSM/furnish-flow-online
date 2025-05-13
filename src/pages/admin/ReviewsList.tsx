
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Trash, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    productId: 1,
    productName: 'Modern Sofa',
    customerName: 'Alice Johnson',
    rating: 5,
    comment: 'Absolutely love this sofa! It\'s comfortable, stylish, and fits perfectly in my living room.',
    date: '2025-05-10',
    status: 'Published',
  },
  {
    id: 2,
    productId: 3,
    productName: 'Wooden Coffee Table',
    customerName: 'Bob Smith',
    rating: 4,
    comment: 'Great coffee table with excellent craftsmanship. Took away one star because the assembly instructions were a bit confusing.',
    date: '2025-05-09',
    status: 'Published',
  },
  {
    id: 3,
    productId: 5,
    productName: 'Dining Chair Set',
    customerName: 'Carol White',
    rating: 2,
    comment: 'The chairs look nice but they are not comfortable for long dinners. Also, one of them came with a scratch.',
    date: '2025-05-08',
    status: 'Hidden',
  },
  {
    id: 4,
    productId: 2,
    productName: 'Queen Size Bed',
    customerName: 'David Brown',
    rating: 5,
    comment: 'Extremely happy with this purchase! The bed is solid, looks premium, and was easy to assemble.',
    date: '2025-05-07',
    status: 'Pending',
  },
  {
    id: 5,
    productId: 8,
    productName: 'Bookshelf',
    customerName: 'Eva Green',
    rating: 1,
    comment: 'Very disappointed. The bookshelf arrived damaged and customer service was not helpful.',
    date: '2025-05-06',
    status: 'Hidden',
  },
];

const ReviewsList = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Filter reviews based on search term and status
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || review.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (reviewId: number, newStatus: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
    toast.success(`Review status changed to ${newStatus}`);
  };
  
  const handleDeleteReview = (reviewId: number) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
    toast.success("Review deleted successfully");
  };
  
  const handleViewReview = (reviewId: number) => {
    const review = reviews.find(r => r.id === reviewId);
    toast.info(`Viewing details for review #${reviewId} on product: ${review?.productName}`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-medium">Customer Reviews</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search reviews..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === 'All' ? 'default' : 'outline'} 
                onClick={() => setFilterStatus('All')}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={filterStatus === 'Published' ? 'default' : 'outline'} 
                onClick={() => setFilterStatus('Published')}
                size="sm"
              >
                Published
              </Button>
              <Button 
                variant={filterStatus === 'Pending' ? 'default' : 'outline'} 
                onClick={() => setFilterStatus('Pending')}
                size="sm"
              >
                Pending
              </Button>
              <Button 
                variant={filterStatus === 'Hidden' ? 'default' : 'outline'} 
                onClick={() => setFilterStatus('Hidden')}
                size="sm"
              >
                Hidden
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.productName}</TableCell>
                  <TableCell>{review.customerName}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < review.rating ? "gold" : "none"} 
                          color={i < review.rating ? "gold" : "gray"} 
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Badge variant={
                      review.status === 'Published' ? 'default' :
                      review.status === 'Pending' ? 'outline' : 'secondary'
                    }>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewReview(review.id)}>
                        <Eye size={14} />
                      </Button>
                      <select 
                        className="text-xs border rounded py-1 px-2" 
                        value={review.status}
                        onChange={(e) => handleStatusChange(review.id, e.target.value)}
                      >
                        <option value="Published">Published</option>
                        <option value="Pending">Pending</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reviews found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewsList;
