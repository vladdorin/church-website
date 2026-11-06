import { pageMetadata } from '@/lib/seo'
import HomeEn from '@/components/HomeEn'

// The home page content lives in components/HomeEn.tsx.
export const metadata = pageMetadata('home', 'en', {
  fullTitle: 'Momentum Church Alba Iulia · Christian Community',
  description:
    'A Christian church in Alba Iulia, Romania: a welcoming community for young people and families, with worship music, coffee at Momentum Café and kids’ groups. Sundays 10:30, Calea Moților 258.',
})

export default function HomePage() {
  return <HomeEn />
}
