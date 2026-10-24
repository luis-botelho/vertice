import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#00162c] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">VÉRTICE COMERCIAL</span>
            </div>
            <p className="text-sm text-[#b0c8eb] leading-relaxed">
              Soluções de fornecimento B2B para lojas e revendas de materiais de construção. Conectamos demandas comerciais a alternativas de fornecimento, com cotações personalizadas conforme cada necessidade.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#d7e3ff] mt-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#448ffd]">location_on</span>
              <span>Atendimento comercial na Costa Verde</span>
            </div>
          </div>

          {/* Navegação Comercial */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              NAVEGAÇÃO COMERCIAL
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#b0c8eb]">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Catálogo de Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quotation-form')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Solicitar Cotação
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('como-funciona');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sobre a Vértice
                </button>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              INFORMAÇÕES
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#b0c8eb]">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contato
                </button>
              </li>
              <li className="text-xs text-[#7a93b3] pt-1">
                Atendimento comercial focado em lojistas e revendas da região da Costa Verde.
              </li>
              <li className="text-xs text-[#7a93b3]">
                Os dados enviados são utilizados exclusivamente para análise de fornecimento e elaboração da proposta comercial.
              </li>
            </ul>
          </div>

          {/* Cotações & Fornecimento */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              COTAÇÕES E FORNECIMENTO
            </span>
            <p className="text-xs text-[#b0c8eb] leading-relaxed">
              A disponibilidade dos produtos, o preço, o frete e o prazo são avaliados conforme cada solicitação. As condições aplicáveis são informadas na proposta comercial.
            </p>
            <div className="text-xs text-[#7a93b3] space-y-1.5 mt-1">
              <div className="flex items-center gap-1.5 text-white/90">
                <span className="material-symbols-outlined text-[16px] text-[#448ffd]">fact_check</span>
                <span>Propostas comerciais sob medida</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90">
                <span className="material-symbols-outlined text-[16px] text-[#448ffd]">inventory_2</span>
                <span>Catálogo como vitrine de produtos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer Bar */}
        <div className="pt-6 border-t border-[#102b46] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7a93b3]">
          <p className="text-center md:text-left">
            Atendimento exclusivo B2B para lojas e revendas de materiais de construção, hidráulica, elétrica e acabamentos. O envio de solicitação não constitui compra confirmada.
          </p>
          <div className="flex items-center gap-3 shrink-0 text-center md:text-right">
            <span>© 2026 Vértice Comercial. Todos os direitos reservados.</span>
            <button
              onClick={() => {
                window.location.hash = '#/representante';
                onNavigate('representative-login');
              }}
              title="Acesso Restrito Representante (URL: #/representante)"
              className="text-[#7a93b3] hover:text-[#b0c8eb] transition-colors p-1 rounded hover:bg-white/5 cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span className="opacity-70 hover:opacity-100">Painel Interno</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
