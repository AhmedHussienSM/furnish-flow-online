
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, ArrowRight, Info } from 'lucide-react';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-furniture-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-6">Your Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="font-serif text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any furniture to your cart yet.</p>
            <Link 
              to="/products" 
              className="inline-block bg-furniture-primary hover:bg-furniture-accent text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b">
                  <h2 className="font-serif text-xl font-medium">Cart Items ({cart.items.length})</h2>
                </div>

                {/* Items */}
                <div className="divide-y">
                  {cart.items.map((item) => (
                    <div key={`${item.productId}-${item.selectedColor.id}-${item.selectedSize.id}`} className="p-6 flex flex-col sm:flex-row items-start">
                      {/* Product Image */}
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-24 h-24 object-cover rounded-md mr-6 mb-4 sm:mb-0"
                      />
                      
                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <Link to={`/product/${item.productId}`} className="font-medium hover:text-furniture-primary">
                            {item.product.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="text-gray-500 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                          <p>Color: <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            backgroundColor: item.selectedColor.value,
                            borderRadius: '50%',
                            marginRight: '4px',
                            verticalAlign: 'middle'
                          }}></span> {item.selectedColor.name}</p>
                          <p>Size: {item.selectedSize.name === 'Custom' ? 'Custom Size' : item.selectedSize.name}</p>
                          <p>Price: ${item.product.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center border rounded-l-md bg-white hover:bg-gray-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-12 h-8 flex items-center justify-center border-y bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, Math.min(item.product.stock, item.quantity + 1))}
                              className="w-8 h-8 flex items-center justify-center border rounded-r-md bg-white hover:bg-gray-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span>${cart.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <span>Shipping</span>
                      <div className="group relative ml-1 cursor-help">
                        <Info size={14} />
                        <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 bg-black text-white text-xs rounded p-2 mb-2">
                          Free shipping on orders over $1000.
                        </div>
                      </div>
                    </div>
                    <span>{cart.shipping > 0 ? `$${cart.shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link 
                    to="/checkout"
                    className="block w-full bg-furniture-primary hover:bg-furniture-accent text-white text-center px-6 py-3 rounded-md transition-colors font-medium"
                  >
                    Proceed to Checkout <ArrowRight size={16} className="inline ml-1" />
                  </Link>
                </div>
                <div className="mt-4">
                  <Link 
                    to="/products" 
                    className="block w-full text-center text-furniture-primary hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
                <div className="mt-8 text-sm text-gray-600">
                  <h3 className="font-medium mb-2">We Accept</h3>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-900 rounded"></div>
                    <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    <div className="w-10 h-6 bg-red-500 rounded"></div>
                    <div className="w-10 h-6 bg-yellow-500 rounded"></div>
                  </div>
                  <p className="mt-2">Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
