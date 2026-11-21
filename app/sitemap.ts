import type { MetadataRoute } from 'next';
import { CANONICAL_ORIGIN } from '@/lib/legacy-redirects';

const pages: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/community', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/getting-started', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/policies/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? CANONICAL_ORIGIN : `${CANONICAL_ORIGIN}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
