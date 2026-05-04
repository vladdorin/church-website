# 🏛️ Biserica Speranța — Website

Site-ul oficial al Bisericii Speranța, construit cu Next.js 14 și publicat pe Cloudflare Pages.

## Pagini incluse

| Pagină | URL | Descriere |
|--------|-----|-----------|
| Acasă | `/` | Hero, viziune, locație, pastor |
| Alătură-te | `/join` | Program întâlniri + card de conectare |
| Donează | `/give` | Donații online cu Stripe |
| Rugăciune | `/pray` | Cereri de rugăciune, viziunea pentru oraș |
| Despre noi | `/about` | Bio pastori, valori |
| De ce București? | `/why-this-city` | Povestea și motivul pentru care suntem aici |
| Contact | `/connect` | Formular, social media, newsletter |

---

## 🚀 Ghid de configurare (pas cu pas)

### Pasul 1 — Clonează proiectul pe calculatorul tău

1. Instalează [Git](https://git-scm.com/downloads) dacă nu îl ai
2. Instalează [Node.js 20+](https://nodejs.org/)
3. Deschide terminalul (Command Prompt / Terminal) și rulează:

```bash
git clone https://github.com/UTILIZATORUL_TAU/church-website.git
cd church-website
npm install
```

---

### Pasul 2 — Configurează cheile secrete (Stripe)

1. Mergi la [dashboard.stripe.com](https://dashboard.stripe.com)
2. Creează un cont dacă nu ai unul (e gratuit pentru test)
3. Mergi la **Developers → API Keys**
4. Copiază **Publishable key** (pk_test_...) și **Secret key** (sk_test_...)

5. Creează fișierul `.env.local` în folderul proiectului:

```bash
cp .env.local.example .env.local
```

6. Deschide `.env.local` și completează:

```env
STRIPE_SECRET_KEY=sk_test_CHEIA_TA_SECRETA_STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_CHEIA_TA_PUBLICA_STRIPE
NEXT_PUBLIC_URL=http://localhost:3000
```

---

### Pasul 3 — Rulează site-ul local (pentru testare)

```bash
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser.

---

### Pasul 4 — Publică pe GitHub

1. Creează un cont pe [github.com](https://github.com) dacă nu ai unul
2. Creează un **nou repository** (repo) public pe GitHub, numește-l `church-website`
3. În terminal, rulează:

```bash
git remote add origin https://github.com/UTILIZATORUL_TAU/church-website.git
git branch -M main
git push -u origin main
```

---

### Pasul 5 — Configurează Cloudflare Pages

1. Mergi la [pages.cloudflare.com](https://pages.cloudflare.com) și creează cont gratuit
2. Click **Create a project → Connect to Git**
3. Autorizează GitHub și selectează repo-ul `church-website`
4. Setează configurația de build:
   - **Framework preset:** Next.js
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.vercel/output/static`
5. Mergi la **Settings → Environment Variables** și adaugă:
   - `STRIPE_SECRET_KEY` = cheia ta secretă Stripe
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = cheia ta publică Stripe
   - `NEXT_PUBLIC_URL` = URL-ul site-ului tău (ex: `https://www.biserica-ta.ro`)
6. Click **Save and Deploy**

Cloudflare îți va da un URL gratuit (ex: `church-website.pages.dev`). Poți conecta ulterior domeniul propriu.

---

### Pasul 6 — Configurează GitHub Actions (deploy automat)

La fiecare `git push` pe `main`, site-ul se va actualiza automat.

1. Mergi la **github.com → repo-ul tău → Settings → Secrets and variables → Actions**
2. Adaugă secretele:
   - `CLOUDFLARE_API_TOKEN` — din [dash.cloudflare.com → My Profile → API Tokens → Create Token](https://dash.cloudflare.com/profile/api-tokens) cu permisiunea `Cloudflare Pages: Edit`
   - `CLOUDFLARE_ACCOUNT_ID` — din [dash.cloudflare.com](https://dash.cloudflare.com) (bara laterală → Account ID)
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_URL`

---

## ✏️ Personalizare

### Schimbă numele bisericii

Caută și înlocuiește `Biserica Speranța` în toate fișierele din folderul `app/` și `components/`.

### Schimbă adresa și orarul

Editează fișierele `app/page.tsx`, `components/Footer.tsx` și `app/join/page.tsx`.

### Adaugă o fotografie reală a pastorilor

Pune imaginea în folderul `public/` (ex: `public/pastori.jpg`) și înlocuiește emoji-ul `👨‍👩‍👧‍👦` cu:
```tsx
import Image from 'next/image'
<Image src="/pastori.jpg" alt="Pastori" width={224} height={224} className="rounded-2xl" />
```

### Activează Stripe în producție (bani reali)

1. Mergi la Stripe Dashboard → activează-ți contul pentru plăți reale
2. Înlocuiește cheile `sk_test_...` cu `sk_live_...` în variabilele de mediu din Cloudflare Pages

---

## 🧱 Structura proiectului

```
church-website/
├── app/
│   ├── page.tsx              ← Pagina Acasă
│   ├── join/page.tsx         ← Pagina Alătură-te
│   ├── give/page.tsx         ← Pagina Donează (Stripe)
│   ├── pray/page.tsx         ← Pagina Rugăciune
│   ├── about/page.tsx        ← Pagina Despre noi
│   ├── why-this-city/page.tsx← Pagina De ce București?
│   ├── connect/page.tsx      ← Pagina Contact
│   ├── api/checkout/route.ts ← API Stripe (backend edge)
│   ├── layout.tsx            ← Layout global (nav + footer)
│   └── globals.css           ← Stiluri globale
├── components/
│   ├── Navigation.tsx        ← Bara de navigație
│   └── Footer.tsx            ← Footer-ul
├── public/                   ← Imagini statice
├── .github/workflows/        ← Deploy automat
├── .env.local.example        ← Model pentru variabile de mediu
└── README.md                 ← Acest ghid
```

---

## 🛟 Ajutor

Dacă te blochezi undeva, verifică:
- [Documentația Next.js](https://nextjs.org/docs)
- [Documentația Cloudflare Pages](https://developers.cloudflare.com/pages)
- [Documentația Stripe](https://stripe.com/docs)
