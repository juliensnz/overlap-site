# OverLap site

Marketing page (English, `index.html`), support page and privacy policy for the OverLap iOS app, in en, fr, de, es and it. Plain static HTML served by a Cloudflare Worker (static assets, `wrangler.jsonc`) on overlapfpv.com. Deploy with `npx wrangler@4 deploy`.

- Support: https://overlapfpv.com/support (`fr/`, `de/`, `es/`, `it/` for the translations, where `index.html` is the support page)
- Privacy: https://overlapfpv.com/privacy

Edit the HTML directly, keeping the five languages in step.

GitHub Pages still serves `main` on overlap.nchez.fr and juliensnz.github.io/overlap-site: app builds up to 1.0.0 link there, so it stays up. Its pages declare overlapfpv.com as canonical.
