import http from 'http';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const DIST = path.resolve('dist');
const PORT = 4173;
const MAX_PAGES = 400;
const SKIP = /^\/(login|signup|sign-up|dashboard|reset|reset-password|auth)/i;

const queue = [
  '/', '/subscribe', '/accessibility', '/technology', '/finance',
  '/cybersecurity', '/energy', '/healthcare', '/manufacturing',
  '/smart-cities', '/supply-chain', '/markets', '/billionaires',
  '/business-news', '/leadership', '/magazine', '/world',
  '/international-news', '/startup-success',
];
const seen = new Set();

const server = http.createServer((req, res) =>
  handler(req, res, { public: DIST, rewrites: [{ source: '**', destination: '/index.html' }] })
).listen(PORT);

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

while (queue.length && seen.size < MAX_PAGES) {
  const route = queue.shift();
  if (seen.has(route) || SKIP.test(route)) continue;
  seen.add(route);

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => {
    if (/googlesyndication|doubleclick|googleadservices/.test(req.url())) req.abort();
    else req.continue();
  });

  try {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {
    console.warn('skipped', route, '-', e.message);
    await page.close();
    continue;
  }

  const links = await page.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href')));
  for (let l of links) {
    l = l.split('#')[0].split('?')[0];
    if (l.length > 1) l = l.replace(/\/$/, '');
    if (l && !l.startsWith('//') && !/\.[a-z0-9]+$/i.test(l) && !seen.has(l)) queue.push(l);
  }

  const html = await page.content();
  const out = route === '/' ? 'index.html' : path.join(route, 'index.html');
  await fs.mkdir(path.dirname(path.join(DIST, out)), { recursive: true });
  await fs.writeFile(path.join(DIST, out), html);
  console.log('prerendered', route);
  await page.close();
}

await browser.close();
server.close();
console.log(`Done: ${seen.size} pages`);