import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Accordion from '@/components/Accordion'
import StackGallery from '@/components/StackGallery'
import { routeFor } from '@/lib/routes'

const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=Biserica+Momentum+Alba+Iulia'
const WAZE_HREF = 'https://waze.com/ul?q=Biserica%20Momentum%20Alba%20Iulia&navigate=yes'

/* Pagina „Sunt nou” / „I'm new” — aceeași structură în ambele limbi. */
export default function NewHere({ lang }: { lang: 'ro' | 'en' }) {
  const en = lang === 'en'
  const id = en
    ? { times: 'times', kids: 'kids', cafe: 'cafe', faq: 'faq' }
    : { times: 'program', kids: 'copii', cafe: 'cafenea', faq: 'intrebari' }

  const faq = en
    ? [
        { title: 'What is the service like?', content: <>
          <p>Our service typically runs about 90 minutes. From 9:30 we meet upstairs in Momentum Café for coffee, a snack and fellowship. The café closes at 10:15, when the main hall opens.</p>
          <p>The service starts at 10:30 in the main hall with a greeting and worship. After the announcements we listen to teaching from the Word of God and dig deep into Scripture; we hope it is both challenging and transformative. All of this is to help you get a glimpse of the One we all love: Jesus. After the teaching, we respond by singing another song or two in worship to God.</p>
        </> },
        { title: 'Where do I park?', content: <p>We have a spacious courtyard with room for everyone. Volunteers will be waiting at the courtyard entrance to show you where to park.</p> },
        { title: 'What should I wear?', content: <p>We don’t have a dress code or rules about clothing. We do value modesty: come in the style that reflects who you are and honours God.</p> },
        { title: 'Is the building accessible?', content: <p>The main hall where the Sunday service takes place is at ground level, with no stairs, so it’s easy to get to and enter. Momentum Café is upstairs and, unfortunately, can only be reached by stairs.</p> },
        { title: 'Do I need to know anyone or anything beforehand?', content: <p>Not at all. Everyone is welcome, wherever you come from and whatever you believe. You can simply come, listen and see what it’s like.</p> },
        { title: 'What about my kids?', content: <p>We have two groups: Luminițele (ages 4–8) and Exploratorii (ages 9–14). See the <a href={`#${id.kids}`}>parents section</a> for how check-in works.</p> },
        { title: 'How can I get involved?', content: <p>After your first visit, fill in the connect card on the <Link href={routeFor('join', true)}>Join us</Link> page and we’ll get in touch.</p> },
      ]
    : [
        { title: 'Cum arată programul?', content: <>
          <p>Programul durează aproximativ 90 de minute. De la 9:30 ne întâlnim sus, în Momentum Café, la o cafea, o gustare și socializare. Cafeneaua se închide la 10:15, când se deschide sala mare.</p>
          <p>La 10:30 începem în sala mare cu un cuvânt de bun venit și închinare. După anunțuri urmează învățătura din Cuvântul lui Dumnezeu, în care pătrundem în profunzimea Scripturii; ne dorim să fie un timp care te provoacă și te transformă. Totul ca să-L poți cunoaște pe Cel pe care Îl iubim cu toții: Isus. După învățătură, răspundem prin încă una sau două cântări de închinare.</p>
        </> },
        { title: 'Unde parchez?', content: <p>Avem o curte spațioasă, în care încape toată lumea. La intrarea în curte te așteaptă voluntari care te îndrumă unde să parchezi.</p> },
        { title: 'Cum mă îmbrac?', content: <p>Nu avem un cod vestimentar și nu punem restricții legate de haine. Apreciem decența: vino în stilul care te reprezintă și prin care Îl onorezi pe Dumnezeu.</p> },
        { title: 'Clădirea este accesibilă?', content: <p>Sala mare, unde are loc programul de duminică, este la nivelul solului, fără scări, deci poți ajunge și intra ușor. Momentum Café este la etaj și, din păcate, se poate ajunge acolo doar pe scări.</p> },
        { title: 'Trebuie să cunosc pe cineva sau să știu ceva dinainte?', content: <p>Deloc. Oricine e binevenit, indiferent de unde vii sau ce crezi. Poți doar să vii, să asculți și să vezi cum e.</p> },
        { title: 'Ce fac cu copiii?', content: <p>Avem două grupe: Luminițele (4–8 ani) și Exploratorii (9–14 ani). Vezi <a href={`#${id.kids}`}>secțiunea pentru părinți</a> ca să afli cum funcționează check-in-ul.</p> },
        { title: 'Cum mă pot implica?', content: <p>După prima vizită, completează cardul de conectare de pe pagina <Link href={routeFor('join', false)}>Alătură-te</Link> și te contactăm noi.</p> },
      ]

  const steps = en
    ? [
        { t: 'Arrive a few minutes early', d: 'On your first visit we’ll help you register your child. It only takes a minute.' },
        { t: 'Check in', d: 'You check your child in at the check-in station and receive a name label with a security code.' },
        { t: 'Pick up with your code', d: 'After the service, you pick up your child using the code on your label. Only you can collect them.' },
      ]
    : [
        { t: 'Vino cu câteva minute mai devreme', d: 'La prima vizită te ajutăm să îți înregistrezi copilul. Durează doar un minut.' },
        { t: 'Faci check-in-ul', d: 'Îți înregistrezi copilul la stația de check-in și primești o etichetă cu numele lui și un cod de siguranță.' },
        { t: 'Îl iei pe baza codului', d: 'La finalul programului îți iei copilul pe baza codului de pe etichetă. Doar tu îl poți prelua.' },
      ]

  return (
    <>
      {/* HERO */}
      <section className="nh-hero">
        <div className="wrap">
          <h1 className="display nh-hero-title">
            {en ? <>I&apos;M<br /><span>NEW.</span></> : <>SUNT<br /><span>NOU.</span></>}
          </h1>
          <p className="nh-hero-sub">
            {en
              ? 'We’re so glad you want to get to know us. Here’s everything you need to know before your first Sunday at Momentum.'
              : 'Ne bucurăm că vrei să ne cunoști. Aici găsești tot ce trebuie să știi înainte de prima ta duminică la Momentum.'}
          </p>
          <nav className="nh-jump" aria-label={en ? 'On this page' : 'Pe această pagină'}>
            <a href={`#${id.times}`}>{en ? 'Times & location' : 'Program și locație'}</a>
            <a href={`#${id.kids}`}>{en ? 'Kids' : 'Copii'}</a>
            <a href={`#${id.cafe}`}>Momentum Café</a>
            <a href={`#${id.faq}`}>{en ? 'FAQ' : 'Întrebări'}</a>
          </nav>
        </div>
      </section>

      {/* PROGRAM + LOCAȚIE */}
      <section id={id.times} className="nh-section nh-times">
        <div className="wrap-wide nh-times-grid">
          <div>
            <h2 className="nh-title">{en ? <>EVERY<br />SUNDAY.</> : <>ÎN FIECARE<br />DUMINICĂ.</>}</h2>
            <ul className="nh-schedule">
              <li>
                <span className="nh-schedule-time">9:30</span>
                <span className="nh-schedule-label">
                  {en ? 'Coffee, snacks & fellowship' : 'Cafea, gustare și socializare'}
                  <small>{en ? 'Momentum Café, upstairs' : 'Momentum Café, la etaj'}</small>
                </span>
              </li>
              <li>
                <span className="nh-schedule-time">10:30</span>
                <span className="nh-schedule-label">
                  {en ? 'Service' : 'Programul'}
                  <small>{en ? 'Main hall · about 90 minutes' : 'Sala mare · aproximativ 90 de minute'}</small>
                </span>
              </li>
            </ul>
          </div>

          <div className="nh-location">
            <p className="nh-kicker"><HiOutlineLocationMarker aria-hidden /> {en ? 'Location' : 'Locație'}</p>
            <p className="nh-address">Calea Moților nr. 258<br />Alba Iulia</p>
            <p className="nh-parking">
              {en
                ? 'Park in our courtyard: there’s room for everyone, and volunteers at the entrance will show you where to go.'
                : 'Parchezi în curtea noastră: e loc pentru toată lumea, iar voluntarii de la intrare te îndrumă.'}
            </p>
            <div className="nh-buttons">
              <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Google Maps</a>
              <a href={WAZE_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue">Waze</a>
            </div>
          </div>
        </div>
      </section>

      {/* PENTRU PĂRINȚI */}
      <section id={id.kids} className="nh-section nh-kids">
        <div className="wrap-wide">
          <div className="nh-kids-head">
            <h2 className="nh-title">{en ? <>FOR<br />PARENTS.</> : <>PENTRU<br />PĂRINȚI.</>}</h2>
            <p className="nh-lead">
              {en
                ? 'Your children have their own place at Momentum, with age groups and people who love them and help them get to know Jesus.'
                : 'Copiii tăi au propriul loc la Momentum, pe grupe de vârstă, cu oameni care îi iubesc și îi ajută să-L cunoască pe Isus.'}
            </p>
          </div>

          <div className="nh-groups">
            <article className="nh-group nh-group--blue">
              <span className="nh-group-age">{en ? 'Ages 4–8' : '4–8 ani'}</span>
              <h3 className="nh-group-name">Luminițele</h3>
              <p>{en
                ? 'For the little ones: Bible stories, games and songs, in a way they understand.'
                : 'Pentru cei mici: povești biblice, jocuri și cântări, pe înțelesul lor.'}</p>
            </article>
            <article className="nh-group nh-group--navy">
              <span className="nh-group-age">{en ? 'Ages 9–14' : '9–14 ani'}</span>
              <h3 className="nh-group-name">Exploratorii</h3>
              <p>{en
                ? 'For older kids: discovering the Bible, asking questions and growing in faith together.'
                : 'Pentru copiii mai mari: descoperă Biblia, pun întrebări și cresc împreună în credință.'}</p>
            </article>
          </div>

          <div className="nh-checkin">
            <div className="nh-checkin-head">
              <h3>{en ? 'Quick, safe check-in' : 'Check-in rapid și sigur'}</h3>
            </div>
            <ol className="nh-steps">
              {steps.map((s, i) => (
                <li key={s.t}>
                  <span className="nh-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* MOMENTUM CAFÉ */}
      <section id={id.cafe} className="nh-section nh-cafe">
        <div className="nh-cafe-ghost" aria-hidden>CAFÉ</div>
        <div className="wrap-wide nh-cafe-grid">
          <div>
            <p className="nh-kicker nh-kicker--light">{en ? 'Upstairs' : 'La etaj'}</p>
            <h2 className="nh-title nh-title--light">MOMENTUM<br /><span>CAFÉ.</span></h2>
          </div>
          <div>
            <p className="nh-lead nh-lead--light">
              {en
                ? 'Head upstairs to Momentum Café. From 9:30 we meet here for coffee, a snack and a good conversation before the service. It’s the best place to meet new people.'
                : 'Urcă la etaj, în Momentum Café. De la 9:30 ne întâlnim aici la o cafea, o gustare și o discuție bună, înainte de program. E cel mai bun loc să cunoști oameni noi.'}
            </p>
            <p className="nh-cafe-time">
              <strong>9:30–10:15</strong>
              {en ? 'Then we head down to the main hall for the 10:30 service.' : 'Apoi coborâm în sala mare, unde programul începe la 10:30.'}
            </p>
            <p className="nh-cafe-merch">
              <strong>Momentum merch</strong>
              {en
                ? 'In the café you’ll also find our Momentum merch: T-shirts, caps and mugs you can take home. Ask the café team.'
                : 'În cafenea găsești și merch Momentum: tricouri, șepci și căni pe care le poți lua acasă. Întreabă echipa de la cafenea.'}
            </p>
          </div>
        </div>
      </section>

      {/* ÎNTREBĂRI FRECVENTE */}
      <section id={id.faq} className="nh-section nh-faq">
        <div className="wrap-wide nh-faq-grid">
          <h2 className="nh-title">{en ? <>GOOD<br />QUESTIONS.</> : <>ÎNTREBĂRI<br />FRECVENTE.</>}</h2>
          <Accordion items={faq} idPrefix="faq" tone="light" />
        </div>
      </section>

      {/* GALERIE — pozele cad în teanc, apoi se răsfiră */}
      <StackGallery />

      {/* CTA */}
      <section className="nh-section nh-cta">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="nh-title nh-title--light">{en ? 'STILL HAVE QUESTIONS?' : 'AI ALTE ÎNTREBĂRI?'}</h2>
          <p className="nh-lead nh-lead--light" style={{ margin: '0 auto 36px' }}>
            {en ? 'Write to us and we’ll gladly get back to you. See you on Sunday!' : 'Scrie-ne și îți răspundem cu drag. Ne vedem duminică!'}
          </p>
          <Link href={routeFor('contact', en)} className="btn btn-white">{en ? 'Contact us' : 'Contactează-ne'}</Link>
        </div>
      </section>
    </>
  )
}
