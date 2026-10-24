import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 shrink-0 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 44 44" className="w-9 h-9" fill="none">
              <path d="M22 4 L31 13 L22 22 L13 13 Z" fill="#2F80ED" />
              <path d="M6 14 L22 36 L38 14 L31 14 L22 27 L13 14 Z" fill="#00162c" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-[#00162c] group-hover:text-[#005cba] transition-colors">
              VÉRTICE
            </span>
            <span className="text-[10px] font-semibold text-[#43474d] uppercase tracking-widest leading-none">
              Conectando marcas e mercados
            </span>
          </div>
        </button>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              currentView === 'home'
                ? 'bg-[#e5eeff] text-[#00162c] font-semibold'
                : 'text-[#43474d] hover:text-[#00162c] hover:bg-[#eff4ff]'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              currentView === 'catalog' || currentView === 'product-detail'
                ? 'bg-[#e5eeff] text-[#00162c] font-semibold'
                : 'text-[#43474d] hover:text-[#00162c] hover:bg-[#eff4ff]'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              currentView === 'about'
                ? 'bg-[#e5eeff] text-[#00162c] font-semibold'
                : 'text-[#43474d] hover:text-[#00162c] hover:bg-[#eff4ff]'
            }`}
          >
            Sobre a Vértice
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-3 py-1.5 rounded text-sm font-medium text-[#43474d] hover:text-[#00162c] hover:bg-[#eff4ff] transition-colors"
          >
            Como Funciona
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              currentView === 'contact'
                ? 'bg-[#e5eeff] text-[#00162c] font-semibold'
                : 'text-[#43474d] hover:text-[#00162c] hover:bg-[#eff4ff]'
            }`}
          >
            Contato
          </button>
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#43474d] bg-[#eff4ff] px-2.5 py-1.5 rounded">
            <span className="material-symbols-outlined text-[#005cba] text-[16px]">support_agent</span>
            <span className="font-medium">(24) Atendimento Costa Verde & Região</span>
          </div>

          {/* Quotation List Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] transition-colors text-xs sm:text-sm font-medium cursor-pointer"
            title="Ver lista de cotação"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00162c]">assignment</span>
            <span className="hidden sm:inline">Lista de Cotação</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#005cba] text-white text-[11px] font-bold leading-none">
              {cartCount} {cartCount === 1 ? 'item' : 'itens'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => onNavigate('quotation-form')}
            className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded bg-[#00162c] text-white hover:bg-[#005cba] transition-colors text-sm font-semibold shadow-sm cursor-pointer"
          >
            Solicitar Cotação
          </button>
        </div>
      </div>
    </header>
  );
};
