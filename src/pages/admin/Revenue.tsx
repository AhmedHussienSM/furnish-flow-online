
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Calendar, Download } from 'lucide-react';

// Mock data for charts and statistics
const monthlyRevenueData = [
  { name: 'Jan', revenue: 12500 },
  { name: 'Feb', revenue: 13800 },
  { name: 'Mar', revenue: 15200 },
  { name: 'Apr', revenue: 14900 },
  { name: 'May', revenue: 16700 },
  { name: 'Jun', revenue: 17800 },
  { name: 'Jul', revenue: 18900 },
  { name: 'Aug', revenue: 19200 },
  { name: 'Sep', revenue: 20100 },
  { name: 'Oct', revenue: 22400 },
  { name: 'Nov', revenue: 24800 },
  { name: 'Dec', revenue: 27500 },
];

const categoryRevenueData = [
  { name: 'Living Room', revenue: 85700 },
  { name: 'Bedroom', revenue: 72400 },
  { name: 'Dining', revenue: 47300 },
  { name: 'Office', revenue: 38900 },
  { name: 'Outdoor', revenue: 31600 },
];

const platformRevenueData = [
  { name: 'Website', revenue: 189500 },
  { name: 'Instagram', revenue: 47200 },
  { name: 'Facebook', revenue: 32400 },
  { name: 'Telegram', revenue: 6800 },
];

const recentTransactions = [
  { id: 'INV-2025-056', date: '2025-05-12', customer: 'Michael Brown', amount: 2699.99, platform: 'Website' },
  { id: 'INV-2025-055', date: '2025-05-11', customer: 'Sarah Wilson', amount: 1249.95, platform: 'Instagram' },
  { id: 'INV-2025-054', date: '2025-05-11', customer: 'David Lee', amount: 899.00, platform: 'Facebook' },
  { id: 'INV-2025-053', date: '2025-05-10', customer: 'Jennifer Garcia', amount: 3459.90, platform: 'Website' },
  { id: 'INV-2025-052', date: '2025-05-09', customer: 'Robert Martinez', amount: 1199.00, platform: 'Website' },
];

const Revenue = () => {
  const [period, setPeriod] = useState('year');
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-medium">Revenue Dashboard</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="year" onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              <span>Custom Range</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Revenue Overview Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$224,900.00</div>
              <div className="flex items-center pt-1 space-x-1 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  18.2%
                </span>
                <span className="text-muted-foreground">from previous {period}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,854.00</div>
              <div className="flex items-center pt-1 space-x-1 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  7.4%
                </span>
                <span className="text-muted-foreground">from previous {period}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Order Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <div className="flex items-center pt-1 space-x-1 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  12.8%
                </span>
                <span className="text-muted-foreground">from previous {period}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Return Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4%</div>
              <div className="flex items-center pt-1 space-x-1 text-sm">
                <span className="text-red-500 flex items-center">
                  <ArrowDownRight size={16} className="mr-1" />
                  0.8%
                </span>
                <span className="text-muted-foreground">from previous {period}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#6941C6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryRevenueData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#8884d8" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Platform</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={platformRevenueData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Units Sold</TableHead>
                        <TableHead>Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Luxe Leather Sofa</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>$46,200</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Harmony Bed Frame</TableCell>
                        <TableCell>35</TableCell>
                        <TableCell>$38,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Elegance Dining Table</TableCell>
                        <TableCell>28</TableCell>
                        <TableCell>$33,600</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Modern Lounge Chair</TableCell>
                        <TableCell>56</TableCell>
                        <TableCell>$30,800</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Executive Office Desk</TableCell>
                        <TableCell>22</TableCell>
                        <TableCell>$28,600</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Demographics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { age: '18-24', count: 15 },
                        { age: '25-34', count: 32 },
                        { age: '35-44', count: 47 },
                        { age: '45-54', count: 26 },
                        { age: '55+', count: 22 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Customers" fill="#6941C6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map(transaction => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.platform}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Completed
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Revenue;
