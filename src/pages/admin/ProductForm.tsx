import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Initialize form data with empty values
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    description: '',
    categoryId: 1,
    featured: false,
    bestseller: false
  });

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
  
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  
  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId && productId !== 'new') {
        try {
          setLoading(true);
          const product = await api.getProductById(parseInt(productId));
          console.log('Fetched product:', product); // Debug log
          
          if (!product) {
            toast({
              title: "Error",
              description: "Product not found",
              variant: "destructive"
            });
            navigate('/admin/products');
            return;
          }
          
          // Update form data with fetched product
          setFormData({
            name: product.name || '',
            sku: product.sku || '',
            price: product.price || 0,
            stock: product.stock || 0,
            description: product.description || '',
            categoryId: product.categoryId || 1,
            featured: Boolean(product.featured),
            bestseller: Boolean(product.bestseller)
          });
          
          // Update colors and sizes if they exist
          if (product.availableColors && Array.isArray(product.availableColors)) {
            const colorIds = product.availableColors
              .filter(color => color && typeof color.id === 'number')
              .map(color => color.id);
            console.log('Setting color IDs:', colorIds);
            setSelectedColors(colorIds);
          } else {
            setSelectedColors([]); // Reset to empty if no colors available
          }
          
          if (product.availableSizes && Array.isArray(product.availableSizes)) {
            const sizeIds = product.availableSizes
              .filter(size => size && typeof size.id === 'number')
              .map(size => size.id);
            console.log('Setting size IDs:', sizeIds);
            setSelectedSizes(sizeIds);
          } else {
            setSelectedSizes([]); // Reset to empty if no sizes available
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          toast({
            title: "Error",
            description: "Failed to fetch product details",
            variant: "destructive"
          });
          navigate('/admin/products');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchProduct();
  }, [productId, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Format the data to match server expectations
      const productData = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        categoryId: Number(formData.categoryId),
        featured: Boolean(formData.featured),
        bestseller: Boolean(formData.bestseller),
        availableColors: selectedColors.map(id => {
          const color = colorOptions.find(c => c.id === id);
          return {
            name: color?.name || '',
            value: color?.value || ''
          };
        }),
        availableSizes: selectedSizes.map(id => {
          const size = sizeOptions.find(s => s.id === id);
          return {
            name: size?.name || '',
            dimensions: size?.dimensions || ''
          };
        })
      };

      if (productId && productId !== 'new') {
        await api.updateProduct(parseInt(productId), productData);
        toast({
          title: "Success",
          description: "Product updated successfully"
        });
      } else {
        await api.createProduct(productData);
        toast({
          title: "Success",
          description: "Product created successfully"
        });
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error submitting product:', error);
      toast({
        title: "Error",
        description: productId && productId !== 'new' ? "Failed to update product" : "Failed to create product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-serif font-medium mb-6">
          {productId && productId !== 'new' ? 'Edit Product' : 'Add New Product'}
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
                    value={formData.price === '' ? '' : Number(formData.price)}
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
                    value={formData.stock === '' ? '' : Number(formData.stock)}
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
                      className={`flex items-center p-2 rounded border cursor-pointer ${
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
                      className={`flex items-center p-2 rounded border cursor-pointer ${
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
                 {/* 
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
                 */}
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
                {productId && productId !== 'new' ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
