// Central source of truth for studio identity, contact details, and service area.
// Update these values as real business details are finalized — every page,
// the footer, and the JSON-LD structured data all read from here.

// TODO: real domain — see ASSETS-NEEDED.md. Until one is set, canonical
// URLs/sitemap/JSON-LD fall back to Netlify's own deploy URL (set
// automatically at build time) so nothing ships broken in the meantime —
// this also means they'll pick up a custom domain automatically the moment
// one is attached in Netlify, with no code change needed.
const CONFIGURED_DOMAIN = "{{DOMAIN}}";
const hasRealDomain = !CONFIGURED_DOMAIN.startsWith("{{");
const fallbackUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || "http://localhost:3000";
const resolvedUrl = hasRealDomain ? `https://${CONFIGURED_DOMAIN}` : fallbackUrl;
const resolvedDomain = hasRealDomain
  ? CONFIGURED_DOMAIN
  : resolvedUrl.replace(/^https?:\/\//, "");

export const siteConfig = {
  studioName: "Data Maven",
  tagline: "A six-lens digital presence audit for Los Angeles County businesses",

  domain: resolvedDomain,
  url: resolvedUrl,

  operator: {
    name: "Angel Muro",
    title: "Founder & Lead Strategist",
  },

  contact: {
    email: "angel.muro55@gmail.com",
    phone: "(626) 944-6189",
    phoneHref: "+16269446189",
  },

  // TODO: real booking link — see ASSETS-NEEDED.md
  bookingUrl: "{{BOOKING_URL}}",

  // TEMPORARY placeholder address — see ASSETS-NEEDED.md. This is Newegg's
  // corporate HQ, used only to unblock layout/schema work. Must be replaced
  // with Data Maven's real business address before launch.
  address: {
    line1: "21688 Gateway Center Dr, Ste 300",
    city: "Diamond Bar",
    state: "CA",
    zip: "91765",
    country: "US",
    isPlaceholder: true,
  },

  serviceArea: {
    name: "Los Angeles County, California",
    short: "LA County",
  },

  social: {
    // TODO: add real profile URLs — see ASSETS-NEEDED.md
    linkedin: "",
    instagram: "",
  },

  geo: {
    // Diamond Bar, CA approximate coordinates (placeholder, tied to placeholder address)
    latitude: 34.0286,
    longitude: -117.8103,
  },
} as const;

export const NAV_LINKS = [
  { href: "/audit", label: "The Audit" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/areas", label: "Service Area" },
  { href: "/restaurants", label: "Restaurants (Demo)" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;
