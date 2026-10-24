import React, { useState } from 'react';
import { Product, CustomerData, QuoteItem, AppView, ProductCategory } from '../types';

interface RepresentativeDashboardViewProps {
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  customerData: CustomerData;
  cartItems: QuoteItem[];
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

export const RepresentativeDashboardView: React.FC<RepresentativeDashboardViewProps> = ({
  products,
  onSaveProducts,
  customerData,
  onNavigate,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'quotes'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todos');

  // Modal State for Create / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formRefFab, setFormRefFab] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('Hidráulica & Conexões');
  const [formManufacturer, setFormManufacturer] = useState('Tigre');
  const [formApplication, setFormApplication] = useState<Product['application']>('Residencial & Comercial Leve');
  const [formMaterial, setFormMaterial] = useState<Product['material']>('PVC / CPVC');
  const [formTablePrice, setFormTablePrice] = useState<number>(45.0);
  const [formDiscount, setFormDiscount] = useState<number>(8.5);
  const [formUnit, setFormUnit] = useState('un');
  const [formPackageMaster, setFormPackageMaster] = useState('Caixa Coletiva com 12 un');
  const [formPackageUnits, setFormPackageUnits] = useState<number>(12);
  const [formMinOrder, setFormMinOrder] = useState<number>(12);
  const [formNcm, setFormNcm] = useState('3917.23.00');
  const [formWarranty, setFormWarranty] = useState('10 Anos');
  const [formBadge, setFormBadge] = useState('Preço Fábrica');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAHD8h1S25R_Mi3ivT4QmIiB7wy-ahTDE2jBpAa8RK4-JFFfC-ZaGs4gK49jppVeqyQwc2fadF5cYnkpSA7JyGJsik6WVeoo8t4ni2WLpYBS8vbSva3r48rsZvQhxLqBgAIBZmy8jensoKoEUUXKNgSRtdtWo6Hk4oXIdBvt9u60vL1EoMxfMmFBDNWGriuEX28RhwvTsZic0KPB0byWH-_3n7NjkrB8VL3iq9NVMu-sXhtDbzWbPbW5Q'
  );

  // Quotes Desk State
  const [selectedTicket, setSelectedTicket] = useState<'VTC-2025-0841' | 'VTC-2025-0839' | 'VTC-2025-0835'>('VTC-2025-0841');
  const [customDiscount, setCustomDiscount] = useState<number>(8.5);
  const [approvalNote, setApprovalNote] = useState('Cliente prioritário da rota Angra-Sul. Margem validada com gerência regional Tigre & Deca.');

  // Open modal for new product
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`PRD-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormRefFab('');
    setFormCategory('Hidráulica & Conexões');
    setFormManufacturer('Tigre');
    setFormApplication('Residencial & Comercial Leve');
    setFormMaterial('PVC / CPVC');
    setFormTablePrice(45.0);
    setFormDiscount(8.5);
    setFormUnit('un');
    setFormPackageMaster('Caixa com 12 un');
    setFormPackageUnits(12);
    setFormMinOrder(12);
    setFormNcm('3917.23.00');
    setFormWarranty('05 Anos');
    setFormBadge('Novo na Grade');
    setFormDescription('Produto industrial homologado de alta performance com faturamento direto.');
    setFormImage(
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHD8h1S25R_Mi3ivT4QmIiB7wy-ahTDE2jBpAa8RK4-JFFfC-ZaGs4gK49jppVeqyQwc2fadF5cYnkpSA7JyGJsik6WVeoo8t4ni2WLpYBS8vbSva3r48rsZvQhxLqBgAIBZmy8jensoKoEUUXKNgSRtdtWo6Hk4oXIdBvt9u60vL1EoMxfMmFBDNWGriuEX28RhwvTsZic0KPB0byWH-_3n7NjkrB8VL3iq9NVMu-sXhtDbzWbPbW5Q'
    );
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormRefFab(p.refFab || '');
    setFormCategory(p.category);
    setFormManufacturer(p.manufacturer);
    setFormApplication(p.application);
    setFormMaterial(p.material);
    setFormTablePrice(p.tablePrice);
    setFormDiscount(p.standardDiscountPercent);
    setFormUnit(p.unit);
    setFormPackageMaster(p.packageMaster);
    setFormPackageUnits(p.packageMasterUnits || 1);
    setFormMinOrder(p.minOrderQuantity);
    setFormNcm(p.ncm || '8481.80.99');
    setFormWarranty(p.warranty || '05 Anos');
    setFormBadge(p.badgeHighlight || '');
    setFormDescription(p.description);
    setFormImage(p.image);
    setIsModalOpen(true);
  };

  // Save product (create or update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSku.trim()) return;

    if (editingProduct) {
      // Update
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formName,
              sku: formSku,
              refFab: formRefFab,
              category: formCategory,
              manufacturer: formManufacturer,
              application: formApplication,
              material: formMaterial,
              tablePrice: Number(formTablePrice),
              standardDiscountPercent: Number(formDiscount),
              unit: formUnit,
              packageMaster: formPackageMaster,
              packageMasterUnits: Number(formPackageUnits),
              minOrderQuantity: Number(formMinOrder),
              ncm: formNcm,
              warranty: formWarranty,
              badgeHighlight: formBadge || undefined,
              description: formDescription,
              image: formImage,
            }
          : p
      );
      onSaveProducts(updated);
      setToastMessage(`Produto ${formSku} atualizado com sucesso no catálogo!`);
    } else {
      // Create new
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        sku: formSku,
        refFab: formRefFab || formSku,
        category: formCategory,
        manufacturer: formManufacturer,
        application: formApplication,
        material: formMaterial,
        tablePrice: Number(formTablePrice),
        standardDiscountPercent: Number(formDiscount),
        unit: formUnit,
        packageMaster: formPackageMaster,
        packageMasterUnits: Number(formPackageUnits),
        minOrderQuantity: Number(formMinOrder),
        ncm: formNcm,
        warranty: formWarranty,
        badgeHighlight: formBadge || 'Lançamento',
        description: formDescription,
        image: formImage,
        features: [
          'Fabricação conforme normas vigentes ABNT',
          'Embalagem lacrada com código de barras comercial',
          'Faturamento faturado direto de fábrica para pessoa jurídica',
        ],
        technicalSpecs: [
          { parameter: 'Material Homologado', value: formMaterial, standard: 'ABNT / Inmetro' },
          { parameter: 'Aplicação Recomendada', value: formApplication, standard: 'Catálogo de Engenharia' },
          { parameter: 'Garantia Fabril', value: formWarranty, standard: 'Certificado de Fábrica' },
        ],
        logisticSpecs: {
          coletiva: formPackageMaster,
          liquidWeight: '1,200 kg',
          ean13: '78984920' + Math.floor(10000 + Math.random() * 90000),
          dun14: '178984920' + Math.floor(10000 + Math.random() * 90000),
          paletizacao: `${Number(formPackageUnits) * 40} unidades`,
        },
      };

      onSaveProducts([newProduct, ...products]);
      setToastMessage(`Novo produto ${formName} cadastrado no catálogo!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Delete product
  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`Tem certeza que deseja remover "${productName}" do catálogo?`)) {
      const filtered = products.filter((p) => p.id !== productId);
      onSaveProducts(filtered);
      setToastMessage(`Produto "${productName}" removido.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Filtered products in admin list
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'Todos' && p.category !== categoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.manufacturer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSendWhatsApp = () => {
    setToastMessage(`Enviando proposta timbrada via WhatsApp para ${customerData.whatsapp}...`);
    setTimeout(() => {
      setToastMessage('Proposta oficial transmitida com sucesso para o comprador!');
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#f4f7fc] min-h-screen pb-24 text-[#00162c]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#00162c] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#2F80ED]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <div className="bg-[#00162c] text-white py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#a0caff] mb-1">
                <span>Painel Corporativo Vértice</span>
                <span>•</span>
                <span className="bg-[#005cba] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Sessão Segura Autorizada
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center gap-3">
                <span>Mesa de Gestão do Representante</span>
              </h1>
              <p className="text-xs text-white/70 mt-1">
                Representante: <strong className="text-white">Marcos Andrade</strong> • Registro CORE-RJ Nº 44.912 • Circuito Costa Verde
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                <span>Ver Loja do Lojista</span>
              </button>

              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'border-[#2F80ED] text-white bg-white/5 rounded-t'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory</span>
              <span>Alimentar & Gerenciar Catálogo ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'quotes'
                  ? 'border-[#2F80ED] text-white bg-white/5 rounded-t'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">request_quote</span>
              <span>Fila de Cotações Recebidas (3 ativas)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white p-5 rounded-2xl border border-[#d2e2ff] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Buscar por SKU, nome ou fabricante..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                  />
                  <span className="material-symbols-outlined text-[16px] text-[#43474d] absolute left-2.5 top-2.5">
                    search
                  </span>
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-56 bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                >
                  <option value="Todos">Todas as Categorias</option>
                  <option value="Hidráulica & Conexões">Hidráulica & Conexões</option>
                  <option value="Metais & Torneiras">Metais & Torneiras</option>
                  <option value="Elétrica & Iluminação">Elétrica & Iluminação</option>
                  <option value="Ferramentas & Acessórios">Ferramentas & Acessórios</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenCreateModal}
                  className="px-5 py-2.5 rounded-xl bg-[#00162c] hover:bg-[#005cba] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>+ Cadastrar Novo Produto</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#d2e2ff] shadow-sm overflow-hidden">
              <div className="p-4 bg-[#f8f9ff] border-b border-[#e5eeff] flex items-center justify-between">
                <div className="text-xs text-[#43474d]">
                  Exibindo <strong className="text-[#00162c] font-bold">{filteredProducts.length}</strong> produtos disponíveis para faturamento direto
                </div>
                <div className="text-[11px] font-semibold text-[#005cba] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  <span>Sincronizado localmente (Pronto para API)</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#00162c] text-white">
                    <tr>
                      <th className="py-3 px-4 font-semibold w-16">Foto</th>
                      <th className="py-3 px-4 font-semibold">SKU / Material</th>
                      <th className="py-3 px-4 font-semibold">Fabricante</th>
                      <th className="py-3 px-4 font-semibold">Categoria</th>
                      <th className="py-3 px-4 font-semibold">Embalagem Master</th>
                      <th className="py-3 px-4 font-semibold text-right">Tabela Bruta</th>
                      <th className="py-3 px-4 font-semibold text-center">Desc. Máx</th>
                      <th className="py-3 px-4 font-semibold text-center w-28">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f4fc]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f8f9ff]">
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 rounded bg-[#f8f9ff] border border-[#e5eeff] flex items-center justify-center overflow-hidden p-1">
                            <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-[10px] text-[#43474d] block font-semibold">{p.sku}</span>
                          <span className="font-bold text-[#00162c] block max-w-xs truncate">{p.name}</span>
                          {p.badgeHighlight && (
                            <span className="inline-block mt-0.5 text-[9px] bg-[#eff4ff] text-[#005cba] font-bold px-1.5 py-0.5 rounded">
                              {p.badgeHighlight}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#00162c]">{p.manufacturer}</span>
                        </td>
                        <td className="py-3 px-4 text-[#43474d]">{p.category}</td>
                        <td className="py-3 px-4 text-[#43474d]">
                          <span className="font-medium text-[#00162c]">{p.packageMaster}</span>
                          <span className="text-[10px] block text-[#43474d]">Mín: {p.minOrderQuantity} un</span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-[#00162c]">
                          R$ {p.tablePrice.toFixed(2).replace('.', ',')}
                          <span className="text-[10px] text-[#43474d] font-normal block">/{p.unit}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                            -{p.standardDiscountPercent}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              title="Editar Produto"
                              className="w-8 h-8 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#005cba] flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              title="Excluir Produto"
                              className="w-8 h-8 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUOTES DESK */}
        {activeTab === 'quotes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Queue */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#d2e2ff] shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#00162c] mb-3">
                  Cotações na Praça Costa Verde
                </h3>
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedTicket('VTC-2025-0841')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTicket === 'VTC-2025-0841'
                        ? 'bg-[#eff4ff] border-[#005cba]'
                        : 'bg-white border-[#e5eeff]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#005cba]">#VTC-2025-0841</span>
                      <span className="bg-[#10b981]/20 text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded">
                        Em Análise
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#00162c]">{customerData.razaoSocial}</h4>
                    <div className="flex items-center justify-between text-[11px] text-[#43474d] mt-2">
                      <span>Angra dos Reis - RJ</span>
                      <strong className="text-[#00162c]">~R$ 3.966,28</strong>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedTicket('VTC-2025-0839')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTicket === 'VTC-2025-0839'
                        ? 'bg-[#eff4ff] border-[#005cba]'
                        : 'bg-white border-[#e5eeff]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#43474d]">#VTC-2025-0839</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Aguardando NFe
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#00162c]">Madeireira & Materiais Paraty Ltda</h4>
                    <div className="flex items-center justify-between text-[11px] text-[#43474d] mt-2">
                      <span>Paraty - RJ</span>
                      <strong className="text-[#00162c]">R$ 14.820,00</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#d2e2ff] shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0f4fc] gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-lg text-[#00162c]">
                        Ticket #{selectedTicket}
                      </span>
                      <span className="bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        CNPJ Habilitado SEFAZ-RJ
                      </span>
                    </div>
                    <p className="text-xs text-[#43474d] mt-0.5">
                      Transmitido em 24/10/2025 às 14:22 via Portal B2B Vértice
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('proposal')}
                    className="px-4 py-2 rounded-lg bg-[#00162c] hover:bg-[#005cba] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    <span>Visualizar Espelho Timbrado</span>
                  </button>
                </div>

                {/* Customer Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8f9ff] p-4 rounded-xl border border-[#e5eeff] text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#005cba] block mb-1">
                      Dados da Empresa Faturada
                    </span>
                    <h4 className="font-bold text-[#00162c]">{customerData.razaoSocial}</h4>
                    <p className="text-[#43474d] mt-1 space-y-0.5">
                      <span>CNPJ: <strong>{customerData.cnpj}</strong></span><br />
                      <span>IE: <strong>{customerData.inscricaoEstadual}</strong></span><br />
                      <span>Comprador: <strong>{customerData.compradorNome} ({customerData.whatsapp})</strong></span>
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#005cba] block mb-1">
                      Condições do Pedido
                    </span>
                    <div className="space-y-1 text-[#43474d]">
                      <div>Prazo: <strong>{customerData.prazoCompra}</strong></div>
                      <div>Frete: <strong>{customerData.modalidadeFrete}</strong></div>
                      <div>Rating de Crédito: <strong className="text-emerald-700">A+ (Limite: R$ 65.000)</strong></div>
                    </div>
                  </div>
                </div>

                {/* Margin slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#00162c]">
                      Ajuste de Margem Comercial do Representante
                    </span>
                    <span className="text-xs font-bold text-[#005cba]">Desconto: -{customDiscount}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.5"
                    value={customDiscount}
                    onChange={(e) => setCustomDiscount(Number(e.target.value))}
                    className="w-full accent-[#005cba] cursor-pointer"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Parecer Técnico para a Expedição da Fábrica:
                  </label>
                  <textarea
                    rows={2}
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg p-2.5 text-xs text-[#00162c]"
                  ></textarea>
                </div>

                {/* Dispatch buttons */}
                <div className="pt-4 border-t border-[#f0f4fc] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Disparar Proposta no WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onNavigate('proposal')}
                    className="px-5 py-2.5 rounded-lg bg-[#005cba] hover:bg-[#2F80ED] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    <span>Emitir Proposta Oficial Timbrada</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00162c]/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl border border-[#d2e2ff] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 bg-[#00162c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#2F80ED] text-[24px]">
                  {editingProduct ? 'edit' : 'add_circle'}
                </span>
                <div>
                  <h3 className="font-display font-bold text-base">
                    {editingProduct ? `Editar Material: ${editingProduct.sku}` : 'Cadastrar Novo Produto Industrial'}
                  </h3>
                  <span className="text-xs text-white/70">
                    Alimentação direta da grade de faturamento da representação
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                  Nome do Material / Produto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Curva 90º Esgoto 100mm Soldável"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Código SKU *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="HYD-CRV-100"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Fabricante / Indústria *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tigre, Deca, Censi..."
                    value={formManufacturer}
                    onChange={(e) => setFormManufacturer(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Categoria *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="Hidráulica & Conexões">Hidráulica & Conexões</option>
                    <option value="Metais & Torneiras">Metais & Torneiras</option>
                    <option value="Elétrica & Iluminação">Elétrica & Iluminação</option>
                    <option value="Ferramentas & Acessórios">Ferramentas & Acessórios</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Preço Tabela Bruta (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formTablePrice}
                    onChange={(e) => setFormTablePrice(Number(e.target.value))}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Desconto Padrão Fábrica (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(Number(e.target.value))}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="un">un (Unidade)</option>
                    <option value="barra">barra (6 metros)</option>
                    <option value="rolo">rolo (100 metros)</option>
                    <option value="cx">cx (Caixa)</option>
                    <option value="m">m (Metro linear)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Embalagem Master
                  </label>
                  <input
                    type="text"
                    placeholder="Caixa com 20 un"
                    value={formPackageMaster}
                    onChange={(e) => setFormPackageMaster(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Qtd na Caixa Master
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formPackageUnits}
                    onChange={(e) => setFormPackageUnits(Number(e.target.value))}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Pedido Mínimo
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formMinOrder}
                    onChange={(e) => setFormMinOrder(Number(e.target.value))}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    NCM Fiscal
                  </label>
                  <input
                    type="text"
                    placeholder="3917.23.00"
                    value={formNcm}
                    onChange={(e) => setFormNcm(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Garantia
                  </label>
                  <input
                    type="text"
                    placeholder="10 Anos"
                    value={formWarranty}
                    onChange={(e) => setFormWarranty(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Destaque Promocional
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Lançamento, Mais Vendido"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                  URL da Foto do Produto
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                  <div className="w-10 h-10 rounded border border-[#d2e2ff] overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                    <img src={formImage} alt="Preview" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                {/* Quick preset selector */}
                <div className="flex items-center gap-2 mt-2 text-[11px] text-[#43474d]">
                  <span>Presets de imagem:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormImage(
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuAHD8h1S25R_Mi3ivT4QmIiB7wy-ahTDE2jBpAa8RK4-JFFfC-ZaGs4gK49jppVeqyQwc2fadF5cYnkpSA7JyGJsik6WVeoo8t4ni2WLpYBS8vbSva3r48rsZvQhxLqBgAIBZmy8jensoKoEUUXKNgSRtdtWo6Hk4oXIdBvt9u60vL1EoMxfMmFBDNWGriuEX28RhwvTsZic0KPB0byWH-_3n7NjkrB8VL3iq9NVMu-sXhtDbzWbPbW5Q'
                      )
                    }
                    className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#005cba] font-medium hover:bg-[#dce9ff]"
                  >
                    Tubos / Hidráulica
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormImage(
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuBXhTUjObmR8fIaKivXRY4RuerQeEv2bWdsYljpaHYL8zixTxpUwhcz43rf9FDZbx1MpGExCGc53KaJhdkayX9xttChi2PK3Y0g9ws073WbJ6bc0NdIyyygfU8oGUxWtSBY1-GUKPwJyC360MHP2cNee-zh9neS7Frzl5ytxw4-rS8vAYQ2vXctMAttQ235x5DgbdGNuu70nXcFD3d5myu2h3A9ULBZkeJkY5kn2epBIQoSVf0hacMoCA'
                      )
                    }
                    className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#005cba] font-medium hover:bg-[#dce9ff]"
                  >
                    Metais / Torneira
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormImage(
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuCsz8EWAizek--iH1J6A-JVNOLP5kHQWmubhW1goWaMvf-iauS9oy3r9m50nnYYGAwgU3vpJylcXB8_gcYvNR8ZoakmcZpbEDXl6G-x65koUBcVkTZvbOcvND1NymSskA20xhOzuuoUFmxP4Icyq9HtlXYgjDFhR9W7pbGycD-kvMT2mjgJc5krreDgd5enalcs3iOgMgFjEXkIwM64ZulJEQoaW12YzviZH01Aeo9Dgi7ww-KOL6SwFg'
                      )
                    }
                    className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#005cba] font-medium hover:bg-[#dce9ff]"
                  >
                    Elétrica
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                  Descrição Técnica & Aplicação
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Descreva as características técnicas, tolerâncias e benefícios para o lojista..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                ></textarea>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#f0f4fc] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#d2e2ff] text-xs font-semibold text-[#00162c] hover:bg-[#eff4ff] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#00162c] hover:bg-[#005cba] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>{editingProduct ? 'Salvar Alterações' : 'Confirmar & Publicar no Catálogo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
