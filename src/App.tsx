
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import ReviewPage from "./pages/ReviewPage";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import ProductForm from "./pages/admin/ProductForm";
import CategoriesList from "./pages/admin/CategoriesList";
import CategoryForm from "./pages/admin/CategoryForm";
import UsersList from "./pages/admin/UsersList";
import Settings from "./pages/admin/Settings";
import ReviewsList from "./pages/admin/ReviewsList";
import OrdersList from "./pages/admin/OrdersList";
import Permissions from "./pages/admin/Permissions";
import Revenue from "./pages/admin/Revenue";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Customer-facing routes */}
            <Route path="/" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Index />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/products" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <ProductsPage />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/product/:productId" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <ProductDetail />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/review/:productId" element={<ReviewPage />} />
            
            <Route path="/category/:slug" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <CategoryPage />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/cart" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <CartPage />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/checkout" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <CheckoutPage />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/about" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <AboutUs />
                </main>
                <Footer />
              </div>
            } />
            
            <Route path="/contact" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <ContactPage />
                </main>
                <Footer />
              </div>
            } />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductsList />} />
            <Route path="/admin/products/:productId" element={<ProductForm />} />
            <Route path="/admin/categories" element={<CategoriesList />} />
            <Route path="/admin/categories/:categoryId" element={<CategoryForm />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/reviews" element={<ReviewsList />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/admin/permissions" element={<Permissions />} />
            <Route path="/admin/revenue" element={<Revenue />} />
            <Route path="/admin/settings" element={<Settings />} />
            
            <Route path="*" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <NotFound />
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
