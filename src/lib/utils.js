import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function hexToRgba(hex, alpha) {
  // Remove hash if present
  hex = hex?.replace(/^#/, '');

  // Split hex into RGB components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  // Return rgba format with specified alpha
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function gotoByScreen() {
  if (screen.width > 1024) {
    return -190
  } else if (screen.width > 700) {
    return -170
  } else {
    return -155
  }
}

export const getBannersByLangId = (arr, langId, isMenuPage) => {
  if (isMenuPage) {
    const banners = arr.filter((item) => item.language === langId)
    return banners.length > 0 ? banners : null;
  } else {
    return arr;
  }
}

export const textToCapitalized = (text) => {
  // convert the first letter of the all words to uppercase in english
  return text.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
};


//this function checks if the image is from google storage or not and for check null or undefined or null string or empty string
export function checkSourceContent(image) {
  const imgSource = /https:\/\/storage\.googleapis\.com\//;
  if (imgSource.test(image)) {
    return true;
  }
  return false;
}


export function formatPrice(value, currencyType) {
  value = String(value);
  // Split the value into integer and decimal parts
  const [integerPart, decimalPart] = value.split(".");

  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer part and decimal part (if exists) with the appropriate formatting
  const formattedValue = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

  if (formattedValue === "0") {
    return " ";
  }

  // Use a switch case to return the formatted value based on the currency type
  switch (currencyType) {
    case "IQD":
      return `${formattedValue}`;
    case "$":
      return `$${formattedValue}`;
    case "IRR":
      return `${formattedValue} IRR`;
    case "TRY":
      return `₺${formattedValue}`;
    case "EUR":
      return `€${formattedValue}`;
    default:
      return formattedValue; // Return as is if the currency type is not recognized
  }
}