import {
  CustomerData,
  Product,
  QuoteItem,
  QuotationRecord,
  RepresentativeData,
} from '../types';
import {
  normalizeCartItems,
  normalizeProducts,
  normalizeQuotations,
} from './products';

const STORAGE_KEY = 'vertice_app_state';
const STORAGE_VERSION = 3;

export interface PersistedAppState {
  version: typeof STORAGE_VERSION;
  updatedAt: string;
  products?: Product[];
  representative?: RepresentativeData;
  cart?: QuoteItem[];
  customer?: CustomerData;
  quotations?: QuotationRecord[];
  activeQuotationId?: string | null;
}

type UnknownRecord = Record<string, unknown>;

function parseJson(value: string | null): unknown {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizePersistedState(raw: unknown): PersistedAppState {
  const candidate = isRecord(raw) ? raw : {};

  return {
    version: STORAGE_VERSION,
    updatedAt:
      typeof candidate.updatedAt === 'string'
        ? candidate.updatedAt
        : new Date().toISOString(),
    ...(candidate.products !== undefined
      ? { products: normalizeProducts(candidate.products) }
      : {}),
    ...(isRecord(candidate.representative)
      ? { representative: candidate.representative as unknown as RepresentativeData }
      : {}),
    ...(candidate.cart !== undefined
      ? { cart: normalizeCartItems(candidate.cart) }
      : {}),
    ...(isRecord(candidate.customer)
      ? { customer: candidate.customer as unknown as CustomerData }
      : {}),
    ...(candidate.quotations !== undefined
      ? { quotations: normalizeQuotations(candidate.quotations) }
      : {}),
    ...(typeof candidate.activeQuotationId === 'string' ||
    candidate.activeQuotationId === null
      ? { activeQuotationId: candidate.activeQuotationId }
      : {}),
  };
}

export function loadPersistedState(): PersistedAppState {
  try {
    const parsed = parseJson(localStorage.getItem(STORAGE_KEY));
    if (isRecord(parsed) && parsed.version === STORAGE_VERSION) {
      return normalizePersistedState(parsed);
    }
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage access errors and start from an empty state.
  }

  return { version: STORAGE_VERSION, updatedAt: new Date().toISOString() };
}

export function savePersistedState(state: PersistedAppState): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        version: STORAGE_VERSION,
        updatedAt: new Date().toISOString(),
      }),
    );
  } catch (e) {
    console.warn('Erro ao salvar estado da aplicação:', e);
  }
}

export function updatePersistedState(
  partial: Partial<Omit<PersistedAppState, 'version' | 'updatedAt'>>,
): void {
  const current = loadPersistedState();
  savePersistedState({ ...current, ...partial });
}
