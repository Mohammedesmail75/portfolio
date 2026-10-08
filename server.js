/**
 * ZERO-DEPENDENCY LOCAL SERVER WITH SECURE ADMIN API
 * Run with: node server.js
 * Automatically serves the portfolio on http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;
const DATA_DIR = path.join(BASE_DIR, 'data');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const UPLOADS_DIR = path.join(BASE_DIR, 'assets', 'images');

// Ensure required directories exist
[DATA_DIR, BACKUPS_DIR, UPLOADS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Admin Authentication Setup
// Default dev password if not provided in environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'KAIRO-ADMIN-2026-CHANGE-ME';

// In-memory active session tokens: token -> { createdAt, expiresAt }
const activeSessions = new Map();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function verifyToken(token) {
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

function getBearerToken(req) {
  const authHeader = req.headers['authorization'] || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) { // 50MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    res.end();
    return;
  }

  let reqUrl = req.url.split('?')[0];

  /* ------------------- API ROUTES ------------------- */
  
  // 1. POST /api/auth/login
  if (reqUrl === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const providedPassword = String(body.password || '');

      // Constant-time comparison to prevent timing attacks
      const expectedBuffer = Buffer.from(ADMIN_PASSWORD);
      const providedBuffer = Buffer.from(providedPassword);

      const isValid = (expectedBuffer.length === providedBuffer.length) &&
        crypto.timingSafeEqual(expectedBuffer, providedBuffer);

      if (isValid) {
        const token = generateToken();
        activeSessions.set(token, {
          createdAt: Date.now(),
          expiresAt: Date.now() + SESSION_TTL_MS
        });
        sendJson(res, 200, {
          success: true,
          token,
          expiresIn: SESSION_TTL_MS / 1000,
          message: 'Authenticated successfully'
        });
      } else {
        sendJson(res, 401, {
          success: false,
          error: 'Invalid password'
        });
      }
    } catch (err) {
      sendJson(res, 400, { success: false, error: 'Bad Request' });
    }
    return;
  }

  // 2. GET /api/auth/check
  if (reqUrl === '/api/auth/check' && req.method === 'GET') {
    const token = getBearerToken(req);
    const authenticated = verifyToken(token);
    if (authenticated) {
      sendJson(res, 200, { authenticated: true });
    } else {
      sendJson(res, 401, { authenticated: false, error: 'Unauthorized or expired session' });
    }
    return;
  }

  // 3. POST /api/auth/logout
  if (reqUrl === '/api/auth/logout' && req.method === 'POST') {
    const token = getBearerToken(req);
    if (token) activeSessions.delete(token);
    sendJson(res, 200, { success: true, message: 'Logged out successfully' });
    return;
  }

  // 4. GET /api/portfolio-data (Public read)
  if (reqUrl === '/api/portfolio-data' && req.method === 'GET') {
    const dataFilePath = path.join(DATA_DIR, 'portfolio-data.json');
    if (fs.existsSync(dataFilePath)) {
      try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
        return;
      } catch (err) {
        sendJson(res, 500, { success: false, error: 'Failed to read data file' });
        return;
      }
    } else {
      sendJson(res, 404, { success: false, error: 'Data file not initialized' });
      return;
    }
  }

  // 5. POST /api/admin/save (Protected)
  if (reqUrl === '/api/admin/save' && req.method === 'POST') {
    const token = getBearerToken(req);
    if (!verifyToken(token)) {
      sendJson(res, 401, { success: false, error: 'Unauthorized: valid admin token required' });
      return;
    }

    try {
      const incomingData = await parseJsonBody(req);
      
      // Basic structural validation
      if (!incomingData || typeof incomingData !== 'object' || !Array.isArray(incomingData.projects)) {
        sendJson(res, 400, { success: false, error: 'Invalid data format: projects array required' });
        return;
      }

      incomingData.lastUpdated = new Date().toISOString();

      const dataFilePath = path.join(DATA_DIR, 'portfolio-data.json');

      // 1. Create a timestamped backup before writing
      if (fs.existsSync(dataFilePath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(BACKUPS_DIR, `portfolio-data-${timestamp}.json`);
        try {
          fs.copyFileSync(dataFilePath, backupPath);
          
          // Prune backups: keep latest 15
          const backupFiles = fs.readdirSync(BACKUPS_DIR)
            .filter(f => f.startsWith('portfolio-data-') && f.endsWith('.json'))
            .sort()
            .reverse();
          if (backupFiles.length > 15) {
            backupFiles.slice(15).forEach(f => {
              try { fs.unlinkSync(path.join(BACKUPS_DIR, f)); } catch (_) {}
            });
          }
        } catch (backupErr) {
          console.warn('Backup warning:', backupErr);
        }
      }

      // 2. Write updated file atomically
      const jsonContent = JSON.stringify(incomingData, null, 2);
      const tempPath = `${dataFilePath}.tmp`;
      fs.writeFileSync(tempPath, jsonContent, 'utf8');
      fs.renameSync(tempPath, dataFilePath);

      sendJson(res, 200, {
        success: true,
        message: 'Portfolio data saved and published successfully',
        lastUpdated: incomingData.lastUpdated
      });
    } catch (err) {
      console.error('Error saving portfolio data:', err);
      sendJson(res, 500, { success: false, error: err.message || 'Internal server error while saving' });
    }
    return;
  }

  // 6. POST /api/admin/upload (Protected)
  if (reqUrl === '/api/admin/upload' && req.method === 'POST') {
    const token = getBearerToken(req);
    if (!verifyToken(token)) {
      sendJson(res, 401, { success: false, error: 'Unauthorized: valid admin token required' });
      return;
    }

    try {
      const body = await parseJsonBody(req);
      const { filename, base64Data } = body;

      if (!filename || !base64Data) {
        sendJson(res, 400, { success: false, error: 'filename and base64Data are required' });
        return;
      }

      // Validate allowed extensions
      const ext = path.extname(filename).toLowerCase();
      const allowedExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.mp4'];
      if (!allowedExts.includes(ext)) {
        sendJson(res, 400, { success: false, error: `Invalid file extension. Allowed: ${allowedExts.join(', ')}` });
        return;
      }

      // Sanitize filename
      const safeBaseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50);
      const safeFilename = `${Date.now()}-${safeBaseName}${ext}`;
      const destPath = path.join(UPLOADS_DIR, safeFilename);

      // Decode base64 and write
      const buffer = Buffer.from(base64Data.replace(/^data:[^;]+;base64,/, ''), 'base64');
      fs.writeFileSync(destPath, buffer);

      sendJson(res, 200, {
        success: true,
        message: 'File uploaded successfully',
        url: `assets/images/${safeFilename}`
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      sendJson(res, 500, { success: false, error: err.message || 'Upload error' });
    }
    return;
  }

  /* ------------------- STATIC FILE SERVING ------------------- */
  if (reqUrl === '/') reqUrl = '/index.html';

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqUrl}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  MOHAMMED ESMAIL — PORTFOLIO RUNNING`);
  console.log(`  Local URL:   http://localhost:${PORT}`);
  console.log(`  Admin Pass:  ${process.env.ADMIN_PASSWORD ? '[Configured via env]' : 'KAIRO-ADMIN-2026-CHANGE-ME'}`);
  console.log(`  Press Ctrl+C to terminate the server`);
  console.log(`======================================================\n`);
});
