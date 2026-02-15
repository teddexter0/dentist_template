# Dental Clinic Website

A clean, professional, and mobile-responsive website for a dental clinic with branches in Eldoret and Kitale.

## Features

- **Beautiful Hero Section** with animations and testimonials
- **Services Overview** showcasing dental services
- **About Section** highlighting clinic strengths
- **Location Information** for both Eldoret and Kitale branches with:
  - Address
  - Phone numbers
  - Email addresses
  - Operating hours
- **Simple Contact Form** for patient inquiries
- **Fully Responsive** design for mobile, tablet, and desktop
- **No Complex Backend** - simple, maintainable code

## Technology Stack

- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the code

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Update Contact Information

Edit `app/page.tsx` to update:

1. **Phone Numbers** - Search for "+254" in the file
2. **Email Addresses** - Search for "@dentalclinic.co.ke"
3. **Branch Addresses** - In the Locations section
4. **Operating Hours** - In the Locations section

### Update Services

Edit the services array in `app/page.tsx` (around line 61) to add or modify dental services.

### Update Testimonials

Edit `components/HeroSection.tsx` (around line 30) to change customer testimonials.

### Change Colors

The primary blue color can be changed in:
- `tailwind.config.ts` - for Tailwind utilities
- `app/globals.css` - for CSS variables

## Deployment

### Vercel (Recommended - Free & Easy)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (it's automatic!)

Your site will be live at: `https://yoursite.vercel.app`

### Other Platforms

This Next.js app can be deployed to:
- Netlify
- Railway
- AWS
- DigitalOcean
- Any Node.js hosting

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles and animations
├── components/
│   ├── HeroSection.tsx     # Animated hero section
│   ├── ContactForm.tsx     # Simple contact form
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       └── textarea.tsx
└── lib/
    └── utils.ts            # Utility functions
```

## Simplified Version

To keep this website simple and maintainable, the following were removed:

- ❌ Complex booking system with date/time pickers
- ❌ Email automation and notifications
- ❌ Admin dashboard
- ❌ Google Sheets integration
- ❌ API routes and backend
- ❌ WhatsApp integration

## Contact Form Behavior

The contact form currently displays a success message when submitted. To actually receive messages, you have these simple options:

### Option 1: Use Formspree (Easiest - 5 minutes)

1. Go to [formspree.io](https://formspree.io)
2. Sign up (free plan: 50 submissions/month)
3. Create a form and get your endpoint
4. Update `components/ContactForm.tsx`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch('YOUR_FORMSPREE_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setStatus({ type: 'success', message: 'Thank you! We will contact you soon.' });
    // Reset form...
  }
};
```

### Option 2: Use Getform

Similar to Formspree, free tier available at [getform.io](https://getform.io)

### Option 3: Email Links

Replace the form with direct contact methods:
- Phone links: `<a href="tel:+254712345678">Call Us</a>`
- Email links: `<a href="mailto:info@dentalclinic.co.ke">Email Us</a>`

## Support

For issues or questions:
- **Next.js documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## License

This is a template for your use. Customize as needed!

---

**Built with Next.js and Tailwind CSS**
