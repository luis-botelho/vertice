import React from 'react';
import { AppView } from '../types';

interface AboutViewProps {
  onNavigate: (view: AppView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 text-[#00162c]">
      {/* Header Banner */}
      <div className="bg-[#00162c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold text-[#a0caff] tracking-widest block mb-2">
              Institucional Vértice Comercial
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
              Conectando marcas e mercados
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-4 leading-relaxed">
              A Vértice conecta lojas e revendas de materiais de construção a oportunidades de fornecimento. Apresentamos sua necessidade, consultamos alternativas e preparamos propostas comerciais personalizadas conforme quantidade, disponibilidade, destino e condições de fornecimento.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Story & Supply Chain Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#005cba] uppercase tracking-wider">
              Nossa Missão Regional
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#00162c] mt-1 mb-4">
              Eliminando Distâncias entre a Fábrica e o Pátio da sua Loja
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#43474d] leading-relaxed">
              <p>
                O mercado da Costa Verde possui características logísticas singulares: rodovia litorânea (BR-101), restrições de tráfego de carretas pesadas nos centros urbanos e uma demanda contínua por materiais com alta resistência à corrosão marinha.
              </p>
              <p>
                A <strong className="text-[#00162c]">Vértice Representações</strong> foi estruturada para superar esses gargalos. Negociamos lotes industriais com frete CIF programado, alíquotas tributárias ajustadas para o Estado do Rio de Janeiro e atendimento presencial permanente.
              </p>
              <p>
                Mais do que tirar pedidos, oferecemos consultoria técnica de portfólio para evitar rupturas de estoque no seu depósito durante períodos de alta temporada.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-[#d2e2ff]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw-o4wzsWzsCnOkINds-3O9p6-cOk1vfVzUH6wDFdlHtp3j9RdFznQuIQ_ixMU8x0bE0afYWxthz_KV2VpioyWeomxa-br5z0XtNYCPbIXJXaM8ld2Zi-y5O-2rTvdMsrdGeCzcKu2zxroUsqI4KR_jNl13jAoRghgCkip1dsTt0iPGqDAL-jsduD4uGRpxHcSO9U6fn_gbNuDMA2Bz7SmQ6lU9KWlZZtvwRs0qnUsHXVCC4CusujFmQ"
              alt="Circuito Logístico Costa Verde"
              className="w-full h-[380px] object-cover"
            />
          </div>
        </div>

        {/* 3 City Regional Hubs */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#005cba] uppercase tracking-wider">Rotas Semanais de Atendimento</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#00162c] mt-1">Presença Permanente nas Cidades da Região</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#005cba] flex items-center justify-center font-bold mb-3">
                <span className="material-symbols-outlined text-[20px]">anchor</span>
              </div>
              <h3 className="font-bold text-base text-[#00162c]">Angra dos Reis</h3>
              <p className="text-xs text-[#43474d] mt-2 leading-relaxed">
                Base central e maior polo consumidor. Atendimento a depósitos nos bairros Jacuecanga, Japuíba, Centro, Parque das Palmeiras e rota das Ilhas.
              </p>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#005cba] bg-[#eff4ff] px-2.5 py-1 rounded">
                Rotas de entrega: Terças e Quintas
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#005cba] flex items-center justify-center font-bold mb-3">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
              </div>
              <h3 className="font-bold text-base text-[#00162c]">Paraty</h3>
              <p className="text-xs text-[#43474d] mt-2 leading-relaxed">
                Suporte especializado para construção civil colonial e restaurações. Atendimento a depósitos da Estrada Paraty-Cunha, Jabaquara e Caborê.
              </p>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#005cba] bg-[#eff4ff] px-2.5 py-1 rounded">
                Rotas de entrega: Quartas-feiras
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5eeff] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#005cba] flex items-center justify-center font-bold mb-3">
                <span className="material-symbols-outlined text-[20px]">villa</span>
              </div>
              <h3 className="font-bold text-base text-[#00162c]">Mangaratiba</h3>
              <p className="text-xs text-[#43474d] mt-2 leading-relaxed">
                Abastecimento rápido para lojas de ferragens e construtoras nos eixos Muriqui, Itacuruçá, Conceição de Jacareí e condomínios de alto padrão.
              </p>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#005cba] bg-[#eff4ff] px-2.5 py-1 rounded">
                Rotas de entrega: Segundas e Sextas
              </span>
            </div>
          </div>
        </div>

        {/* Industrial Pillars */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#e5eeff] shadow-sm">
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#00162c] text-center mb-8">
            Nossos Compromissos com o Lojista Parceiro
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#005cba] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[24px]">price_change</span>
              </div>
              <h4 className="font-bold text-sm text-[#00162c]">Tabela Zero de Fábrica</h4>
              <p className="text-xs text-[#43474d] mt-1.5">
                Valores reais sem sobrepreço de revendedores intermediários.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#005cba] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h4 className="font-bold text-sm text-[#00162c]">Marcas Líderes</h4>
              <p className="text-xs text-[#43474d] mt-1.5">
                Indústrias consagradas com garantia formal de até 10 anos.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#005cba] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[24px]">timer</span>
              </div>
              <h4 className="font-bold text-sm text-[#00162c]">SLA ≤ 24 Horas</h4>
              <p className="text-xs text-[#43474d] mt-1.5">
                Retorno de propostas e análises cadastrais sem demora.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#005cba] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[24px]">handshake</span>
              </div>
              <h4 className="font-bold text-sm text-[#00162c]">Condições Faturadas</h4>
              <p className="text-xs text-[#43474d] mt-1.5">
                Boleto bancário faturado fábrica em até 28/42/56 DDL.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-6">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-8 py-3.5 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white font-bold text-sm transition-colors cursor-pointer inline-flex items-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>Acessar o Catálogo de Produtos</span>
          </button>
        </div>
      </div>
    </div>
  );
};
