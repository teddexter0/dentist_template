# COMPLETE SETUP GUIDE - FROM ZERO TO DEPLOYED

## PART 1: LOCAL SETUP (On Your Computer)

### Step 1: Install Node.js (if you don't have it)
```bash
# Check if you have Node.js
node --version

# If not installed, download from: https://nodejs.org
# Install LTS version (20.x or higher)
```

### Step 2: Create Your Project
```bash
# Navigate to where you want the project
cd ~/Desktop  # or wherever you want

# Create the project (paste this entire command)
npx create-next-app@latest dental-clinic --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# When prompted, choose:
# ✔ TypeScript? Yes
# ✔ ESLint? Yes  
# ✔ Tailwind CSS? Yes
# ✔ Use App Router? Yes
# ✔ Customize import alias? Yes (@/*)

# Enter the project
cd dental-clinic
```

### Step 3: Copy All Files
Now copy all the files from the `dental-clinic-files` folder I created into your `dental-clinic` folder:

**Copy these files:**
```
dental-clinic/
├── app/
│   ├── api/
│   │   ├── book/route.ts
│   │   └── reminders/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   └── BookingForm.tsx
├── lib/
│   └── utils.ts
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

### Step 4: Install Dependencies
```bash
npm install
```

This will install all packages needed (takes 1-2 minutes).

### Step 5: Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Open .env.local and add your keys (we'll get these next)
```

---

## PART 2: GET YOUR FREE API KEYS

### Get Resend API Key (For Emails)

1. **Sign up at Resend:**
   - Go to https://resend.com
   - Click "Sign Up"
   - Use your personal email
   - Verify your email

2. **Create API Key:**
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Name it: "Dental Clinic Website"
   - Copy the key (starts with `re_`)

3. **Add to .env.local:**
   ```env
   RESEND_API_KEY=re_your_actual_key_here
   ADMIN_EMAIL=doctor@example.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   CRON_SECRET=your_random_secret_here
   ```

   Replace:
   - `re_your_actual_key_here` with your Resend key
   - `doctor@example.com` with the doctor's actual email
   - `your_random_secret_here` with any random text (e.g., "myverysecretkey123")

### Understanding Resend Free Tier
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ Perfect for small clinic
- ✅ No credit card needed
- ❌ Emails come from `onboarding@resend.dev` (until you add your domain)

---

## PART 3: TEST LOCALLY

### Start Development Server
```bash
npm run dev
```

Open your browser: http://localhost:3000

### Test the Booking Form
1. Fill out the form
2. Click "Book Appointment"
3. Check your email (the one you set as ADMIN_EMAIL)
4. Check the email you entered in the form

**If emails don't arrive:**
- Check spam folder
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for errors: https://resend.com/emails

### Common Local Issues

**Port already in use:**
```bash
# Kill the process and restart
lsof -ti:3000 | xargs kill
npm run dev
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## PART 4: DEPLOY TO VERCEL (GO LIVE!)

### Option A: Deploy via Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (creates account if you don't have one)
vercel login

# Deploy!
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? [Your account]
# Link to existing project? No
# Project name? dental-clinic
# Directory? ./
# Override settings? No

# You'll get a URL like: https://dental-clinic-abc123.vercel.app
```

### Option B: Deploy via Vercel Website

1. **Create GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/yourusername/dental-clinic.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Add Environment Variables:
     - `RESEND_API_KEY`: [Your Resend key]
     - `ADMIN_EMAIL`: [Doctor's email]
     - `CRON_SECRET`: [Your random secret]
   - Click "Deploy"

3. **Wait 2-3 minutes** and you're live! 🎉

---

## PART 5: ADD CUSTOM DOMAIN

### Buy Domain (Do This AFTER He Pays You)

**Recommended Registrars:**
- Namecheap: https://www.namecheap.com (~$12/year)
- Hostinger: https://www.hostinger.com (~$10/year)
- Porkbun: https://porkbun.com (~$9/year)

**Good Domain Names:**
- dentalclinicke.com
- [doctorname]dental.com
- eldoretdental.com
- smileclinicke.com

### Connect Domain to Vercel

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `yourdomain.com`

2. **Update DNS Records:**
   
   Vercel will show you these records to add:
   
   **At your domain registrar (Namecheap/Hostinger):**
   - Go to DNS settings
   - Add these records (Vercel will show exact values):
   
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait 24 hours** for DNS to propagate (usually faster, 1-2 hours)

4. **Verify:**
   - Visit https://yourdomain.com
   - Should show your site!

### Set Up Custom Email Domain (Optional but Professional)

After domain is working:

1. **In Resend Dashboard:**
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter: `yourdomain.com`

2. **Add DNS Records:**
   Resend will show you MX and TXT records to add at your registrar

3. **Update Code:**
   In `app/api/book/route.ts`, change:
   ```typescript
   from: 'Dental Clinic <noreply@yourdomain.com>'
   ```

Now emails come from YOUR domain! 💪

---

## PART 6: CUSTOMIZE FOR CLIENT

### Update Content in `app/page.tsx`

Find and replace these sections:

```typescript
// Clinic name (line ~20)
<h1 className="text-2xl font-bold text-blue-600">Dental Clinic</h1>

// Eldoret address (line ~180)
<p className="text-gray-600">[Your Eldoret Address]</p>
// Replace with: Plot 123, Oginga Odinga St, Eldoret

// Phone numbers
<p className="text-gray-600">[Eldoret Phone]</p>
// Replace with: 0712 345 678

// Operating hours (adjust if different)
<p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
<p className="text-gray-600">Sat: 9AM-2PM</p>

// Email address (in footer)
<span>[Your Email]</span>
// Replace with: info@yourdomain.com
```

### Update Email Templates

In `app/api/book/route.ts`, find:
```typescript
<li>Eldoret Branch: [PHONE]</li>
<li>Kitale Branch: [PHONE]</li>
```

Replace with actual phone numbers.

### Add Logo (If Client Has One)

1. Put logo file in `public/logo.png`
2. In `app/page.tsx`, add:
   ```typescript
   <Image src="/logo.png" alt="Logo" width={50} height={50} />
   ```

---

## PART 7: MAINTENANCE & MONITORING

### Monthly Checklist

**Day 1 of Month:**
- [ ] Check payment received
- [ ] Check site is online
- [ ] Test booking form works
- [ ] Check email deliverability

**Weekly:**
- [ ] Check Vercel analytics (visits, errors)
- [ ] Check Resend dashboard (emails sent)
- [ ] Respond to any bookings within 24 hours

**As Needed:**
- [ ] Update content (hours, services)
- [ ] Add new features
- [ ] Fix any issues

### How to Make Updates

```bash
# Make changes to files
# Then deploy:

vercel --prod

# Or if using GitHub:
git add .
git commit -m "Updated operating hours"
git push

# Vercel auto-deploys from GitHub
```

### Monitoring Tools (Free)

1. **Vercel Analytics:**
   - View traffic, performance
   - https://vercel.com/dashboard

2. **Resend Dashboard:**
   - See emails sent
   - Check deliverability
   - https://resend.com/emails

3. **Google Search Console** (Optional):
   - Monitor SEO
   - https://search.google.com/search-console

---

## PART 8: IF CLIENT DOESN'T PAY

### Grace Period (Days 1-3)
- Send friendly WhatsApp reminder:
  "Hi Dr. [Name], just a reminder that the monthly payment of 2,500 KES is due. M-Pesa: [Your Number]"

### Warning Period (Days 4-7)
- Send second reminder:
  "Hi Dr. [Name], payment is now 4 days overdue. Site will go offline on [DATE] if not received. Please confirm."

### Suspension (Day 8+)

**Option 1: Show Payment Notice**
Add this to top of `app/page.tsx`:
```typescript
<div className="bg-red-600 text-white p-4 text-center fixed top-0 w-full z-50">
  Site suspended due to non-payment. Contact: [YOUR NUMBER]
</div>
```

**Option 2: Take Site Offline**
1. In Vercel dashboard → Settings
2. Click "Pause Deployments"
3. Site shows Vercel error page

**Option 3: Redirect Domain**
1. Go to your domain registrar
2. Point domain to a "suspended" page
3. Or just remove DNS records

### Reactivation
After payment + 500 KES reactivation fee:
1. Remove suspension notice
2. Re-enable deployments
3. Restore DNS records

---

## PART 9: COSTS BREAKDOWN

### Your Expenses (Annual)
- Domain: ~1,500 KES/year (can charge 2,500 and keep 1k)
- Vercel hosting: FREE
- Resend emails: FREE (up to 3k/month)
- Your time: FREE (you're the boss)

**Total: 1,500 KES/year = 125 KES/month**

### Your Income
- Setup: 2,500 KES (one-time)
- Monthly: 2,500 KES × 12 = 30,000 KES/year

**Net profit: 30,000 - 1,500 = 28,500 KES/year**
**Monthly net: ~2,375 KES**

### After 6 Months (If All Goes Well)
Consider raising to:
- 3,000 KES/month (20% increase)
- Add SMS: +1,000 KES/month
- Add features: +1,000-2,000 KES each

---

## PART 10: TROUBLESHOOTING

### Site Won't Load
```bash
# Check Vercel deployment status
vercel logs

# Check for errors
vercel inspect [deployment-url]
```

### Emails Not Sending
1. Check Resend dashboard for errors
2. Verify API key is correct
3. Check email quota (3k/month)
4. Test with curl:
```bash
curl -X POST https://yoursite.com/api/book \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"0712345678","branch":"Eldoret","date":"2024-12-01","time":"10:00"}'
```

### Form Not Submitting
1. Open browser console (F12)
2. Look for errors in red
3. Check network tab for API call
4. Verify API route is deployed

### Domain Not Working
1. Check DNS propagation: https://dnschecker.org
2. Verify DNS records are correct
3. Wait 24 hours (DNS can be slow)
4. Clear browser cache

---

## PART 11: NEXT STEPS (FUTURE UPGRADES)

### Phase 2: Add SMS (AfricasTalking)
- Cost: ~500 KES setup + 0.80 KES per SMS
- Charge client: +1,000 KES/month
- Your profit: ~500 KES/month (assuming 50 SMS)

### Phase 3: Patient Portal
- Login system
- View appointment history
- Download invoices
- Charge: +2,000 KES/month

### Phase 4: M-Pesa Integration
- Accept payments online
- Cost: M-Pesa API fees
- Charge: +2,500 KES/month

### Phase 5: Full Clinic Management
- Staff management
- Inventory tracking
- Patient records
- Charge: 10,000+ KES/month

---

## QUICK COMMAND REFERENCE

```bash
# Development
npm run dev          # Start local server
npm run build        # Build for production
npm run start        # Start production server

# Deployment  
vercel               # Deploy to preview
vercel --prod        # Deploy to production
vercel logs          # View logs
vercel domains       # Manage domains

# Git
git status           # Check changes
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub

# Debugging
npm run lint         # Check for errors
vercel inspect       # Inspect deployment
```

---

## SUPPORT & RESOURCES

**Documentation:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Resend: https://resend.com/docs
- Tailwind: https://tailwindcss.com/docs

**Communities:**
- Next.js Discord: https://discord.gg/nextjs
- Stack Overflow: https://stackoverflow.com

**Your Workflow:**
1. Client requests change
2. Make change locally
3. Test with `npm run dev`
4. Deploy with `vercel --prod`
5. Verify it works
6. Invoice client (if billable)

---

**Remember:** You're not just a developer. You're a business owner. Treat this like a business:
- Professional communication
- Document everything  
- Deliver on time
- Get paid fairly
- Grow strategically

Good luck! 💰🚀
