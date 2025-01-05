import { toJalaali } from "jalaali-js";

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

export function convertToShamsiAndGregorian(dateString) {
  const date = new Date(dateString);

  // Extract Gregorian date
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1; // Months are zero-indexed
  const gregorianDay = date.getDate();

  // Convert to Shamsi (Jalali) date
  const jalaaliDate = toJalaali(gregorianYear, gregorianMonth, gregorianDay);

  return {
    gregorian: {
      year: gregorianYear,
      month: gregorianMonth,
      day: gregorianDay,
    },
    shamsi: {
      year: jalaaliDate.jy,
      month: jalaaliDate.jm,
      day: jalaaliDate.jd,
    },
  };
}

export function formatTime(dateString) {
  const date = new Date(dateString);
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  const jalaaliDate = toJalaali(gregorianYear, gregorianMonth, gregorianDay);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  const formattedDate = `(${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd})`;

  return `${formattedTime} - ${formattedDate}`;
}
