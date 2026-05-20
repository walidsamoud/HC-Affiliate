const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const THEME_FAVICON_PATH = '/img/logo/crownXfavicon.png';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/favicon.ico', destination: THEME_FAVICON_PATH },
        ];
    },
    images: {
        domains: ['api.crownxbet.com', 'crownxbet.com', 'localhost', '127.0.0.1'],
    },
};

module.exports = withNextIntl(nextConfig);
