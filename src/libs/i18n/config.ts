export const COOKIE_NAME = "language";
export const languages = ["uk", "en"] as const;
export const defaultLanguage: Language = "uk";

export type Language = (typeof languages)[number];
