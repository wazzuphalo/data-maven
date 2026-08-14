import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { WishlistClient } from "./WishlistClient";

export const metadata: Metadata = {
  title: "Your Wishlist (Prototype)",
  description: "Restaurants you've saved from the directory demo.",
  robots: { index: false, follow: false },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/wishlist", label: "Wishlist" },
];

export default function WishlistPage() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Breadcrumbs items={CRUMBS} />
        <Eyebrow>Prototype</Eyebrow>
        <h1 className="text-hero font-heading font-semibold max-w-(--container-content)">
          Your wishlist
        </h1>
        <PrototypeBanner>
          Saved here in this browser only — clearing site data or switching
          devices resets it. A real account (see the demo signup) is what
          would make this follow you anywhere.
        </PrototypeBanner>
        <WishlistClient />
      </Container>
    </section>
  );
}
