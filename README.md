# wwwdrevilo &mdash; drevilo.net

Static rebuild of the drevilo.net WordPress site. Hosted on GitHub Pages. Source site (WordPress + Elementor + Obelisk theme, on the Contabo fleet) stays live until the cutover.

- Test/preview URL: https://sjultra.github.io/wwwdrevilo/
- Production URL (after cutover): https://www.drevilo.net/ and https://drevilo.net/
- Repo: https://github.com/sjultra/wwwdrevilo (public, sjultra org)
- Ticket: #3WHJ [High]. Plan: `~/workspace/tickets/3WHJ-website-rebuild-plan.md`

## Hosting

- GitHub Pages, project site, source main branch, root. The repo is public so Pages works on the free sjultra org plan (org plan verified free, Nov 13 2026).
- DNS stays at Bunny (zone 1041338, kiki/coco.bunny.net) per #3WHJ.D10.
- Custom domain: set to drevilo.net in the Pages settings. Do not publish to it until the Phase 5 cutover is approved.
- GitHub Pages does not support custom security headers. The site relies on GitHub Pages defaults plus HTTPS. There is no server-side code and no database, so there is no WordPress attack surface.

## Content triage (#3WHJ.D12)

Source: WordPress wp-json, read-only, Nov 13 2026. 13 pages, 5 posts, 95 media items.

### Kept pages

- Home, About, Services, Portfolio, Contact. Only the real Drevilo content was carried over: business operations / sales operations consulting, Anaplan, go-to-market strategy and execution, sales systems implementation and planning, sales potential by region, and the Iben Rodriguez (Co-founder, SJULTRA) testimonial. Two obvious typos in the source were fixed: "go-to-maeket" to "go-to-market", "Go-to-Marktet" to "Go-to-Market".
- About and Portfolio have no real source content, so they are minimal factual pages. About states what Drevilo does (from the real home-page text) and notes a fuller company profile is pending. Portfolio states that case studies are available on request. Both are flagged on the page and here as pending real content from Jeff/Denise. No team bios, founding date, location, or client list was invented.
- Services lists the real Drevilo services from the home page (Sales Operations Strategy, Anaplan, Sales Go-To-Market, Sales Ops Systems Implementation, Sales Ops Planning, Sales Operations Process, Modern Sales Tools, Financial / Sales Potential by Region, Increase Market Penetration). The demo agency services (Digital Marketing, Web & App Development, Mobile & Web Trending, Graphic Design) were dropped.

### Dropped

- Pages: home-light, home-2, sample-page, udesign-welcome, shop, cart, checkout, my-account (dead WooCommerce leftovers; WooCommerce is inactive).
- Posts: the 4 Feb 2022 theme-demo blog posts and hello-world.
- Within the kept pages, dropped: the "art & illustration" portfolio items ("Inspiring new space", "Innovation and Crafts", "Natural plus modern"), the zero counters (Happy clients 0, Complete projects 0, Partners 0, Awarded wins 0), the Alex Regelman / Colabrio lorem-ipsum testimonial, the repeated www.obelisk.com links, the "Recent Articles" blog block, the "We are Obelisk" staff and agency copy, the demo staff names (Stephanie Lawrence, Alex Regelman, Stacey Stamper), and the lorem-ipsum Mission / Goals / Why Us text.
- Media: no real media assets exist. All 95 media items are Obelisk theme-demo assets (generic numeric filenames, empty alt text, theme patterns, progress curves, the WooCommerce placeholder, the demo-import log file). The pages also hotlink images from obelisk.themescamp.com. None were kept. The rebuilt site uses no photos; it is a clean typographic design. Real photos (team, office, client work) can be added when Drevilo supplies them.

## Contact form (#3WHJ.D13)

- Handler: FormSubmit (formsubmit.co). Free, no account, no signup. The form posts to `https://formsubmit.co/denise.oliver@drevilo.net`.
- Fields: name, email, subject, message (message optional, matching the original form). The email field is named `email`, so FormSubmit uses it as the Reply-To.
- Hidden fields: `_subject` (New message from drevilo.net), `_template` (table), `_next` (thanks page).
- Spam protection: reCAPTCHA is left ON (FormSubmit default, recommended by its docs), plus a `_honey` honeypot field (hidden, off-screen, aria-hidden, tabindex -1; a filled honeypot is silently dropped).
- Activation: the first submission sends an activation email to the recipient. Submissions made before activation are held and delivered after activation. The recipient mailbox denise.oliver@drevilo.net does NOT exist yet (#3WHJ.D07), so activation is pending the mailbox being created. After activation, FormSubmit issues a random-string alias; replace the raw email in the form action with that alias so the address is not in the page source.
- Reliability note: FormSubmit returned an HTTP 521 (server down) on Oct 29, 2026 in one independent check. If it becomes unreliable, the form can move to another handler without changing the page structure; only the form action and hidden fields change.
- The contact page also shows the previous site's contact details (Email@example.com, +4.930.705.5448, 295 Witting Streets Suite 666, Melbourne, Australia), clearly marked as placeholders. Real contact information is pending from Jeff/Denise.

## Cutover checklist (Phase 5 &mdash; do only after Iben approves the cutover)

1. Nameserver change lands at Porkbun (drevilo.net nameservers to kiki/coco.bunny.net). The cutover cannot complete before this.
2. In the Pages settings, confirm the custom domain drevilo.net (already set) and add www.drevilo.net.
3. At Bunny DNS (zone 1041338): apex A records to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (plus the four AAAA records 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153); www CNAME to sjultra.github.io. Remove the old apex A/AAAA records pointing at the Contabo host (207.244.236.71, 2605:a140:2085:309::1) only after the new site is verified.
4. Update the canonical, Open Graph, sitemap, robots.txt, and the form `_next` URL from sjultra.github.io/wwwdrevilo to drevilo.net (use https://www.drevilo.net/ as canonical).
5. Verify drevilo.net and www.drevilo.net serve the new static site (200, correct content, contact form works). Verify the M365 TXT (MS=ms29461467) still answers at Bunny.
6. Activate the FormSubmit form (mailbox denise.oliver@drevilo.net must exist first), then replace the raw email in the form action with the FormSubmit alias.
7. Keep the WordPress site as the fallback until the cutover is verified. WordPress decommission is a separate decision, not in this plan.
