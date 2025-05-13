
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ListOrdered, UsersRound, Settings, Plus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-medium">Admin Dashboard</h1>
          <div className="space-x-2">
            <Button asChild variant="outline">
              <Link to="/admin/products/new"><Plus size={16} className="mr-1" /> Add Product</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/categories/new"><Plus size={16} className="mr-1" /> Add Category</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">28</CardTitle>
              <CardDescription>Total Products</CardDescription>
            </CardHeader>
            <CardContent>
              <ShoppingBag className="text-furniture-primary" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">5</CardTitle>
              <CardDescription>Categories</CardDescription>
            </CardHeader>
            <CardContent>
              <LayoutDashboard className="text-furniture-primary" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">156</CardTitle>
              <CardDescription>Total Orders</CardDescription>
            </CardHeader>
            <CardContent>
              <ListOrdered className="text-furniture-primary" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">238</CardTitle>
              <CardDescription>Total Users</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersRound className="text-furniture-primary" />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((order) => (
                  <div key={order} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Order #{order + 1000}</p>
                      <p className="text-sm text-gray-500">Customer: John Doe</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/orders/${order}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((product) => (
                  <div key={product} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Modern Sofa</p>
                      <p className="text-sm text-gray-500">SKU: MS-{product}001</p>
                    </div>
                    <div>
                      <span className="text-red-500 font-medium">Stock: 2</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/products/${product}`}>Manage</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
