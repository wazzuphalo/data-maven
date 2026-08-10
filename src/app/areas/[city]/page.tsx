import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArea, getPublishedAreaSlugs } from "@/lib/areas";
import { breadcrumbSchema, localBusinessAreaSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getPublishedAreaSlugs().map((city) => ({ city }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);
  if (!area || area.frontmatter.draft) return {};
  return {
    title: area.frontmatter.metaTitle.replace(` — ${siteConfig.studioName}`, ""),
    description: area.frontmatter.metaDescription,
    alternates: { canonical: `/areas/${city}` },
  };
}

export default async function AreaCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getArea(city);

  if (!area || area.frontmatter.draft) {
    notFound();
  }

  const { frontmatter, content } = area;
  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/areas", label: "Service Area" },
    { href: `/areas/${frontmatter.slug}`, label: frontmatter.city },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={localBusinessAreaSchema({
          name: frontmatter.city,
          path: `/areas/${frontmatter.slug}`,
          latitude: frontmatter.latitude,
          longitude: frontmatter.longitude,
        })}
      />
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-alt">
        <div className="hero-aura" aria-hidden="true" />
        <div className="absolute inset-0 dotted-grid opacity-70" aria-hidden="true" />
        <Container className="relative flex flex-col gap-4 py-16">
          <Breadcrumbs items={crumbs} />
          <Eyebrow>{siteConfig.serviceArea.short} · {frontmatter.city}</Eyebrow>
          <h1 className="max-w-(--container-content) text-hero font-heading font-semibold">
            {frontmatter.city} digital presence audit
          </h1>
          <p className="max-w-(--container-content) text-body-lg text-text-muted">
            {frontmatter.corridor}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div
            className="max-w-(--container-content) text-body-lg text-text
              [&_h2]:mt-10 [&_h2]:text-h2 [&_h2]:font-heading [&_h2]:font-semibold [&_h2]:first:mt-0
              [&_p]:mt-4 [&_p]:text-body-lg [&_p]:text-text-muted"
          >
            <MDXRemote source={content} />
          </div>

          <div className="mt-12 border-t border-surface-border pt-8">
            <Link
              href="/contact"
              className="btn-primary group/btn inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-body-lg font-medium text-accent-foreground hover:bg-[var(--color-accent-strong)] transition-colors"
            >
              Get your free audit
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
