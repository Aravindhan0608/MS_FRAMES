/**
 * Formats numeric prices into Indian Rupee format (e.g., ₹1,499)
 * @param {number} value
 * @returns {string}
 */
export function formatPrice(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return '₹499';
  }
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}
