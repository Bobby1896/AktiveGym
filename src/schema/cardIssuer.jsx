export const getCardIssuer = (cardNumber) => {
  const cleanedNumber = cardNumber.replace(/\s/g, ""); // Remove spaces

  // Visa (starts with 4)
  if (/^4/.test(cleanedNumber)) return "visa";

  // Mastercard (starts with 51-55, 2221-2720)
  if (/^5[1-5]|^2[2-7]/.test(cleanedNumber)) return "mastercard";

  // American Express (starts with 34 or 37)
  if (/^3[47]/.test(cleanedNumber)) return "amex";

  // Discover (starts with 6011, 644-649, 65)
  if (/^6(011|4[4-9]|5)/.test(cleanedNumber)) return "discover";

  // Diners Club (starts with 300-305, 36, 38-39)
  if (/^3(0[0-5]|6|8[0-9])/.test(cleanedNumber)) return "diners";

  // JCB (starts with 2131, 1800, or 35)
  if (/^(2131|1800|35)/.test(cleanedNumber)) return "jcb";

  return null; 
};
