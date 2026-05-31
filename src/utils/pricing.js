export const VAT_RATE_PERCENT = 20;

export const PRICE_VAT_NOTE =
  'Gösterilen fiyatlara %20 KDV eklenir. Kesin teklif proje kapsamına göre belirlenir.';

export function formatExVat(amount, { currency = '₺', prefix = '' } = {}) {
  const formatted = Number(amount).toLocaleString('tr-TR');
  return `${prefix}${formatted} ${currency} + KDV`.trim();
}

export function formatStudioStartPrice(amount) {
  return `Başlangıç: ${Number(amount).toLocaleString('tr-TR')} TL + KDV`;
}
