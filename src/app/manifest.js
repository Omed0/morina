export default function manifest() {
    return {
        name: 'Morina Menu',
        short_name: 'Morina',
        description: "Morina Menu, is Morina Agency Companie's digital menu",
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/Morina.svg',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}