import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock categories data
const categories = [
  { 
    id: 1, 
    name: 'Living Room', 
    slug: 'living-room', 
    image: '/src/assets/category-living-room.jpg', 
    description: 'Furniture designed for living rooms and lounges.',
    count: 12 
  },
  { id: 2, name: 'Bedroom', slug: 'bedroom', image: '/src/assets/category-bedroom.jpg', description: 'Furniture for sleeping and relaxation.', count: 8 },
  { id: 3, name: 'Dining Room', slug: 'dining-room', image: '/src/assets/category-dining.jpg', description: 'Furniture for dining and entertaining.', count: 6 },
  { id: 4, name: 'Office', slug: 'office', image: '/src/assets/category-office.jpg', description: 'Furniture for home office and study.', count: 5 },
  { id: 5, name: 'Outdoor', slug: 'outdoor', image: '/src/assets/category-outdoor.jpg', description: 'Furniture for outdoor living and relaxation.', count: 4 }
];

const CategoryForm = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find category if editing existing one
  const existingCategory = categoryId && categoryId !== 'new' 
    ? categories.find(c => c.id === parseInt(categoryId))
    : null;
  
  const [formData, setFormData] = useState({
    name: existingCategory?.name || '',
    slug: existingCategory?.slug || '',
    description: existingCategory?.description || '',
    image: existingCategory?.image || '/placeholder.svg'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Auto-generate slug from name if name is changed
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this data to your backend
    // For now, we'll just show a success message
    toast({
      title: existingCategory ? "Category updated" : "Category created",
      description: `Successfully ${existingCategory ? 'updated' : 'added'} ${formData.name}`,
    });
    
    navigate('/admin/categories');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-serif font-medium mb-6">
          {existingCategory ? 'Edit Category' : 'Add New Category'}
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Basic Information</h2>
                
                <div>
                  <Label htmlFor="name">Category Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                  <Input 
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Used in URLs: example.com/category/<strong>{formData.slug}</strong>
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="h-40"
                  />
                </div>
              </div>
              
              {/* Image Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Category Image</h2>
                
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Category preview" 
                    className="w-full aspect-video object-cover"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image"
                    name="image"
                    type="text"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter image URL or upload (upload feature to be implemented)
                  </p>
                </div>
                
                <Button type="button" variant="outline" className="w-full">
                  Upload Image
                </Button>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/categories')}
              >
                Cancel
              </Button>
              <Button type="submit">
                {existingCategory ? 'Update Category' : 'Create Category'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryForm;
