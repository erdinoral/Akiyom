import React from 'react';
import { PRICE_VAT_NOTE } from '../utils/pricing.js';

const PriceVatNote = ({ className = '' }) => (
  <p className={`price-vat-note${className ? ` ${className}` : ''}`}>{PRICE_VAT_NOTE}</p>
);

export default PriceVatNote;
