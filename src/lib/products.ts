import {
  Product,
  QuoteItem,
  QuotationRecord,
  QuotationStatus,
} from '../types';
import {
  getCategoryPath,
  getCategoryPathLabel,
  resolveCategoryId,
} from '../data/categories';

type StoredProduct = Partial<Product> & { category?: string };
type StoredQuoteItem = Partial<QuoteItem> & { product?: unknown };
type StoredQuotation = Partial<QuotationRecord> & {
  items?: StoredQuoteItem[];
};

const QUOTATION_STATUSES: QuotationStatus[] = [
  'pending',
  'in_review',
  'approved',
  'rejected',
];

export function normalizeProduct(raw: unknown): Product | null {
  if (!raw || typeof raw !== 'object') return null;

  const candidate = raw as StoredProduct;
  if (!candidate.id || !candidate.name || !candidate.sku) return null;

  const categoryId = resolveCategoryId(
    candidate.categoryId || candidate.category,
    candidate.sku,
  );
  const { category: _legacyCategory, ...rest } = candidate;

  return {
    ...(rest as Product),
    categoryId,
  };
}

export function normalizeQuoteItem(raw: unknown): QuoteItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const candidate = raw as StoredQuoteItem;
  const product = normalizeProduct(candidate.product);
  if (!product) return null;

  const quantity = Number(candidate.quantity);
  const unitPrice =
    typeof candidate.unitPrice === 'number' && Number.isFinite(candidate.unitPrice)
      ? candidate.unitPrice
      : undefined;

  return {
    product,
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    ...(unitPrice !== undefined ? { unitPrice } : {}),
    ...(candidate.notes ? { notes: candidate.notes } : {}),
  };
}

export function normalizeQuotation(raw: unknown): QuotationRecord | null {
  if (!raw || typeof raw !== 'object') return null;

  const candidate = raw as StoredQuotation;
  if (!candidate.id || !candidate.protocol) return null;

  const items = Array.isArray(candidate.items)
    ? candidate.items
        .map((item) => normalizeQuoteItem(item))
        .filter((item): item is QuoteItem => item !== null)
    : [];

  const status = QUOTATION_STATUSES.includes(candidate.status as QuotationStatus)
    ? (candidate.status as QuotationStatus)
    : 'pending';

  return {
    ...(candidate as QuotationRecord),
    status,
    items,
  };
}

export function normalizeProducts(raw: unknown): Product[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((product) => normalizeProduct(product))
    .filter((product): product is Product => product !== null);
}

export function normalizeCartItems(raw: unknown): QuoteItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => normalizeQuoteItem(item))
    .filter((item): item is QuoteItem => item !== null);
}

export function normalizeQuotations(raw: unknown): QuotationRecord[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((quotation) => normalizeQuotation(quotation))
    .filter((quotation): quotation is QuotationRecord => quotation !== null);
}

export function getProductCategoryLabel(product: Product): string {
  return getCategoryPathLabel(product.categoryId);
}

export function generateProductSku(
  categoryId: string,
  products: Product[],
  ignoreProductId?: string,
): string {
  const rootCategory = getCategoryPath(categoryId)[0];
  const prefix = rootCategory?.code ?? 'GER';
  const skuPrefix = `VER-${prefix}-`;

  const usedSkus = new Set(
    products
      .filter((product) => product.id !== ignoreProductId)
      .map((product) => product.sku.toUpperCase()),
  );

  let highestSequence = 0;

  usedSkus.forEach((sku) => {
    if (!sku.startsWith(skuPrefix)) return;

    const match = sku.slice(skuPrefix.length).match(/\d+/);
    if (match) {
      highestSequence = Math.max(highestSequence, Number(match[0]));
    }
  });

  let sequence = highestSequence + 1;
  let sku = `${skuPrefix}${String(sequence).padStart(4, '0')}`;

  while (usedSkus.has(sku.toUpperCase())) {
    sequence += 1;
    sku = `${skuPrefix}${String(sequence).padStart(4, '0')}`;
  }

  return sku;
}
