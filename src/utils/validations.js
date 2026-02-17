export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isMinLength(value, minLength) {
  return value.trim().length >= minLength;
}

export function isEmail(value) {
  return value.includes("@");
}

export function isPostalCode(value) {
  return value.trim().length >= 4 && value.trim().length <= 10;
}
