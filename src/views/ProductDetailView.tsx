import React, { useState } from 'react';
import { Product, AppView } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (view: AppView) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onAddToCart,
  onSelectProduct,
}) => {
  const masterBoxUnits = product.packageMasterUnits || 12;
  const [quantity, setQuantity] = useState<number>(masterBoxUnits);
  const [activeTab, setActiveTab] = useState<'specs' | 'logistics' | 'application'>('specs');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setToastMessage(`${quantity} unidades adicionadas à lista de cotação!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadDatasheet = () => {
    setToastMessage(`Gerando Ficha Técnica PDF para ${product.sku}...`);
    setTimeout(() => {
      setToastMessage(`Ficha técnica ${product.sku}.pdf baixada com sucesso!`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const calculatedBoxes = Math.ceil(quantity / masterBoxUnits);
  const estimatedDiscount = product.standardDiscountPercent;
  const unitPriceAfterDiscount = product.tablePrice * (1 - estimatedDiscount / 100);
  const totalTablePrice = product.tablePrice * quantity;
  const totalDiscountedPrice = unitPriceAfterDiscount * quantity;

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 text-[#00162c]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#00162c] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl border border-white/20 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#2F80ED]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#e5eeff] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#43474d] overflow-x-auto">
          <button onClick={() => onNavigate('home')} className="hover:text-[#005cba] shrink-0">
            Início
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-[#005cba] shrink-0">
            Catálogo
          </button>
          <span>/</span>
          <span className="text-[#43474d] shrink-0">{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-[#00162c] truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Product Visuals */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 sm:p-10 flex items-center justify-center relative shadow-sm min-h-[380px] sm:min-h-[460px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[360px] max-w-full object-contain"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#00162c] text-white text-xs font-bold px-3 py-1 rounded">
                  {product.manufacturer}
                </span>
                {product.badgeHighlight && (
                  <span className="bg-[#005cba] text-white text-xs font-semibold px-3 py-1 rounded">
                    {product.badgeHighlight}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 text-[11px] font-mono text-[#43474d] bg-[#f0f4fc] px-2.5 py-1 rounded border border-[#e5eeff]">
                SKU: {product.sku}
              </div>
            </div>

            {/* Quick Actions Bar under image */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadDatasheet}
                className="bg-white hover:bg-[#eff4ff] border border-[#d2e2ff] text-[#00162c] rounded-xl py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#005cba]">picture_as_pdf</span>
                <span>Ficha Técnica Oficial</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white hover:bg-[#eff4ff] border border-[#d2e2ff] text-[#00162c] rounded-xl py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#005cba]">support_agent</span>
                <span>Dúvida Técnica de Engenharia</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pricing, Ordering & Box Presets */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#005cba] mb-1">
                <span>{product.category}</span>
                <span>•</span>
                <span>Ref. Fábrica: {product.refFab || product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#00162c] leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#43474d] mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* High-level tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-[11px] bg-[#eff4ff] text-[#00162c] px-2.5 py-1 rounded font-medium border border-[#d2e2ff]">
                  Aplicação: {product.application}
                </span>
                <span className="text-[11px] bg-[#eff4ff] text-[#00162c] px-2.5 py-1 rounded font-medium border border-[#d2e2ff]">
                  Material: {product.material}
                </span>
                <span className="text-[11px] bg-[#eff4ff] text-[#00162c] px-2.5 py-1 rounded font-medium border border-[#d2e2ff]">
                  Garantia: {product.warranty || '05 Anos'}
                </span>
              </div>

              {/* B2B Pricing Card */}
              <div className="mt-6 bg-white rounded-xl border border-[#e5eeff] p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#f0f4fc] gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-[#43474d] uppercase tracking-wider block">
                      Preço Unitário Tabela Bruta (ICMS 18% RJ)
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-display font-extrabold text-[#00162c]">
                        R$ {product.tablePrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-[#43474d]">/ {product.unit}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#10b981] font-bold block">
                      Volume Negociado: até -{product.standardDiscountPercent}%
                    </span>
                    <span className="text-xs text-[#43474d]">
                      Líquido estimado: ~R$ {unitPriceAfterDiscount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Packaging specs highlight */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#f8f9ff] p-3 rounded-lg text-xs text-[#43474d] border border-[#e5eeff]">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#00162c]">Caixa Master</span>
                    <span>{product.packageMaster}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#00162c]">Pedido Mínimo</span>
                    <span>{product.minOrderQuantity} {product.unit}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#00162c]">Regime Fiscal</span>
                    <span>ICMS-ST / Faturado</span>
                  </div>
                </div>

                {/* Quantity Controls & Multipliers */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#00162c] uppercase">
                      Quantidade a Cotar (em unidades):
                    </label>
                    <span className="text-xs text-[#005cba] font-semibold">
                      = {calculatedBoxes} {calculatedBoxes === 1 ? 'Caixa Master' : 'Caixas Master'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#d2e2ff] rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(product.minOrderQuantity, q - masterBoxUnits))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#eff4ff] text-[#00162c] font-bold text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={product.minOrderQuantity}
                        step={masterBoxUnits}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, Number(e.target.value)))}
                        className="w-16 h-10 text-center font-bold text-sm text-[#00162c] focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity((q) => q + masterBoxUnits)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#eff4ff] text-[#00162c] font-bold text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setQuantity(masterBoxUnits * 1)}
                        className="px-2.5 py-2 text-xs rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00162c] font-semibold cursor-pointer"
                      >
                        +1 Cx ({masterBoxUnits} un)
                      </button>
                      <button
                        onClick={() => setQuantity(masterBoxUnits * 5)}
                        className="px-2.5 py-2 text-xs rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00162c] font-semibold cursor-pointer"
                      >
                        +5 Cx ({masterBoxUnits * 5} un)
                      </button>
                      <button
                        onClick={() => setQuantity(masterBoxUnits * 10)}
                        className="px-2.5 py-2 text-xs rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00162c] font-semibold cursor-pointer"
                      >
                        +10 Cx ({masterBoxUnits * 10} un)
                      </button>
                    </div>
                  </div>

                  {/* Calculated Subtotals */}
                  <div className="bg-[#f0f4fc] p-3 rounded-lg flex items-center justify-between text-xs text-[#00162c]">
                    <div>
                      <span>Subtotal estimado para <strong>{quantity} un</strong>:</span>
                      <div className="text-sm font-bold text-[#00162c]">
                        R$ {totalDiscountedPrice.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-[#43474d]">
                      <span>Preço Tabela: R$ {totalTablePrice.toFixed(2).replace('.', ',')}</span>
                      <span className="block text-[#10b981] font-semibold">
                        Economia direta: R$ {(totalTablePrice - totalDiscountedPrice).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Main Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAdd}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>Adicionar à Lista</span>
                    </button>
                    <button
                      onClick={() => {
                        handleAdd();
                        onNavigate('quotation-form');
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#005cba] hover:bg-[#2F80ED] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      <span>Formalizar Cotação</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics SLA Callout */}
            <div className="mt-6 flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e5eeff] text-xs text-[#43474d]">
              <span className="material-symbols-outlined text-[#005cba] text-[20px]">local_shipping</span>
              <div>
                <strong className="text-[#00162c]">Frete CIF Gratuito:</strong> Entregas regulares programadas para Angra, Paraty e Mangaratiba para faturamento faturado direto de fábrica.
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Tabs */}
        <div className="mt-14 bg-white rounded-2xl border border-[#e5eeff] shadow-sm overflow-hidden">
          <div className="flex border-b border-[#e5eeff] bg-[#f8f9ff]">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#005cba] text-[#005cba] bg-white'
                  : 'border-transparent text-[#43474d] hover:text-[#00162c]'
              }`}
            >
              Especificações Técnicas
            </button>
            <button
              onClick={() => setActiveTab('logistics')}
              className={`px-6 py-4 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'logistics'
                  ? 'border-[#005cba] text-[#005cba] bg-white'
                  : 'border-transparent text-[#43474d] hover:text-[#00162c]'
              }`}
            >
              Dados Logísticos & Embalagem
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`px-6 py-4 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'application'
                  ? 'border-[#005cba] text-[#005cba] bg-white'
                  : 'border-transparent text-[#43474d] hover:text-[#00162c]'
              }`}
            >
              Diferenciais & Aplicação
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-sm font-bold text-[#00162c] uppercase tracking-wider mb-4">
                  Tabela Técnica de Conformidade e Ensaio
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#e5eeff] text-[#43474d] bg-[#f8f9ff]">
                        <th className="py-2.5 px-4 font-semibold">Parâmetro Avaliado</th>
                        <th className="py-2.5 px-4 font-semibold">Especificação Homologada</th>
                        <th className="py-2.5 px-4 font-semibold">Norma / Referência</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f4fc]">
                      {(product.technicalSpecs || [
                        { parameter: 'Material de Fabricação', value: product.material, standard: 'ABNT / Inmetro' },
                        { parameter: 'Pressão / Tensão de Operação', value: 'Conforme catálogo de engenharia', standard: 'NBR Regulamentar' },
                        { parameter: 'Garantia Fabril', value: product.warranty || '05 Anos', standard: 'Termo de Garantia Fábrica' },
                        { parameter: 'Homologação Regional', value: 'Aprovado para maresia Costa Verde', standard: 'Ensaio Salt-Spray' },
                      ]).map((spec, idx) => (
                        <tr key={idx} className="hover:bg-[#f8f9ff]">
                          <td className="py-3 px-4 font-semibold text-[#00162c]">{spec.parameter}</td>
                          <td className="py-3 px-4 text-[#43474d]">{spec.value}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#005cba]">{spec.standard}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'logistics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-3">
                    Codificação e Rastreabilidade
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-[#f0f4fc]">
                      <span className="text-[#43474d]">Código EAN-13 (Unidade):</span>
                      <span className="font-mono font-semibold text-[#00162c]">
                        {product.logisticSpecs?.ean13 || '7898492018442'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f0f4fc]">
                      <span className="text-[#43474d]">DUN-14 (Caixa Master):</span>
                      <span className="font-mono font-semibold text-[#00162c]">
                        {product.logisticSpecs?.dun14 || '17898492018449'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f0f4fc]">
                      <span className="text-[#43474d]">Classificação Fiscal NCM:</span>
                      <span className="font-mono font-semibold text-[#00162c]">{product.ncm || '8481.80.99'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-3">
                    Estocagem e Palete Padrão
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-[#f0f4fc]">
                      <span className="text-[#43474d]">Peso Líquido Unitário:</span>
                      <span className="text-[#00162c]">{product.logisticSpecs?.liquidWeight || '0,420 kg'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f0f4fc]">
                      <span className="text-[#43474d]">Capacidade de Palete:</span>
                      <span className="text-[#00162c]">{product.logisticSpecs?.paletizacao || '480 unidades'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f0f4fc]">
                      <span className="text-[#43474d]">Condição de Armazenagem:</span>
                      <span className="text-[#00162c]">Local seco, protegido de intempéries</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c]">
                  Vantagens Competitivas para o Balcão de Vendas
                </h4>
                <ul className="space-y-2 text-xs text-[#43474d]">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#005cba] shrink-0 mt-0.5">check_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-display text-[#00162c]">
                Produtos Complementares da Linha
              </h3>
              <button
                onClick={() => onNavigate('catalog')}
                className="text-xs font-semibold text-[#005cba] hover:underline"
              >
                Ver todos da mesma categoria
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectProduct(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white p-4 rounded-xl border border-[#e5eeff] hover:border-[#005cba]/40 transition-all cursor-pointer shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-32 rounded bg-[#f8f9ff] flex items-center justify-center p-2 mb-3">
                      <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[10px] font-mono text-[#43474d]">{rel.sku}</span>
                    <h4 className="text-xs font-bold text-[#00162c] line-clamp-2 mt-0.5">{rel.name}</h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f0f4fc] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#00162c]">R$ {rel.tablePrice.toFixed(2).replace('.', ',')}</span>
                    <span className="text-[#005cba] font-semibold text-[11px]">Ver detalhes →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
