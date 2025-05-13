import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { products } from '../../data/mockData';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find product if editing existing one
  const existingProduct = productId && productId !== 'new' 
    ? products.find(p => p.id === parseInt(productId))
    : null;
  
  const [formData, setFormData] = useState({
    name: existingProduct?.name || '',
    sku: existingProduct?.sku || '',
    price: existingProduct?.price || 0,
    stock: existingProduct?.stock || 1,
    description: existingProduct?.description || '',
    categoryId: existingProduct?.categoryId || 1,
    featured: existingProduct?.featured || false,
    bestseller: existingProduct?.bestseller || false
  });
  
  const [images, setImages] = useState<string[]>(existingProduct?.images || ['/placeholder.svg']);
  
  // Mock color options for demo
  const colorOptions = [
    { id: 1, name: 'Natural Oak', value: '#D2B48C' },
    { id: 2, name: 'Dark Walnut', value: '#5C4033' },
    { id: 3, name: 'White', value: '#FFFFFF' },
    { id: 4, name: 'Black', value: '#000000' },
    { id: 5, name: 'Navy Blue', value: '#000080' },
    { id: 6, name: 'Forest Green', value: '#228B22' },
  ];
  
  // Mock size options for demo
  const sizeOptions = [
    { id: 1, name: 'Small', dimensions: '80cm x 80cm x 80cm' },
    { id: 2, name: 'Medium', dimensions: '120cm x 80cm x 80cm' },
    { id: 3, name: 'Large', dimensions: '160cm x 80cm x 80cm' },
    { id: 4, name: 'XL', dimensions: '200cm x 100cm x 80cm' },
    { id: 5, name: 'Custom', dimensions: 'Made to order' }
  ];
  
  const [selectedColors, setSelectedColors] = useState<number[]>(
    existingProduct?.availableColors.map(c => c.id) || [1, 2, 3]
  );
  
  const [selectedSizes, setSelectedSizes] = useState<number[]>(
    existingProduct?.availableSizes.map(s => s.id) || [1, 2, 3]
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleColorToggle = (colorId: number) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter(id => id !== colorId));
    } else {
      setSelectedColors([...selectedColors, colorId]);
    }
  };
  
  const handleSizeToggle = (sizeId: number) => {
    if (selectedSizes.includes(sizeId)) {
      setSelectedSizes(selectedSizes.filter(id => id !== sizeId));
    } else {
      setSelectedSizes([...selectedSizes, sizeId]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this data to your backend
    // For now, we'll just show a success message
    toast({
      title: existingProduct ? "Product updated" : "Product created",
      description: `Successfully ${existingProduct ? 'updated' : 'added'} ${formData.name}`,
    });
    
    navigate('/admin/products');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-serif font-medium mb-6">
          {existingProduct ? 'Edit Product' : 'Add New Product'}
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Basic Information</h2>
                
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input 
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="categoryId"
                    className="w-full rounded-md border border-input p-2"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">Living Room</option>
                    <option value="2">Bedroom</option>
                    <option value="3">Dining Room</option>
                    <option value="4">Office</option>
                    <option value="5">Outdoor</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bestseller"
                      name="bestseller"
                      checked={formData.bestseller}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Label htmlFor="bestseller">Bestseller</Label>
                  </div>
                </div>
              </div>
              
              {/* Description Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Description</h2>
                
                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="h-40"
                    required
                  />
                </div>
              </div>
              
              {/* Colors Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Available Colors</h2>
                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map(color => (
                    <div 
                      key={color.id} 
                      className={`flex items-center p-2 rounded border ${
                        selectedColors.includes(color.id) ? 'border-furniture-primary bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleColorToggle(color.id)}
                    >
                      <div 
                        className="w-6 h-6 rounded-full mr-2" 
                        style={{ backgroundColor: color.value, border: color.value === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
                      />
                      <span>{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sizes Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Available Sizes</h2>
                <div className="grid grid-cols-2 gap-2">
                  {sizeOptions.map(size => (
                    <div 
                      key={size.id} 
                      className={`flex items-center p-2 rounded border ${
                        selectedSizes.includes(size.id) ? 'border-furniture-primary bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleSizeToggle(size.id)}
                    >
                      <span className="font-medium">{size.name}</span>
                      <span className="text-xs ml-2 text-gray-500">{size.dimensions}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Images Section */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-medium">Product Images</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square relative border rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button 
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => {
                          if (images.length > 1) {
                            setImages(images.filter((_, i) => i !== index));
                          }
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    className="aspect-square border-2 border-dashed rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400"
                    onClick={() => setImages([...images, '/placeholder.svg'])}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/products')}
              >
                Cancel
              </Button>
              <Button type="submit">
                {existingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
