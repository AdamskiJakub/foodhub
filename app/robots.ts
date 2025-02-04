import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const sitemap = new URL('/sitemap.xml', process.env.NEXT_PUBLIC_BASE_URL).toString();

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap,
    }
}
