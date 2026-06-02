# Zenyo Finder

A starter static website for a Free Fire sensitivity finder.

## Files
- `index.html` — main page
- `styles.css` — styling with neon 3D hero effects
- `devices.js` — sample phone database and presets
- `script.js` — search, playstyle, and result logic

## How to use
1. Open `Zenyo-Finder/index.html` in your browser.
2. Choose a device from the dropdown or type a model into the search bar.
3. Select a playstyle and click `Find My Sensitivity`.
4. Use `AI Sensi Maker` to get a random optimized sensitivity suggestion.
5. If a device preset is wrong or missing, fill out the report form and submit your complaint.
6. Open `admin.html` to view the saved report inbox and clear reports.

## Email integration
- The report form can be configured to send emails using EmailJS.
- Open `script.js` and set `emailConfig.enabled = true` plus your EmailJS service, template, and public key.
- Once enabled, reports will still save locally and also attempt to email your configured address.

## Extend
- Add more devices to `devices.js`.
- Add a real database or JSON file for 500+ models.
- Replace the sample 3D hero with a WebGL model if you want a fully interactive 3D viewport.
- Integrate the report form with a backend or email service to collect customer complaints.
- Add more device brands and exact DPI values for improved recommendations.
