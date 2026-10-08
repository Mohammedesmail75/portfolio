/**
 * CLOUDFLARE PAGES FUNCTION: GET /api/portfolio-data
 * Returns portfolio content from Cloudflare KV or static asset fallback.
 */

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;

  // 1. Check KV store first if bound
  if (env && env.PORTFOLIO_KV) {
    try {
      const kvData = await env.PORTFOLIO_KV.get('portfolio_data', { type: 'json' });
      if (kvData) return jsonResponse(kvData);
    } catch (e) {
      console.warn('KV read error:', e);
    }
  }

  // 2. Fallback to static asset fetch via ASSETS binding (safe Cloudflare Pages asset fetch)
  if (env && env.ASSETS) {
    try {
      const assetUrl = new URL('/data/portfolio-data.json', request.url);
      const assetRes = await env.ASSETS.fetch(new Request(assetUrl.toString()));
      if (assetRes.ok) {
        return assetRes;
      }
    } catch (e) {
      console.warn('ASSETS fetch error:', e);
    }
  }

  return jsonResponse({ error: 'Portfolio data not found' }, 404);
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'GET') return onRequestGet(context);
  return jsonResponse({ error: 'Method Not Allowed' }, 405);
}
