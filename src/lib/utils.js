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