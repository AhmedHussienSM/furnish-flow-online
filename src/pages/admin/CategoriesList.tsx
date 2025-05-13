
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';

// Mock categories data
const categories = [
  { id: 1, name: 'Living Room', slug: 'living-room', image: '/src/assets/category-living-room.jpg', count: 12 },
  { id: 2, name: 'Bedroom', slug: 'bedroom', image: '/src/assets/category-bedroom.jpg', count: 8 },
  { id: 3, name: 'Dining Room', slug: 'dining-room', image: '/src/assets/category-dining.jpg', count: 6 },
  { id: 4, name: 'Office', slug: 'office', image: '/src/assets/category-office.jpg', count: 5 },
  { id: 5, name: 'Outdoor', slug: 'outdoor', image: '/src/assets/category-outdoor.jpg', count: 4 }
];

const CategoriesList = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-medium">Categories</h1>
          <Button asChild>
            <Link to="/admin/categories/new"><Plus size={16} className="mr-1" /> Add New Category</Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-16 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{category.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{category.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/categories/${category.id}`}>
                            <Edit size={16} className="mr-1" /> Edit
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesList;
