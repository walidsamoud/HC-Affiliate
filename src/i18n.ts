import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './lib/locales';

export default getRequestConfig(async ({requestLocale}) => {
  let resolved = await requestLocale;
  if (!resolved || !locales.includes(resolved)) {
    resolved = defaultLocale;
  }
  if (!locales.includes(resolved)) notFound();

  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default,
  };
});
