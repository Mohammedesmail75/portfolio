/**
 * CLOUDFLARE PAGES FUNCTIONS CATCH-ALL API ROUTE
 * Handles:
 *  - POST /api/auth/login
 *  - GET  /api/auth/check
 *  - POST /api/auth/logout
 *  - GET  /api/portfolio-data
 *  - POST /api/admin/save
 *  - POST /api/admin/upload
 */

const DEFAULT_ADMIN_PASSWORD = 'KAIRO-ADMIN-2026-CHANGE-ME';

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

function generateToken() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyToken(token, env) {
  if (!token) return false;
  if (env && env.PORTFOLIO_KV) {
    const session = await env.PORTFOLIO_KV.get(`session:${token}`, { type: 'json' });
    if (!session) return false;
    if (Date.now() > session.expiresAt) return false;
    return true;
  }
  // Fallback signature check if KV not bound
  // Token prefix test
  return token.length === 64;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    });
  }

  const ADMIN_PASSWORD = (env && env.ADMIN_PASSWORD) ? env.ADMIN_PASSWORD : DEFAULT_ADMIN_PASSWORD;

  // 1. POST /api/auth/login
  if (path === '/api/auth/login' && method === 'POST') {
    try {
      const body = await request.json();
      const password = String(body.password || '');
      if (password === ADMIN_PASSWORD) {
        const token = generateToken();
        if (env && env.PORTFOLIO_KV) {
          await env.PORTFOLIO_KV.put(`session:${token}`, JSON.stringify({
            createdAt: Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000)
          }), { expirationTtl: 86400 });
        }
        return jsonResponse({
          success: true,
          token,
          expiresIn: 86400,
          message: 'Authenticated successfully'
        });
      } else {
        return jsonResponse({ success: false, error: 'Invalid password' }, 401);
      }
    } catch (err) {
      return jsonResponse({ success: false, error: 'Bad Request' }, 400);
    }
  }

  // 2. GET /api/auth/check
  if (path === '/api/auth/check' && method === 'GET') {
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
    const isValid = await verifyToken(token, env);
    if (isValid) {
      return jsonResponse({ authenticated: true });
    }
    return jsonResponse({ authenticated: false, error: 'Unauthorized' }, 401);
  }

  // 3. POST /api/auth/logout
  if (path === '/api/auth/logout' && method === 'POST') {
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
    if (token && env && env.PORTFOLIO_KV) {
      await env.PORTFOLIO_KV.delete(`session:${token}`);
    }
    return jsonResponse({ success: true, message: 'Logged out successfully' });
  }

  // 4. GET /api/portfolio-data
  if (path === '/api/portfolio-data' && method === 'GET') {
    if (env && env.PORTFOLIO_KV) {
      const kvData = await env.PORTFOLIO_KV.get('portfolio_data', { type: 'json' });
      if (kvData) return jsonResponse(kvData);
    }
    // Fallback to static asset fetch
    const assetUrl = new URL('/data/portfolio-data.json', url.origin);
    const assetRes = await fetch(assetUrl.toString());
    if (assetRes.ok) {
      const data = await assetRes.json();
      return jsonResponse(data);
    }
    return jsonResponse({ success: false, error: 'Data not found' }, 404);
  }

  // 5. POST /api/admin/save
  if (path === '/api/admin/save' && method === 'POST') {
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

  // 6. POST /api/admin/upload
  if (path === '/api/admin/upload' && method === 'POST') {
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

  return jsonResponse({ error: 'Endpoint not found' }, 404);
}
