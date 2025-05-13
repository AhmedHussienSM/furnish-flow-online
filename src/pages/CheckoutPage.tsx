
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ChevronRight, CreditCard, DollarSign, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit order
      alert('Order placed successfully!');
      // Redirect to success page or handle as needed
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-furniture-secondary min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h1 className="font-serif text-2xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">You cannot proceed to checkout with an empty cart.</p>
            <Link 
              to="/products" 
              className="inline-block bg-furniture-primary hover:bg-furniture-accent text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-furniture-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-6">Checkout</h1>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-furniture-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-furniture-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="mt-2 text-sm">Customer Info</span>
            </div>
            <div className={`w-16 sm:w-24 h-1 ${step >= 2 ? 'bg-furniture-primary' : 'bg-gray-200'} mx-2`} />
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-furniture-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-furniture-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="mt-2 text-sm">Shipping</span>
            </div>
            <div className={`w-16 sm:w-24 h-1 ${step >= 3 ? 'bg-furniture-primary' : 'bg-gray-200'} mx-2`} />
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-furniture-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-furniture-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="mt-2 text-sm">Payment</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <>
                    <h2 className="font-serif text-xl font-medium mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          placeholder="(000) 000-0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Zip/Postal Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Shipping Method */}
                {step === 2 && (
                  <>
                    <h2 className="font-serif text-xl font-medium mb-6">Shipping Method</h2>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 hover:border-furniture-primary transition-colors cursor-pointer">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === 'standard'}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <Truck size={18} className="mr-2" />
                              <span className="font-medium">Standard Shipping</span>
                              <span className="ml-auto font-medium">
                                {cart.subtotal >= 1000 ? 'Free' : '$49.99'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Delivery in 5-7 business days
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="border rounded-md p-4 hover:border-furniture-primary transition-colors cursor-pointer">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === 'express'}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <Truck size={18} className="mr-2" />
                              <span className="font-medium">Express Shipping</span>
                              <span className="ml-auto font-medium">$99.99</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Delivery in 2-3 business days
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:border-furniture-primary transition-colors cursor-pointer">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="premium"
                            checked={formData.shippingMethod === 'premium'}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <Truck size={18} className="mr-2" />
                              <span className="font-medium">Premium Delivery</span>
                              <span className="ml-auto font-medium">$149.99</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Includes white glove service with assembly and old furniture removal
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Shipping Address Summary */}
                      <div className="mt-8 pt-6 border-t">
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <p className="text-gray-700">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.city}, {formData.state} {formData.zipCode}<br />
                          {formData.country}<br />
                          {formData.phone}
                        </p>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-furniture-primary hover:underline mt-2 text-sm"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <>
                    <h2 className="font-serif text-xl font-medium mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 hover:border-furniture-primary transition-colors cursor-pointer">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                          <div className="ml-3 flex-grow">
                            <div className="flex items-center">
                              <CreditCard size={18} className="mr-2" />
                              <span className="font-medium">Credit/Debit Card</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Pay securely with your card
                            </p>
                            
                            {formData.paymentMethod === 'card' && (
                              <div className="mt-4 space-y-3">
                                <div>
                                  <label htmlFor="cardNumber" className="block text-sm text-gray-700 mb-1">
                                    Card Number <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="cardNumber"
                                    placeholder="1234 1234 1234 1234"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label htmlFor="expiry" className="block text-sm text-gray-700 mb-1">
                                      Expiry Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      id="expiry"
                                      placeholder="MM/YY"
                                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="cvv" className="block text-sm text-gray-700 mb-1">
                                      CVV <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      id="cvv"
                                      placeholder="123"
                                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="nameOnCard" className="block text-sm text-gray-700 mb-1">
                                    Name on Card <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="nameOnCard"
                                    placeholder="John Doe"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-furniture-primary"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>

                      <div className="border rounded-md p-4 hover:border-furniture-primary transition-colors cursor-pointer">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <DollarSign size={18} className="mr-2" />
                              <span className="font-medium">Cash on Delivery</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Pay when your order is delivered
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Order Summary for Review */}
                      <div className="mt-8 pt-6 border-t">
                        <h3 className="font-medium mb-3">Order Review</h3>
                        {cart.items.map((item) => (
                          <div key={`${item.productId}-${item.selectedColor.id}-${item.selectedSize.id}`} className="flex justify-between my-2">
                            <div>
                              <span className="font-medium">{item.product.name}</span>
                              <span className="text-sm text-gray-600 ml-2">x{item.quantity}</span>
                            </div>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center text-furniture-primary hover:text-furniture-accent"
                    >
                      <ChevronLeft size={18} className="mr-1" />
                      Back
                    </button>
                  ) : (
                    <Link to="/cart" className="flex items-center text-furniture-primary hover:text-furniture-accent">
                      <ChevronLeft size={18} className="mr-1" />
                      Back to Cart
                    </Link>
                  )}
                  <button
                    type="submit"
                    className="bg-furniture-primary hover:bg-furniture-accent text-white px-6 py-2 rounded-md transition-colors font-medium flex items-center"
                  >
                    {step < 3 ? (
                      <>
                        Next Step <ChevronRight size={18} className="ml-1" />
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="max-h-64 overflow-y-auto mb-4">
                {cart.items.map((item) => (
                  <div key={`${item.productId}-${item.selectedColor.id}-${item.selectedSize.id}`} className="flex items-center py-3 border-b">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <div className="text-sm text-gray-600">
                        <p>Qty: {item.quantity}</p>
                        <p>
                          {item.selectedColor.name}, {item.selectedSize.name}
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{cart.shipping > 0 ? `$${cart.shipping.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
