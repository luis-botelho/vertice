import React, { useState } from 'react';
import { AppView } from '../types';
import { apiRequest } from '../lib/api';

interface ContactViewProps {
  onNavigate: (view: AppView) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('Angra dos Reis');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify({name, cnpj, whatsapp, city, message}),
      });
      setFormSubmitted(true);
      setName('');
      setCnpj('');
      setWhatsapp('');
      setMessage('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível enviar a mensagem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 text-[#00162c]">
      {/* Header */}
      <div className="bg-[#00162c] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs uppercase font-bold text-[#a0caff] tracking-widest block mb-1">
            Canais de Atendimento
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Fale com a Vértice Representações
          </h1>
          <p className="text-sm text-white/80 mt-2">
            Estamos presentes em Angra dos Reis, Paraty e Mangaratiba com visitas técnicas semanais e atendimento digital imediato.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#e5eeff] shadow-sm space-y-5">
              <h3 className="font-bold text-base text-[#00162c] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005cba]">contacts</span>
                <span>Plantão Comercial Regional</span>
              </h3>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <div className="flex items-start gap-3 p-3 bg-[#eff4ff] rounded-xl border border-[#d2e2ff]">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#005cba] block">
                      WhatsApp Comercial Direto
                    </span>
                    <strong className="text-sm text-[#00162c]">(24) 99842-8820</strong>
                    <p className="text-[11px] text-[#43474d] mt-0.5">Atendimento de Seg. a Sex. das 07:30 às 18:30</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
                  <div className="w-9 h-9 rounded-lg bg-[#00162c] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#43474d] block">
                      Telefone Fixo / PABX
                    </span>
                    <strong className="text-sm text-[#00162c]">(24) 3365-4420</strong>
                    <p className="text-[11px] text-[#43474d] mt-0.5">Central de Atendimento a Lojistas</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
                  <div className="w-9 h-9 rounded-lg bg-[#005cba] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#43474d] block">
                      E-mails Departamentais
                    </span>
                    <div className="text-[11px] text-[#00162c] font-medium space-y-0.5">
                      <div>Cotações: cotacoes@verticerep.com.br</div>
                      <div>Financeiro: financeiro@verticerep.com.br</div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
                  <div className="w-9 h-9 rounded-lg bg-[#102b46] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#43474d] block">
                      Base Operacional Costa Verde
                    </span>
                    <strong className="text-xs text-[#00162c] block">
                      Rodovia Governador Mário Covas (BR-101), Km 482
                    </strong>
                    <span className="text-[11px] text-[#43474d]">
                      Polo Comercial Jacuecanga, Angra dos Reis - RJ, CEP 23914-005
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rep Visit Card */}
            <div className="bg-[#eff4ff] p-5 rounded-2xl border border-[#d2e2ff] text-xs space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#005cba]">Agendamento Presencial</span>
              <h4 className="font-bold text-[#00162c] text-sm">Receba o Representante no seu Depósito</h4>
              <p className="text-[#43474d] leading-relaxed">
                Nosso consultor técnico Marcos Andrade realiza vistorias de gôndola, treinamento da sua equipe de balcão e conferência de tabelas diretamente no seu estabelecimento.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e5eeff] shadow-sm">
              <h2 className="text-base font-bold text-[#00162c] flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#005cba]">send</span>
                <span>Envie sua Mensagem ou Solicitação de Visita</span>
              </h2>
              <p className="text-xs text-[#43474d] mb-6">
                Retornamos por WhatsApp ou telefone em no máximo 2 horas comerciais.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <span className="material-symbols-outlined text-[36px] text-emerald-600 block mx-auto">
                    check_circle
                  </span>
                  <h3 className="font-bold text-sm text-emerald-900">Mensagem Transmitida com Sucesso!</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    O representante Marcos Andrade entrará em contato pelo WhatsApp informado em instantes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#00162c] block mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Eduardo Silveira"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#00162c] block mb-1">
                        CNPJ da Empresa / Depósito
                      </label>
                      <input
                        type="text"
                        placeholder="28.940.112/0001-44"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#00162c] block mb-1">
                        WhatsApp Comercial *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="(24) 99842-1100"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#00162c] block mb-1">
                        Cidade / Região *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                      >
                        <option value="Angra dos Reis">Angra dos Reis - RJ</option>
                        <option value="Paraty">Paraty - RJ</option>
                        <option value="Mangaratiba">Mangaratiba - RJ</option>
                        <option value="Outra Cidade">Outra Cidade do RJ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#00162c] block mb-1">
                      Mensagem ou Lista de Materiais para Cotação *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Descreva as linhas industriais de interesse (ex: tubos Tigre, conexões Censi, torneiras Deca) ou agende uma visita presencial em seu depósito..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg p-3 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>{isSubmitting ? 'Enviando...' : 'Transmitir Mensagem Comercial'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
