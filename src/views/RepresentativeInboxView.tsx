import React, { useState } from 'react';
import { CustomerData, QuoteItem, AppView } from '../types';

interface RepresentativeInboxViewProps {
  customerData: CustomerData;
  cartItems: QuoteItem[];
  onNavigate: (view: AppView) => void;
}

export const RepresentativeInboxView: React.FC<RepresentativeInboxViewProps> = ({
  customerData,
  cartItems,
  onNavigate,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<'VTC-2025-0841' | 'VTC-2025-0839' | 'VTC-2025-0835'>('VTC-2025-0841');
  const [customDiscount, setCustomDiscount] = useState<number>(8.5);
  const [approvalNote, setApprovalNote] = useState('Cliente prioritário da rota Angra-Sul. Margem validada com gerência regional Tigre & Deca.');
  const [deskNotice, setDeskNotice] = useState<string | null>(null);

  const handleSendWhatsApp = () => {
    setDeskNotice(`Disparando link da proposta via WhatsApp para ${customerData.whatsapp}...`);
    setTimeout(() => {
      setDeskNotice('Proposta comercial enviada com sucesso no WhatsApp do comprador!');
      setTimeout(() => setDeskNotice(null), 4000);
    }, 1200);
  };

  const handleRequestBonus = () => {
    setDeskNotice('Solicitação de bonificação fabril de 2,5% enviada à diretoria de vendas.');
    setTimeout(() => setDeskNotice(null), 4000);
  };

  return (
    <div className="w-full bg-[#f4f7fc] min-h-screen pb-20 text-[#00162c]">
      {/* Toast Notice */}
      {deskNotice && (
        <div className="fixed top-24 right-4 z-50 bg-[#00162c] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#2F80ED]">mark_chat_read</span>
          <span>{deskNotice}</span>
        </div>
      )}

      {/* Desk Header */}
      <div className="bg-[#00162c] text-white py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#a0caff] mb-1">
                <span>Painel Corporativo Vértice</span>
                <span>•</span>
                <span>Mesa do Representante Regional</span>
              </div>
              <h1 className="text-2xl font-display font-extrabold text-white flex items-center gap-3">
                <span>Central de Cotações & Atendimento B2B</span>
                <span className="text-xs bg-[#005cba] text-white px-2.5 py-0.5 rounded-full font-sans font-bold">
                  Costa Verde RJ
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-white/60 block text-[10px]">Representante Ativo:</span>
                <strong className="text-white">Marcos Andrade (CORE 44.912)</strong>
              </div>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Queue of Tickets (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-xl border border-[#d2e2ff] shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-3 flex items-center justify-between">
                <span>Fila de Cotações Recebidas</span>
                <span className="bg-[#eff4ff] text-[#005cba] px-2 py-0.5 rounded text-[10px]">3 ativas</span>
              </h2>

              <div className="space-y-2">
                {/* Active Ticket */}
                <div
                  onClick={() => setSelectedTicket('VTC-2025-0841')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTicket === 'VTC-2025-0841'
                      ? 'bg-[#eff4ff] border-[#005cba] shadow-xs'
                      : 'bg-white border-[#e5eeff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-[#005cba]">#VTC-2025-0841</span>
                    <span className="bg-[#10b981]/20 text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded">
                      Em Análise
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-[#00162c]">{customerData.razaoSocial}</h3>
                  <div className="flex items-center justify-between text-[11px] text-[#43474d] mt-2">
                    <span>Angra dos Reis - RJ</span>
                    <strong className="text-[#00162c]">~R$ 3.966,28</strong>
                  </div>
                </div>

                {/* Other mock tickets */}
                <div
                  onClick={() => setSelectedTicket('VTC-2025-0839')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTicket === 'VTC-2025-0839'
                      ? 'bg-[#eff4ff] border-[#005cba]'
                      : 'bg-white border-[#e5eeff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-[#43474d]">#VTC-2025-0839</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Aguardando NFe
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-[#00162c]">Madeireira & Materiais Paraty Ltda</h3>
                  <div className="flex items-center justify-between text-[11px] text-[#43474d] mt-2">
                    <span>Paraty - RJ</span>
                    <strong className="text-[#00162c]">R$ 14.820,00</strong>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedTicket('VTC-2025-0835')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTicket === 'VTC-2025-0835'
                      ? 'bg-[#eff4ff] border-[#005cba]'
                      : 'bg-white border-[#e5eeff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-[#43474d]">#VTC-2025-0835</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Faturado Fábrica
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-[#00162c]">Comércio de Ferragens Muriqui ME</h3>
                  <div className="flex items-center justify-between text-[11px] text-[#43474d] mt-2">
                    <span>Mangaratiba - RJ</span>
                    <strong className="text-[#00162c]">R$ 6.450,00</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Representative KPI Card */}
            <div className="bg-white p-4 rounded-xl border border-[#d2e2ff] shadow-sm text-xs space-y-3">
              <h3 className="font-bold uppercase text-[11px] text-[#00162c] tracking-wider">
                Desempenho da Região Costa Verde
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#43474d]">Cotações Convertidas neste mês:</span>
                  <strong className="text-[#00162c]">32 pedidos</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#43474d]">Volume Faturado em Fábricas:</span>
                  <strong className="text-[#005cba]">R$ 482.000,00</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#43474d]">Prazo Médio de SLA Proposta:</span>
                  <strong className="text-[#10b981]">4,2 horas</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ticket Inspection & Direct Actions (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Ticket Header & Sefaz Status */}
            <div className="bg-white p-6 rounded-2xl border border-[#d2e2ff] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0f4fc] gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-lg text-[#00162c]">Ticket #{selectedTicket}</span>
                    <span className="bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      CNPJ Ativo SEFAZ-RJ
                    </span>
                  </div>
                  <p className="text-xs text-[#43474d] mt-0.5">
                    Transmitido em 24/10/2025 às 14:22 via Portal B2B Vértice
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('proposal')}
                    className="px-4 py-2 rounded-lg bg-[#00162c] hover:bg-[#005cba] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Abrir Espelho da Proposta</span>
                  </button>
                </div>
              </div>

              {/* Customer Sintegra Verification Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8f9ff] p-4 rounded-xl border border-[#e5eeff] text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#005cba] block mb-1">
                    Razão Social & Localização
                  </span>
                  <h4 className="font-bold text-[#00162c]">{customerData.razaoSocial}</h4>
                  <p className="text-[#43474d] mt-1 space-y-0.5">
                    <span>CNPJ: <strong className="text-[#00162c]">{customerData.cnpj}</strong></span><br />
                    <span>IE: <strong className="text-[#00162c]">{customerData.inscricaoEstadual}</strong></span><br />
                    <span>Praça: <strong>{customerData.cidade}</strong></span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#005cba] block mb-1">
                    Análise Financeira & Limite Faturado
                  </span>
                  <div className="space-y-1 text-[#43474d]">
                    <div className="flex justify-between">
                      <span>Rating de Crédito:</span>
                      <strong className="text-emerald-700 font-bold">Classificação A+ (Baixo Risco)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Limite Global Fábricas:</span>
                      <strong className="text-[#00162c]">R$ 65.000,00</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Condição Solicitada:</span>
                      <strong className="text-[#00162c]">{customerData.prazoCompra}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount & Margin Adjustment Tool */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#00162c]">
                    Simulação de Desconto e Margem Líquida
                  </h3>
                  <span className="text-xs text-[#005cba] font-bold">
                    Desconto Base Aplicado: -{customDiscount}%
                  </span>
                </div>

                <div className="flex items-center gap-4 bg-[#eff4ff] p-4 rounded-xl border border-[#d2e2ff]">
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.5"
                    value={customDiscount}
                    onChange={(e) => setCustomDiscount(Number(e.target.value))}
                    className="flex-1 accent-[#005cba] cursor-pointer"
                  />
                  <span className="font-mono font-bold text-sm text-[#00162c] w-16 text-right">
                    {customDiscount.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Representative Internal Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#00162c] block mb-1">
                  Parecer do Representante para a Fábrica:
                </label>
                <textarea
                  rows={2}
                  value={approvalNote}
                  onChange={(e) => setApprovalNote(e.target.value)}
                  className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg p-2.5 text-xs text-[#00162c] focus:outline-none focus:ring-1 focus:ring-[#005cba]"
                ></textarea>
              </div>

              {/* Fast Action Buttons */}
              <div className="pt-4 border-t border-[#f0f4fc] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleRequestBonus}
                  className="px-4 py-2.5 rounded-lg border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-amber-600">stars</span>
                  <span>Pedir Bonificação à Fábrica</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Enviar no WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onNavigate('proposal')}
                    className="px-5 py-2.5 rounded-lg bg-[#005cba] hover:bg-[#2F80ED] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    <span>Emitir Proposta Oficial</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
