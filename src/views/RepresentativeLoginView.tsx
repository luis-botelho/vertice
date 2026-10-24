import React, { useState } from 'react';
import { AppView } from '../types';
import { apiRequest, AUTH_TOKEN_KEY } from '../lib/api';

interface RepresentativeLoginViewProps {
  onLoginSuccess: () => void;
  onNavigate: (view: AppView) => void;
}

export const RepresentativeLoginView: React.FC<RepresentativeLoginViewProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await apiRequest<{accessToken: string}>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
      });
      sessionStorage.setItem(AUTH_TOKEN_KEY, result.accessToken);
      setIsLoading(false);
      onLoginSuccess();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível validar o acesso.');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#001224] via-[#00162c] to-[#0a2544] flex items-center justify-center p-4 sm:p-6 text-white">
      <div className="w-full max-w-md">
        {/* Security Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-xl">
            <svg viewBox="0 0 44 44" className="w-10 h-10" fill="none">
              <path d="M22 4 L31 13 L22 22 L13 13 Z" fill="#2F80ED" />
              <path d="M6 14 L22 36 L38 14 L31 14 L22 27 L13 14 Z" fill="#ffffff" />
            </svg>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#a0caff] font-bold block">
            Portal Corporativo Interno
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1 text-white">
            Acesso do Representante
          </h1>
          <p className="text-xs text-white/70 mt-1 max-w-xs mx-auto">
            Módulo restrito para cadastro de produtos industriais, alíquotas de fábrica e gestão de cotações B2B.
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 text-[#00162c] shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#005cba] via-[#2F80ED] to-[#00162c]" />

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#00162c] block mb-1.5">
                E-mail Corporativo
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="representante@verticerep.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                />
                <span className="material-symbols-outlined text-[18px] text-[#43474d] absolute left-3 top-2.5">
                  badge
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#00162c] block mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                />
                <span className="material-symbols-outlined text-[18px] text-[#43474d] absolute left-3 top-2.5">
                  lock
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Validando Acesso Seguro...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    <span>Entrar no Sistema</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Strict Security Notice: No public registration */}
          <div className="mt-4 p-3 rounded-lg bg-[#f8f9ff] border border-[#edf2fa] text-[11px] text-[#43474d] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#005cba] shrink-0 mt-0.5">verified_user</span>
            <span>
              Cadastro público de usuários desativado por política de segurança comercial. Apenas representantes credenciados possuem credenciais ativas.
            </span>
          </div>
        </div>

        {/* Back to Customer Store */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-white/70 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Voltar ao Portal do Lojista</span>
          </button>
        </div>
      </div>
    </div>
  );
};
