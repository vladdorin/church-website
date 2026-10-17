/* Butoanele de sub titlul paginii, care duc la secțiunile principale (ca pe „Sunt nou”).
   links: [id-ul secțiunii, textul butonului]. Secțiunea trebuie să aibă același id. */
export default function JumpNav({ links, label }: { links: [string, string][]; label: string }) {
  return (
    <nav className="nh-jump page-jump" aria-label={label}>
      {links.map(([id, text]) => <a key={id} href={`#${id}`}>{text}</a>)}
    </nav>
  )
}
