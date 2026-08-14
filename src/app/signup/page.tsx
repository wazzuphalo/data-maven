import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account (Demo)",
  description: "A prototype signup flow — no real account is created.",
  robots: { index: false, follow: false },
};

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/signup", label: "Sign Up" },
];

export default function SignupPage() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6 max-w-xl">
        <Breadcrumbs items={CRUMBS} />
        <Eyebrow>Prototype</Eyebrow>
        <h1 className="text-hero font-heading font-semibold">
          Create an account
        </h1>
        <PrototypeBanner>
          This is a demo of what account creation could look like — no real
          account system is behind it yet. Nothing you enter here is stored
          as a login credential, and your password is never transmitted.
        </PrototypeBanner>
        <SignupForm />
      </Container>
    </section>
  );
}
