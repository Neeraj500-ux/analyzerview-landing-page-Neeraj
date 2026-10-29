# AnalyzerView Market Research - Landing Page

React + Vite + Tailwind CSS (v3). No navbar.

## Run
```
npm install
npm run dev
```
Build: `npm run build`

## Sections (src/components)
Hero > Problem (STOP) > ExecutionModel (4 layers, scroll animation) > About + Founder > WhyResearch > WhoFor > LeadForm (#consult) > FAQ > FinalCTA > Footer

## To customise
- Hero photo: replace `public/images/Neeraj1.png`
- Form endpoint: create `.env` with `VITE_FORM_ENDPOINT=https://your-endpoint`
- Policy links in `Footer.jsx` (#terms, #mitc, #risk, #privacy, #investor-charter, #grievance)
- Copy / FAQ / registration number: `src/data/content.js`
