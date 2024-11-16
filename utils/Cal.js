// Function to filter for 'sale'
export function filterSales(items) {
  return items.filter((item) => item.sale_or_rent === "sale");
}

// Function to filter for 'rent'
export function filterRent(items) {
  return items.filter((item) => item.sale_or_rent === "rent");
}

export function calculateDaysLeft(endDateStr) {
  const today = new Date();
  const endDate = new Date(endDateStr);

  // Calculate the difference in milliseconds
  const differenceInMillis = endDate - today;

  // Convert milliseconds to days
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil(differenceInMillis / millisecondsPerDay);

  return daysLeft;
}
