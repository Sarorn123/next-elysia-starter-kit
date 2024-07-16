import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'km'];
export const defaultLocale = 'en';
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as Locale)) notFound();

    return {
        messages: (await import(`./content/${locale}.json`)).default
    };
});