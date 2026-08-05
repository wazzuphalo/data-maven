import Script from "next/script";

/**
 * Disabled by default — no script tag renders unless
 * NEXT_PUBLIC_ANALYTICS_DOMAIN is set. Cookie-free, no consent banner
 * needed for either provider. Set NEXT_PUBLIC_ANALYTICS_PROVIDER to
 * "umami" to use Umami instead; Plausible is the default.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  if (!domain) return null;

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "plausible";

  if (provider === "umami") {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    const scriptUrl =
      process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
      "https://cloud.umami.is/script.js";
    if (!websiteId) return null;
    return (
      <Script
        src={scriptUrl}
        data-website-id={websiteId}
        strategy="afterInteractive"
      />
    );
  }

  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
}
