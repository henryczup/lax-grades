import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function calculateAverageGPA(distribution: { [key: string]: number }) {
  const totalEntries = Object.values(distribution).reduce((a, b) => a + b, 0);
  const weightedSum = Object.entries(distribution).reduce((sum, [grade, count]) => {
    const gradeValue = {
      A: 4,
      AB: 3.5,
      B: 3,
      BC: 2.5,
      C: 2,
      D: 1,
      F: 0,
    }[grade];
    return sum + (gradeValue || 0) * count;
  }, 0);
  return totalEntries > 0 ? (weightedSum / totalEntries).toFixed(3) : "0.000";
}

export function calculatePercentageA(distribution: { [key: string]: number }) {
  const totalEntries = Object.values(distribution).reduce((a, b) => a + b, 0);
  const aCount = distribution["A"] || 0;
  return totalEntries > 0 ? ((aCount / totalEntries) * 100).toFixed(2) : "0.00";
}

export const gradesOrder = ['A', 'AB', 'B', 'BC', 'C', 'D', 'F', 'Pass', 'Withdraw', 'Other'];