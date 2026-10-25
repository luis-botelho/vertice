import { QuoteItem, QuotationRecord } from '../types';

export function getItemUnitPrice(item: QuoteItem): number {
  if (typeof item.unitPrice === 'number') {
    return item.unitPrice;
  }
  const discount = item.product.standardDiscountPercent || 0;
  return item.product.tablePrice * (1 - discount / 100);
}

export function getItemDiscountPercent(item: QuoteItem): number {
  if (!item.product.tablePrice) return 0;
  return (1 - getItemUnitPrice(item) / item.product.tablePrice) * 100;
}

export function getQuotationTotal(quotation: QuotationRecord): number {
  return quotation.items.reduce(
    (total, item) => total + getItemUnitPrice(item) * item.quantity,
    0,
  );
}
