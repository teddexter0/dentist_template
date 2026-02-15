# Quick Customization Guide

## What To Update Before Going Live

### 1. Contact Information (IMPORTANT!)

The placeholders are already filled in but you need to replace with actual info:

**File:** `app/page.tsx`

**Search and replace these:**
- `+254 712 345 678` → Your Eldoret phone number
- `+254 723 456 789` → Your Kitale phone number
- `info@dentalclinic.co.ke` → Your main email
- `eldoret@dentalclinic.co.ke` → Eldoret branch email
- `kitale@dentalclinic.co.ke` → Kitale branch email

### 2. Branch Addresses

**File:** `app/page.tsx`

**Eldoret Branch** (around line 100):
```tsx
<p className="text-gray-600">Uganda Road, Eldoret</p>
<p className="text-gray-600">Next to ABC Bank</p>
```
Replace with your actual address.

**Kitale Branch** (around line 137):
```tsx
<p className="text-gray-600">Kenyatta Street, Kitale</p>
<p className="text-gray-600">Opposite Town Hall</p>
```
Replace with your actual address.

### 3. Clinic Name

**File:** `app/page.tsx` (line 13)
```tsx
<h1 className="text-2xl font-bold text-blue-600">Dental Clinic</h1>
<p className="text-sm text-gray-600">Quality Care, Healthy Smiles</p>
```
Change "Dental Clinic" to your actual clinic name.

Also update in the footer (line 192).

### 4. Operating Hours

If your hours are different from Mon-Fri: 8AM-6PM, Sat: 9AM-2PM:

**File:** `app/page.tsx` (lines ~122-123 and ~161-162)

### 5. Services Offered

**File:** `app/page.tsx` (lines ~61-71)

Current services:
- General Dentistry
- Cosmetic Dentistry
- Emergency Care

Add more or modify as needed.

### 6. Testimonials

**File:** `components/HeroSection.tsx` (lines ~30-43)

Update the customer testimonials with real ones if you have them.

### 7. Meta Description for SEO

**File:** `app/layout.tsx` (lines ~8-9)

Update the title and description for better SEO.

## Optional Customizations

### Change Primary Color (Blue)

1. **For Tailwind classes:** Edit `tailwind.config.ts`
2. **For CSS variables:** Edit `app/globals.css`

Common classes to search/replace in code:
- `text-blue-600` → Your color
- `bg-blue-600` → Your color
- `from-blue-50 to-blue-100` → Your gradient colors

### Add More Services

Edit the services array in `app/page.tsx`:

```tsx
{[
  { icon: Smile, title: 'General Dentistry', desc: 'Your description' },
  { icon: Shield, title: 'Cosmetic Dentistry', desc: 'Your description' },
  { icon: Heart, title: 'Emergency Care', desc: 'Your description' },
  // Add more...
].map((service, i) => (
  // ...
))}
```

Available icons from lucide-react: `Smile`, `Shield`, `Heart`, `Clock`, `Calendar`, `Phone`, `Mail`, `MapPin`, etc.

### Make Contact Form Functional

The form currently shows a success message. To actually receive messages:

**Option 1: Formspree (Easiest)**
1. Sign up at [formspree.io](https://formspree.io)
2. Get your endpoint
3. Update `components/ContactForm.tsx` with the endpoint

**Option 2: Use Email Links**
Remove the form and use direct contact links:
```tsx
<a href="tel:+254712345678">Call: +254 712 345 678</a>
<a href="mailto:info@dentalclinic.co.ke">Email Us</a>
```

## Testing Checklist

Before deploying, test:

- [ ] All phone numbers are correct and clickable on mobile
- [ ] All email addresses are correct
- [ ] Branch addresses are accurate
- [ ] Hours are correct
- [ ] Site looks good on mobile (use browser DevTools)
- [ ] Contact form shows success message
- [ ] All navigation links work
- [ ] No spelling errors

## Deployment

### Vercel (Free & Easy)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Click Deploy
5. Done! Your site is live

### Add Custom Domain

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add your domain (e.g., dentalclinic.co.ke)
4. Follow Vercel's DNS instructions

---

**Need help?** Check the main README.md file for more details.
