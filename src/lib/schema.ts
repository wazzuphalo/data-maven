import { siteConfig } from "./site-config";
import type { FaqItem } from "../../content/faq";
import type { Service } from "../../content/services";
import type { Crumb } from "@/components/ui/Breadcrumbs";

function absoluteUrl(path: string) {
  const base = siteConfig.url.startsWith("http")
    ? siteConfig.url
    : "https://example.com";
  return new URL(path, base).toString();
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.studioName,
    description: siteConfig.tagline,
    url: absoluteUrl("/"),
    telephone: siteConfig.contact.phoneHref,
    email: siteConfig.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.serviceArea.name,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram].filter(
      Boolean
    ),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.operator.name,
    jobTitle: siteConfig.operator.title,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.studioName,
    },
    url: absoluteUrl("/about"),
  };
}

export function serviceListSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: service.name,
      description: service.triggeredWhen,
      provider: {
        "@type": "ProfessionalService",
        name: siteConfig.studioName,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: siteConfig.serviceArea.name,
      },
    })),
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function localBusinessAreaSchema(params: {
  name: string;
  path: string;
  latitude: number;
  longitude: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.studioName} — ${params.name}`,
    url: absoluteUrl(params.path),
    address: {
      "@type": "PostalAddress",
      addressLocality: params.name,
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: params.latitude,
      longitude: params.longitude,
    },
    areaServed: {
      "@type": "City",
      name: params.name,
    },
    parentOrganization: {
      "@type": "ProfessionalService",
      name: siteConfig.studioName,
      url: absoluteUrl("/"),
    },
  };
}
