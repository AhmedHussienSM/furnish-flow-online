const API_URL = 'http://localhost:5000/api';

export const api = {
    async getAllProducts() {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    },

    async getProductById(id: number) {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return response.json();
    },

    async createProduct(productData: any) {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        return response.json();
    },

    async updateProduct(id: number, productData: any) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return response.json();
    },

    async getAllCategories() {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return response.json();
    },

    async getProductsByCategory(categoryId: number) {
        const response = await fetch(`${API_URL}/products/category/${categoryId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products by category');
        }
        return response.json();
    },

    async getReviewsByProduct(productId: number) {
        const response = await fetch(`${API_URL}/reviews/product/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        return response.json();
    },

    async createReview(productId: number, reviewData: any) {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, ...reviewData }),
        });
        if (!response.ok) {
            throw new Error('Failed to create review');
        }
        return response.json();
    },

    async deleteProduct(id: number) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        return response.json();
    }
}; 