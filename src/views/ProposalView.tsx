import React, { useState } from 'react';
import {
  CustomerData,
  QuoteItem,
  AppView,
  RepresentativeData,
  QuotationRecord,
} from '../types';
import { getItemDiscountPercent, getItemUnitPrice } from '../lib/quotations';

interface ProposalViewProps {
  customerData: CustomerData;
  cartItems: QuoteItem[];
  quotation: QuotationRecord | null;
  representativeData: RepresentativeData;
  onNavigate: (view: AppView) => void;
}

export const ProposalView: React.FC<ProposalViewProps> = ({
  customerData,
  cartItems,
  quotation,
  representativeData,
  onNavigate,
}) => {
  const [isApproved, setIsApproved] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const sourceCustomer = quotation?.customerData ?? customerData;
  const sourceItems = quotation?.items ?? cartItems;

  const displayItems = sourceItems.map((item, idx) => {
    const discountPct = getItemDiscountPercent(item);
    const unitNet = getItemUnitPrice(item);
    const totalNet = unitNet * item.quantity;
    return {
      seq: String(idx + 1).padStart(2, '0'),
      sku: item.product.sku,
      description: item.product.name,
      manufacturer: item.product.manufacturer,
      ncm: item.product.ncm || '8481.80.99',
      unit: item.product.unit,
      quantity: item.quantity,
      tablePrice: item.product.tablePrice,
      discount: discountPct,
      netPrice: unitNet,
      totalNet: totalNet,
    };
  });

  const totalTableSum = displayItems.reduce((acc, it) => acc + it.tablePrice * it.quantity, 0);
  const totalNetSum = displayItems.reduce((acc, it) => acc + it.totalNet, 0);
  const totalDiscounts = totalTableSum - totalNetSum;
  const proposalNumber = quotation?.protocol ?? '0001/2025';
  const issuedAt = new Date(quotation?.createdAt ?? Date.now()).toLocaleDateString('pt-BR');

  const handleApprove = () => {
    setIsApproved(true);
    setFeedbackNotice('Pedido de fábrica aprovado! O espelho foi encaminhado para faturamento e emissão da NFe.');
    setTimeout(() => setFeedbackNotice(null), 5000);
  };

  const handleDownloadPDF = () => {
    setFeedbackNotice('Gerando PDF da proposta...');
    try {
      window.print();
      setFeedbackNotice('Janela de impressão aberta. Selecione "Salvar como PDF".');
      setTimeout(() => setFeedbackNotice(null), 4000);
    } catch (err) {
      setFeedbackNotice('Não foi possível gerar o PDF.');
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#eef2f9] min-h-screen py-10 text-[#00162c]">
      {/* Toast Notification */}
      {feedbackNotice && (
        <div className="fixed top-24 right-4 z-50 bg-[#00162c] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#2F80ED]">verified</span>
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Top Actions Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('representative-inbox')}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Voltar à Mesa do Representante</span>
          </button>
          <span className="text-xs text-[#43474d]">Documento timbrado em formato oficial A4</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-lg bg-white border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-[#005cba]">picture_as_pdf</span>
            <span>Exportar PDF</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-white border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Official Timbrada Document Sheet */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-[#d2e2ff] overflow-hidden p-8 sm:p-12 relative">
        {/* Approved Watermark Banner if approved */}
        {isApproved && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
              <span>PEDIDO APROVADO PELO CLIENTE — Liberado para Expedição da Fábrica</span>
            </div>
            <span className="text-[11px] font-mono">AUT: 2025-FAT-99018</span>
          </div>
        )}

        {/* Timbrado Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-8 border-b-2 border-[#00162c] gap-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 44 44" className="w-11 h-11" fill="none">
                <path d="M22 4 L31 13 L22 22 L13 13 Z" fill="#2F80ED" />
                <path d="M6 14 L22 36 L38 14 L31 14 L22 27 L13 14 Z" fill="#00162c" />
              </svg>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#00162c]">
                VÉRTICE
              </h2>
              <span className="text-[10px] font-bold text-[#43474d] uppercase tracking-widest block">
                REPRESENTAÇÕES COMERCIAIS LTDA
              </span>
              <p className="text-[11px] text-[#43474d] mt-1">
                Telefone: {representativeData.telefone} • E-mail: {representativeData.email}
              </p>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="inline-block bg-[#00162c] text-white text-xs font-bold px-3 py-1 rounded">
              PROPOSTA COMERCIAL Nº {proposalNumber}
            </span>
            <div className="text-xs text-[#43474d] mt-2 space-y-0.5">
              <div>Data de Emissão: <strong className="text-[#00162c]">{issuedAt}</strong></div>
              <div>Validade: <strong className="text-[#00162c]">07 dias úteis</strong></div>
              <div>Representante: <strong className="text-[#00162c]">{representativeData.nome}</strong></div>
            </div>
          </div>
        </div>

        {/* Client & Billing Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#005cba] tracking-wider block mb-1">
              Destinatário / Empresa Faturada
            </span>
            <h3 className="font-bold text-sm text-[#00162c]">{sourceCustomer.razaoSocial}</h3>
            <p className="text-[#43474d] mt-1 space-y-0.5">
              <span>CNPJ: <strong className="text-[#00162c] font-mono">{sourceCustomer.cnpj}</strong></span><br />
              <span>Inscrição Estadual: <strong className="text-[#00162c] font-mono">{sourceCustomer.inscricaoEstadual}</strong></span><br />
              <span>Endereço: {sourceCustomer.endereco || 'Rod. Rio-Santos BR-101 Km 482 - Angra dos Reis - RJ'}</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#005cba] tracking-wider block mb-1">
              Condições Comerciais Acordadas
            </span>
            <div className="text-[#43474d] space-y-1">
              <div className="flex justify-between">
                <span>Prazo de Pagamento:</span>
                <strong className="text-[#00162c]">{sourceCustomer.prazoCompra}</strong>
              </div>
              <div className="flex justify-between">
                <span>Tipo de Frete:</span>
                <strong className="text-[#00162c]">{sourceCustomer.modalidadeFrete}</strong>
              </div>
              <div className="flex justify-between">
                <span>Prazo de Expedição Fábrica:</span>
                <strong className="text-[#00162c]">4 a 6 dias úteis</strong>
              </div>
              <div className="flex justify-between">
                <span>Comprador de Contato:</span>
                <strong className="text-[#00162c]">{sourceCustomer.compradorNome} ({sourceCustomer.whatsapp})</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Items Table */}
        <div className="mt-6">
          <div className="border border-[#e5eeff] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#00162c] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-semibold text-center w-10">Item</th>
                  <th className="py-2.5 px-3 font-semibold">Descrição do Material</th>
                  <th className="py-2.5 px-3 font-semibold">Marca</th>
                  <th className="py-2.5 px-3 font-semibold text-center">NCM</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Qtd</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Preço Tab.</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Desc.</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Preço Líq.</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Total Líquido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4fc]">
                {displayItems.map((item) => (
                  <tr key={item.seq} className="hover:bg-[#f8f9ff]">
                    <td className="py-3 px-3 text-center font-mono text-[11px] text-[#43474d]">{item.seq}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#00162c] block">{item.description}</span>
                      <span className="text-[10px] font-mono text-[#43474d]">SKU: {item.sku}</span>
                    </td>
                    <td className="py-3 px-3 text-[#43474d] font-semibold">{item.manufacturer}</td>
                    <td className="py-3 px-3 text-center font-mono text-[10px] text-[#43474d]">{item.ncm}</td>
                    <td className="py-3 px-3 text-center font-bold text-[#00162c]">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3 px-3 text-right text-[#43474d]">
                      R$ {item.tablePrice.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-[#005cba]">
                      {item.discount >= 0 ? '-' : '+'}
                      {Math.abs(item.discount).toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-[#00162c]">
                      R$ {item.netPrice.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#00162c]">
                      R$ {item.totalNet.toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                ))}
                {displayItems.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-6 px-3 text-center text-[#43474d]">
                      Nenhum item registrado nesta cotação.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals & Tax Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#e5eeff] text-xs space-y-2">
            <h4 className="font-bold text-[#00162c] uppercase text-[11px] tracking-wider">
              Enquadramento Tributário & Fiscal (RJ)
            </h4>
            <p className="text-[11px] text-[#43474d] leading-relaxed">
              • Operação com faturamento direto da indústria para o CNPJ do lojista no Estado do Rio de Janeiro.<br />
              • ICMS Próprio já incluso nos valores unitários.<br />
              • ICMS-ST e IPI retidos na fonte pelo fabricante conforme legislação vigente.<br />
              • Descarga sem taxa de permanência no pátio do depósito.
            </p>
          </div>

          <div className="bg-[#eff4ff] p-5 rounded-xl border border-[#d2e2ff] space-y-2.5 text-xs">
            <div className="flex justify-between text-[#43474d]">
              <span>Subtotal Preço Tabela Bruta:</span>
              <span className="font-medium">R$ {totalTableSum.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-[#10b981] font-semibold">
              <span>Descontos Comerciais Negociados:</span>
              <span>- R$ {totalDiscounts.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-[#43474d]">
              <span>Frete CIF (Costa Verde):</span>
              <span className="font-bold text-[#005cba]">GRÁTIS (R$ 0,00)</span>
            </div>
            <div className="pt-3 border-t-2 border-[#00162c] flex justify-between items-baseline">
              <span className="font-bold text-sm text-[#00162c]">Total Líquido Faturado:</span>
              <span className="text-2xl font-bold font-display text-[#00162c]">
                R$ {totalNetSum.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        {/* Approval Signatures Zone */}
        <div className="mt-10 pt-8 border-t border-[#e5eeff]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-[#43474d] max-w-sm">
              <p>
                Aprovação sujeita à disponibilidade no pátio da fábrica no momento do faturamento e validação de limite no cadastro de crédito bancário do fabricante.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isApproved ? (
                <button
                  onClick={handleApprove}
                  className="px-6 py-3.5 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Aprovar Pedido de Fábrica</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                  <span>Pedido Aprovado com Sucesso</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
