export interface CategoryNode {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  code: string;
  level: number;
  keywords: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  manufacturer: string;
  application: 'Residencial & Comercial Leve' | 'Predial / Infraestrutura' | 'Industrial & Náutico';
  material: 'PVC / CPVC' | 'Latão Cromado' | 'Cobre Eletrolítico' | 'Inox / Carbono' | 'Polímero / Borracha';
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  unit: string;
  packageMaster: string;
  packageMasterUnits: number;
  minOrderQuantity: number;
  tablePrice: number;
  standardDiscountPercent: number;
  badgeHighlight?: string;
  ncm?: string;
  warranty?: string;
  refFab?: string;
  technicalSpecs?: {
    parameter: string;
    value: string;
    standard: string;
  }[];
  logisticSpecs?: {
    coletiva: string;
    liquidWeight: string;
    ean13: string;
    dun14: string;
    paletizacao: string;
  };
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  unitPrice?: number;
  notes?: string;
}

export interface CustomerData {
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  compradorNome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  endereco: string;
  prazoCompra: string;
  modalidadeFrete: string;
  observacoes: string;
}

export interface RepresentativeData {
  nome: string;
  registro: string;
  regiao: string;
  mesaComercial: string;
  telefone: string;
  email: string;
}

export type QuotationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface QuotationRecord {
  id: string;
  protocol: string;
  status: QuotationStatus;
  createdAt: string;
  customerData: CustomerData;
  items: QuoteItem[];
}

export type AppView =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'quotation-form'
  | 'quotation-success'
  | 'proposal'
  | 'representative-inbox'
  | 'representative-login'
  | 'about'
  | 'contact';
