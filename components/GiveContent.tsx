'use client'

import { useEffect, useState, Suspense, type ReactNode } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
import {
  HiCheck, HiOutlineCreditCard, HiOutlineDuplicate, HiOutlineHeart,
  HiOutlineHome, HiOutlineLibrary, HiOutlineReceiptTax, HiOutlineSparkles,
} from 'react-icons/hi'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { routeFor } from '@/lib/routes'
import FaqExplorer from './FaqExplorer'

/* Pagina „Donează” (RO: /give, EN: /en/give). Toate textele sunt mai jos, în T.ro și T.en.
   Tab-urile se pot deschide direct din link: /give#card, /give#transfer, /give#formular-230. */

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ── Datele asociației ──
const ASSOCIATION = 'ASOCIATIA CRESTINA VIATA NOUA'
const CIF = ''   // TODO: CIF-ul asociației; cât e gol, rândul „CIF” nu apare
const BANK = 'Banca Transilvania'
const IBANS = [
  { currency: 'RON', iban: 'RO51 BTRL RONC RT0C Y785 5702' },
  { currency: 'EUR', iban: 'RO25 BTRL EURC RT0C Y785 5701' },
  { currency: 'USD', iban: 'RO37 BTRL USDC RT0C Y785 5701' },
]
const FORM_230_URL = 'https://formular230.ro/asociatia-crestina-viata-noua'
const EMAIL = 'contact@bisericamomentum.ro'

const PRESET_AMOUNTS = [25, 50, 100, 250]
type Currency = 'ron' | 'eur' | 'usd'
type Tab = 'card' | 'transfer' | 'formular-230'
const TABS: Tab[] = ['card', 'transfer', 'formular-230']

const T = {
  ro: {
    giveUrl: '/give',
    hero: <>FII PARTE<br /><span>DIN CEVA ETERN</span></>,
    heroSub: 'Ajută la construirea comunității Momentum în Alba Iulia.',

    introTitle: <>GENEROZITATEA FACE PARTE DIN CINE SUNTEM</>,
    intro: [
      'Credem că tot ceea ce avem este un dar de la Dumnezeu, iar generozitatea este unul dintre modurile prin care putem avea un impact în viețile oamenilor și în comunitatea din jurul nostru.',
      'Biblia ne învață că dărnicia nu trebuie să vină din presiune sau obligație, ci dintr-o inimă sinceră și bucuroasă.',
    ],
    verse: '„Este mai ferice să dai decât să primești.”',
    verseRef: 'Fapte 20:35',
    values: [
      { title: 'Dacă Momentum e biserica ta', text: 'Dărnicia este una dintre modalitățile prin care poți participa la ceea ce Dumnezeu face prin această comunitate.' },
      { title: 'Dacă ești în vizită', text: 'Dacă ne vizitezi sau pur și simplu ai ajuns pe această pagină, nu există nicio așteptare să donezi. Ne bucurăm că ești aici.' },
      { title: 'Unde merg donațiile', text: 'Donațiile susțin lucrarea bisericii, proiectele noastre și modalitățile prin care putem sluji oamenii și comunitatea.' },
    ],

    waysTitle: 'ALEGE CUM DONEZI.',
    waysSub: 'Cu cardul în câteva secunde, prin transfer din aplicația băncii sau redirecționând 3,5% din impozit, fără niciun cost. Oricare ai alege, darul tău susține lucrarea Bisericii Momentum.',
    tabs: { card: 'Cu cardul', transfer: 'Transfer bancar', 'formular-230': '3,5% din impozit' },

    cardKicker: 'Durează un minut',
    cardTitle: 'Donează online, cu cardul',
    cardText: 'Tu alegi suma, iar Stripe se ocupă de plată, în siguranță. Poți dona o singură dată sau poți seta o donație lunară, care pleacă automat în fiecare lună.',
    cardSteps: ['Stabilești suma, moneda și cât de des vrei să donezi.', 'Introduci datele cardului în formularul Stripe, direct pe pagină.', 'Gata! Vezi pe ecran confirmarea donației.'],

    chooseAmount: 'Alege suma',
    customAmount: 'Sau introdu altă sumă',
    customPlaceholder: 'ex: 150',
    reason: 'Motivul donației',
    reasons: ['Susținerea bisericii', 'Echipamente & logistică', 'Evenimente & outreach', 'Dărnicie / Zeciuială', 'Alt motiv'],
    otherReason: 'Alt motiv',
    reasonPlaceholder: 'Scrie motivul donației',
    type: 'Tipul donației',
    once: 'O singură dată',
    monthly: 'Lunar',
    currency: 'Moneda',
    yourGift: 'Donația ta',
    perMonth: '/ lună',
    coverFees: 'Vreau să acopăr și taxele de procesare Stripe',
    give: 'Donează',
    processing: 'Se procesează…',
    secure: 'Plată securizată prin Stripe · Cardul tău nu este stocat de noi',
    errMin: 'Suma minimă este de 5.',
    errReason: 'Te rugăm să completezi motivul donației.',
    errGeneric: 'A apărut o eroare. Încearcă din nou.',
    errNetwork: 'Eroare de rețea. Verifică conexiunea și încearcă din nou.',
    backToForm: '← Înapoi la sumă',

    thanksTitle: 'MULȚUMIM DIN INIMĂ!',
    thanksText: 'Donația ta face o diferență reală în Alba Iulia. Îți mulțumim pentru generozitatea ta!',
    thanksAgain: 'Donează din nou',
    canceledTitle: 'NICI-O PROBLEMĂ!',
    canceledText: 'Plata a fost anulată. Poți reveni oricând ești pregătit(ă).',
    canceledAgain: 'Încearcă din nou',

    transferKicker: 'Direct din aplicația băncii',
    transferTitle: 'Transfer bancar',
    transferText: 'Poți dona direct în conturile asociației, din aplicația băncii tale. Dacă vrei să donezi lunar, poți seta un transfer recurent cu aceleași date.',
    beneficiary: 'Beneficiar',
    bank: 'Banca',
    details: 'Detalii plată',
    detailsValue: 'Donație Momentum',
    account: (c: string) => `Cont în ${c === 'RON' ? 'lei' : c === 'EUR' ? 'euro' : 'dolari'}`,

    taxKicker: 'Nu te costă nimic',
    taxTitle: <>3,5% din impozit,<br />pentru Momentum</>,
    taxText: 'Statul îți reține oricum impozitul pe venit. Prin Formularul 230 poți decide ca 3,5% din el să ajungă la Biserica Momentum, nu la buget. Se aplică veniturilor din salarii și pensii din România.',
    taxSteps: ['Deschide pagina asociației pe formular230.ro.', 'Completează-ți datele și semnează direct pe ecran, de pe telefon sau calculator.', 'Gata! Formularul ajunge la asociație și nu mai trebuie să mergi la ANAF.'],
    taxCta: 'Completează Formularul 230',
    taxNote: 'Formularul se completează o dată pe an, până pe 25 mai, pentru veniturile din anul anterior.',
    taxDataTitle: 'Datele asociației',
    taxDataText: 'Dacă preferi să completezi formularul singur, de pe anaf.ro, ai nevoie de datele de mai jos.',
    name: 'Denumire',

    copy: 'Copiază',
    copied: 'Copiat',

    faqKicker: 'Bine de știut',
    faqTitle: 'ÎNTREBĂRI DESPRE DONAȚII.',
    faqSub: <>N-ai găsit ce căutai? Scrie-ne la <a href={`mailto:${EMAIL}`}>{EMAIL}</a> și îți răspundem.</>,
    faq: [
      { q: 'Trebuie să donez ca să fac parte din biserică?', a: 'Nu. Dărnicia este un răspuns liber al inimii, nu o condiție. Dacă ești în vizită sau abia ne cunoști, nu există nicio așteptare să donezi.' },
      { q: 'Unde ajung banii pe care îi donez?', a: 'Fiecare donație ajunge în contul asociației și susține lucrarea Bisericii Momentum: programul de duminică, evenimentele și proiectele noastre și felul în care îi slujim pe oamenii din Alba Iulia.' },
      { q: 'Pot dona lunar?', a: 'Da. La „Cu cardul” alege „Lunar”, iar suma se retrage automat în fiecare lună. Dacă vrei să oprești donația lunară, scrie-ne și o oprim. Poți seta și un transfer recurent din aplicația băncii, cu datele de la „Transfer bancar”.' },
      { q: 'Este sigură plata cu cardul?', a: 'Da. Plata se face prin Stripe, unul dintre cei mai folosiți procesatori de plăți din lume. Datele cardului nu ajung la noi și nu le stocăm.' },
      { q: 'Ce înseamnă redirecționarea a 3,5%?', a: 'Dacă ai avut anul trecut venituri din salariu sau pensie în România, poți cere ca 3,5% din impozitul deja plătit să meargă către o asociație, în loc să rămână la stat. Nu te costă nimic în plus. Formularul 230 se completează o dată pe an, până pe 25 mai.' },
      { q: 'Pe cine pot întreba despre donații?', a: `Scrie-ne la ${EMAIL} sau vorbește cu noi duminică, la biserică. Îți răspundem cu drag.` },
    ],

    otherTitle: 'ALTE MODURI DE A NE SUSȚINE',
    otherSub: 'Poți face parte din povestea Momentum prin rugăciune, oameni și implicare.',
    pray: { title: 'Roagă-te', desc: 'Rugăciunea ta este cea mai valoroasă contribuție pentru Biserica Momentum.', cta: 'Pagina de rugăciune' },
    share: { title: 'Spune altora', desc: 'Vorbește despre Biserica Momentum în cercul tău de prieteni și familie.' },
    involve: { title: 'Implică-te', desc: 'Vino în echipă și contribuie cu talentele tale la construirea comunității.', cta: 'Alătură-te' },
    shareText: 'Hai cu mine duminică la Biserica Momentum din Alba Iulia! 9:30 socializare · 10:30 program.',
    shareInstagramCopied: 'Link copiat! Deschide Instagram și adaugă-l în story cu sticker-ul „Link”.',
    loading: 'Se încarcă…',
  },

  en: {
    giveUrl: '/en/give',
    hero: <>BE PART OF<br /><span>SOMETHING<br />ETERNAL</span></>,
    heroSub: 'Help build the Momentum community in Alba Iulia.',

    introTitle: <>GENEROSITY IS PART OF WHO WE ARE</>,
    intro: [
      'We believe everything we have is a gift from God, and generosity is one of the ways we can make an impact in people’s lives and in the community around us.',
      'The Bible teaches that giving shouldn’t come from pressure or obligation, but from a sincere and joyful heart.',
    ],
    verse: '“It is more blessed to give than to receive.”',
    verseRef: 'Acts 20:35',
    values: [
      { title: 'If Momentum is your church', text: 'Giving is one of the ways you can take part in what God is doing through this community.' },
      { title: 'If you’re visiting', text: 'If you’re visiting or simply found your way to this page, there is no expectation to give. We’re glad you’re here.' },
      { title: 'Where your gift goes', text: 'Donations support the work of the church, our projects and the ways we serve people and our community.' },
    ],

    waysTitle: 'CHOOSE HOW TO GIVE.',
    waysSub: 'By card in a few seconds, by transfer from your banking app, or by redirecting 3.5% of your income tax at no cost. Whichever you choose, your gift supports the work of Momentum Church.',
    tabs: { card: 'By card', transfer: 'Bank transfer', 'formular-230': '3.5% of your tax' },

    cardKicker: 'Takes a minute',
    cardTitle: 'Give online, by card',
    cardText: 'You choose the amount and Stripe handles the payment securely. Give once, or set up a monthly gift that goes out automatically every month.',
    cardSteps: ['Set the amount, the currency and how often you’d like to give.', 'Enter your card details in the Stripe form, right on the page.', 'Done! You’ll see the confirmation on screen.'],

    chooseAmount: 'Choose an amount',
    customAmount: 'Or enter a custom amount',
    customPlaceholder: 'e.g. 150',
    reason: 'Donation purpose',
    reasons: ['General support', 'Equipment & Logistics', 'Events & Outreach', 'Generosity / Tithe', 'Other'],
    otherReason: 'Other',
    reasonPlaceholder: 'Enter the reason for your donation',
    type: 'Donation type',
    once: 'One-time',
    monthly: 'Monthly',
    currency: 'Currency',
    yourGift: 'Your gift',
    perMonth: '/ month',
    coverFees: 'I want to cover the Stripe processing fees',
    give: 'Give',
    processing: 'Processing…',
    secure: 'Secure payment via Stripe · Your card is not stored by us',
    errMin: 'The minimum amount is 5.',
    errReason: 'Please enter the reason for your donation.',
    errGeneric: 'An error occurred. Please try again.',
    errNetwork: 'Network error. Check your connection and try again.',
    backToForm: '← Back to amount',

    thanksTitle: 'THANK YOU SO MUCH!',
    thanksText: 'Your donation makes a real difference in Alba Iulia. Thank you for your generosity!',
    thanksAgain: 'Give again',
    canceledTitle: 'NO PROBLEM!',
    canceledText: 'The payment was cancelled. You can come back whenever you’re ready.',
    canceledAgain: 'Try again',

    transferKicker: 'Straight from your banking app',
    transferTitle: 'Bank transfer',
    transferText: 'You can give directly to the association’s accounts from your banking app. To give monthly, set up a recurring transfer with the same details.',
    beneficiary: 'Beneficiary',
    bank: 'Bank',
    details: 'Payment reference',
    detailsValue: 'Momentum Donation',
    account: (c: string) => `${c} account`,

    taxKicker: 'Costs you nothing',
    taxTitle: <>3.5% of your tax,<br />for Momentum</>,
    taxText: 'The state withholds your income tax either way. With Form 230 you can decide that 3.5% of it goes to Momentum Church instead of the state budget. It applies to salary and pension income in Romania.',
    taxSteps: ['Open the association’s page on formular230.ro.', 'Fill in your details and sign on screen, from your phone or computer.', 'Done! The form goes to the association, so there’s no need to visit ANAF.'],
    taxCta: 'Fill in Form 230',
    taxNote: 'The form is filled in once a year, by 25 May, for the previous year’s income.',
    taxDataTitle: 'Association details',
    taxDataText: 'If you’d rather fill in the form yourself from anaf.ro, you’ll need the details below.',
    name: 'Name',

    copy: 'Copy',
    copied: 'Copied',

    faqKicker: 'Good to know',
    faqTitle: 'QUESTIONS ABOUT GIVING.',
    faqSub: <>Didn’t find what you were looking for? Email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we’ll get back to you.</>,
    faq: [
      { q: 'Do I have to give to be part of the church?', a: 'No. Giving is a free response of the heart, not a requirement. If you’re visiting or just getting to know us, there is no expectation to give.' },
      { q: 'Where does my donation go?', a: 'Every gift goes to the association’s account and supports the work of Momentum Church: our Sunday services, our events and projects, and the ways we serve the people of Alba Iulia.' },
      { q: 'Can I give monthly?', a: 'Yes. Under “By card”, choose “Monthly” and the amount is charged automatically every month. To stop a monthly gift, just write to us and we’ll cancel it. You can also set up a recurring transfer in your banking app using the “Bank transfer” details.' },
      { q: 'Is paying by card safe?', a: 'Yes. Payments are handled by Stripe, one of the most widely used payment processors in the world. Your card details never reach us and we don’t store them.' },
      { q: 'What does redirecting 3.5% mean?', a: 'If you earned a salary or pension in Romania last year, you can ask for 3.5% of the tax you already paid to go to an association instead of staying with the state. It costs you nothing extra. Form 230 is filled in once a year, by 25 May.' },
      { q: 'Who can I ask about giving?', a: `Write to us at ${EMAIL} or talk to us on Sunday at church. We’re happy to help.` },
    ],

    otherTitle: 'OTHER WAYS TO SUPPORT US',
    otherSub: 'You can be part of the Momentum story through prayer, people, and involvement.',
    pray: { title: 'Pray', desc: 'Your prayer is the most valuable contribution to Momentum Church.', cta: 'Prayer page' },
    share: { title: 'Spread the word', desc: 'Talk about Momentum Church within your circle of friends and family.' },
    involve: { title: 'Get involved', desc: 'Join the team and be part of building a Christ-centered community.', cta: 'Join us' },
    shareText: 'Come with me to Momentum Church in Alba Iulia this Sunday! 9:30 fellowship · 10:30 service.',
    shareInstagramCopied: 'Link copied! Open Instagram and add it to your story with the “Link” sticker.',
    loading: 'Loading…',
  },
}

type Lang = 'ro' | 'en'
type Texts = (typeof T)[Lang]

const VALUE_ICONS = [HiOutlineHome, HiOutlineHeart, HiOutlineSparkles]

// ── Câmp cu buton „Copiază” (IBAN-ul se copiază fără spații) ──
function CopyField({ label, value, copyValue, t, dark = false }: { label: string; value: string; copyValue?: string; t: Texts; dark?: boolean }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* fără acces la clipboard: textul rămâne selectabil */ }
  }

  return (
    <div className={`give-copy${dark ? ' give-copy--dark' : ''}`}>
      <span className="give-copy-label">{label}</span>
      <div className="give-copy-row">
        <strong>{value}</strong>
        <button type="button" onClick={copy} className={copied ? 'is-copied' : ''} aria-label={`${t.copy}: ${label}`}>
          {copied ? <HiCheck aria-hidden /> : <HiOutlineDuplicate aria-hidden />}
          <span aria-live="polite">{copied ? t.copied : t.copy}</span>
        </button>
      </div>
    </div>
  )
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="give-steps">
      {steps.map((s, i) => <li key={i}><span>{i + 1}</span>{s}</li>)}
    </ol>
  )
}

function Panel({ kicker, title, text, children }: { kicker: string; title: ReactNode; text: string; children: ReactNode }) {
  return (
    <div className="give-panel">
      <span className="give-panel-kicker">{kicker}</span>
      <h3 className="give-panel-title">{title}</h3>
      <p className="give-panel-text">{text}</p>
      {children}
    </div>
  )
}

// ── Tab „Card online” (Stripe) ──
function CardDonation({ t }: { t: Texts }) {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    if (!success) return
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      fetch('/api/log-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      }).catch(console.error)
    }
    document.getElementById('cum-poti-dona')?.scrollIntoView({ behavior: 'smooth' })
  }, [success, searchParams])

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(100)
  const [custom, setCustom] = useState('')
  const [donationReason, setDonationReason] = useState<string>(t.reasons[0])
  const [customReason, setCustomReason] = useState('')
  const [donationType, setDonationType] = useState<'once' | 'monthly'>('once')
  const [coverFees, setCoverFees] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currency, setCurrency] = useState<Currency>('ron')

  const effectiveAmount = custom ? parseFloat(custom) : selected
  const finalReason = donationReason === t.otherReason ? customReason.trim() : donationReason
  const currencyLabel = currency.toUpperCase()

  function calculateGrossAmount(amount: number, cur: Currency) {
    const fixedFee = { ron: 1, eur: 0.25, usd: 0.3 }[cur]
    const percentageFee = 0.029
    return Math.ceil((amount + fixedFee) / (1 - percentageFee))
  }

  const finalAmount = effectiveAmount
    ? coverFees ? calculateGrossAmount(effectiveAmount, currency) : effectiveAmount
    : null

  async function handleDonate() {
    if (!effectiveAmount || effectiveAmount < 5) return setError(t.errMin)
    if (donationReason === t.otherReason && !customReason.trim()) return setError(t.errReason)

    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          originalAmount: effectiveAmount,
          reason: finalReason,
          donationType,
          coverFees,
          currency,
        }),
      })
      const data = await res.json()
      if (data.clientSecret) setClientSecret(data.clientSecret)
      else setError(data.error ?? t.errGeneric)
    } catch {
      setError(t.errNetwork)
    }
    setLoading(false)
  }

  if (success || canceled) {
    return (
      <div className="give-result">
        {success && <div className="give-result-check" aria-hidden>✓</div>}
        <h3 className="display">{success ? t.thanksTitle : t.canceledTitle}</h3>
        <p>{success ? t.thanksText : t.canceledText}</p>
        <a href={t.giveUrl} className="btn btn-blue">{success ? t.thanksAgain : t.canceledAgain}</a>
      </div>
    )
  }

  if (clientSecret) {
    return (
      <div className="give-checkout">
        <button type="button" className="give-back" onClick={() => setClientSecret(null)}>{t.backToForm}</button>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }

  return (
    <div className="give-split">
      <Panel kicker={t.cardKicker} title={t.cardTitle} text={t.cardText}>
        <Steps steps={t.cardSteps} />
      </Panel>

      <div className="give-form">
        <span className="give-label">{t.chooseAmount}</span>
        <div className="give-chips give-chips--4">
          {PRESET_AMOUNTS.map(amt => (
            <button
              key={amt}
              type="button"
              aria-pressed={selected === amt && !custom}
              onClick={() => { setSelected(amt); setCustom('') }}
            >
              {amt} <small>{currencyLabel}</small>
            </button>
          ))}
        </div>

        <label className="give-label" htmlFor="give-custom">{t.customAmount} ({currencyLabel})</label>
        <div className="give-input-wrap">
          <input
            id="give-custom"
            className={`give-input${custom ? ' is-active' : ''}`}
            type="number"
            min="5"
            max="50000"
            inputMode="decimal"
            value={custom}
            onChange={ev => { setCustom(ev.target.value); setSelected(null) }}
            placeholder={t.customPlaceholder}
          />
          <span>{currencyLabel}</span>
        </div>

        <div className="give-form-row">
          <div>
            <span className="give-label">{t.type}</span>
            <div className="give-chips give-chips--2">
              <button type="button" aria-pressed={donationType === 'once'} onClick={() => setDonationType('once')}>{t.once}</button>
              <button type="button" aria-pressed={donationType === 'monthly'} onClick={() => setDonationType('monthly')}>{t.monthly}</button>
            </div>
          </div>
          <div>
            <span className="give-label">{t.currency}</span>
            <div className="give-chips give-chips--3">
              {(['ron', 'eur', 'usd'] as Currency[]).map(c => (
                <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)}>{c.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>

        <label className="give-label" htmlFor="give-reason">{t.reason}</label>
        <select id="give-reason" className="give-input" value={donationReason} onChange={ev => setDonationReason(ev.target.value)}>
          {t.reasons.map(r => <option key={r}>{r}</option>)}
        </select>
        {donationReason === t.otherReason && (
          <input
            type="text"
            className="give-input give-input--below"
            value={customReason}
            onChange={ev => setCustomReason(ev.target.value)}
            placeholder={t.reasonPlaceholder}
            aria-label={t.reasonPlaceholder}
          />
        )}

        <label className="give-fees">
          <input type="checkbox" checked={coverFees} onChange={ev => setCoverFees(ev.target.checked)} />
          <span>{t.coverFees}</span>
        </label>

        {error && <div className="give-error" role="alert">{error}</div>}

        <div className="give-total">
          <span>{t.yourGift}</span>
          <strong className="display">
            {finalAmount ? `${finalAmount} ${currencyLabel}` : '—'}
            {finalAmount && donationType === 'monthly' && <small>{t.perMonth}</small>}
          </strong>
        </div>

        <button
          type="button"
          onClick={handleDonate}
          disabled={loading || !effectiveAmount}
          className="btn btn-blue give-submit"
        >
          <HiOutlineCreditCard aria-hidden />
          {loading ? t.processing : `${t.give} ${finalAmount ? `${finalAmount} ${currencyLabel}` : ''}`}
        </button>
        <p className="give-secure">🔒 {t.secure}</p>
      </div>
    </div>
  )
}

// ── Tab „Transfer bancar” ──
function BankTransfer({ t }: { t: Texts }) {
  return (
    <div className="give-split">
      <Panel kicker={t.transferKicker} title={t.transferTitle} text={t.transferText}>
        <div className="give-copy-stack">
          <CopyField label={t.beneficiary} value={ASSOCIATION} t={t} dark />
          <CopyField label={t.bank} value={BANK} t={t} dark />
          <CopyField label={t.details} value={t.detailsValue} t={t} dark />
        </div>
      </Panel>

      {/* Câte un card colorat pentru fiecare cont, ca un card bancar */}
      <div className="give-ibans">
        {IBANS.map(({ currency, iban }) => (
          <div key={currency} className={`give-iban give-iban--${currency.toLowerCase()}`}>
            <div className="give-iban-top">
              <span className="give-currency">{currency}</span>
              <span className="give-iban-name">{t.account(currency)}</span>
              <HiOutlineLibrary className="give-iban-bank" aria-hidden />
            </div>
            <CopyField label="IBAN" value={iban} copyValue={iban.replace(/\s/g, '')} t={t} dark />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tab „Redirecționează 3,5%” ──
function TaxRedirect({ t }: { t: Texts }) {
  return (
    <div className="give-split">
      <Panel kicker={t.taxKicker} title={t.taxTitle} text={t.taxText}>
        <Steps steps={t.taxSteps} />
        <a href={FORM_230_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white give-panel-cta">
          {t.taxCta} →
        </a>
        <p className="give-panel-note">{t.taxNote}</p>
      </Panel>

      <div className="give-form">
        <span className="give-icon"><HiOutlineReceiptTax aria-hidden /></span>
        <h3 className="give-form-title">{t.taxDataTitle}</h3>
        <p className="give-form-text">{t.taxDataText}</p>
        <div className="give-copy-stack">
          <CopyField label={t.name} value={ASSOCIATION} t={t} />
          {CIF && <CopyField label="CIF" value={CIF} t={t} />}
          <CopyField label="IBAN" value={IBANS[0].iban} copyValue={IBANS[0].iban.replace(/\s/g, '')} t={t} />
        </div>
      </div>
    </div>
  )
}

// ── „Spune altora”: trimite invitația pe WhatsApp, Facebook sau Instagram ──
// Instagram nu are link de distribuire pe web: pe telefon deschidem meniul de partajare al sistemului
// (de unde se alege Instagram → Story), iar pe calculator copiem linkul.
function ShareButtons({ lang, t }: { lang: Lang; t: Texts }) {
  const [note, setNote] = useState('')
  const siteUrl = () => window.location.origin + routeFor('home', lang === 'en')

  function open(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function instagram() {
    const url = siteUrl()
    // Și Windows are meniu de partajare, dar fără Instagram, așa că îl folosim doar pe ecrane tactile.
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      try { await navigator.share({ text: t.shareText, url }) } catch { /* utilizatorul a închis meniul */ }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setNote(t.shareInstagramCopied)
    } catch { /* fără clipboard */ }
  }

  return (
    <div className="support-share">
      <div className="support-share-buttons">
        <button type="button" aria-label="WhatsApp" className="share-wa"
          onClick={() => open(`https://wa.me/?text=${encodeURIComponent(`${t.shareText} ${siteUrl()}`)}`)}>
          <FaWhatsapp aria-hidden />
        </button>
        <button type="button" aria-label="Facebook" className="share-fb"
          onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl())}`)}>
          <FaFacebookF aria-hidden />
        </button>
        <button type="button" aria-label="Instagram" className="share-ig" onClick={instagram}>
          <FaInstagram aria-hidden />
        </button>
      </div>
      {note && <p className="support-share-note" role="status">{note}</p>}
    </div>
  )
}

export default function GiveContent({ lang }: { lang: Lang }) {
  const t = T[lang]
  const [tab, setTab] = useState<Tab>('card')

  // Tab-ul din link (/give#transfer); după plata cu cardul (?success / ?canceled) rămâne „Card”.
  useEffect(() => {
    const fromHash = window.location.hash.slice(1) as Tab
    if (TABS.includes(fromHash)) setTab(fromHash)
  }, [])

  function selectTab(next: Tab) {
    setTab(next)
    history.replaceState(null, '', `#${next}`)
  }

  // Săgețile stânga/dreapta mută focusul între tab-uri.
  function onTabKey(ev: React.KeyboardEvent) {
    const dir = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    const next = TABS[(TABS.indexOf(tab) + dir + TABS.length) % TABS.length]
    selectTab(next)
    document.getElementById(`tab-${next}`)?.focus()
  }

  return (
    <>
      <section className="give-hero">
        <div className="wrap">
          <h1 className="display">{t.hero}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      {/* ── Dărnicia + verset ── */}
      <section className="give-intro">
        <div className="wrap">
          {/* Titlul stă pe toată lățimea: în Climate Crisis „GENEROZITATEA” e prea lat pentru o coloană */}
          <h2 className="display give-h2 give-intro-title">{t.introTitle}</h2>
          <div className="give-intro-layout">
            <div>
              {t.intro.map(p => <p key={p} className="give-lead">{p}</p>)}
            </div>
            <figure className="give-verse">
              <span className="give-verse-mark" aria-hidden>“</span>
              <blockquote>{t.verse}</blockquote>
              <figcaption>{t.verseRef}</figcaption>
            </figure>
          </div>

          <div className="give-values">
            {t.values.map(({ title, text }, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <div key={title} className="give-value">
                  <span className="give-icon"><Icon aria-hidden /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Modalități (tab-uri) ── */}
      <section className="give-ways" id="cum-poti-dona">
        <div className="wrap">
          <h2 className="display give-h2">{t.waysTitle}</h2>
          <p className="give-lead give-ways-sub">{t.waysSub}</p>

          <div className="give-tabs" role="tablist" aria-label={t.waysTitle} onKeyDown={onTabKey}>
            {TABS.map(id => (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                tabIndex={tab === id ? 0 : -1}
                onClick={() => selectTab(id)}
              >
                {t.tabs[id]}
              </button>
            ))}
          </div>

          <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="give-tabpanel">
            {tab === 'card' && (
              <Suspense fallback={<div className="give-loading">{t.loading}</div>}>
                <CardDonation t={t} />
              </Suspense>
            )}
            {tab === 'transfer' && <BankTransfer t={t} />}
            {tab === 'formular-230' && <TaxRedirect t={t} />}
          </div>
        </div>
      </section>

      <FaqExplorer
        id="intrebari"
        kicker={t.faqKicker}
        title={t.faqTitle}
        sub={t.faqSub}
        items={t.faq.map(({ q, a }) => ({ q, a: <p>{a}</p> }))}
      />

      {/* ── Alte moduri de a ne susține ── */}
      <section className="section support-section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="display support-title">{t.otherTitle}</h2>
          <p className="support-subtitle">{t.otherSub}</p>
          <div className="support-grid">
            <a href={routeFor('pray', lang === 'en')} className="support-card">
              <div className="support-number">01</div>
              <h3 className="display support-card-title">{t.pray.title}</h3>
              <p className="support-card-desc">{t.pray.desc}</p>
              <span className="support-cta">{t.pray.cta} →</span>
            </a>
            <div className="support-card">
              <div className="support-number">02</div>
              <h3 className="display support-card-title">{t.share.title}</h3>
              <p className="support-card-desc">{t.share.desc}</p>
              <ShareButtons lang={lang} t={t} />
            </div>
            <a href={routeFor('join', lang === 'en')} className="support-card">
              <div className="support-number">03</div>
              <h3 className="display support-card-title">{t.involve.title}</h3>
              <p className="support-card-desc">{t.involve.desc}</p>
              <span className="support-cta">{t.involve.cta} →</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
