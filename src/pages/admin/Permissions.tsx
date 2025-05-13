
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, ShieldCheck } from 'lucide-react';

// Mock data for user roles and permissions
const roles = [
  { id: 1, name: 'Admin', description: 'Full access to all features' },
  { id: 2, name: 'Manager', description: 'Access to most features except system settings' },
  { id: 3, name: 'Editor', description: 'Can edit products and content' },
  { id: 4, name: 'Customer Support', description: 'Access to orders and customer data' },
  { id: 5, name: 'Marketing', description: 'Access to promotions and analytics' },
];

const permissions = {
  dashboard: { id: 1, name: 'Dashboard' },
  products: { id: 2, name: 'Products' },
  categories: { id: 3, name: 'Categories' },
  orders: { id: 4, name: 'Orders' },
  users: { id: 5, name: 'Users' },
  reviews: { id: 6, name: 'Reviews' },
  settings: { id: 7, name: 'Settings' },
  analytics: { id: 8, name: 'Analytics' },
  revenue: { id: 9, name: 'Revenue' },
  permissions: { id: 10, name: 'Permissions' },
};

// Initial permission matrix
const initialPermissionMatrix = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Admin has all permissions
  2: [1, 2, 3, 4, 5, 6, 8, 9], // Manager
  3: [1, 2, 3, 6], // Editor
  4: [1, 4, 6], // Customer Support
  5: [1, 2, 3, 8, 9], // Marketing
};

const Permissions = () => {
  const [permissionMatrix, setPermissionMatrix] = useState({...initialPermissionMatrix});
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<typeof roles[0] | null>(null);
  
  const handlePermissionChange = (roleId: number, permissionId: number) => {
    setPermissionMatrix(prev => {
      const newMatrix = {...prev};
      
      if (newMatrix[roleId].includes(permissionId)) {
        // Remove permission
        newMatrix[roleId] = newMatrix[roleId].filter(id => id !== permissionId);
      } else {
        // Add permission
        newMatrix[roleId] = [...newMatrix[roleId], permissionId];
      }
      
      return newMatrix;
    });
  };
  
  const handleSavePermissions = () => {
    toast.success("Permissions updated successfully");
  };
  
  const handleEditRole = (role: typeof roles[0]) => {
    setCurrentRole(role);
    setIsEditRoleDialogOpen(true);
  };
  
  const handleUpdateRole = () => {
    toast.success("Role updated successfully");
    setIsEditRoleDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-medium">Permissions Management</h1>
          <Button onClick={handleSavePermissions} className="bg-furniture-primary hover:bg-furniture-primary/90">
            <ShieldCheck size={18} className="mr-2" />
            Save Permission Changes
          </Button>
        </div>

        <Tabs defaultValue="matrix" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
            <TabsTrigger value="roles">User Roles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="matrix" className="bg-white rounded-lg shadow p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Permission / Role</TableHead>
                    {roles.map(role => (
                      <TableHead key={role.id} className="text-center">{role.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(permissions).map(permission => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">{permission.name}</TableCell>
                      {roles.map(role => (
                        <TableCell key={role.id} className="text-center">
                          <Checkbox 
                            checked={permissionMatrix[role.id]?.includes(permission.id)}
                            onCheckedChange={() => handlePermissionChange(role.id, permission.id)}
                            className="mx-auto"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="roles" className="bg-white rounded-lg shadow p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Number of Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map(role => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{permissionMatrix[role.id]?.length || 0}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                        <Pencil size={14} className="mr-1" /> Edit Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the role details and description.
            </DialogDescription>
          </DialogHeader>
          
          {currentRole && (
            <form className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input id="role-name" defaultValue={currentRole.name} />
                </div>
                <div>
                  <Label htmlFor="role-description">Description</Label>
                  <Input id="role-description" defaultValue={currentRole.description} />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdateRole} className="bg-furniture-primary hover:bg-furniture-primary/90">
                    Update Role
                  </Button>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Permissions;
