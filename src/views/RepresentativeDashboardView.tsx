import React, { useDeferredValue, useMemo, useState } from 'react';
import {
  Product,
  AppView,
  RepresentativeData,
  QuotationRecord,
  QuotationStatus,
  QuoteItem,
} from '../types';
import {
  getItemDiscountPercent,
  getItemUnitPrice,
  getQuotationTotal,
} from '../lib/quotations';
import {
  CATEGORY_OPTIONS,
  DEFAULT_PRODUCT_CATEGORY_ID,
  getCategoryById,
  getCategoryPathLabel,
  getDescendantCategoryIds,
} from '../data/categories';
import { generateProductSku } from '../lib/products';
import { searchProducts } from '../lib/productSearch';

interface RepresentativeDashboardViewProps {
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  representativeData: RepresentativeData;
  onSaveRepresentativeData: (data: RepresentativeData) => void;
  quotations: QuotationRecord[];
  onUpdateQuotation: (quotation: QuotationRecord) => void;
  onOpenProposal: (quotation: QuotationRecord) => void;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

export const RepresentativeDashboardView: React.FC<RepresentativeDashboardViewProps> = ({
  products,
  onSaveProducts,
  representativeData,
  onSaveRepresentativeData,
  quotations,
  onUpdateQuotation,
  onOpenProposal,
  onNavigate,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'quotes' | 'profile'>('products');
  const [productSearch, setProductSearch] = useState('');
  const deferredProductSearch = useDeferredValue(productSearch);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [repForm, setRepForm] = useState<RepresentativeData>(representativeData);

  // Modal State for Create / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState(() =>
    generateProductSku(DEFAULT_PRODUCT_CATEGORY_ID, products),
  );
  const [formRefFab, setFormRefFab] = useState('');
  const [formCategoryId, setFormCategoryId] = useState(DEFAULT_PRODUCT_CATEGORY_ID);
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
  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(
    quotations[0]?.id ?? null
  );
  const [newItemProductId, setNewItemProductId] = useState('');
  const [approvalNote, setApprovalNote] = useState('Cliente prioritário da rota Angra-Sul. Margem validada com gerência regional Tigre & Deca.');

  const selectedQuotation =
    quotations.find((quotation) => quotation.id === selectedQuotationId) ?? quotations[0] ?? null;

  // Open modal for new product
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategoryId(DEFAULT_PRODUCT_CATEGORY_ID);
    setFormSku(generateProductSku(DEFAULT_PRODUCT_CATEGORY_ID, products));
    setFormRefFab('');
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
    setFormCategoryId(p.categoryId);
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
              categoryId: formCategoryId,
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
        categoryId: formCategoryId,
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

  const handleFormCategoryChange = (categoryId: string) => {
    setFormCategoryId(categoryId);
    setFormSku(generateProductSku(categoryId, products, editingProduct?.id));
  };

  // Filtered products in admin list
  const filteredProducts = useMemo(() => {
    const allowedCategoryIds =
      categoryFilter === 'all'
        ? null
        : new Set(getDescendantCategoryIds(categoryFilter));

    const baseProducts = products.filter(
      (product) =>
        !allowedCategoryIds || allowedCategoryIds.has(product.categoryId),
    );

    return searchProducts(baseProducts, deferredProductSearch);
  }, [products, categoryFilter, deferredProductSearch]);

  const quoteStatusLabel: Record<QuotationStatus, string> = {
    pending: 'Em Análise',
    in_review: 'Em Revisão',
    approved: 'Aprovada',
    rejected: 'Recusada',
  };

  const quoteStatusClass: Record<QuotationStatus, string> = {
    pending: 'bg-[#10b981]/20 text-[#047857]',
    in_review: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-700',
  };

  const formatQuotationDate = (date: string) =>
    new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const updateSelectedQuotationItems = (items: QuoteItem[]) => {
    if (!selectedQuotation) return;
    onUpdateQuotation({ ...selectedQuotation, items });
  };

  const handleUpdateItemQuantity = (index: number, quantity: number) => {
    if (!selectedQuotation || Number.isNaN(quantity)) return;
    const nextItems = selectedQuotation.items.map((item, itemIndex) =>
      itemIndex === index
        ? { ...item, quantity: Math.max(1, Math.floor(quantity)) }
        : item,
    );
    updateSelectedQuotationItems(nextItems);
  };

  const handleUpdateItemPrice = (index: number, price: number) => {
    if (!selectedQuotation || Number.isNaN(price)) return;
    const nextItems = selectedQuotation.items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, unitPrice: Math.max(0, price) } : item,
    );
    updateSelectedQuotationItems(nextItems);
  };

  const handleRemoveQuotationItem = (index: number) => {
    if (!selectedQuotation) return;
    const nextItems = selectedQuotation.items.filter((_, itemIndex) => itemIndex !== index);
    updateSelectedQuotationItems(nextItems);
  };

  const handleAddQuotationItem = () => {
    if (!selectedQuotation) return;
    const product = products.find((item) => item.id === newItemProductId);
    if (!product) {
      setToastMessage('Selecione um produto do catálogo para adicionar à cotação.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const defaultPrice = Number(
      (product.tablePrice * (1 - (product.standardDiscountPercent || 0) / 100)).toFixed(2),
    );
    const existingIndex = selectedQuotation.items.findIndex(
      (item) => item.product.id === product.id,
    );

    const nextItems =
      existingIndex >= 0
        ? selectedQuotation.items.map((item, index) =>
            index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...selectedQuotation.items, { product, quantity: 1, unitPrice: defaultPrice }];

    updateSelectedQuotationItems(nextItems);
    setNewItemProductId('');
  };

  const handleSendWhatsApp = () => {
    if (!selectedQuotation) return;
    setToastMessage(
      `Enviando proposta timbrada via WhatsApp para ${selectedQuotation.customerData.whatsapp}...`
    );
    setTimeout(() => {
      setToastMessage('Proposta oficial transmitida com sucesso para o comprador!');
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  const handleOpenProposal = () => {
    if (selectedQuotation) onOpenProposal(selectedQuotation);
  };

  const handleSaveRepresentativeProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repForm.nome.trim() || !repForm.telefone.trim() || !repForm.email.trim()) return;

    const normalizedData: RepresentativeData = {
      ...repForm,
      nome: repForm.nome.trim(),
      registro: repForm.registro.trim(),
      regiao: repForm.regiao.trim(),
      mesaComercial: repForm.mesaComercial.trim(),
      telefone: repForm.telefone.trim(),
      email: repForm.email.trim(),
    };

    setRepForm(normalizedData);
    onSaveRepresentativeData(normalizedData);
    setToastMessage('Dados do representante técnico atualizados com sucesso!');
    setTimeout(() => setToastMessage(null), 4000);
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
                Representante: <strong className="text-white">{representativeData.nome}</strong> • Registro CORE-RJ Nº {representativeData.registro} • {representativeData.regiao}
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
              <span>Fila de Cotações Recebidas ({quotations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-[#2F80ED] text-white bg-white/5 rounded-t'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>Dados do Representante</span>
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
                    placeholder="Busque por SKU, nome, categoria ou sinônimo..."
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
                  className="w-full sm:w-72 bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                >
                  <option value="all">Todas as Categorias</option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.pathLabel}
                    </option>
                  ))}
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
                  Exibindo <strong className="text-[#00162c] font-bold">{filteredProducts.length}</strong>{' '}
                  {deferredProductSearch.trim()
                    ? 'correspondências para a busca'
                    : 'produtos disponíveis para faturamento direto'}
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
                    {filteredProducts.map(({ product: p }) => (
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
                        <td className="py-3 px-4 text-[#43474d]">
                          <span className="font-semibold text-[#00162c] block">
                            {getCategoryById(p.categoryId)?.name ?? 'Sem categoria'}
                          </span>
                          <span
                            className="text-[10px] block max-w-[220px] truncate"
                            title={getCategoryPathLabel(p.categoryId)}
                          >
                            {getCategoryPathLabel(p.categoryId, ' › ')}
                          </span>
                        </td>
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
                  Cotações Recebidas ({quotations.length})
                </h3>
                <div className="space-y-2">
                  {quotations.length === 0 && (
                    <div className="p-4 rounded-lg bg-[#f8f9ff] border border-dashed border-[#d2e2ff] text-center text-[11px] text-[#43474d]">
                      Nenhuma cotação transmitida ainda. As cotações enviadas pelos compradores aparecerão aqui.
                    </div>
                  )}

                  {quotations.map((quotation) => (
                    <div
                      key={quotation.id}
                      onClick={() => setSelectedQuotationId(quotation.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedQuotation?.id === quotation.id
                          ? 'bg-[#eff4ff] border-[#005cba]'
                          : 'bg-white border-[#e5eeff]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-bold text-[#005cba]">#{quotation.protocol}</span>
                        <span className={`${quoteStatusClass[quotation.status]} text-[10px] font-bold px-2 py-0.5 rounded`}>
                          {quoteStatusLabel[quotation.status]}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#00162c]">{quotation.customerData.razaoSocial}</h4>
                      <div className="flex items-center justify-between text-[11px] text-[#43474d] mt-2">
                        <span>{quotation.customerData.cidade}</span>
                        <strong className="text-[#00162c]">
                          R$ {getQuotationTotal(quotation).toFixed(2).replace('.', ',')}
                        </strong>
                      </div>
                      <span className="text-[10px] text-[#43474d] block mt-1">
                        {formatQuotationDate(quotation.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-8 space-y-6">
              {selectedQuotation ? (
                <div className="bg-white p-6 rounded-2xl border border-[#d2e2ff] shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0f4fc] gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-extrabold text-lg text-[#00162c]">
                          Ticket #{selectedQuotation.protocol}
                        </span>
                        <span className={`${quoteStatusClass[selectedQuotation.status]} text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                          {quoteStatusLabel[selectedQuotation.status]}
                        </span>
                      </div>
                      <p className="text-xs text-[#43474d] mt-0.5">
                        Transmitido em {formatQuotationDate(selectedQuotation.createdAt)} via Portal B2B Vértice
                      </p>
                    </div>

                    <button
                      onClick={handleOpenProposal}
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
                      <h4 className="font-bold text-[#00162c]">{selectedQuotation.customerData.razaoSocial}</h4>
                      <p className="text-[#43474d] mt-1 space-y-0.5">
                        <span>CNPJ: <strong>{selectedQuotation.customerData.cnpj}</strong></span><br />
                        <span>IE: <strong>{selectedQuotation.customerData.inscricaoEstadual}</strong></span><br />
                        <span>Comprador: <strong>{selectedQuotation.customerData.compradorNome} ({selectedQuotation.customerData.whatsapp})</strong></span>
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#005cba] block mb-1">
                        Condições do Pedido
                      </span>
                      <div className="space-y-1 text-[#43474d]">
                        <div>Prazo: <strong>{selectedQuotation.customerData.prazoCompra}</strong></div>
                        <div>Frete: <strong>{selectedQuotation.customerData.modalidadeFrete}</strong></div>
                        <div>Rating de Crédito: <strong className="text-emerald-700">A+ (Limite: R$ 65.000)</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Quoted Items - editable */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold uppercase text-[#00162c]">
                          Itens da Cotação ({selectedQuotation.items.length})
                        </span>
                        <p className="text-[10px] text-[#43474d]">
                          Preços e quantidades editáveis. As alterações são salvas automaticamente em JSON.
                        </p>
                      </div>
                      <strong className="text-xs text-[#00162c]">
                        Total: R$ {getQuotationTotal(selectedQuotation).toFixed(2).replace('.', ',')}
                      </strong>
                    </div>

                    <div className="border border-[#e5eeff] rounded-xl overflow-x-auto">
                      <table className="w-full text-left text-xs min-w-[620px]">
                        <thead className="bg-[#f8f9ff] text-[#43474d] border-b border-[#e5eeff]">
                          <tr>
                            <th className="py-2 px-3 font-semibold">Item</th>
                            <th className="py-2 px-3 font-semibold text-center w-28">Qtd</th>
                            <th className="py-2 px-3 font-semibold text-right w-32">Preço Unit.</th>
                            <th className="py-2 px-3 font-semibold text-center w-20">Desc.</th>
                            <th className="py-2 px-3 font-semibold text-right w-28">Total</th>
                            <th className="py-2 px-3 font-semibold text-center w-12"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0f4fc]">
                          {selectedQuotation.items.map((item, index) => {
                            const unitPrice = getItemUnitPrice(item);
                            const discount = getItemDiscountPercent(item);
                            return (
                              <tr key={`${item.product.id}-${index}`}>
                                <td className="py-2.5 px-3">
                                  <span className="font-mono text-[10px] text-[#43474d] block">
                                    {item.product.sku}
                                  </span>
                                  <span className="block text-xs font-semibold text-[#00162c]">
                                    {item.product.name}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <input
                                      type="number"
                                      min="1"
                                      step="1"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleUpdateItemQuantity(index, e.target.valueAsNumber)
                                      }
                                      className="w-16 bg-white border border-[#d2e2ff] rounded px-2 py-1 text-xs text-center font-bold focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                                    />
                                    <span className="text-[10px] text-[#43474d]">{item.product.unit}</span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={Number(unitPrice.toFixed(2))}
                                    onChange={(e) =>
                                      handleUpdateItemPrice(index, e.target.valueAsNumber)
                                    }
                                    className="w-24 bg-white border border-[#d2e2ff] rounded px-2 py-1 text-xs text-right font-semibold focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                                  />
                                </td>
                                <td className="py-2.5 px-3 text-center font-bold text-[#005cba]">
                                  {discount >= 0 ? '-' : '+'}
                                  {Math.abs(discount).toFixed(1)}%
                                </td>
                                <td className="py-2.5 px-3 text-right font-bold text-[#00162c]">
                                  R$ {(unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <button
                                    onClick={() => handleRemoveQuotationItem(index)}
                                    title="Remover item"
                                    className="w-8 h-8 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center cursor-pointer transition-colors"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}

                          {selectedQuotation.items.length === 0 && (
                            <tr>
                              <td colSpan={6} className="py-6 px-3 text-center text-[#43474d]">
                                Nenhum item nesta cotação. Adicione um produto abaixo.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <select
                        value={newItemProductId}
                        onChange={(e) => setNewItemProductId(e.target.value)}
                        className="flex-1 bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                      >
                        <option value="">Selecione um produto do catálogo...</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.sku} - {product.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddQuotationItem}
                        className="px-4 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#005cba] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_circle</span>
                        <span>Adicionar Item</span>
                      </button>
                    </div>
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
                      onClick={handleOpenProposal}
                      className="px-5 py-2.5 rounded-lg bg-[#005cba] hover:bg-[#2F80ED] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">task_alt</span>
                      <span>Emitir Proposta Oficial Timbrada</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-2xl border border-[#d2e2ff] shadow-sm text-center">
                  <span className="material-symbols-outlined text-[40px] text-[#005cba]">inbox</span>
                  <h3 className="font-bold text-sm text-[#00162c] mt-2">Nenhuma cotação selecionada</h3>
                  <p className="text-xs text-[#43474d] mt-1">
                    Aguarde o envio de uma cotação pelo portal do comprador para visualizar os dados completos.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* TAB 3: REPRESENTATIVE PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl">
            <form
              onSubmit={handleSaveRepresentativeProfile}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#d2e2ff] shadow-sm space-y-5"
            >
              <div className="pb-4 border-b border-[#f0f4fc]">
                <h2 className="text-base font-bold text-[#00162c] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#005cba]">badge</span>
                  <span>Informações do Representante Técnico Responsável</span>
                </h2>
                <p className="text-xs text-[#43474d] mt-1">
                  Estes dados são exibidos ao comprador no protocolo da cotação e nos canais de atendimento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Nome do Representante *
                  </label>
                  <input
                    type="text"
                    required
                    value={repForm.nome}
                    onChange={(e) => setRepForm({ ...repForm, nome: e.target.value })}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#005cba]/20 focus:border-[#005cba]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Registro CORE
                  </label>
                  <input
                    type="text"
                    value={repForm.registro}
                    onChange={(e) => setRepForm({ ...repForm, registro: e.target.value })}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Região de Atuação
                  </label>
                  <input
                    type="text"
                    value={repForm.regiao}
                    onChange={(e) => setRepForm({ ...repForm, regiao: e.target.value })}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Mesa Comercial
                  </label>
                  <input
                    type="text"
                    value={repForm.mesaComercial}
                    onChange={(e) => setRepForm({ ...repForm, mesaComercial: e.target.value })}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={repForm.telefone}
                    onChange={(e) => setRepForm({ ...repForm, telefone: e.target.value })}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#00162c] block mb-1">
                    E-mail Comercial *
                  </label>
                  <input
                    type="email"
                    required
                    value={repForm.email}
                    onChange={(e) => setRepForm({ ...repForm, email: e.target.value })}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0f4fc] flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#00162c] hover:bg-[#005cba] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Salvar Dados do Representante</span>
                </button>
              </div>
            </form>
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
                    Código SKU Automático *
                  </label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={formSku}
                    className="w-full bg-[#f0f4fc] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs font-mono text-[#43474d] cursor-not-allowed"
                  />
                  <span className="text-[9px] text-[#43474d] block mt-1">
                    Gerado pela categoria; altere a categoria para recalcular.
                  </span>
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
                    Categoria Hierárquica *
                  </label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => handleFormCategoryChange(e.target.value)}
                    className="w-full bg-[#f8f9ff] border border-[#d2e2ff] rounded-lg px-3 py-2 text-xs"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.pathLabel}
                      </option>
                    ))}
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
