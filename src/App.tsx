import React, { useState, useEffect } from 'react';
import { AppView, Product, QuoteItem, CustomerData } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuotationDrawer } from './components/QuotationDrawer';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { QuotationFormView } from './views/QuotationFormView';
import { QuotationSuccessView } from './views/QuotationSuccessView';
import { ProposalView } from './views/ProposalView';
import { RepresentativeLoginView } from './views/RepresentativeLoginView';
import { RepresentativeDashboardView } from './views/RepresentativeDashboardView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { apiRequest, AUTH_TOKEN_KEY } from './lib/api';

const STORAGE_KEY_PRODUCTS = 'vertice_products_catalog';
const STORAGE_KEY_AUTH = 'vertice_rep_auth';

export default function App() {
  // Products Catalog (Fed by representative & persisted in localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar catálogo salvo:', e);
    }
    return PRODUCTS;
  });

  // Representative Authentication State (Restricted route)
  const [isRepAuthenticated, setIsRepAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || PRODUCTS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<QuoteItem[]>([]);

  const [customerData, setCustomerData] = useState<CustomerData>({
    razaoSocial: '',
    cnpj: '',
    inscricaoEstadual: '',
    compradorNome: '',
    whatsapp: '',
    email: '',
    cidade: '',
    endereco: '',
    prazoCompra: '',
    modalidadeFrete: '',
    observacoes: '',
  });

  // Handle URL hash routing (e.g. #/representante or #/admin)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/representante' || hash === '#/admin' || hash === '#/login-rep' || hash.includes('representante')) {
        if (isRepAuthenticated) {
          setCurrentView('representative-inbox');
        } else {
          setCurrentView('representative-login');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isRepAuthenticated]);

  const handleNavigate = (view: AppView) => {
    // If attempting to go to representative area without auth, redirect to login
    if (view === 'representative-inbox' && !isRepAuthenticated) {
      setCurrentView('representative-login');
      window.location.hash = '#/representante';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'representative-login' || view === 'representative-inbox') {
      window.location.hash = '#/representante';
    } else if (window.location.hash.includes('representante')) {
      window.location.hash = '';
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsRepAuthenticated(true);
    try {
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } catch (e) {
      console.warn(e);
    }
    setCurrentView('representative-inbox');
    window.location.hash = '#/representante';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsRepAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (e) {
      console.warn(e);
    }
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(newProducts));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmitQuotation = async () => {
    await apiRequest('/quotations', {
      method: 'POST',
      body: JSON.stringify({
        customer: customerData,
        items: cartItems.map(({product, quantity, notes}) => ({
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          quantity,
          notes,
        })),
      }),
    });
    setCurrentView('quotation-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hide global navbar/footer when in dedicated representative login or dashboard for maximum security feel
  const isRepAdminScreen = currentView === 'representative-login' || currentView === 'representative-inbox';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#00162c] font-sans">
      {/* Global Navbar (Only on customer/storefront views) */}
      {!isRepAdminScreen && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Main View Container */}
      <main className={`flex-1 ${!isRepAdminScreen ? 'pt-20' : ''}`}>
        {currentView === 'home' && (
          <HomeView
            products={products}
            onNavigate={handleNavigate}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              handleNavigate('product-detail');
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogView
            products={products}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              handleNavigate('product-detail');
            }}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {currentView === 'quotation-form' && (
          <QuotationFormView
            cartItems={cartItems}
            customerData={customerData}
            onUpdateCustomerData={setCustomerData}
            onSubmitQuotation={handleSubmitQuotation}
            onNavigate={handleNavigate}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        )}

        {currentView === 'quotation-success' && (
          <QuotationSuccessView
            cartItems={cartItems}
            customerData={customerData}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'proposal' && (
          <ProposalView
            customerData={customerData}
            cartItems={cartItems}
            onNavigate={handleNavigate}
          />
        )}

        {/* RESTRICTED REPRESENTATIVE LOGIN */}
        {currentView === 'representative-login' && (
          <RepresentativeLoginView
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {/* RESTRICTED REPRESENTATIVE DASHBOARD & PRODUCT MANAGER */}
        {currentView === 'representative-inbox' && (
          <RepresentativeDashboardView
            products={products}
            onSaveProducts={handleSaveProducts}
            customerData={customerData}
            cartItems={cartItems}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}

        {currentView === 'contact' && <ContactView onNavigate={handleNavigate} />}
      </main>

      {/* Slide-out Quotation Drawer */}
      <QuotationDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToForm={() => handleNavigate('quotation-form')}
        onClearCart={handleClearCart}
      />

      {/* Institutional Footer (Hidden on dedicated rep desk) */}
      {!isRepAdminScreen && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
