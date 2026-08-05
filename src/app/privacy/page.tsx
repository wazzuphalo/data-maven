import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.studioName} collects, uses, and protects information submitted through this site.`,
  alternates: { canonical: "/privacy" },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy Policy" },
];

const lastUpdated = "August 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <section className="border-b border-surface-border bg-surface-alt">
        <Container className="flex flex-col gap-4 py-16">
          <Breadcrumbs items={CRUMBS} />
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            Privacy Policy
          </h1>
          <p className="text-small text-text-muted">
            Last updated: {lastUpdated}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col gap-6 max-w-(--container-content) text-body text-text-muted">
          <p>
            This policy covers general practices and has not yet been
            reviewed by a lawyer. Treat it as a good-faith description of
            what happens with information submitted to {siteConfig.studioName}
            , not a substitute for legal advice.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            What we collect
          </h2>
          <p>
            When you use the contact form or the self-serve mini audit tool,
            we collect what you enter: name, email address, business name,
            city, industry, phone number if provided, and your answers to
            the self-check questions. We don&apos;t collect this information
            through any means other than what you actively submit.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            How we use it
          </h2>
          <p>
            Submitted information is used to respond to your inquiry, run
            the audit you requested, and follow up about the services
            described on this site. We don&apos;t sell your information to
            third parties, and we don&apos;t use it for purposes unrelated
            to why you submitted it.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Where it goes
          </h2>
          <p>
            Form submissions are processed through Netlify Forms by
            default, or through the email provider Resend if that&apos;s
            configured instead. Both are standard infrastructure providers,
            not third parties we share your information with for their own
            purposes.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Analytics
          </h2>
          <p>
            This site can use privacy-respecting, cookie-free analytics
            (Plausible or Umami) to understand traffic in aggregate. This is
            disabled by default and, when enabled, does not track individual
            visitors or set tracking cookies.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Your rights
          </h2>
          <p>
            You can ask what information we have about you, ask us to
            correct it, or ask us to delete it, at any time, by emailing{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.contact.email}
            </a>
            . Any marketing email you receive includes an unsubscribe
            option — you can also just reply and say so.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Children&apos;s privacy
          </h2>
          <p>
            This site is intended for business owners and operators, not
            children. We don&apos;t knowingly collect information from
            anyone under 18.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Changes to this policy
          </h2>
          <p>
            If this policy changes, the &ldquo;last updated&rdquo; date at
            the top of this page will change with it.
          </p>

          <h2 className="text-h2 font-heading font-semibold text-text">
            Contact
          </h2>
          <p>
            {siteConfig.studioName}
            <br />
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.city}, {siteConfig.address.state}{" "}
            {siteConfig.address.zip}
            <br />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
