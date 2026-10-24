import React, { useState } from 'react';
import { QuoteItem, CustomerData, AppView } from '../types';

interface QuotationSuccessViewProps {
  cartItems: QuoteItem[];
  customerData: CustomerData;
  onNavigate: (view: AppView) => void;
}

export const QuotationSuccessView: React.FC<QuotationSuccessViewProps> = ({
  cartItems,
  customerData,
  onNavigate,
}) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadReceipt = () => {
    setDownloadNotice('Gerando Recibo Oficial de Cotação VTC-2025-0841.pdf...');
    setTimeout(() => {
      setDownloadNotice('Recibo oficial baixado com sucesso!');
      setTimeout(() => setDownloadNotice(null), 3500);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 text-[#00162c]">
      {/* Notice */}
      {downloadNotice && (
        <div className="fixed top-24 right-4 z-50 bg-[#00162c] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl border border-white/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#2F80ED]">download_done</span>
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Confirmation Header Banner */}
      <div className="bg-gradient-to-r from-[#00162c] to-[#102b46] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="material-symbols-outlined text-[36px]">check</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#a0caff] font-bold">
            Registro Oficial de Cotação B2B
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mt-1">
            Cotação Transmitida com Sucesso!
          </h1>
          <p className="text-sm text-white/80 mt-2 max-w-xl mx-auto">
            Sua solicitação de compras faturadas direto de fábrica foi protocolada em nosso sistema regional com SLA de retorno prioritário.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-xs text-white/70">Protocolo de Registro:</span>
            <span className="text-sm font-mono font-bold text-white tracking-wider">#VTC-2025-0841</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Status Card & Assigned Representative */}
        <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 sm:p-8 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#f0f4fc]">
            {/* Left: Rep info */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e5eeff] text-[#005cba] flex items-center justify-center font-bold text-lg shrink-0">
                MA
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#005cba] tracking-wider block">
                  Representante Técnico Responsável
                </span>
                <h3 className="font-bold text-base text-[#00162c]">Marcos Andrade</h3>
                <p className="text-xs text-[#43474d] mt-0.5">Mesa Comercial Costa Verde (Angra, Paraty e Mangaratiba)</p>
                <div className="flex items-center gap-3 text-xs text-[#005cba] mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    (24) 99842-8820
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">mail</span>
                    marcos.andrade@verticerep.com.br
                  </span>
                </div>
              </div>
            </div>

            {/* Right: SLA & Timing */}
            <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#d2e2ff] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#00162c] mb-1">
                  <span>SLA de Elaboração da Proposta</span>
                  <span className="text-[#005cba]">≤ 24 Horas Úteis</span>
                </div>
                <p className="text-[11px] text-[#43474d]">
                  Nossa engenharia comercial está consolidando as alíquotas de ICMS-ST para o estado do Rio de Janeiro e a faixa de desconto por volume.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#10b981]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
                <span>Análise de crédito faturado em andamento</span>
              </div>
            </div>
          </div>

          {/* 3-Step Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-4">
              Próximos Passos do Pedido
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-[#f8f9ff] border border-[#d2e2ff]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10b981] mb-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>1. Recebimento OK</span>
                </div>
                <p className="text-[11px] text-[#43474d]">
                  CNPJ ({customerData.cnpj}) e IE validados no Sintegra RJ.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#005cba]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#005cba] mb-1">
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span>2. Precificação B2B</span>
                </div>
                <p className="text-[11px] text-[#43474d]">
                  Aplicação de descontos especiais e montagem da proposta timbrada.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#f8f9ff] border border-[#e5eeff]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#43474d] mb-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>3. Faturamento Fábrica</span>
                </div>
                <p className="text-[11px] text-[#43474d]">
                  Envio da NFe e agendamento da carreta de entrega CIF.
                </p>
              </div>
            </div>
          </div>

          {/* Quoted Items Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c]">
                Relação de Produtos Registrados
              </h4>
              <span className="text-xs text-[#43474d]">
                Cliente: <strong>{customerData.razaoSocial}</strong>
              </span>
            </div>

            <div className="border border-[#e5eeff] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f9ff] border-b border-[#e5eeff] text-[#43474d]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">SKU / Item</th>
                    <th className="py-2.5 px-3 font-semibold">Fabricante</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Qtd Cotada</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Tabela Un.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4fc]">
                  {cartItems.map((item) => (
                    <tr key={item.product.id} className="hover:bg-[#f8f9ff]">
                      <td className="py-3 px-3">
                        <span className="font-mono text-[10px] text-[#43474d] block">{item.product.sku}</span>
                        <span className="font-semibold text-[#00162c]">{item.product.name}</span>
                      </td>
                      <td className="py-3 px-3 text-[#43474d]">{item.product.manufacturer}</td>
                      <td className="py-3 px-3 text-center font-bold text-[#00162c]">
                        {item.quantity} {item.product.unit}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-[#00162c]">
                        R$ {item.product.tablePrice.toFixed(2).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-[#f0f4fc] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-4 py-2.5 rounded-lg border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Retornar ao Catálogo</span>
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadReceipt}
                className="px-4 py-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00162c] text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#005cba]">print</span>
                <span>Imprimir Protocolo</span>
              </button>

              <button
                onClick={() => onNavigate('proposal')}
                className="px-5 py-2.5 rounded-lg bg-[#00162c] hover:bg-[#005cba] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">description</span>
                <span>Visualizar Proposta Comercial Gerada</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
