import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const AREAS_DIR = path.join(process.cwd(), "content", "areas");

export type AreaFrontmatter = {
  city: string;
  slug: string;
  draft: boolean;
  metaTitle: string;
  metaDescription: string;
  corridor: string;
  latitude: number;
  longitude: number;
};

export type AreaContent = {
  frontmatter: AreaFrontmatter;
  content: string;
};

function readAreaFile(slug: string): AreaContent {
  const filePath = path.join(AREAS_DIR, `${slug}.mdx`);
  const raw = readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as AreaFrontmatter, content };
}

export function getAllAreaSlugs(): string[] {
  return readdirSync(AREAS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPublishedAreaSlugs(): string[] {
  return getAllAreaSlugs().filter((slug) => {
    const { frontmatter } = readAreaFile(slug);
    return frontmatter.draft !== true;
  });
}

export function getArea(slug: string): AreaContent | null {
  try {
    return readAreaFile(slug);
  } catch {
    return null;
  }
}

export function getAllAreasSummary(): AreaFrontmatter[] {
  return getAllAreaSlugs()
    .map((slug) => readAreaFile(slug).frontmatter)
    .sort((a, b) => a.city.localeCompare(b.city));
}
