# DEUD.ch Copilot Instructions

## Overview

DueD™ is a static website for Operational Due Diligence experts, deployed on Vercel.

## Production URL

- **Website**: https://deud.ch
- **Repo**: https://github.com/FASTPROD/DEUD.ch

## Project Type

Static HTML/CSS/JS website - no build process required.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main landing page |
| `styles.css` | All styling (responsive, dark theme) |
| `scripts.js` | Interactivity (smooth scroll, animations) |
| `vercel.json` | Vercel routing config |
| `assets/` | Images, logos, og-image.png |
| `profiles/` | Team member profile pages |
| `vcards/` | Contact cards for download |

## Development

```bash
# Open in browser
open index.html

# Or use local server
python -m http.server 8000
```

## Deployment

Push to `main` → Vercel auto-deploys to deud.ch

## Content Guidelines

- Professional, formal tone
- Focus on operational due diligence expertise
- Target audience: Private equity firms, M&A advisors
- Color scheme: Dark (slate-900), accent blue

## Do NOT

- ❌ Change domain references from deud.ch
- ❌ Remove team profiles without updating references
- ❌ Modify vCard structure (follow existing format)
