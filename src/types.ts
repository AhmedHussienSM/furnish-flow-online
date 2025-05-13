export interface Color {
    id: number;
    name: string;
    value: string; // Hex color value
}

export interface Size {
    id: number;
    name: string;
    dimensions: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description?: string;
    count: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    sku: string;
    stock: number;
    categoryId: number;
    featured: boolean;
    bestseller: boolean;
    rating: number;
    reviewCount: number;
    images: string[];
    availableSizes: Size[];
    availableColors: Color[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Review {
    id: number;
    productId: number;
    productName?: string;
    customerName: string;
    rating: number;
    comment: string;
    status: 'Pending' | 'Published' | 'Hidden';
    createdAt: Date;
}

export interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    amount: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled';
    source?: string;
    itemCount?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    productName?: string;
    quantity: number;
    unitPrice: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastLogin?: Date;
    createdAt: Date;
}

export interface Role {
    id: number;
    name: string;
    description?: string;
}

export interface Permission {
    id: number;
    name: string;
    description?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role?: string;
    comment: string;
    avatar?: string;
    isActive: boolean;
}

export interface FeaturedCollection {
    id: number;
    name: string;
    description?: string;
    image: string;
    isActive: boolean;
} 