// Function to filter for 'sale'
export function filterSales(items) {
  return items.filter(item => item.sale_or_rent === 'sale');
}

// Function to filter for 'rent'
export function filterRent(items) {
  return items.filter(item => item.sale_or_rent === 'rent');
}