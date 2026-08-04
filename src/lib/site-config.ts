// Central source of truth for studio identity, contact details, and service area.
// Update these values as real business details are finalized — every page,
// the footer, and the JSON-LD structured data all read from here.

export const siteConfig = {
  studioName: "Data Maven",
  tagline: "A six-lens digital presence audit for Los Angeles County businesses",

  // TODO: real domain — see ASSETS-NEEDED.md
  domain: "{{DOMAIN}}",
  url: "https://{{DOMAIN}}",

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
  { href: "/about", label: "About" },
] as const;

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;
