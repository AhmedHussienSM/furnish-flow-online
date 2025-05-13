
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { PlusCircle, Edit, Trash, ExternalLink } from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: 1,
    customerName: 'Alex Johnson',
    amount: 1299.99,
    date: '2025-05-10',
    status: 'Completed',
    items: 3,
    source: 'Website',
  },
  {
    id: 2,
    customerName: 'Maria Garcia',
    amount: 459.95,
    date: '2025-05-09',
    status: 'Processing',
    items: 2,
    source: 'Facebook',
  },
  {
    id: 3,
    customerName: 'James Smith',
    amount: 789.50,
    date: '2025-05-08',
    status: 'Shipped',
    items: 5,
    source: 'Instagram',
  },
  {
    id: 4,
    customerName: 'Emma Wilson',
    amount: 349.99,
    date: '2025-05-07',
    status: 'Pending',
    items: 1,
    source: 'Telegram',
  },
];

const OrdersList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order added successfully");
    setIsDialogOpen(false);
  };
  
  const handleEditOrder = (orderId: number) => {
    toast.info(`Editing order #${orderId}`);
  };
  
  const handleDeleteOrder = (orderId: number) => {
    toast.success(`Order #${orderId} deleted`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-medium">Orders Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-furniture-primary hover:bg-furniture-primary/90">
                <PlusCircle size={18} className="mr-2" />
                Add External Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Order from External Source</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddOrder} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="customer-name">Customer Name</Label>
                    <Input id="customer-name" placeholder="Enter customer name" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="order-amount">Order Amount</Label>
                      <Input type="number" id="order-amount" placeholder="0.00" step="0.01" min="0" required />
                    </div>
                    <div>
                      <Label htmlFor="items-count">Number of Items</Label>
                      <Input type="number" id="items-count" placeholder="1" min="1" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="order-date">Order Date</Label>
                      <Input type="date" id="order-date" required />
                    </div>
                    <div>
                      <Label htmlFor="order-status">Status</Label>
                      <Select defaultValue="processing">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="order-source">Order Source</Label>
                    <Select defaultValue="facebook">
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="aliexpress">AliExpress</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-furniture-primary hover:bg-furniture-primary/90">
                      Add Order
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {order.source === 'Website' ? null : <ExternalLink size={14} />}
                      {order.source}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditOrder(order.id)}>
                        <Edit size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteOrder(order.id)}>
                        <Trash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersList;
