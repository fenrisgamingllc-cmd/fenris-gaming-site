/** Canonical marketing origin. Alias hosts 301 here. */
export const CANONICAL_ORIGIN = 'https://fenrisgamingllc.com';

/**
 * Shopify primary domain from the store admin (`primaryDomain.host`).
 * The shop has no custom domain. Do not send these redirects at a host this
 * marketing site serves — that would loop.
 */
export const STORE_ORIGIN = 'https://fenrisgaming.myshopify.com';

/** Hosts that should consolidate onto the LLC apex. */
export const ALIAS_HOSTS = new Set([
  'fenrisgaminghall.com',
  'www.fenrisgaminghall.com',
  'www.fenrisgamingllc.com',
]);

/**
 * First path segment of legacy Shopify storefront URLs.
 * Real marketing routes (`/about`, `/events`, `/community`, `/contact`,
 * `/getting-started`, `/admin`, `/faq`) are intentionally absent.
 */
const STORE_ROOTS = new Set([
  'products',
  'collections',
  'cart',
  'pages',
  'blogs',
  'account',
  'search',
  'discount',
  'gift_cards',
  'recommendations',
  'checkout',
  'checkouts',
  'orders',
  'password',
  'apps',
]);

/** Marketing page that lives on this site and must not be sent to Shopify. */
const LOCAL_POLICY_PATH = '/policies/privacy-policy';

export function hostnameFromHostHeader(value: string | null | undefined): string | null {
  if (!value) return null;
  const first = value.split(',')[0]?.trim().toLowerCase();
  if (!first) return null;
  const withoutPort = first.endsWith(']') ? first : first.replace(/:\d+$/, '');
  const hostname = withoutPort.replace(/\.$/, '');
  return hostname || null;
}

function normalizedPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

/**
 * Same-path Shopify destination for a legacy store URL, or null when this
 * site should keep the request (including `/policies/privacy-policy`).
 * `search` must include the leading `?` when present.
 */
export function legacyStoreDestination(pathname: string, search = ''): string | null {
  const path = normalizedPath(pathname);
  if (path === LOCAL_POLICY_PATH) return null;

  if (path === '/policies' || path.startsWith('/policies/')) {
    return `${STORE_ORIGIN}${pathname}${search}`;
  }

  // Shopify ajax cart (`/cart.js`, `/cart/add.js`, …).
  if (path === '/cart.js' || path.startsWith('/cart.js')) {
    return `${STORE_ORIGIN}${pathname}${search}`;
  }

  const root = path.split('/')[1] ?? '';
  if (!STORE_ROOTS.has(root)) return null;
  return `${STORE_ORIGIN}${pathname}${search}`;
}

/**
 * 301 target for this request, or null to continue.
 * Alias hosts always keep the path and go to the LLC apex (one hop).
 * Legacy store paths are sent to Shopify only after that, so a hall
 * `/products/...` URL lands on the LLC host and then on the store.
 */
export function redirectDestination(
  hostHeader: string | null | undefined,
  pathname: string,
  search = '',
): string | null {
  const host = hostnameFromHostHeader(hostHeader);
  if (host && ALIAS_HOSTS.has(host)) {
    return `${CANONICAL_ORIGIN}${pathname}${search}`;
  }
  return legacyStoreDestination(pathname, search);
}
