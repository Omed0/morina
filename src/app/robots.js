export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/*',

            // disallow: '/admin',
        },
        sitemap: 'https://morinamenu.com/sitemap.xml',
        default: 'https://morinamenu.com/',
    }
}