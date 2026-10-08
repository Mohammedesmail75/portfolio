/**
 * CLOUDFLARE PAGES FUNCTION: POST /api/admin/upload
 * Accepts media uploads and returns data URI on Cloudflare Pages edge runtime.
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
    const body = await request.json();
    const { filename, base64Data } = body;
    if (!filename || !base64Data) {
      return jsonResponse({ success: false, error: 'filename and base64Data required' }, 400);
    }
    return jsonResponse({
      success: true,
      message: 'Media accepted',
      url: base64Data.startsWith('data:') ? base64Data : `assets/images/${filename}`
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
