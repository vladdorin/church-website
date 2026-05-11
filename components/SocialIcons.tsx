// components/SocialIcons.tsx
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

export default function SocialIcons({ dark = false }) {
  return (
    <div style={{display:'flex', gap:12}}>
      {[
        { href:'https://facebook.com/bisericamomentum', icon:<FaFacebookF /> },
        { href:'https://instagram.com/bisericamomentum', icon:<FaInstagram /> },
        { href:'https://youtube.com/@bisericamomentum', icon:<FaYoutube /> },
        { href:'https://wa.me/40700000000', icon:<FaWhatsapp /> },
      ].map(({ href, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width:48,
            height:48,
            borderRadius:'50%',
            border: dark
              ? '1px solid rgba(255,255,255,0.2)'
              : '1px solid rgba(10,15,44,0.15)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color: dark ? 'white' : '#0a0f2c',
            fontSize:18,
            textDecoration:'none',
            transition:'all 0.2s ease'
          }}
        >
          {icon}
        </a>
      ))}
    </div>
  )
}