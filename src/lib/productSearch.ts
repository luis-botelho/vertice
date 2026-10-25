import { Product } from '../types';
import {
  getCategoryById,
  getCategoryPath,
  getCategorySearchText,
} from '../data/categories';

export interface ProductSearchResult {
  product: Product;
  score: number;
  matchedFields: string[];
}

interface SearchField {
  label: string;
  text: string;
  normalized: string;
  tokens: string[];
  weight: number;
}

const STOP_WORDS = new Set([
  'a',
  'as',
  'o',
  'os',
  'de',
  'da',
  'das',
  'do',
  'dos',
  'e',
  'ou',
  'em',
  'no',
  'na',
  'nos',
  'nas',
  'para',
  'por',
  'com',
  'sem',
  'um',
  'uma',
  'ao',
  'aos',
  'tipo',
  'tipos',
  'modelo',
  'modelos',
]);

const TOKEN_SYNONYMS: Record<string, string[]> = {
  cano: ['tubo', 'tubos', 'tubulacao'],
  canos: ['tubo', 'tubos'],
  tubo: ['cano', 'tubulacao'],
  tubos: ['cano', 'tubulacao'],
  torneira: ['misturador', 'metal', 'metais'],
  torneiras: ['misturador', 'metal', 'metais'],
  metal: ['torneira', 'metais'],
  metais: ['metal', 'torneira'],
  registro: ['valvula', 'fechamento'],
  registros: ['valvula', 'fechamento'],
  valvula: ['registro'],
  valvulas: ['registro'],
  descarga: ['caixa', 'acoplada', 'mecanismo'],
  caixa: ['reservatorio', 'acoplada'],
  mecanismo: ['descarga', 'acoplada'],
  fio: ['cabo', 'condutor'],
  fios: ['cabo', 'condutor'],
  cabo: ['fio', 'condutor'],
  cabos: ['fio', 'condutor'],
  disjuntor: ['protecao', 'breaker'],
  disjuntores: ['protecao', 'breaker'],
  tomada: ['plug', 'interruptor'],
  tomadas: ['plug', 'interruptor'],
  interruptor: ['tomada', 'switch'],
  ralo: ['sifao', 'dreno', 'drenagem'],
  sifao: ['ralo', 'dreno'],
  esgoto: ['dreno', 'drenagem'],
  dreno: ['esgoto', 'ralo', 'sifao'],
  luva: ['conexao', 'conector'],
  joelho: ['curva', 'conexao'],
  curva: ['joelho', 'conexao'],
  adaptador: ['bucha', 'conexao'],
  bucha: ['adaptador', 'conexao'],
  vedante: ['veda', 'rosca', 'selante'],
  veda: ['vedante', 'selante', 'rosca'],
  selante: ['vedante', 'adesivo', 'silicone'],
  hidraulica: ['hidraulico', 'agua', 'encanamento'],
  hidraulico: ['hidraulica', 'agua', 'encanamento'],
  eletrica: ['eletrico', 'energia'],
  eletrico: ['eletrica', 'energia'],
  argamassa: ['rejunte', 'cimento', 'cola'],
  rejunte: ['argamassa', 'cimento'],
  pvc: ['soldavel', 'plastico'],
  soldavel: ['pvc', 'solda'],
  cpvc: ['agua', 'quente'],
  ppr: ['agua', 'quente', 'termofusao'],
  inox: ['aco', 'inoxidavel'],
  cromado: ['cromo', 'metal', 'latao'],
  latao: ['metal', 'cromado'],
  epi: ['seguranca', 'protecao'],
  breaker: ['disjuntor'],
  pa: ['parede'],
  pia: ['bancada', 'cuba'],
  bancada: ['pia', 'cuba'],
};

const FIELD_WEIGHTS = {
  sku: 16,
  name: 12,
  refFab: 10,
  category: 8,
  manufacturer: 6,
  ncm: 5,
  material: 4.5,
  application: 4,
  ean: 4,
  description: 2.5,
  features: 2,
  specs: 1.5,
  logistics: 1.2,
};

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokenize(value: string): string[] {
  return normalizeSearchText(value)
    .split(/\s+/)
    .filter((token) => {
      if (!token) return false;
      if (STOP_WORDS.has(token)) return false;
      return token.length > 1 || /^\d$/.test(token);
    });
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 0; i < a.length; i += 1) {
    const current = [i + 1];

    for (let j = 0; j < b.length; j += 1) {
      const insertion = current[j] + 1;
      const deletion = previous[j + 1] + 1;
      const substitution = previous[j] + (a[i] === b[j] ? 0 : 1);
      current.push(Math.min(insertion, deletion, substitution));
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function similarity(a: string, b: string): number {
  const longest = Math.max(a.length, b.length);
  if (longest === 0) return 1;
  return 1 - levenshtein(a, b) / longest;
}

function getCategorySearchFields(product: Product): {
  text: string;
  keywords: string[];
} {
  const path = getCategoryPath(product.categoryId);
  const leaf = getCategoryById(product.categoryId);

  return {
    text: [
      getCategorySearchText(product.categoryId),
      path.map((node) => node.name).join(' '),
      leaf?.code ?? '',
    ].join(' '),
    keywords: unique(path.flatMap((node) => [node.name, ...node.keywords])),
  };
}

function buildSearchFields(product: Product): SearchField[] {
  const category = getCategorySearchFields(product);

  const rawFields: Array<{
    label: string;
    text: string;
    weight: number;
  }> = [
    { label: 'SKU', text: product.sku, weight: FIELD_WEIGHTS.sku },
    { label: 'nome', text: product.name, weight: FIELD_WEIGHTS.name },
    { label: 'referência', text: product.refFab ?? '', weight: FIELD_WEIGHTS.refFab },
    {
      label: 'categoria',
      text: `${category.text} ${category.keywords.join(' ')}`,
      weight: FIELD_WEIGHTS.category,
    },
    {
      label: 'fabricante',
      text: product.manufacturer,
      weight: FIELD_WEIGHTS.manufacturer,
    },
    { label: 'NCM', text: product.ncm ?? '', weight: FIELD_WEIGHTS.ncm },
    { label: 'material', text: product.material, weight: FIELD_WEIGHTS.material },
    {
      label: 'aplicação',
      text: product.application,
      weight: FIELD_WEIGHTS.application,
    },
    {
      label: 'EAN',
      text: [product.logisticSpecs?.ean13, product.logisticSpecs?.dun14]
        .filter(Boolean)
        .join(' '),
      weight: FIELD_WEIGHTS.ean,
    },
    {
      label: 'descrição',
      text: product.description,
      weight: FIELD_WEIGHTS.description,
    },
    {
      label: 'características',
      text: product.features.join(' '),
      weight: FIELD_WEIGHTS.features,
    },
    {
      label: 'ficha técnica',
      text: (product.technicalSpecs ?? [])
        .flatMap((spec) => [spec.parameter, spec.value, spec.standard])
        .join(' '),
      weight: FIELD_WEIGHTS.specs,
    },
    {
      label: 'logística',
      text: product.logisticSpecs
        ? Object.values(product.logisticSpecs).join(' ')
        : '',
      weight: FIELD_WEIGHTS.logistics,
    },
  ];

  return rawFields
    .filter((field) => field.text.trim().length > 0)
    .map((field) => {
      const normalized = normalizeSearchText(field.text);
      return {
        ...field,
        normalized,
        tokens: unique(normalized.split(/\s+/).filter(Boolean)),
      };
    });
}

function scoreTokenInField(
  queryToken: string,
  fieldToken: string,
): number {
  if (fieldToken === queryToken) return 1;

  if (
    queryToken.length >= 3 &&
    fieldToken.startsWith(queryToken)
  ) {
    return 0.78;
  }

  if (
    queryToken.length >= 4 &&
    fieldToken.includes(queryToken)
  ) {
    return 0.52;
  }

  if (queryToken.length >= 5 && fieldToken.length >= 5) {
    const score = similarity(queryToken, fieldToken);
    if (score >= 0.8) {
      return Math.min(0.7, 0.3 + (score - 0.8) * 1.45);
    }
  }

  return 0;
}

function scoreTokenVariants(
  queryToken: string,
  field: SearchField,
): number {
  const variants = unique([
    queryToken,
    ...(TOKEN_SYNONYMS[queryToken] ?? []),
  ]);

  let best = 0;

  variants.forEach((variant) => {
    field.tokens.forEach((fieldToken) => {
      best = Math.max(best, scoreTokenInField(variant, fieldToken));
    });
  });

  return best;
}

interface ScoredProductSearchResult extends ProductSearchResult {
  matchedTokenCount: number;
}

function scoreProduct(
  product: Product,
  queryTokens: string[],
  normalizedQuery: string,
): ScoredProductSearchResult {
  const fields = buildSearchFields(product);
  let score = 0;
  let matchedTokenCount = 0;
  const matchedFields: string[] = [];

  for (const token of queryTokens) {
    let bestField: SearchField | undefined;
    let bestWeightedScore = 0;

    for (const field of fields) {
      const fieldScore = scoreTokenVariants(token, field);
      if (fieldScore <= 0) continue;

      const weightedScore = fieldScore * field.weight;
      if (weightedScore > bestWeightedScore) {
        bestWeightedScore = weightedScore;
        bestField = field;
      }
    }

    if (bestField) {
      matchedTokenCount += 1;
      score += bestWeightedScore;

      if (!matchedFields.includes(bestField.label)) {
        matchedFields.push(bestField.label);
      }
    }
  }

  const nameField = fields.find((field) => field.label === 'nome');
  const skuField = fields.find((field) => field.label === 'SKU');

  if (
    nameField &&
    normalizedQuery.length >= 4 &&
    nameField.normalized.includes(normalizedQuery)
  ) {
    score += FIELD_WEIGHTS.name * 0.2;
    if (!matchedFields.includes(nameField.label)) {
      matchedFields.unshift(nameField.label);
    }
  }

  if (
    skuField &&
    normalizedQuery.replace(/\s+/g, '').length >= 4 &&
    skuField.normalized.replace(/\s+/g, '').includes(
      normalizedQuery.replace(/\s+/g, ''),
    )
  ) {
    score += FIELD_WEIGHTS.sku * 0.3;
    if (!matchedFields.includes(skuField.label)) {
      matchedFields.unshift(skuField.label);
    }
  }

  if (queryTokens.length > 1 && score > 0) {
    score *= 1 + Math.min(0.25, (queryTokens.length - 1) * 0.06);
  }

  return {
    product,
    score,
    matchedFields: matchedFields.slice(0, 3),
    matchedTokenCount,
  };
}

export function searchProducts(
  products: Product[],
  query: string,
  limit?: number,
): ProductSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    const results = products.map((product) => ({
      product,
      score: 0,
      matchedFields: [],
    }));
    return typeof limit === 'number' ? results.slice(0, limit) : results;
  }

  const queryTokens = unique(tokenize(query));
  if (queryTokens.length === 0) {
    const results = products.map((product) => ({
      product,
      score: 0,
      matchedFields: [],
    }));
    return typeof limit === 'number' ? results.slice(0, limit) : results;
  }

  const scoredProducts = products.map((product) =>
    scoreProduct(product, queryTokens, normalizedQuery),
  );

  const strictMatches = scoredProducts.filter(
    (result) =>
      result.matchedTokenCount === queryTokens.length && result.score >= 0.75,
  );

  const results = (
    strictMatches.length > 0
      ? strictMatches
      : scoredProducts.filter(
          (result) =>
            result.matchedTokenCount / queryTokens.length >= 0.5 &&
            result.score >= 0.75,
        )
  ).sort(
    (a, b) =>
      b.score - a.score ||
      a.product.name.localeCompare(b.product.name, 'pt-BR'),
  );

  return typeof limit === 'number' ? results.slice(0, limit) : results;
}

export function getSearchMatchLabel(result: ProductSearchResult): string {
  if (result.matchedFields.length === 0) return '';
  return result.matchedFields.join(' • ');
}
