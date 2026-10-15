# Biserica Momentum — Website

Site-ul oficial al Bisericii Momentum din Alba Iulia. Construit cu Next.js 14 + Tailwind, publicat pe Cloudflare Pages.

- **Adresă:** Calea Moților nr. 258, Alba Iulia
- **Program:** în fiecare duminică, 9:30 socializare · 10:30 program
- **Repo:** [github.com/vladdorin/church-website](https://github.com/vladdorin/church-website)

---

## Pagini

Site-ul este bilingv. Fiecare pagină are o variantă în română și una în engleză (sub `/en`).

| Pagină | RO | EN |
|--------|----|----|
| Acasă | `/` | `/en` |
| Cine suntem | `/about` | `/en/about` |
| Misiunea noastră | `/misiunea-noastra` | `/en/misiunea-noastra` |
| De ce Alba Iulia | `/why-this-city` | `/en/why-this-city` |
| Rugăciune | `/pray` | `/en/pray` |
| Alătură-te (card de conectare) | `/join` | `/en/join` |
| Donează (Stripe + transfer bancar) | `/give` | `/en/give` |
| Contact | `/connect` | `/en/connect` |
| Politici (confidențialitate, termeni, cookies) | `/politica-de-confidentialitate`, `/termeni-si-conditii`, `/politica-cookies` | `/en/privacy-policy`, `/en/terms-and-conditions`, `/en/cookie-policy` |

> **Important:** când modifici un text, modifică-l în ambele variante (de ex. `app/give/page.tsx` **și** `app/en/give/page.tsx`). Componentele din `components/` sunt comune și aleg singure limba după URL.

---

## Unde modifici lucrurile uzuale

| Ce | Unde |
|----|------|
| Hero-ul de pe prima pagină (Bine ai venit, program, adresă) | `components/WelcomeHero.tsx` |
| Footer (program, adresă, email, social media) | `components/Footer.tsx` |
| Meniul de navigare | `components/Navigation.tsx` |
| Program și adresă pe pagina de contact | `app/connect/page.tsx`, `app/en/connect/page.tsx` |
| Secțiunea de donații de pe prima pagină | `app/page.tsx`, `app/en/page.tsx` + `components/GivingImpact.tsx` |
| Conturile bancare (IBAN) | `app/give/page.tsx`, `app/en/give/page.tsx` |
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
│   ├── about/ give/ join/ …   ← Celelalte pagini (RO)
│   ├── en/                    ← Toate paginile în engleză
│   ├── api/                   ← Backend: checkout Stripe, formulare, log donații
│   ├── layout.tsx             ← Layout global (nav + footer + cookie banner)
│   └── globals.css            ← Stiluri globale
├── components/                ← Componente comune (hero, nav, footer etc.)
├── public/                    ← Imagini, logo-uri, cursoare
├── .github/workflows/         ← Deploy automat pe Cloudflare Pages
├── wrangler.toml              ← Configurare Cloudflare
└── .env.local.example         ← Model pentru variabilele de mediu
```
