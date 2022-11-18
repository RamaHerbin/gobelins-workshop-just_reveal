export const removeAccents = (string: String) => string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
