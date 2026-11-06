import { pageMetadata } from '@/lib/seo'
import HomeRo from '@/components/HomeRo'

// Conținutul primei pagini e în components/HomeRo.tsx.
export const metadata = pageMetadata('home', 'ro', {
  fullTitle: 'Biserica Momentum Alba Iulia · Comunitate creștină',
  description:
    'Biserică creștină în Alba Iulia: o comunitate primitoare pentru tineri și familii, cu muzică de închinare, cafea la Momentum Café și grupe pentru copii. Duminica, 10:30, Calea Moților 258.',
})

export default function HomePage() {
  return <HomeRo />
}
