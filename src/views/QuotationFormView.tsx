import React, { useState } from 'react';
import { CustomerData, QuoteItem, AppView } from '../types';

interface QuotationFormViewProps {
  cartItems: QuoteItem[];
  customerData: CustomerData;
  onUpdateCustomerData: (data: CustomerData) => void;
  onSubmitQuotation: () => Promise<void>;
  onNavigate: (view: AppView) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const QuotationFormView: React.FC<QuotationFormViewProps> = ({
  cartItems,
  customerData,
  onUpdateCustomerData,
  onSubmitQuotation,
  onNavigate,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [formData, setFormData] = useState<CustomerData>(customerData);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (field: keyof CustomerData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateCustomerData(updated);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cnpj || !formData.razaoSocial || !formData.compradorNome || !formData.whatsapp) {
      setErrorMsg('Por favor preencha todos os campos cadastrais obrigatórios da sua empresa.');
      return;
    }
    setErrorMsg(null);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setErrorMsg('É necessário aceitar os termos de processamento de cotação comercial B2B.');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMsg('Sua lista de cotação está vazia. Adicione produtos pelo catálogo antes de enviar.');
      return;
    }
    setErrorMsg(null);
    try {
      await onSubmitQuotation();
      onNavigate('quotation-success');
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Não foi possível enviar a cotação.');
    }
  };

  // Calculations
  const totalTable = cartItems.reduce(
    (acc, item) => acc + item.product.tablePrice * item.quantity,
    0
  );
  const totalEstimated = cartItems.reduce((acc, item) => {
    const discount = item.product.standardDiscountPercent;
    return acc + item.product.tablePrice * (1 - discount / 100) * item.quantity;
  }, 0);

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 text-[#00162c]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5eeff] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#43474d] mb-1">
            <button onClick={() => onNavigate('home')} className="hover:text-[#005cba]">Início</button>
            <span>/</span>
            <button onClick={() => onNavigate('catalog')} className="hover:text-[#005cba]">Catálogo</button>
            <span>/</span>
            <span className="text-[#00162c] font-semibold">Formalização de Cotação B2B</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#00162c]">
            Solicitação Formal de Cotação com Preço de Fábrica
          </h1>
          <p className="text-xs sm:text-sm text-[#43474d] mt-1">
            Preencha os dados cadastrais da sua empresa para aplicarmos a alíquota tributária correta (ICMS-ST / IPI) e as melhores faixas de desconto.
          </p>

          {/* Stepper bar */}
          <div className="flex items-center gap-4 mt-6 max-w-xl">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                currentStep === 1 ? 'text-[#005cba]' : 'text-[#43474d]'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === 1 ? 'bg-[#005cba] text-white' : 'bg-[#e5eeff] text-[#00162c]'
              }`}>
                1
              </span>
              <span>Identificação & Cadastro PJ</span>
            </button>
            <div className="flex-1 h-0.5 bg-[#e5eeff]"></div>
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                currentStep === 2 ? 'text-[#005cba]' : 'text-[#43474d]'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === 2 ? 'bg-[#005cba] text-white' : 'bg-[#e5eeff] text-[#00162c]'
              }`}>
                2
              </span>
              <span>Condições Comerciais & Envio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Area (7 Cols) */}
          <div className="lg:col-span-7">
            {currentStep === 1 ? (
              <form onSubmit={handleNextStep} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e5eeff] shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-[#00162c] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#005cba]">business</span>
                    <span>Seção A: Dados da Empresa Compradora</span>
                  </h2>
                  <p className="text-xs text-[#43474d] mt-1">
                    Esses dados são necessários para checagem junto à SEFAZ-RJ e emissão de NFe faturada pela indústria.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      CNPJ da Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj}
                      onChange={(e) => handleChange('cnpj', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      Inscrição Estadual (IE) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 87.420.910"
                      value={formData.inscricaoEstadual}
                      onChange={(e) => handleChange('inscricaoEstadual', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#00162c] block mb-1">
                    Razão Social Completa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Depósito do Construtor Costa Verde Ltda"
                    value={formData.razaoSocial}
                    onChange={(e) => handleChange('razaoSocial', e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      Nome do Comprador / Responsável *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silveira"
                      value={formData.compradorNome}
                      onChange={(e) => handleChange('compradorNome', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      WhatsApp Comercial *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="(24) 99842-1100"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      E-mail Financeiro / NFe *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="compras@depositocostaverde.com.br"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      Município / Região de Entrega *
                    </label>
                    <select
                      value={formData.cidade}
                      onChange={(e) => handleChange('cidade', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    >
                      <option value="Angra dos Reis">Angra dos Reis - RJ</option>
                      <option value="Paraty">Paraty - RJ</option>
                      <option value="Mangaratiba">Mangaratiba - RJ</option>
                      <option value="Itaguaí / Rio Claro">Itaguaí / Rio Claro - RJ</option>
                      <option value="Outro Município RJ">Outro Município - RJ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#00162c] block mb-1">
                    Endereço Completo do Pátio / Galpão de Descarga
                  </label>
                  <input
                    type="text"
                    placeholder="Rodovia Governador Mário Covas (BR-101), Km 482 - Galpão 03"
                    value={formData.endereco}
                    onChange={(e) => handleChange('endereco', e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                  />
                </div>

                <div className="pt-4 border-t border-[#f0f4fc] flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>Avançar para Condições Comerciais</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e5eeff] shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-[#00162c] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#005cba]">local_shipping</span>
                    <span>Seção B: Condições Comerciais & Logística</span>
                  </h2>
                  <p className="text-xs text-[#43474d] mt-1">
                    Defina o prazo de pagamento pretendido e as instruções de frete.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      Prazo de Pagamento Pretendido
                    </label>
                    <select
                      value={formData.prazoCompra}
                      onChange={(e) => handleChange('prazoCompra', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    >
                      <option value="28/42/56 DDL Faturado Fábrica">28/42/56 DDL Faturado Fábrica (Padrão Depósito)</option>
                      <option value="28/42 DDL Faturado">28/42 DDL Faturado Fábrica</option>
                      <option value="28 DDL Faturado">28 DDL Faturado Fábrica</option>
                      <option value="À Vista Antecipado (Melhor Desconto)">À Vista Antecipado (Desconto Extra +3%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      Modalidade de Frete
                    </label>
                    <select
                      value={formData.modalidadeFrete}
                      onChange={(e) => handleChange('modalidadeFrete', e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    >
                      <option value="CIF - Entrega Gratuita Costa Verde (Vértice)">
                        CIF - Entrega Gratuita na sua loja/depósito
                      </option>
                      <option value="FOB - Retirada pelo Cliente">
                        FOB - Retirada direta no CD da Fábrica
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#00162c] block mb-1">
                    Instruções Especiais / Observações de Descarga
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Recebimento de carretas até as 17h; possui empilhadeira para descarga de paletes; incluir laudo de conformidade técnica."
                    value={formData.observacoes}
                    onChange={(e) => handleChange('observacoes', e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg p-3 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                  ></textarea>
                </div>

                {/* LGPD & Agreement */}
                <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#d2e2ff] space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 text-[#005cba] focus:ring-[#005cba] rounded"
                    />
                    <span className="text-xs text-[#43474d] leading-relaxed">
                      Declaro que sou representante autorizado da pessoa jurídica informada e concordo que os dados sejam utilizados pela <strong>Vértice Representações</strong> e indústrias parceiras para análise fiscal, cadastro comercial e emissão de proposta formal.
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#f0f4fc] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 rounded-lg border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer"
                  >
                    ← Voltar aos Dados Cadastrais
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#005cba] hover:bg-[#2F80ED] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Transmitir Cotação B2B</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Sticky Quote Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 shadow-sm sticky top-28 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0f4fc]">
                <h3 className="font-bold text-sm text-[#00162c]">Itens em Cotação ({cartItems.length})</h3>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="text-xs text-[#005cba] font-semibold hover:underline"
                >
                  + Adicionar mais itens
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-8 text-center text-[#43474d] text-xs">
                  <span className="material-symbols-outlined text-[32px] text-[#43474d] block mb-2">remove_shopping_cart</span>
                  Nenhum item na lista.
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="block mx-auto mt-2 text-[#005cba] font-semibold"
                  >
                    Ir ao Catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const lineTable = item.product.tablePrice * item.quantity;
                    const discount = item.product.standardDiscountPercent;
                    const lineEstimated = lineTable * (1 - discount / 100);

                    return (
                      <div
                        key={item.product.id}
                        className="p-3 rounded-lg bg-[#f8f9ff] border border-[#edf2fa] flex gap-3 items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-[#43474d] block">{item.product.sku}</span>
                          <h4 className="text-xs font-bold text-[#00162c] truncate">{item.product.name}</h4>
                          <div className="flex items-center gap-3 text-[11px] text-[#43474d] mt-1">
                            <span>Qtd: <strong>{item.quantity} {item.product.unit}</strong></span>
                            <span>(-{discount}%)</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#00162c] block">
                            R$ {lineEstimated.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-[10px] text-[#43474d] line-through block">
                            R$ {lineTable.toFixed(2).replace('.', ',')}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[10px] text-red-500 hover:underline mt-1"
                          >
                            remover
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Total Card */}
              {cartItems.length > 0 && (
                <div className="bg-[#f0f4fc] p-4 rounded-xl border border-[#d2e2ff] space-y-2 text-xs">
                  <div className="flex justify-between text-[#43474d]">
                    <span>Total Tabela Bruta:</span>
                    <span>R$ {totalTable.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-[#10b981] font-semibold">
                    <span>Desconto Médio Projetado:</span>
                    <span>- R$ {(totalTable - totalEstimated).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="pt-2 border-t border-[#dce9ff] flex justify-between items-baseline">
                    <span className="font-bold text-[#00162c]">Subtotal Líquido Estimado:</span>
                    <span className="text-lg font-bold font-display text-[#00162c]">
                      R$ {totalEstimated.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#43474d] italic pt-1">
                    * Os valores finais com alíquotas de ICMS-ST / IPI e bônus fabril serão detalhados na proposta oficial timbrada em até 24h.
                  </p>
                </div>
              )}

              {/* Service SLA badge */}
              <div className="flex items-center gap-2 text-xs text-[#005cba] bg-[#eff4ff] p-3 rounded-lg">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Proposta comercial oficial com carimbo Vértice e validade de 7 dias úteis.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
