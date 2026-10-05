# Social links

Round icon buttons to Laboon's social accounts.

- Component: `components/social/SocialLinks.tsx` (`size="md" | "lg"`).
- Shown in: site footer, `/contact`, `/inscription-confirmee`.
- Networks: **Instagram** (`@laboon.app.music`), **Facebook** (LaboonAPPMUSIC).
- Links open in a new tab with `rel="noopener noreferrer"`; each has an
  accessible label "Laboon sur <network>".

## Add a network

Add an entry to `SOCIALS` (name, URL, inline SVG icon drawn on a 24×24
stroke grid). Nothing else to change. The test iterates over `SOCIALS`.

## Tests

`components/social/SocialLinks.test.tsx`.
