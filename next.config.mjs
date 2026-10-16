/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}
const nextConfig = {
  reactStrictMode: false,
  // Vechile adrese ale paginilor în engleză (cu /en) duc la cele noi, fără /en.
  // /give și /en/give NU se schimbă: /give e în QR code-ul pentru donații.
  // Notă: /about, /pray, /join, /connect, /why-this-city erau înainte paginile în română;
  // acum sunt paginile în engleză (variantele românești: /cine-suntem, /rugaciune etc.).
  async redirects() {
    return [
      { source: '/en/about',                destination: '/about',                permanent: true },
      { source: '/en/misiunea-noastra',     destination: '/our-mission',          permanent: true },
      { source: '/en/our-mission',          destination: '/our-mission',          permanent: true },
      { source: '/en/pray',                 destination: '/pray',                 permanent: true },
      { source: '/en/join',                 destination: '/join',                 permanent: true },
      { source: '/en/connect',              destination: '/connect',              permanent: true },
      { source: '/en/why-this-city',        destination: '/why-this-city',        permanent: true },
      { source: '/en/privacy-policy',       destination: '/privacy-policy',       permanent: true },
      { source: '/en/terms-and-conditions', destination: '/terms-and-conditions', permanent: true },
      { source: '/en/cookie-policy',        destination: '/cookie-policy',        permanent: true },
    ]
  },
}
export default nextConfig