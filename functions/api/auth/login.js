/**
 * CLOUDFLARE PAGES FUNCTION: POST /api/auth/login
 * Handles admin authentication on Cloudflare Pages edge runtime.
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
  const ADMIN_PASSWORD = (env && env.ADMIN_PASSWORD) ? env.ADMIN_PASSWORD : DEFAULT_ADMIN_PASSWORD;

  try {
    const body = await request.json();
    const password = String(body.password || '');

    if (password === ADMIN_PASSWORD) {
      const token = generateToken();

      if (env && env.PORTFOLIO_KV) {
        try {
          await env.PORTFOLIO_KV.put(`session:${token}`, JSON.stringify({
            createdAt: Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000)
          }), { expirationTtl: 86400 });
        } catch (kvErr) {
          console.warn('KV session write error:', kvErr);
        }
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
    return jsonResponse({ success: false, error: 'Bad Request: ' + (err.message || 'Invalid JSON') }, 400);
  }
}

// Fallback for any other method
export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  if (context.request.method === 'POST') return onRequestPost(context);
  return jsonResponse({ error: 'Method Not Allowed' }, 405);
}
