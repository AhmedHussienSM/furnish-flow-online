
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product, Size, Color } from '../types';

type CartAction = 
  | { type: 'ADD_ITEM', payload: CartItem }
  | { type: 'REMOVE_ITEM', payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY', payload: { productId: number, quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity: number, selectedColor: Color, selectedSize: Size) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateCartTotals = (items: CartItem[]): CartState => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.07; // 7% tax
  const shipping = items.length > 0 ? (subtotal < 1000 ? 49.99 : 0) : 0; // Free shipping over $1000
  
  return {
    items,
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping,
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => 
        item.productId === action.payload.productId && 
        item.selectedColor.id === action.payload.selectedColor.id && 
        item.selectedSize.id === action.payload.selectedSize.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return calculateCartTotals(updatedItems);
      } else {
        return calculateCartTotals([...state.items, action.payload]);
      }
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.productId !== action.payload.productId);
      return calculateCartTotals(updatedItems);
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => 
        item.productId === action.payload.productId 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      return calculateCartTotals(updatedItems);
    }
    case 'CLEAR_CART': {
      return calculateCartTotals([]);
    }
    default:
      return state;
  }
};

const initialCartState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialCartState;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, selectedColor: Color, selectedSize: Size) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, productId: product.id, quantity, selectedColor, selectedSize }
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
