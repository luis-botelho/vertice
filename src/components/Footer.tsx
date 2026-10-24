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
              <span className="font-display text-2xl font-bold tracking-tight text-white">VÉRTICE</span>
            </div>
            <p className="text-sm text-[#b0c8eb] leading-relaxed">
              Representação comercial institucional conectando fábricas líderes a revendas e distribuidores de materiais de construção, hidráulica, elétrica e acabamentos na Costa Verde - RJ.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#d7e3ff] mt-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#448ffd]">location_on</span>
              <span>Angra dos Reis • Paraty • Mangaratiba</span>
            </div>
          </div>

          {/* Navegação Comercial */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação Comercial
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
                  Solicitação de Cotação
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('proposal')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Espelho da Proposta Homologada
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

          {/* Políticas & Atendimento */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Políticas & Atendimento
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#b0c8eb]">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Central de Atendimento
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/5524999814420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Plantão WhatsApp Vendas</span>
                </a>
              </li>
              <li className="text-xs text-[#7a93b3]">
                Atendimento presencial em rotas semanais na região.
              </li>
              <li className="text-xs text-[#7a93b3]">
                Faturamento direto fábrica mediante cadastro de CNPJ ativo.
              </li>
            </ul>
          </div>

          {/* Logística & Expedição */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Logística & Expedição
            </span>
            <p className="text-xs text-[#b0c8eb] leading-relaxed">
              Cargas fechadas e fracionadas despachadas diretamente das linhas industriais com emissão de Danfe oficial e seguro de transporte.
            </p>
            <div className="text-xs text-[#7a93b3] space-y-1 mt-1">
              <div className="flex items-center gap-1.5 text-white/90">
                <span className="material-symbols-outlined text-[16px] text-[#448ffd]">local_shipping</span>
                <span>Frete CIF programado Costa Verde</span>
              </div>
              <div>Prazo médio de entrega: 4 a 6 dias úteis</div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer Bar */}
        <div className="pt-6 border-t border-[#102b46] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7a93b3]">
          <p className="text-center md:text-left">
            Atendimento exclusivo B2B para lojistas de materiais de construção, hidráulica, elétrica e acabamentos. Não comercializamos no varejo nem realizamos checkout online.
          </p>
          <div className="flex items-center gap-3 shrink-0 text-center md:text-right">
            <span>© 2025 Vértice Representações. CNPJ 34.819.002/0001-90.</span>
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
