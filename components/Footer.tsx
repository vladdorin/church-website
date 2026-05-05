import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{background:'#0a0f2c', color:'white', marginTop:'auto'}}>
      <div className="wrap" style={{padding:'72px 24px 40px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:48, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.08)'}}>

          {/* Brand */}
          <div style={{gridColumn:'span 2'}}>
            <Image src="/logo-horizontal.png" alt="Momentum" width={160} height={36} style={{height:36, width:'auto', marginBottom:20}} />
            <p style={{color:'rgba(255,255,255,0.45)', fontSize:14, lineHeight:1.7, maxWidth:260}}>
              O comunitate condusă de Duhul Sfânt,<br/>
              în mișcare, pentru gloria lui Dumnezeu.<br/>
              Alba Iulia, România.
            </p>
            <div style={{display:'flex', gap:10, marginTop:20}}>
              {[['FB','https://facebook.com'],['IG','https://instagram.com'],['YT','https://youtube.com']].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  width:36, height:36, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', textDecoration:'none'}}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Pagini */}
          <div>
            <p style={{fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:20}}>Pagini</p>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {[['/about','Cine suntem?'],['/misiunea-noastra','Misiunea noastră'],['/pray','Rugăciune'],['/join','Alătură-te'],['/give','Donează'],['/connect','Contact']].map(([href, label]) => (
                <Link key={href} href={href} style={{color:'rgba(255,255,255,0.55)', fontSize:14, textDecoration:'none'}}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:20}}>Contact</p>
            <div style={{display:'flex', flexDirection:'column', gap:12, fontSize:14, color:'rgba(255,255,255,0.55)'}}>
              <span>📍 Alba Iulia, România</span>
              <a href="mailto:biserica.momentum@gmail.com" style={{color:'rgba(255,255,255,0.55)', textDecoration:'none'}}>
                biserica.momentum@gmail.com
              </a>
              <a href="https://www.bisericamomentum.ro" style={{color:'rgba(255,255,255,0.55)', textDecoration:'none'}}>
                www.bisericamomentum.ro
              </a>
            </div>
          </div>
        </div>

        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:12, paddingTop:32, fontSize:12, color:'rgba(255,255,255,0.25)'}}>
          <span>© {new Date().getFullYear()} Biserica Momentum · Alba Iulia, România</span>
          <span>A Spirit-led community on the move, for the glory of God.</span>
        </div>
      </div>
    </footer>
  )
}
