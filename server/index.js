import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

loadEnvFile();

const PORT = Number.parseInt(process.env.PORT || '8787', 10);
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const INQUIRY_TO_EMAIL = process.env.INQUIRY_TO_EMAIL || '';
const INQUIRY_FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || '';
const INQUIRY_AUTOREPLY = process.env.INQUIRY_AUTOREPLY === 'true';
const RATE_LIMIT_WINDOW_MS = Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || `${15 * 60 * 1000}`, 10);
const RATE_LIMIT_MAX = Number.parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
const MAX_BODY_SIZE = 32 * 1024;

const rateLimitStore = new Map();

const server = createServer(async (req, res) => {
  try {
    setJsonHeaders(res);

    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({
        ok: true,
        service: 'inquiry-api',
        resendConfigured: Boolean(RESEND_API_KEY && INQUIRY_TO_EMAIL && INQUIRY_FROM_EMAIL)
      }));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/inquiry') {
      const clientIp = getClientIp(req);
      const rateLimit = checkRateLimit(clientIp);

      if (!rateLimit.allowed) {
        res.writeHead(429);
        res.end(JSON.stringify({ ok: false, error: 'Too many submissions. Please try again shortly.' }));
        return;
      }

      if (!RESEND_API_KEY || !INQUIRY_TO_EMAIL || !INQUIRY_FROM_EMAIL) {
        res.writeHead(503);
        res.end(JSON.stringify({ ok: false, error: 'Inquiry service is not configured yet.' }));
        return;
      }

      const body = await readJsonBody(req);
      const payload = validateInquiry(body);

      if (payload.website) {
        res.writeHead(200);
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      await sendInquiryEmail(payload);

      if (INQUIRY_AUTOREPLY) {
        await sendAutoReply(payload);
      }

      res.writeHead(200);
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.writeHead(statusCode);
    res.end(JSON.stringify({
      ok: false,
      error: statusCode >= 500 ? 'Server error' : error.message
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Inquiry API listening on http://127.0.0.1:${PORT}`);
});

function setJsonHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
}

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return { allowed: false };
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return { allowed: true };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
      if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_SIZE) {
        reject(httpError(413, 'Payload too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(httpError(400, 'Invalid JSON body'));
      }
    });

    req.on('error', () => reject(httpError(400, 'Unable to read request body')));
  });
}

function validateInquiry(input) {
  const payload = {
    name: normalize(input.name, 120),
    email: normalize(input.email, 254).toLowerCase(),
    phone: normalize(input.phone, 80),
    details: normalize(input.details, 4000),
    website: normalize(input.website, 120)
  };

  if (!payload.name) {
    throw httpError(400, 'Name is required');
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    throw httpError(400, 'A valid email is required');
  }

  return payload;
}

function normalize(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendInquiryEmail(payload) {
  const subject = `New inquiry from ${payload.name}`;
  const html = `
    <div style="font-family:Georgia, serif; color:#1d1a17; line-height:1.6;">
      <h1 style="font-size:24px; margin-bottom:16px;">New website inquiry</h1>
      <p>A new inquiry was submitted through andreapalacio.art.</p>
      <table style="width:100%; border-collapse:collapse; margin-top:24px;">
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e6ddd3; width:140px;"><strong>Name</strong></td>
          <td style="padding:10px 0; border-bottom:1px solid #e6ddd3;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e6ddd3;"><strong>Email</strong></td>
          <td style="padding:10px 0; border-bottom:1px solid #e6ddd3;">${escapeHtml(payload.email)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #e6ddd3;"><strong>Phone</strong></td>
          <td style="padding:10px 0; border-bottom:1px solid #e6ddd3;">${escapeHtml(payload.phone || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; vertical-align:top;"><strong>Project details</strong></td>
          <td style="padding:10px 0;">${formatMultiline(payload.details || 'No project details provided.')}</td>
        </tr>
      </table>
    </div>
  `;

  const text = [
    'New website inquiry',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    '',
    'Project details:',
    payload.details || 'No project details provided.'
  ].join('\n');

  await sendResendEmail({
    to: INQUIRY_TO_EMAIL,
    subject,
    html,
    text,
    replyTo: payload.email
  });
}

async function sendAutoReply(payload) {
  const html = `
    <div style="font-family:Georgia, serif; color:#1d1a17; line-height:1.7;">
      <p>Hi ${escapeHtml(payload.name)},</p>
      <p>Thank you for reaching out. Your inquiry came through successfully, and Andrea will review it and respond within 24 hours.</p>
      <p>If your project has a specific timeline, launch date, or preferred shoot window, feel free to reply to this email with any added details.</p>
      <p>Warmly,<br>Andrea Palacio Studio</p>
    </div>
  `;

  const text = [
    `Hi ${payload.name},`,
    '',
    'Thank you for reaching out. Your inquiry came through successfully, and Andrea will review it and respond within 24 hours.',
    'If your project has a specific timeline, launch date, or preferred shoot window, feel free to reply to this email with any added details.',
    '',
    'Warmly,',
    'Andrea Palacio Studio'
  ].join('\n');

  await sendResendEmail({
    to: payload.email,
    subject: 'Your inquiry was received',
    html,
    text,
    replyTo: INQUIRY_TO_EMAIL
  });
}

async function sendResendEmail({ to, subject, html, text, replyTo }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: INQUIRY_FROM_EMAIL,
      to: [to],
      subject,
      html,
      text,
      reply_to: replyTo || undefined
    })
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw httpError(502, `Resend request failed: ${errorBody || response.statusText}`);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatMultiline(value) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
