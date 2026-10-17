# Biserica Momentum — Website

Site-ul oficial al Bisericii Momentum din Alba Iulia. Construit cu Next.js 14 + Tailwind, publicat pe Cloudflare Pages.

- **Adresă:** Calea Moților nr. 258, Alba Iulia
- **Program:** în fiecare duminică, 9:30 socializare · 10:30 program
- **Repo:** [github.com/vladdorin/church-website](https://github.com/vladdorin/church-website)

---

## Pagini

Site-ul este bilingv. Paginile în română au adrese în română, cele în engleză au adrese în engleză. Doar pagina principală și donațiile au prefixul `/en` în engleză, pentru că adresa e aceeași în ambele limbi.

| Pagină | RO | EN |
|--------|----|----|
| Acasă | `/` | `/en` |
| Cine suntem | `/cine-suntem` | `/about` |
| Misiunea noastră | `/misiunea-noastra` | `/our-mission` |
| De ce Alba Iulia | `/de-ce-alba-iulia` | `/why-this-city` |
| Rugăciune | `/rugaciune` | `/pray` |
| Alătură-te (card de conectare) | `/alatura-te` | `/join` |
| Donează (Stripe + transfer bancar) | `/give` | `/en/give` |
| Contact | `/contact` | `/connect` |
| Politici | `/politica-de-confidentialitate`, `/termeni-si-conditii`, `/politica-cookies` | `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` |

> **`/give` nu se schimbă niciodată** — e în QR code-ul pentru donații.

- Toate adresele sunt definite într-un singur loc: `lib/routes.ts`. De acolo le iau meniul, footer-ul, butonul RO/EN și detectarea limbii.
- Dacă redenumești o pagină: mută folderul din `app/`, actualizează `lib/routes.ts` și adaugă un redirect de la adresa veche în `next.config.mjs`.
- Când modifici un text, modifică-l în ambele variante (de ex. `app/contact/page.tsx` **și** `app/connect/page.tsx`).
- Fiecare pagină are titlul din tab-ul browserului setat prin `metadata` (în `page.tsx` sau, pentru paginile cu `'use client'`, într-un `layout.tsx` alături).

---

## Unde modifici lucrurile uzuale

| Ce | Unde |
|----|------|
| Hero-ul de pe prima pagină (Bine ai venit, program, adresă) | `components/WelcomeHero.tsx` |
| Footer (program, adresă, email, social media) | `components/Footer.tsx` |
| Meniul de navigare | `components/Navigation.tsx` |
| Program și adresă pe pagina de contact | `app/contact/page.tsx`, `app/connect/page.tsx` |
| Video-ul de pe Cine suntem | `app/cine-suntem/page.tsx`, `app/about/page.tsx` + `components/YouTubeVideo.tsx` |
| Secțiunea de donații de pe prima pagină | `app/page.tsx`, `app/en/page.tsx` + `components/GivingImpact.tsx` |
| Pagina Donează (texte RO + EN, IBAN-uri, CIF, link Formular 230, întrebări frecvente) | `components/GiveContent.tsx` (sus în fișier) |
| Stiluri globale (inclusiv mobil) | `app/globals.css` |
| Imagini | folderul `public/` |

Dacă schimbi programul sau adresa, ele apar în trei locuri: hero, footer și pagina de contact.

---

## Rulare locală

Ai nevoie de [Node.js 20+](https://nodejs.org/) și [Git](https://git-scm.com/downloads).

```bash
git clone https://github.com/vladdorin/church-website.git
cd church-website
npm ci
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000). Modificările apar instant în browser.

Fără fișierul `.env.local` paginile se afișează normal, dar donațiile și formularele nu funcționează local.

> **Laptop de firmă / eroare `SELF_SIGNED_CERT_IN_CHAIN` la `npm ci`:** rulează mai întâi `$env:NODE_USE_SYSTEM_CA = "1"` (PowerShell) sau `export NODE_USE_SYSTEM_CA=1` (bash), ca Node să folosească certificatele sistemului.

---

## Variabile de mediu

Copiază `.env.local.example` în `.env.local` pentru rulare locală. În producție, variabilele se setează în Cloudflare Pages (**Settings → Environment variables**) și, cele de build, în GitHub (**Settings → Secrets and variables → Actions**).

| Variabilă | Folosită pentru |
|-----------|-----------------|
| `STRIPE_SECRET_KEY` | Plăți online (`/api/checkout`, `/api/log-donation`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Formularul de plată Stripe din pagina Donează |
| `STRIPE_MONTHLY_PRODUCT_ID` | Donațiile lunare (abonament Stripe) |
| `NEXT_PUBLIC_URL` | URL-ul site-ului, fără slash la final |
| `RESEND_API_KEY` | Trimiterea emailurilor din formulare (`/api/form`) |
| `EMAIL_TO` | Adresa care primește formularele |
| `GOOGLE_SCRIPT_URL` | Salvarea formularelor în Google Sheets |
| `GOOGLE_SCRIPT_DONATIONS_URL` | Salvarea donațiilor în Google Sheets |
| `GOOGLE_CALENDAR_ID` | ID-ul Google Calendar-ului bisericii (calendarul trebuie să fie public) |
| `GOOGLE_CALENDAR_API_KEY` | Cheia API Google (Calendar API) pentru secțiunea „Ce urmează” de pe prima pagină |

Evenimentele din secțiunea „Ce urmează” vin automat din Google Calendar (`app/api/events/route.ts`). Ce adaugi în calendar apare pe site în maxim 5 minute. Dacă variabilele lipsesc, secțiunea nu apare.

Un clic pe eveniment deschide o fereastră cu detalii (`components/EventModal.tsx`): data, ora, locul (cu link spre Google Maps), descrierea din calendar și butonul „Adaugă în calendar” (Google Calendar sau fișier .ics pentru Apple/Outlook). Pentru o poză în fereastră, atașează o imagine evenimentului în Google Calendar (din Drive) și partajeaz-o în Drive cu „Oricine are linkul”. Fără poză, fereastra are un antet albastru-închis.

---

## Publicare (deploy)

Publicarea e automată:

1. Faci modificările și le verifici local (`npm run dev`).
2. Faci commit și `git push` pe branch-ul `main`.
3. GitHub Actions (`.github/workflows/deploy.yml`) construiește site-ul și îl publică pe Cloudflare Pages. Durează câteva minute.

Secretele necesare în GitHub Actions: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_URL`.

---

## Structura proiectului

```
church-website/
├── app/
│   ├── page.tsx               ← Acasă (RO)
│   ├── cine-suntem/ contact/ … ← Paginile în română
│   ├── about/ connect/ …      ← Paginile în engleză
│   ├── en/                    ← Acasă (/en) și Donează (/en/give) în engleză
│   ├── api/                   ← Backend: checkout Stripe, formulare, log donații
│   ├── layout.tsx             ← Layout global (nav + footer + cookie banner)
│   └── globals.css            ← Stiluri globale
├── components/                ← Componente comune (hero, nav, footer etc.)
├── public/                    ← Imagini, logo-uri, cursoare
├── .github/workflows/         ← Deploy automat pe Cloudflare Pages
├── wrangler.toml              ← Configurare Cloudflare
└── .env.local.example         ← Model pentru variabilele de mediu
```
