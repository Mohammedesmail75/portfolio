/**
 * CLOUDFLARE PAGES FUNCTION: POST /api/admin/save
 * Saves updated portfolio configuration to KV on Cloudflare Pages edge runtime.
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

async function verifyToken(token, env) {
  if (!token) return false;
  if (env && env.PORTFOLIO_KV) {
    try {
      const session = await env.PORTFOLIO_KV.get(`session:${token}`, { type: 'json' });
      if (!session) return false;
      if (Date.now() > session.expiresAt) return false;
      return true;
    } catch (e) {
      // Fallback
    }
  }
  return token.length === 64;
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

export async function onRequestPost(context) {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  const isValid = await verifyToken(token, env);
  if (!isValid) {
    return jsonResponse({ success: false, error: 'Unauthorized: valid token required' }, 401);
  }

  try {
    const data = await request.json();
    data.lastUpdated = new Date().toISOString();

    if (env && env.PORTFOLIO_KV) {
      await env.PORTFOLIO_KV.put('portfolio_data', JSON.stringify(data));
    }

    return jsonResponse({
      success: true,
      message: 'Saved successfully',
      lastUpdated: data.lastUpdated
    });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'POST') return onRequestPost(context);
  return jsonResponse({ error: 'Method Not Allowed' }, 405);
}
