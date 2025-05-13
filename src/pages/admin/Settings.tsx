
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Shield, CreditCard, Mail, Bell, Database } from 'lucide-react';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Elegance Furniture',
    siteDescription: 'Premium furniture for modern living spaces',
    contactEmail: 'contact@elegancefurniture.com',
    supportPhone: '+1 (555) 123-4567',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    newReviews: true,
    lowStock: true,
    securityAlerts: true,
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings updated");
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.info(`${setting} notifications ${notificationSettings[setting] ? 'disabled' : 'enabled'}`);
  };
  
  const handlePaymentSettingsSave = () => {
    toast.success("Payment settings updated");
  };
  
  const handleDatabaseBackup = () => {
    toast.success("Database backup initiated");
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-serif font-medium mb-6">Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleGeneralSubmit}>
              <h2 className="text-lg font-medium mb-4">General Settings</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input 
                    id="site-name" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input 
                    id="site-description" 
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input 
                    id="support-phone" 
                    value={generalSettings.supportPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportPhone: e.target.value})}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 bg-furniture-primary hover:bg-furniture-primary/90">
                Save Changes
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="notifications" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <Label htmlFor="order-notifications">Order Notifications</Label>
                </div>
                <Switch 
                  id="order-notifications" 
                  checked={notificationSettings.orderNotifications}
                  onCheckedChange={() => handleNotificationToggle('orderNotifications')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <Label htmlFor="review-notifications">New Reviews</Label>
                </div>
                <Switch 
                  id="review-notifications" 
                  checked={notificationSettings.newReviews}
                  onCheckedChange={() => handleNotificationToggle('newReviews')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <Label htmlFor="stock-notifications">Low Stock Alerts</Label>
                </div>
                <Switch 
                  id="stock-notifications" 
                  checked={notificationSettings.lowStock}
                  onCheckedChange={() => handleNotificationToggle('lowStock')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <Label htmlFor="security-notifications">Security Alerts</Label>
                </div>
                <Switch 
                  id="security-notifications" 
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={() => handleNotificationToggle('securityAlerts')}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Payment Settings</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="stripe-key">Stripe API Key</Label>
                <div className="flex gap-2">
                  <Input id="stripe-key" type="password" value="sk_test_••••••••••••••••" disabled />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-methods">Payment Methods</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="credit-card" defaultChecked />
                    <label htmlFor="credit-card" className="text-sm">Credit/Debit Cards</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="installment" defaultChecked />
                    <label htmlFor="installment" className="text-sm">Installment Plans</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="cod" defaultChecked />
                    <label htmlFor="cod" className="text-sm">Cash on Delivery</label>
                  </div>
                </div>
              </div>
              <Button onClick={handlePaymentSettingsSave} className="mt-2">
                <CreditCard size={18} className="mr-2" />
                Save Payment Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="database" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Database Management</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Database Backup</h3>
                    <p className="text-sm text-gray-600">Last backup: 2025-05-12</p>
                  </div>
                  <Button onClick={handleDatabaseBackup}>
                    <Database size={18} className="mr-2" />
                    Backup Now
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-2">Export Data</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Export Products</Button>
                  <Button variant="outline" size="sm">Export Orders</Button>
                  <Button variant="outline" size="sm">Export Users</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Enhance your account security</p>
                  </div>
                  <Button>
                    <Shield size={18} className="mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-2">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="complex-password" defaultChecked />
                    <Label htmlFor="complex-password">Require complex passwords</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="password-expiry" />
                    <Label htmlFor="password-expiry">Password expires every 90 days</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
