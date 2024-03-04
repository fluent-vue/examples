import { FluentBundle } from '@fluent/bundle';
import { createFluentVue } from 'fluent-vue';

export default defineNuxtPlugin((nuxtApp) => {
    const locales: Record<string, FluentBundle> = {
        'en': new FluentBundle('en'),
        'fr': new FluentBundle('fr'),
    };

    const fluent = createFluentVue({
        bundles: [locales['en']],
    });

    nuxtApp.vueApp.use(fluent);

    return {
        provide: {
            changeLocale(locale: string) {
                const bundle = locales[locale] ?? locales['en'];
                fluent.bundles = [bundle];
            }
        }
    }
});
