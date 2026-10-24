import React from 'react';
import { AppView, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface HomeViewProps {
  products?: Product[];
  onNavigate: (view: AppView) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products = PRODUCTS,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="w-full bg-[#f8f9ff] text-[#00162c] pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eff4ff] to-[#f8f9ff] pt-12 pb-20 border-b border-[#e5eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#00162c] text-xs font-semibold w-fit border border-[#d2e2ff]">
                <span className="w-2 h-2 rounded-full bg-[#005cba] animate-pulse"></span>
                <span>Atendimento Regional Exclusivo Costa Verde - RJ</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#00162c] leading-[1.12]">
                O Elo Estratégico Entre as Melhores Fábricas e o Seu Depósito
              </h1>

              <p className="text-lg text-[#43474d] leading-relaxed max-w-2xl">
                Representação comercial técnica com faturamento direto da indústria, tabelas diferenciadas e suporte logístico dedicado para depósitos e revendas em <strong className="text-[#00162c] font-semibold">Angra dos Reis, Paraty e Mangaratiba</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('quotation-form')}
                  className="px-6 py-3.5 rounded bg-[#00162c] text-white hover:bg-[#005cba] transition-colors font-semibold text-sm shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">request_quote</span>
                  <span>Solicitar Cotação B2B</span>
                </button>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-6 py-3.5 rounded border border-[#00162c] text-[#00162c] hover:bg-[#e5eeff] transition-colors font-semibold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  <span>Explorar Catálogo Técnico</span>
                </button>
              </div>

              {/* Logistics Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#dce9ff]/80">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-[#00162c]">3 Regiões</span>
                  <span className="text-xs text-[#43474d] leading-tight mt-0.5">Rotas semanais fixas</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-[#005cba]">R$ 0 Frete</span>
                  <span className="text-xs text-[#43474d] leading-tight mt-0.5">Condições CIF programadas</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-[#00162c]">≤ 24h SLA</span>
                  <span className="text-xs text-[#43474d] leading-tight mt-0.5">Retorno com margem líquida</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#d2e2ff] bg-white group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkltAH6vYofp4Lf5pLUzE2eKotvFpM8-ZKYrlPCcM_a3sA5JC1LpC2OSLv5zKRiMT4jBTeBy4Qxfn9x37JcshtlfEL60EmWM0gbtf9HrHq97EcjxPPIWXmgMHAwFyEB575ihjrad84B26x3dsPrxHLk9HWaWA1O_-wAoYuBekJFGfuE-yC3E__oYczY3N9ADVqLSrY6N4EYvVzBBMdCSb9sTJMBFO1iYOlwbretEqJ8p5gW1cYquMWCQ"
                  alt="Centro de Distribuição e Logística B2B"
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00162c]/90 via-[#00162c]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#a0caff]">Logística Integrada</span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">Abastecimento Contínuo & Direto de Fábrica</h3>
                  <p className="text-xs text-white/80 mt-1">Carretas completas e lotes fracionados para o comércio da Costa Verde.</p>
                </div>
              </div>

              {/* Floating Quick Feature Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-xl border border-[#e5eeff] flex items-center gap-3 max-w-[280px]">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#005cba] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#00162c]">Indústrias Homologadas</h4>
                  <p className="text-[11px] text-[#43474d]">Tigre, Deca, Censi, Docol, Prysmian, Schneider e mais.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#005cba] uppercase tracking-wider">Portfólio de Marcas Representadas</span>
            <h2 className="text-3xl font-display font-extrabold text-[#00162c] mt-1">Linhas Industriais em Destaque</h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-sm font-semibold text-[#005cba] hover:text-[#00162c] flex items-center gap-1 cursor-pointer"
          >
            Ver todas as 4 divisões
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate('catalog')}
            className="group bg-white rounded-xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHD8h1S25R_Mi3ivT4QmIiB7wy-ahTDE2jBpAa8RK4-JFFfC-ZaGs4gK49jppVeqyQwc2fadF5cYnkpSA7JyGJsik6WVeoo8t4ni2WLpYBS8vbSva3r48rsZvQhxLqBgAIBZmy8jensoKoEUUXKNgSRtdtWo6Hk4oXIdBvt9u60vL1EoMxfMmFBDNWGriuEX28RhwvTsZic0KPB0byWH-_3n7NjkrB8VL3iq9NVMu-sXhtDbzWbPbW5Q"
                alt="Hidráulica & Conexões"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#00162c]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                Tigre • Censi • Docol
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#00162c] group-hover:text-[#005cba] transition-colors">
                  Hidráulica & Conexões
                </h3>
                <p className="text-xs text-[#43474d] mt-1.5 leading-relaxed">
                  Tubos de esgoto, água fria e quente (CPVC/PPR), válvulas, caixas sifonadas e registros industriais.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0f4fc] flex items-center justify-between text-xs font-semibold text-[#005cba]">
                <span>Tabelas de atacado</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate('catalog')}
            className="group bg-white rounded-xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXhTUjObmR8fIaKivXRY4RuerQeEv2bWdsYljpaHYL8zixTxpUwhcz43rf9FDZbx1MpGExCGc53KaJhdkayX9xttChi2PK3Y0g9ws073WbJ6bc0NdIyyygfU8oGUxWtSBY1-GUKPwJyC360MHP2cNee-zh9neS7Frzl5ytxw4-rS8vAYQ2vXctMAttQ235x5DgbdGNuu70nXcFD3d5myu2h3A9ULBZkeJkY5kn2epBIQoSVf0hacMoCA"
                alt="Metais Sanitários"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#00162c]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                Deca • Docol
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#00162c] group-hover:text-[#005cba] transition-colors">
                  Metais & Torneiras
                </h3>
                <p className="text-xs text-[#43474d] mt-1.5 leading-relaxed">
                  Misturadores, torneiras com sensor, chuveiros de alto padrão e acabamentos com garantia estendida.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0f4fc] flex items-center justify-between text-xs font-semibold text-[#005cba]">
                <span>Garantia de 10 anos</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate('catalog')}
            className="group bg-white rounded-xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsz8EWAizek--iH1J6A-JVNOLP5kHQWmubhW1goWaMvf-iauS9oy3r9m50nnYYGAwgU3vpJylcXB8_gcYvNR8ZoakmcZpbEDXl6G-x65koUBcVkTZvbOcvND1NymSskA20xhOzuuoUFmxP4Icyq9HtlXYgjDFhR9W7pbGycD-kvMT2mjgJc5krreDgd5enalcs3iOgMgFjEXkIwM64ZulJEQoaW12YzviZH01Aeo9Dgi7ww-KOL6SwFg"
                alt="Elétrica & Iluminação"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#00162c]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                Prysmian • Schneider
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#00162c] group-hover:text-[#005cba] transition-colors">
                  Elétrica & Iluminação
                </h3>
                <p className="text-xs text-[#43474d] mt-1.5 leading-relaxed">
                  Condutores de cobre puro, disjuntores DIN, quadros de distribuição e condutores para marina.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0f4fc] flex items-center justify-between text-xs font-semibold text-[#005cba]">
                <span>Norma NBR 5410</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigate('catalog')}
            className="group bg-white rounded-xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9VaPpyRoErUCavPXtM8P_6xPtxNsBAxk3DMJntirWsR91dhUFaXZSSN1n5pc2t6cqXDZOr_eTF2ixDx3_629S_IbfFkZgEQY7JhwR7MR3HRlo7YMVEtCbtTQHOSRwX7hivr8TwYNOXUHK0E8WF2JJjOQ9Dsss1kJeeegjvFuMy1GXq-UqNgWa-j0Txk7rpkSwxaUfB2YUpHZpTkjnkFhtxWY-Df9e_fGTYMc-pWAAJtCbY5bdlZOUEQ"
                alt="Ferramentas & Fixação"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#00162c]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                Astra • Norton
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#00162c] group-hover:text-[#005cba] transition-colors">
                  Ferramentas & Acessórios
                </h3>
                <p className="text-xs text-[#43474d] mt-1.5 leading-relaxed">
                  Abrasivos, discos de corte, fitas veda rosca técnicas, selantes PU náuticos e EPIs regulamentares.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0f4fc] flex items-center justify-between text-xs font-semibold text-[#005cba]">
                <span>Caixas fechadas</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Quick Pick */}
      <section className="py-12 bg-[#ffffff] border-y border-[#e5eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#005cba] uppercase tracking-wider">Itens de Alta Rotação na Região</span>
              <h2 className="text-2xl font-display font-bold text-[#00162c] mt-0.5">Top Sellers para Depósitos de Construção</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="mt-3 sm:mt-0 text-sm font-semibold text-[#005cba] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Abrir catálogo completo
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#e5eeff] p-4 flex flex-col justify-between hover:border-[#005cba]/40 transition-all shadow-sm group"
              >
                <div>
                  <div className="relative h-44 rounded-lg bg-[#f8f9ff] flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 bg-[#00162c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.manufacturer}
                    </span>
                    {product.badgeHighlight && (
                      <span className="absolute top-2 right-2 bg-[#2F80ED] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {product.badgeHighlight}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <span className="text-[11px] font-mono text-[#43474d]">{product.sku}</span>
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onNavigate('product-detail');
                      }}
                      className="text-sm font-semibold text-[#00162c] line-clamp-2 hover:text-[#005cba] cursor-pointer mt-0.5"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#43474d] mt-1">
                      Emb. Coletiva: <strong className="text-[#00162c]">{product.packageMaster}</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f4fc]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-[#43474d] block">Tabela B2B</span>
                      <span className="text-base font-bold text-[#00162c]">
                        R$ {product.tablePrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[10px] text-[#43474d]"> /{product.unit}</span>
                    </div>
                    <span className="text-xs text-[#005cba] font-semibold bg-[#e5eeff] px-2 py-0.5 rounded">
                      Até {product.standardDiscountPercent}% off
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onNavigate('product-detail');
                      }}
                      className="h-8 rounded border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center justify-center"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => onAddToCart(product, product.packageMasterUnits || 1)}
                      className="h-8 rounded bg-[#00162c] text-white text-xs font-semibold hover:bg-[#005cba] transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      Cotar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (B2B Process) */}
      <section id="como-funciona" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#005cba] uppercase tracking-wider">Como Funciona a Representação</span>
          <h2 className="text-3xl font-display font-extrabold text-[#00162c] mt-1">Transparência Total da Indústria ao Seu Estoque</h2>
          <p className="text-sm text-[#43474d] mt-2">
            Eliminamos intermediários e custos desnecessários com faturamento direto da fábrica com alíquotas industriais e logística planejada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-sm relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#e5eeff] text-[#005cba] font-display font-bold text-xl flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-display font-bold text-lg text-[#00162c]">Seleção & Envio de Cotação</h3>
              <p className="text-xs text-[#43474d] mt-2 leading-relaxed">
                Você escolhe os produtos, define volumes por caixas master e informa os dados cadastrais da sua empresa (CNPJ e IE).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f0f4fc] text-xs text-[#005cba] font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">touch_app</span>
              <span>Processo 100% digital e ágil</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-sm relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#00162c] text-white font-display font-bold text-xl flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-display font-bold text-lg text-[#00162c]">Análise & Condições Faturadas</h3>
              <p className="text-xs text-[#43474d] mt-2 leading-relaxed">
                Nossa equipe comercial avalia os descontos por escalonamento de volume, tributação ICMS-ST / IPI para o Rio de Janeiro e prazos de pagamento.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f0f4fc] text-xs text-[#005cba] font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>Retorno formal em menos de 24h</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-sm relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#e5eeff] text-[#005cba] font-display font-bold text-xl flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-display font-bold text-lg text-[#00162c]">Faturamento Direto & Entrega</h3>
              <p className="text-xs text-[#43474d] mt-2 leading-relaxed">
                Após sua aprovação, o pedido entra diretamente na linha de expedição da fábrica com nota fiscal de origem e frete CIF no pátio do seu depósito.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f0f4fc] text-xs text-[#005cba] font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>Descarga segura em Angra, Paraty e Mangaratiba</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Retailers Trust Vértice */}
      <section className="py-16 bg-[#102b46] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-bold text-[#a0caff] uppercase tracking-wider">Autoridade Regional</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
                Por que os principais lojistas da Costa Verde confiam na Vértice
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Atuar na Costa Verde exige conhecimento específico da malha rodoviária (Rio-Santos BR-101), horários de descarga nas zonas urbanas e litorâneas, e a alta exigência contra maresia em instalações elétricas e hidráulicas.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-[#005cba] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px] text-white">check</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Preços com Tabela Zero da Indústria</h4>
                    <p className="text-xs text-white/70">Acesso a campanhas de faturamento direto e bonificações sem comissões infladas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-[#005cba] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px] text-white">check</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Visitas Presenciais Semanais</h4>
                    <p className="text-xs text-white/70">Representante técnico in-loco para reposição de gôndola, suporte em projetos e treinamento de balconistas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-[#005cba] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px] text-white">check</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Respaldo em Garantia e Pós-Venda</h4>
                    <p className="text-xs text-white/70">Canal direto com o SAC técnico das montadoras para trocas em balcão sem burocracia para o seu cliente final.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Yn1izIdug0QYdnmz9y45DWkJDS8nvZg9OE526WIO2ExFcnlZG2-ti3sa-a1jTx85z_fB07bypdAJGz8TI7w4zotWUVg6i3yTXaNc5J22Uu12hL0oEQYM34tpEwlJUhxmqWYqHfWG0OaQhbZxvvabgvyrUYElnm3NVYly9sjjExFgpa9W8oNTQY837oY3MrAhH_ZW5lUunwHWxiGf5A6jaT4QH-_QOvAKBfQJxDzmELd-hScW4L5sfQ"
                  alt="Costa Verde Rio de Janeiro"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00162c] via-transparent to-transparent flex items-end p-6">
                  <div className="bg-[#00162c]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 w-full">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#a0caff] mb-1">
                      <span>Circuito Regional de Atendimento</span>
                      <span>Seg a Sex: 08h - 18h</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/90">
                      <span>• Angra dos Reis (Sede & Logística)</span>
                      <span>• Paraty (Polo Histórico & Náutico)</span>
                      <span>• Mangaratiba (Condomínios)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Action Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#00162c] to-[#102b46] p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-[#d2e2ff]/30 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#a0caff] uppercase tracking-wider">Atendimento a Lojistas e Construtoras</span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
              Pronto para cotar com preços e faturamento direto de fábrica?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              Envie sua lista de materiais ou monte seu pedido no catálogo técnico. Atendemos com condições especiais para pagamento em 28/42/56 DDL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('quotation-form')}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#005cba] hover:bg-[#2F80ED] text-white font-semibold text-sm transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Iniciar Cotação com CNPJ</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Falar com Representante</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
