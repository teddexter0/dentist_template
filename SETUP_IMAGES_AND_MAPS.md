# Setup Guide: Images, Maps & Reviews

## 1. Add Hero Slideshow Images (5 seconds each)

### Step 1: Prepare Your Images
1. Get 5 high-quality photos of your dental clinic
2. Compress them using [TinyPNG.com](https://tinypng.com)
3. Rename them:
   - `hero1.jpg`
   - `hero2.jpg`
   - `hero3.jpg`
   - `hero4.jpg`
   - `hero5.jpg`

### Step 2: Add to Project
- Place all 5 images in: `public/images/` folder
- The slideshow will automatically work!

**That's it!** The images will transition every 5 seconds with smooth fade animations.

---

## 2. Add Google Maps Embeds

### For Eldoret Branch:

1. **Get the embed code:**
   - Go to [Google Maps](https://www.google.com/maps)
   - Search for your Eldoret clinic address
   - Click the **"Share"** button
   - Select **"Embed a map"** tab
   - Copy the `<iframe>` code

2. **Add to your site:**
   - Open `app/page.tsx`
   - Find the comment: `{/* Eldoret Branch */}` (around line 93)
   - Look for: `{/* Google Map Embed - REPLACE WITH YOUR ACTUAL EMBED CODE */}`
   - Replace the placeholder `<div>` with your iframe code

   **Example:**
   ```tsx
   <iframe
     src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE"
     width="100%"
     height="256"
     style={{ border: 0 }}
     allowFullScreen
     loading="lazy"
     referrerPolicy="no-referrer-when-downgrade"
   />
   ```

### For Kitale Branch:

- Follow the same steps as above
- Find the Kitale section (around line 160 in `app/page.tsx`)
- Add your Kitale location embed code

---

## 3. Setup Google Reviews Integration

### Step 1: Get Your Google Place ID

1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for your clinic
3. Copy your **Place ID** (starts with `ChIJ...`)

### Step 2: Get Your Google Review Link

**Format:**
```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```

OR use the shorter format:
```
https://g.page/r/YOUR_GOOGLE_PLACE_ID/review
```

### Step 3: Update Testimonials

Open `components/HeroSection.tsx` and update the `testimonials` array:

```tsx
const testimonials = [
  {
    text: "Best dental care I've experienced. Professional and caring staff!",
    author: "Sarah M.",
    rating: 5,
    reviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
  },
  // ... more testimonials
];
```

### Step 4: Get Real Reviews (Optional)

To show actual Google reviews automatically:

**Option 1: Use Google My Business API**
- Requires Google Cloud account (more complex)
- Shows real-time reviews

**Option 2: Manually Copy Reviews**
- Go to your Google Business Profile
- Copy real customer reviews
- Paste into the testimonials array
- Update every few months

**Option 3: Embed Widget (Easiest)**
- Use a service like [Elfsight](https://elfsight.com/google-reviews-widget/) or [Embedsocial](https://embedsocial.com/products/embedreviews/)
- Free tiers available
- Auto-updates

---

## 4. Quick Reference: File Locations

### Hero Images
- **Location:** `public/images/hero1.jpg` through `hero5.jpg`
- **Code:** `components/HeroSection.tsx` (line ~15)

### Google Maps
- **Location:** `app/page.tsx`
- **Eldoret:** Around line 93
- **Kitale:** Around line 160

### Testimonials/Reviews
- **Location:** `components/HeroSection.tsx`
- **Array:** Lines 18-38

---

## 5. Testing

After adding everything:

1. **Test slideshow:**
   - Refresh the homepage
   - Images should transition smoothly every 5 seconds
   - Text should be readable (white text on dark overlay)

2. **Test maps:**
   - Maps should be interactive
   - Users can zoom, pan, and get directions

3. **Test review links:**
   - Click on testimonials
   - Should open Google Reviews in new tab
   - Users can leave a review

---

## Troubleshooting

### Images not showing?
- Check file names match exactly: `hero1.jpg` not `Hero1.jpg`
- Make sure they're in `public/images/` folder
- Try clearing browser cache (Ctrl+Shift+R)

### Map not showing?
- Make sure you copied the complete iframe code
- Check for any syntax errors in the JSX
- Verify your API restrictions in Google Cloud Console

### Reviews not linking?
- Test the URL directly in your browser first
- Make sure it's your correct Google Business Profile
- Check for typos in the Place ID

---

**Need help?** Check the main README.md or CUSTOMIZATION_GUIDE.md files!
