function getCurrencySymbol(currency: string): string {
  const symbol = new Intl.NumberFormat('en', { style: 'currency', currency })
    .formatToParts(3.5)
    .find(x => x.type === 'currency');
  return symbol?.value ?? '';
}

export default getCurrencySymbol;
