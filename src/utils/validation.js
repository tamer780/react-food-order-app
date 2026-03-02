export function isEmail(value) {
  return value.includes("@") && value.trim().length > 5;
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isPostalCode(value) {
  return /^\d{5}$/.test(value);
}
