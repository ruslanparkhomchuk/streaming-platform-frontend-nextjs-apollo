"use server";

import { cookies } from "next/headers";

import {
	COOKIE_NAME,
	defaultLanguage,
	type Language,
	languages,
} from "./config";

export async function getCurrentLanguage(): Promise<Language> {
	const cookiesStore = await cookies();

	const language = cookiesStore.get(COOKIE_NAME)?.value;

	return languages.includes(language as Language)
		? (language as Language)
		: defaultLanguage;
}

export async function setLanguage(language: Language) {
	const cookiesStore = await cookies();

	cookiesStore.set(COOKIE_NAME, language);
}
