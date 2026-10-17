import GiveContent from '@/components/GiveContent'

// Adresa /give nu se schimbă niciodată — e în QR code-ul pentru donații.
// Textele paginii sunt în components/GiveContent.tsx (RO și EN).
export default function GivePage() {
  return <GiveContent lang="ro" />
}
