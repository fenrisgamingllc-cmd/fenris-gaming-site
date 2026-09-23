import { headers } from 'next/headers';

export const LLC_SITE_URL = 'https://fenrisgamingllc.com';
export const HALL_SITE_URL = 'https://fenrisgaminghall.com';

const HALL_HOSTS = new Set(['fenrisgaminghall.com', 'www.fenrisgaminghall.com']);

function hostnameFromHeader(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(',')[0]?.trim().toLowerCase();
  if (!first) return null;
  const withoutPort = first.endsWith(']') ? first : first.replace(/:\d+$/, '');
  const hostname = withoutPort.replace(/\.$/, '');
  return hostname || null;
}

/** Hall hosts (including www) use the hall origin. Every other host keeps llc. */
export function canonicalSiteUrlForHostnames(
  hostnames: Array<string | null | undefined>,
): string {
  if (hostnames.some((host) => host != null && HALL_HOSTS.has(host))) {
    return HALL_SITE_URL;
  }
  return LLC_SITE_URL;
}

export async function getRequestSiteUrl(): Promise<string> {
  const headerList = await headers();
  return canonicalSiteUrlForHostnames([
    hostnameFromHeader(headerList.get('x-forwarded-host')),
    hostnameFromHeader(headerList.get('host')),
  ]);
}
