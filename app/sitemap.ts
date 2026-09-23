import type { MetadataRoute } from 'next';
import { getRequestSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-dynamic';

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getRequestSiteUrl();
  const lastModified = new Date();

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
