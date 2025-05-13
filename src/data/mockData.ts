
import { Product, Category, Size, Color } from '../types';

// Available colors
export const colors: Color[] = [
  { id: 1, name: 'Natural Oak', value: '#D4BF9A' },
  { id: 2, name: 'Walnut', value: '#5C4033' },
  { id: 3, name: 'White', value: '#FFFFFF' },
  { id: 4, name: 'Black', value: '#222222' },
  { id: 5, name: 'Navy Blue', value: '#1A2B50' },
  { id: 6, name: 'Emerald Green', value: '#0E4C36' },
  { id: 7, name: 'Charcoal Gray', value: '#3C3C3C' },
  { id: 8, name: 'Beige', value: '#E8DCCA' },
  { id: 9, name: 'Terracotta', value: '#CB6843' },
];

// Available sizes
export const sizes: Size[] = [
  { id: 1, name: 'Small', dimensions: '80 x 60 x 40 cm' },
  { id: 2, name: 'Medium', dimensions: '120 x 80 x 45 cm' },
  { id: 3, name: 'Large', dimensions: '180 x 100 x 50 cm' },
  { id: 4, name: 'XL', dimensions: '200 x 120 x 60 cm' },
  { id: 5, name: 'Custom', dimensions: 'Custom dimensions' },
];

// Product categories
export const categories: Category[] = [
  { 
    id: 1, 
    name: 'Living Room', 
    slug: 'living-room', 
    image: '/src/assets/category-living-room.jpg',
    description: 'Comfortable and stylish furniture for your living space.',
    count: 18
  },
  { 
    id: 2, 
    name: 'Bedroom', 
    slug: 'bedroom', 
    image: '/src/assets/category-bedroom.jpg',
    description: 'Create your perfect sleep sanctuary with our bedroom collection.',
    count: 24
  },
  { 
    id: 3, 
    name: 'Dining Room', 
    slug: 'dining-room', 
    image: '/src/assets/category-dining.jpg',
    description: 'Elegant tables and chairs for memorable dining experiences.',
    count: 15
  },
  { 
    id: 4, 
    name: 'Office', 
    slug: 'office', 
    image: '/src/assets/category-office.jpg',
    description: 'Functional and ergonomic furniture for productive workspaces.',
    count: 12
  },
  { 
    id: 5, 
    name: 'Outdoor', 
    slug: 'outdoor', 
    image: '/src/assets/category-outdoor.jpg',
    description: 'Weather-resistant furniture for your garden, patio or balcony.',
    count: 9
  },
];

// Products
export const products: Product[] = [
  {
    id: 1,
    name: 'Copenhagen Sofa',
    description: 'A minimalist Scandinavian design sofa with clean lines and exceptional comfort. Perfect for modern living spaces.',
    price: 1299.99,
    sku: 'SOF-CPH-001',
    images: ['/src/assets/sofa-1.jpg', '/src/assets/sofa-1-alt.jpg', '/src/assets/sofa-1-detail.jpg'],
    availableSizes: [sizes[1], sizes[2], sizes[3]],
    availableColors: [colors[0], colors[1], colors[2], colors[4]],
    stock: 15,
    categoryId: 1,
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 2,
    name: 'Palermo Dining Table',
    description: 'An elegant dining table with a solid oak top and sculptural base. Seats up to 8 people comfortably.',
    price: 899.99,
    sku: 'TBL-PLM-002',
    images: ['/src/assets/table-1.jpg', '/src/assets/table-1-alt.jpg'],
    availableSizes: [sizes[1], sizes[2]],
    availableColors: [colors[0], colors[1]],
    stock: 8,
    categoryId: 3,
    featured: true,
    bestseller: false,
    rating: 4.6,
    reviewCount: 86
  },
  {
    id: 3,
    name: 'Vienna Armchair',
    description: 'A comfortable and stylish armchair with plush cushions and a sturdy frame. Perfect as an accent piece or for cozy reading corners.',
    price: 499.99,
    sku: 'CHR-VNA-003',
    images: ['/src/assets/chair-1.jpg', '/src/assets/chair-1-alt.jpg'],
    availableSizes: [sizes[0]],
    availableColors: [colors[4], colors[5], colors[7], colors[8]],
    stock: 22,
    categoryId: 1,
    featured: false,
    bestseller: true,
    rating: 4.9,
    reviewCount: 208
  },
  {
    id: 4,
    name: 'Luxor King Bed',
    description: 'A luxurious king-size bed with a tufted headboard and solid wood frame. Combines elegance with sturdy construction for the perfect centerpiece in your bedroom.',
    price: 1599.99,
    sku: 'BED-LXR-004',
    images: ['/src/assets/bed-1.jpg', '/src/assets/bed-1-alt.jpg'],
    availableSizes: [sizes[2], sizes[3], sizes[4]],
    availableColors: [colors[0], colors[1], colors[2], colors[3], colors[7]],
    stock: 5,
    categoryId: 2,
    featured: true,
    bestseller: true,
    rating: 4.7,
    reviewCount: 63
  },
  {
    id: 5,
    name: 'Oslo Coffee Table',
    description: 'A modern coffee table with clean lines and a marble top. The perfect addition to your living room.',
    price: 349.99,
    sku: 'TBL-OSL-005',
    images: ['/src/assets/coffee-table-1.jpg', '/src/assets/coffee-table-1-alt.jpg'],
    availableSizes: [sizes[0], sizes[1]],
    availableColors: [colors[0], colors[1], colors[3], colors[7]],
    stock: 18,
    categoryId: 1,
    featured: false,
    bestseller: false,
    rating: 4.5,
    reviewCount: 42
  },
  {
    id: 6,
    name: 'Zurich Office Desk',
    description: 'A spacious and functional desk with built-in cable management and ample storage. Perfect for home offices or professional workspaces.',
    price: 749.99,
    sku: 'DSK-ZRH-006',
    images: ['/src/assets/desk-1.jpg', '/src/assets/desk-1-alt.jpg'],
    availableSizes: [sizes[1], sizes[2]],
    availableColors: [colors[0], colors[1], colors[2], colors[3]],
    stock: 10,
    categoryId: 4,
    featured: true,
    bestseller: false,
    rating: 4.6,
    reviewCount: 37
  },
  {
    id: 7,
    name: 'Milan Wardrobe',
    description: 'A spacious wardrobe with sliding doors and internal organization. Modern design meets practical storage.',
    price: 1199.99,
    sku: 'WRB-MLN-007',
    images: ['/src/assets/wardrobe-1.jpg', '/src/assets/wardrobe-1-alt.jpg'],
    availableSizes: [sizes[2], sizes[3]],
    availableColors: [colors[0], colors[1], colors[2], colors[3], colors[7]],
    stock: 7,
    categoryId: 2,
    featured: false,
    bestseller: false,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 8,
    name: 'Barcelona Bookshelf',
    description: 'A versatile bookshelf with an open design to display your books and decorative items. Made from solid wood with a beautiful finish.',
    price: 599.99,
    sku: 'BSH-BCN-008',
    images: ['/src/assets/bookshelf-1.jpg', '/src/assets/bookshelf-1-alt.jpg'],
    availableSizes: [sizes[1], sizes[2]],
    availableColors: [colors[0], colors[1], colors[2], colors[3]],
    stock: 12,
    categoryId: 1,
    featured: false,
    bestseller: true,
    rating: 4.7,
    reviewCount: 54
  },
];

// Featured collections for homepage
export const featuredCollections = [
  {
    id: 1,
    name: 'Summer Collection',
    description: 'Bright and airy pieces perfect for the warm season',
    image: '/src/assets/summer-collection.jpg'
  },
  {
    id: 2,
    name: 'Scandinavian Design',
    description: 'Minimalist furniture with clean lines and functionality',
    image: '/src/assets/scandinavian-collection.jpg'
  },
  {
    id: 3,
    name: 'Home Office Essentials',
    description: 'Create a productive and comfortable workspace at home',
    image: '/src/assets/office-collection.jpg'
  }
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Sophia Martinez',
    role: 'Interior Designer',
    comment: 'The quality of furniture from Elegance Home is exceptional. My clients are always impressed with their pieces.',
    avatar: '/src/assets/testimonial-1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Homeowner',
    comment: 'I furnished my entire living room with pieces from Elegance Home. The customer service and delivery were excellent.',
    avatar: '/src/assets/testimonial-2.jpg'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Architect',
    comment: 'The attention to detail and craftsmanship in their furniture is unmatched. I highly recommend their custom pieces.',
    avatar: '/src/assets/testimonial-3.jpg'
  }
];
