// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { routes } from './routesForSitemap.js'    // путь до твоего router.js

const hostname = 'https://vchutye.ru'

const staticLinks = routes
    .filter(route => !route.path.includes(':')) // только статические
    .map(route => ({
        url: route.path,
        changefreq: 'weekly',
        priority: 0.7
    }))

async function generate() {
    const sitemap = new SitemapStream({ hostname })
    const writeStream = createWriteStream('./public/sitemap.xml')

    sitemap.pipe(writeStream)
    staticLinks.forEach(link => sitemap.write(link))

    sitemap.end()
    await streamToPromise(sitemap)
    console.log('sitemap.xml создан!')
}

generate()
