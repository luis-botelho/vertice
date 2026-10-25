import React, { useState, useEffect } from 'react';
import {
  AppView,
  Product,
  QuoteItem,
  CustomerData,
  RepresentativeData,
  QuotationRecord,
} from './types';
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
import { loadPersistedState, updatePersistedState } from './lib/storage';

const STORAGE_KEY_AUTH = 'vertice_rep_auth';

const EMPTY_REPRESENTATIVE: RepresentativeData = {
  nome: '',
  registro: '',
  regiao: '',
  mesaComercial: '',
  telefone: '',
  email: '',
};

const EMPTY_CUSTOMER_DATA: CustomerData = {
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
};

export default function App() {
  const [persistedState] = useState(() => loadPersistedState());

  // Products Catalog (Fed by representative & persisted in localStorage)
  const [products, setProducts] = useState<Product[]>(() =>
    Array.isArray(persistedState.products) ? persistedState.products : [],
  );

  // Representative Authentication State (Restricted route)
  const [isRepAuthenticated, setIsRepAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Representative profile data (editable in the representative dashboard)
  const [representativeData, setRepresentativeData] = useState<RepresentativeData>(() => ({
    ...EMPTY_REPRESENTATIVE,
    ...(persistedState.representative ?? {}),
  }));

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0] ?? null,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quotation cart draft (persisted so the buyer can resume the journey)
  const [cartItems, setCartItems] = useState<QuoteItem[]>(() =>
    Array.isArray(persistedState.cart) ? persistedState.cart : [],
  );

  // Customer draft (persisted across reloads and used by the representative desk)
  const [customerData, setCustomerData] = useState<CustomerData>(() => ({
    ...EMPTY_CUSTOMER_DATA,
    ...(persistedState.customer ?? {}),
  }));

  // All submitted quotations (persisted so the representative can access them later)
  const [quotations, setQuotations] = useState<QuotationRecord[]>(() =>
    Array.isArray(persistedState.quotations) ? persistedState.quotations : [],
  );

  const [activeQuotationId, setActiveQuotationId] = useState<string | null>(
    persistedState.activeQuotationId ?? null,
  );

  const activeQuotation =
    quotations.find((quotation) => quotation.id === activeQuotationId) ?? quotations[0] ?? null;

  // Persist the full customer journey as a single versioned JSON document
  useEffect(() => {
    updatePersistedState({ cart: cartItems });
  }, [cartItems]);

  useEffect(() => {
    updatePersistedState({ customer: customerData });
  }, [customerData]);

  useEffect(() => {
    updatePersistedState({ quotations });
  }, [quotations]);

  useEffect(() => {
    updatePersistedState({ activeQuotationId });
  }, [activeQuotationId]);

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
    if ((view === 'representative-inbox' || view === 'proposal') && !isRepAuthenticated) {
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
    updatePersistedState({ products: newProducts });
  };

  const handleSaveRepresentativeData = (data: RepresentativeData) => {
    setRepresentativeData(data);
    updatePersistedState({ representative: data });
  };

  const handleUpdateQuotation = (updatedQuotation: QuotationRecord) => {
    const updatedQuotations = quotations.map((quotation) =>
      quotation.id === updatedQuotation.id ? updatedQuotation : quotation,
    );
    setQuotations(updatedQuotations);
    updatePersistedState({ quotations: updatedQuotations });
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

  const handleStartNewQuotation = () => {
    handleClearCart();
    setActiveQuotationId(null);
    setIsCartOpen(false);
    handleNavigate('catalog');
  };

  const handleSubmitQuotation = async () => {
    const response = await apiRequest<{
      quotation?: { id?: string; protocol?: string; created_at?: string };
    }>('/quotations', {
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

    if (!response?.quotation?.id || !response.quotation.protocol) {
      throw new Error('O servidor não confirmou o registro da cotação.');
    }

    const quotation: QuotationRecord = {
      id: response.quotation.id,
      protocol: response.quotation.protocol,
      status: 'pending',
      createdAt: response.quotation.created_at ?? new Date().toISOString(),
      customerData: { ...customerData },
      items: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        notes: item.notes,
      })),
    };

    const updatedQuotations = [
      quotation,
      ...quotations.filter((item) => item.id !== quotation.id),
    ];

    setQuotations(updatedQuotations);
    setActiveQuotationId(quotation.id);

    // Persist immediately so the data survives even if the tab is closed right after submission
    updatePersistedState({
      quotations: updatedQuotations,
      activeQuotationId: quotation.id,
    });

    setCurrentView('quotation-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hide global navbar/footer when in dedicated representative login or dashboard for maximum security feel
  const isRepAdminScreen =
    currentView === 'representative-login' ||
    currentView === 'representative-inbox' ||
    currentView === 'proposal';

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

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            products={products}
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
            quotation={activeQuotation}
            representativeData={representativeData}
            onStartNewQuotation={handleStartNewQuotation}
          />
        )}

        {currentView === 'proposal' && (
          <ProposalView
            customerData={customerData}
            cartItems={cartItems}
            quotation={activeQuotation}
            representativeData={representativeData}
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
            representativeData={representativeData}
            onSaveRepresentativeData={handleSaveRepresentativeData}
            quotations={quotations}
            onUpdateQuotation={handleUpdateQuotation}
            onOpenProposal={(quotation) => {
              setActiveQuotationId(quotation.id);
              handleNavigate('proposal');
            }}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}

        {currentView === 'contact' && (
          <ContactView onNavigate={handleNavigate} representativeData={representativeData} />
        )}
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
