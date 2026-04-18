export type ThemeId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

const themeMap: Record<string, string> = {
  "1": "theme-cartier-crimson",
  "2": "theme-tiffany-dawn",
  "3": "theme-harry-winston",
  "4": "theme-champagne-pearl",
  "5": "theme-bulgari-emerald",
  "6": "theme-debeers-platinum",
  "7": "theme-vancleef-rose",
  "8": "theme-obsidian-gold",
  "9": "theme-graff-sapphire",
  "10": "theme-ivory-atelier",
  "11": "theme-chopard-ice",
  "12": "theme-velvet-aubergine",
};

export function getThemeId(): string {
  return process.env.NEXT_PUBLIC_THEME || "1";
}

export function getThemeClass(): string {
  const id = getThemeId();
  return themeMap[id] || themeMap["1"];
}
