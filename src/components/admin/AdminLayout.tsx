
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ListOrdered, 
  Category, 
  Settings, 
  LogOut,
  UsersRound
} from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-serif font-medium">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center p-2 rounded-md ${isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/categories') && !isActive('/admin/orders') && !isActive('/admin/users') && !isActive('/admin/settings') ? 'bg-furniture-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <LayoutDashboard size={18} className="mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center p-2 rounded-md ${isActive('/admin/products') ? 'bg-furniture-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <ShoppingBag size={18} className="mr-2" />
            Products
          </Link>
          <Link 
            to="/admin/categories" 
            className={`flex items-center p-2 rounded-md ${isActive('/admin/categories') ? 'bg-furniture-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <Category size={18} className="mr-2" />
            Categories
          </Link>
          <Link 
            to="/admin/orders" 
            className={`flex items-center p-2 rounded-md ${isActive('/admin/orders') ? 'bg-furniture-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <ListOrdered size={18} className="mr-2" />
            Orders
          </Link>
          <Link 
            to="/admin/users" 
            className={`flex items-center p-2 rounded-md ${isActive('/admin/users') ? 'bg-furniture-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <UsersRound size={18} className="mr-2" />
            Users
          </Link>
          <Link 
            to="/admin/settings" 
            className={`flex items-center p-2 rounded-md ${isActive('/admin/settings') ? 'bg-furniture-primary text-white' : 'hover:bg-gray-100'}`}
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Link>
          <div className="pt-4 mt-4 border-t">
            <button className="flex items-center p-2 rounded-md text-red-500 hover:bg-red-50 w-full">
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-10 p-4">
        <h2 className="text-xl font-serif font-medium">Admin Panel</h2>
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-16 pb-16">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
