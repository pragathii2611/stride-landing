# Stride Landing Page

Next.js 14 landing page for Stride CRM — built with Tailwind CSS + Framer Motion.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: Inter (via `next/font/google`)
- **Email**: Nodemailer (SMTP)
- **Deploy**: Vercel

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/stride-landing.git
cd stride-landing
npm install
```

### 2. Set up environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fill in your SMTP credentials in `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password        # Gmail App Password, NOT your regular password
SMTP_TO=contact@aceai.sg
```

**For Gmail:** Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) → create an App Password → paste it as `SMTP_PASS`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stride-landing.git
git push -u origin main
```

Then in Vercel:
1. Import your GitHub repo
2. Add environment variables (same as `.env.local`) under **Settings → Environment Variables**
3. Deploy ✓

## Project Structure

```
stride-landing/
├── app/
│   ├── layout.tsx          # Root layout, Inter font
│   ├── page.tsx            # Page assembly
│   ├── globals.css         # Global styles + animations
│   └── api/
│       └── contact/
│           └── route.ts    # Email submission endpoint
├── components/
│   ├── Cursor.tsx          # Magnetic reactive cursor
│   ├── ScrollGlow.tsx      # Ambient scroll glow
│   ├── Navbar.tsx          # Sticky nav
│   ├── Hero.tsx            # Canvas particles + hero content
│   ├── ClientTicker.tsx    # Scrolling integration logos
│   ├── FeatureCarousel.tsx # 3-tab feature section
│   ├── FlipCounter.tsx     # Live flip counter
│   ├── JourneySteps.tsx    # 5-step journey
│   ├── Pipeline.tsx        # Sticky scroll pipeline
│   ├── Pricing.tsx         # Billing toggle + pricing cards
│   ├── Testimonials.tsx    # Infinite scroll testimonials
│   ├── CTAForm.tsx         # 4-step survey + email submit
│   └── Footer.tsx
├── public/
│   └── images/
│       └── stride-logo.png
├── .env.example
└── .env.local              # NOT committed to git
```

## Logo

Replace `public/images/stride-logo.png` with a transparent-background PNG or SVG version for best results. The current image has a navy background — it still works via CSS `brightness(0) invert()` filter.

## Adding a custom domain on Vercel

1. Vercel dashboard → your project → **Settings → Domains**
2. Add your domain → follow the DNS instructions
3. Done — Vercel handles SSL automatically

## Email Provider Upgrade (future)

Currently uses Nodemailer + SMTP. To switch to Resend:

```bash
npm install resend
```

Then update `app/api/contact/route.ts` to use the [Resend SDK](https://resend.com/docs/send-your-first-email).
# stride-landing
