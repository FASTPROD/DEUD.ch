# DEUD.ch - DueD™ Operational Due Diligence Website

Static website for DueD™ (Operational Due Diligence Experts).

## 🌐 Production URL

**https://deud.ch** (Vercel)

## 📁 Project Structure

```
DEUD.ch/
├── index.html      # Main landing page
├── styles.css      # All styling
├── scripts.js      # Interactivity
├── vercel.json     # Vercel config
├── assets/         # Images, logos, og-image
├── profiles/       # Team member profiles
└── vcards/         # Virtual contact cards
```

## 🚀 Deployment

Deployed automatically via Vercel from GitHub:
- **Repo**: https://github.com/FASTPROD/DEUD.ch
- **Domain**: deud.ch (configured in Vercel)

### To Deploy

1. Push to `main` branch → Vercel auto-deploys
2. Or manually: `vercel --prod`

## 🛠️ Local Development

Simple static site - just open `index.html` in a browser:

```bash
# macOS
open index.html

# Or use any local server
python -m http.server 8000
npx serve .
```

## 📋 Content Updates

- **Team Profiles**: Edit `/profiles/*.html`
- **vCards**: Update `/vcards/*.vcf`
- **Assets**: Add images to `/assets/`
- **Styling**: Modify `styles.css`
- **Scripts**: Update `scripts.js`

## 🔗 Related

- Original repo: https://github.com/FASTPROD/invoqme
- DueD™ is part of the CSS (Career Solutions Services) brand
