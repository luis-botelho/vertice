import React from 'react';
import { QuoteItem } from '../types';

interface QuotationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToForm: () => void;
  onClearCart: () => void;
}

export const QuotationDrawer: React.FC<QuotationDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToForm,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalVolumes = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const estimatedSubtotal = items.reduce(
    (acc, curr) => acc + curr.product.tablePrice * curr.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#00162c]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[#d7e3ff] text-[#005cba] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#00162c]">
                Lista de Cotação B2B
              </h3>
              <span className="text-xs text-[#43474d]">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'} • Proposta Direto de Fábrica
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#dce9ff] text-[#43474d] hover:text-[#00162c] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3 text-[#43474d]">
              <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#74777e]">
                <span className="material-symbols-outlined text-[32px]">remove_shopping_cart</span>
              </div>
              <p className="font-display font-semibold text-base text-[#00162c]">
                Sua lista de cotação está vazia
              </p>
              <p className="text-xs max-w-xs text-[#74777e]">
                Navegue pelo nosso catálogo de materiais e adicione produtos para montar a solicitação de faturamento fabril.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#00162c] text-white text-xs font-semibold rounded hover:bg-[#005cba] transition-colors cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 sm:p-4 rounded-xl border border-[#e5eeff] bg-[#f8f9ff] hover:border-[#b0c8eb] transition-all flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-white p-1 border border-[#e5eeff] flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-[#005cba] uppercase tracking-wider truncate">
                        {item.product.manufacturer}
                      </span>
                      <span className="text-[10px] font-mono bg-[#dce9ff] text-[#00162c] px-1.5 py-0.5 rounded font-semibold">
                        {item.product.sku}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-xs sm:text-sm text-[#00162c] leading-snug line-clamp-2 mt-0.5">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#43474d] block mt-0.5">
                      {item.product.packageMaster}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Removal */}
                <div className="pt-2 border-t border-[#e5eeff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#43474d] font-medium">Qtd:</span>
                    <div className="flex items-center bg-white rounded border border-[#c3c6ce] h-8">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - (item.product.packageMasterUnits || 1))
                          )
                        }
                        className="w-7 h-full flex items-center justify-center text-[#43474d] hover:bg-[#eff4ff] rounded-l transition-colors cursor-pointer"
                        title="Diminuir"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(
                            item.product.id,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-12 text-center text-xs font-bold text-[#00162c] focus:outline-none"
                      />
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.quantity + (item.product.packageMasterUnits || 1)
                          )
                        }
                        className="w-7 h-full flex items-center justify-center text-[#43474d] hover:bg-[#eff4ff] rounded-r transition-colors cursor-pointer"
                        title="Aumentar"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <span className="text-[11px] text-[#74777e]">{item.product.unit}</span>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-xs text-[#ba1a1a] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    <span>Remover</span>
                  </button>
                </div>

                {item.notes && (
                  <p className="text-[11px] italic text-[#43474d] bg-white p-2 rounded border border-[#e5eeff]">
                    Nota: "{item.notes}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Proceed */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#e5eeff] bg-[#eff4ff] flex flex-col gap-3">
            <div className="space-y-1.5 text-xs text-[#43474d]">
              <div className="flex justify-between items-center">
                <span>Total de Volumes / Embalagens:</span>
                <span className="font-bold text-[#00162c] font-mono text-sm">{totalVolumes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tabela Base Estimada:</span>
                <span className="font-bold text-[#00162c] font-mono text-sm">
                  R$ {estimatedSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#005cba]">
                <span>Frete Previsto (Angra / Costa Verde):</span>
                <span className="font-bold">CIF Fábrica (Grátis)</span>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded border border-[#dce9ff] flex items-start gap-2 text-[11px] text-[#43474d]">
              <span className="material-symbols-outlined text-[#005cba] text-[16px] shrink-0 mt-0.5">info</span>
              <span>
                Os descontos progressivos por fardo/caixa e tributação oficial (ICMS-ST/IPI) serão confirmados na proposta final.
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={onClearCart}
                className="px-3 py-2.5 rounded bg-white hover:bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold border border-[#c3c6ce] transition-colors cursor-pointer"
              >
                Limpar
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedToForm();
                }}
                className="flex-1 py-2.5 px-4 rounded bg-[#00162c] hover:bg-[#005cba] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <span>Avançar para Identificação e Envio</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
