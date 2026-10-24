import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, AppView } from '../types';
import { PRODUCTS } from '../data/products';

interface CatalogViewProps {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: AppView) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products = PRODUCTS,
  onSelectProduct,
  onNavigate,
  onAddToCart,
  cartCount,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('Todos');
  const [selectedApplication, setSelectedApplication] = useState<string>('Todos');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: ProductCategory[] = [
    'Todos',
    'Hidráulica & Conexões',
    'Metais & Torneiras',
    'Elétrica & Iluminação',
    'Ferramentas & Acessórios',
  ];

  const manufacturers = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.manufacturer)));
    return ['Todos', ...list];
  }, [products]);

  const applications = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.application)));
    return ['Todos', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'Todos' && item.category !== selectedCategory) {
        return false;
      }
      // Manufacturer filter
      if (selectedManufacturer !== 'Todos' && item.manufacturer !== selectedManufacturer) {
        return false;
      }
      // Application filter
      if (selectedApplication !== 'Todos' && item.application !== selectedApplication) {
        return false;
      }
      // Search query (name, sku, description, refFab)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.manufacturer.toLowerCase().includes(q) ||
          (item.refFab && item.refFab.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedManufacturer, selectedApplication, searchQuery, inStockOnly]);

  const handleAdd = (product: Product) => {
    onAddToCart(product, product.packageMasterUnits || 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 text-[#00162c]">
      {/* Catalog Header */}
      <div className="bg-[#ffffff] border-b border-[#e5eeff] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#43474d] mb-1">
                <button onClick={() => onNavigate('home')} className="hover:text-[#005cba]">Início</button>
                <span>/</span>
                <span className="text-[#00162c] font-semibold">Catálogo B2B</span>
              </div>
              <h1 className="text-3xl font-display font-extrabold text-[#00162c]">
                Catálogo Técnico de Produtos Industriais
              </h1>
              <p className="text-xs sm:text-sm text-[#43474d] mt-1">
                Tabelas de faturamento direto para materiais de construção na Costa Verde (Angra, Paraty e Mangaratiba).
              </p>
            </div>

            {/* Quick stats badge */}
            <div className="flex items-center gap-3 bg-[#f0f4fc] px-4 py-2.5 rounded-lg border border-[#e5eeff] self-start md:self-auto">
              <span className="material-symbols-outlined text-[#005cba]">verified_user</span>
              <div className="text-xs">
                <span className="font-bold text-[#00162c] block">Preços com Faturamento Direto</span>
                <span className="text-[#43474d]">Tributos e descontos calculados por CNPJ</span>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00162c] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#e2ecfd] hover:text-[#00162c]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area: Sidebar Filters + Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-[#00162c] block mb-2">
                Buscar no Catálogo
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome, SKU ou Ref. Fábrica..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                />
                <span className="material-symbols-outlined text-[18px] text-[#43474d] absolute left-2.5 top-2.5">
                  search
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-xs text-[#43474d] hover:text-[#00162c]"
                  >
                    limpar
                  </button>
                )}
              </div>
            </div>

            {/* Manufacturer Filter */}
            <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-3">
                Fabricante / Marca
              </h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {manufacturers.map((mfg) => (
                  <label
                    key={mfg}
                    className="flex items-center gap-2 text-xs text-[#43474d] hover:text-[#00162c] cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="manufacturer"
                      checked={selectedManufacturer === mfg}
                      onChange={() => setSelectedManufacturer(mfg)}
                      className="text-[#005cba] focus:ring-[#005cba]"
                    />
                    <span className={selectedManufacturer === mfg ? 'font-semibold text-[#00162c]' : ''}>
                      {mfg}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Application Filter */}
            <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-3">
                Segmento / Aplicação
              </h3>
              <div className="space-y-1.5">
                {applications.map((app) => (
                  <label
                    key={app}
                    className="flex items-center gap-2 text-xs text-[#43474d] hover:text-[#00162c] cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="application"
                      checked={selectedApplication === app}
                      onChange={() => setSelectedApplication(app)}
                      className="text-[#005cba] focus:ring-[#005cba]"
                    />
                    <span className={selectedApplication === app ? 'font-semibold text-[#00162c]' : ''}>
                      {app}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Logistics info callout */}
            <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#d2e2ff] text-xs text-[#00162c] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#005cba]">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                <span>Entrega Programada</span>
              </div>
              <p className="text-[11px] text-[#43474d] leading-relaxed">
                Rotas de entrega fixas para <strong>Angra dos Reis</strong> (terças e quintas), <strong>Paraty</strong> (quartas) e <strong>Mangaratiba</strong> (segundas e sextas).
              </p>
            </div>
          </div>

          {/* Right Column: Products Grid */}
          <div className="lg:col-span-3">
            {/* Results counter and active filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#e5eeff] gap-2">
              <div className="text-xs text-[#43474d]">
                Exibindo <strong className="text-[#00162c] font-bold">{filteredProducts.length}</strong> produtos para cotação
              </div>

              {(selectedCategory !== 'Todos' || selectedManufacturer !== 'Todos' || selectedApplication !== 'Todos' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setSelectedManufacturer('Todos');
                    setSelectedApplication('Todos');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#005cba] font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                  Limpar todos os filtros
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-[#e5eeff]">
                <span className="material-symbols-outlined text-[48px] text-[#43474d] mb-3">search_off</span>
                <h3 className="font-bold text-base text-[#00162c]">Nenhum produto encontrado</h3>
                <p className="text-xs text-[#43474d] mt-1 max-w-sm mx-auto">
                  Tente alterar seus termos de busca ou redefinir os filtros de fabricante e categoria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setSelectedManufacturer('Todos');
                    setSelectedApplication('Todos');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-[#00162c] text-white rounded text-xs font-semibold hover:bg-[#005cba]"
                >
                  Restaurar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isRecentlyAdded = addedProductId === product.id;
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl border border-[#e5eeff] p-4 flex flex-col justify-between hover:border-[#005cba]/40 transition-all shadow-sm group hover:shadow-md"
                    >
                      <div>
                        {/* Image zone */}
                        <div
                          onClick={() => {
                            onSelectProduct(product);
                            onNavigate('product-detail');
                          }}
                          className="relative h-48 rounded-lg bg-[#f8f9ff] flex items-center justify-center p-3 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 left-2.5 bg-[#00162c] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
                            {product.manufacturer}
                          </span>
                          {product.badgeHighlight && (
                            <span className="absolute top-2.5 right-2.5 bg-[#2F80ED] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                              {product.badgeHighlight}
                            </span>
                          )}
                        </div>

                        {/* Info Zone */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[11px] text-[#43474d]">
                            <span className="font-mono font-medium">{product.sku}</span>
                            <span className="text-[10px] bg-[#eff4ff] text-[#005cba] px-1.5 py-0.5 rounded font-medium">
                              {product.category.split('&')[0].trim()}
                            </span>
                          </div>

                          <h3
                            onClick={() => {
                              onSelectProduct(product);
                              onNavigate('product-detail');
                            }}
                            className="text-sm font-bold text-[#00162c] mt-1 line-clamp-2 hover:text-[#005cba] cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs text-[#43474d] mt-1 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>

                          {/* Packing specs */}
                          <div className="mt-3 bg-[#f8f9ff] p-2 rounded border border-[#edf2fa] text-[11px] text-[#43474d] space-y-0.5">
                            <div className="flex justify-between">
                              <span>Embalagem Master:</span>
                              <strong className="text-[#00162c] font-semibold">{product.packageMaster}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Faturamento Mínimo:</span>
                              <span className="text-[#00162c]">{product.minOrderQuantity} un</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="mt-4 pt-3 border-t border-[#f0f4fc]">
                        <div className="flex items-baseline justify-between mb-3">
                          <div>
                            <span className="text-[10px] text-[#43474d] block font-medium">Preço Tabela Fábrica</span>
                            <span className="text-lg font-bold text-[#00162c] font-display">
                              R$ {product.tablePrice.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-[11px] text-[#43474d]"> /{product.unit}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#005cba] bg-[#e5eeff] px-2 py-0.5 rounded">
                            Até {product.standardDiscountPercent}% desconto
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              onSelectProduct(product);
                              onNavigate('product-detail');
                            }}
                            className="h-9 rounded border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">visibility</span>
                            Ficha
                          </button>

                          <button
                            onClick={() => handleAdd(product)}
                            className={`h-9 rounded text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                              isRecentlyAdded
                                ? 'bg-[#10b981] text-white shadow-sm'
                                : 'bg-[#00162c] text-white hover:bg-[#005cba]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {isRecentlyAdded ? 'check' : 'add'}
                            </span>
                            <span>{isRecentlyAdded ? 'Adicionado!' : '+ Cotar'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Quotation Bar (Dock) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-[#00162c] text-white rounded-xl shadow-2xl border border-white/10 p-3 sm:p-4 flex items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#005cba] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {cartCount} {cartCount === 1 ? 'item selecionado' : 'itens selecionados para cotação'}
                </span>
                <span className="text-[10px] bg-white/20 text-white font-medium px-2 py-0.5 rounded">
                  Faturamento Fábrica
                </span>
              </div>
              <span className="text-xs text-white/70 hidden sm:inline">
                Clique para ajustar volumes em caixas master ou formalizar o pedido.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCart}
              className="px-3.5 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Revisar Itens
            </button>
            <button
              onClick={() => onNavigate('quotation-form')}
              className="px-4 py-2 rounded bg-[#005cba] hover:bg-[#2F80ED] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>Concluir Cotação</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
