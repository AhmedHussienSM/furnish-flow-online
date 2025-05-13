
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  images: string[];
  availableSizes: Size[];
  availableColors: Color[];
  stock: number;
  categoryId: number;
  featured: boolean;
  bestseller: boolean;
  rating: number;
  reviewCount: number;
}

export interface Size {
  id: number;
  name: string;
  dimensions: string;
}

export interface Color {
  id: number;
  name: string;
  value: string; // hex code
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  count: number; // number of products in category
}

export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
}
