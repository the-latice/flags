import { countryCodeList } from "./utils/country-list";

const alpha2Set = new Set(countryCodeList.map((c) => c.alpha2));
const alpha3ToAlpha2 = new Map(
  countryCodeList.map((c) => [c.alpha3, c.alpha2]),
);
const numericToAlpha2 = new Map(
  countryCodeList.map((c) => [c.numeric, c.alpha2]),
);

export function normalizeCode(input: string | undefined | null): string {
  if (!input) return "";

  const value = input.toUpperCase().trim();

  if (value.length === 2) {
    if (!alpha2Set.has(value)) {
      console.warn(`[@latice/flags] Unknown code: "${input}"`);
      return "";
    }
    return value;
  }

  if (value === "000") {
    console.warn(
      `[@latice/flags] Ambiguous code "000" — use Alpha-2 or Alpha-3 instead`,
    );
    return "";
  }

  const found = alpha3ToAlpha2.get(value) ?? numericToAlpha2.get(value);

  if (found) return found;

  console.warn(
    `[@latice/flags] Unknown code: "${input}". For subdivisions use "GB-ENG", "GB-SCT" etc.`,
  );
  return "";
}
