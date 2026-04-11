# Inquiry Form Setup

This project now supports a self-hosted inquiry API that sends emails through Resend.

## What was added

- Frontend form submits to `POST /api/inquiry`
- Honeypot spam field
- In-memory IP rate limiting
- Resend email delivery
- Optional autoresponder
- Vite dev proxy for `/api`

## Requirements

- Node.js 18 or newer on your Ubuntu server
- A Resend account
- A verified sending domain in Resend, ideally `andreapalacio.art`

## Local development

Run these in separate terminals:

```bash
npm run api
npm run dev
```

The Vite dev server proxies `/api/*` to `http://127.0.0.1:8787`.

## Environment variables

Copy `.env.example` values into your server environment or `systemd` unit:

- `PORT`: API port, default `8787`
- `RESEND_API_KEY`: your Resend API key
- `INQUIRY_TO_EMAIL`: where inquiry notifications should arrive
- `INQUIRY_FROM_EMAIL`: sender identity verified in Resend
- `INQUIRY_AUTOREPLY`: `true` to email clients a confirmation
- `RATE_LIMIT_WINDOW_MS`: rate-limit window
- `RATE_LIMIT_MAX`: max submissions per IP during that window

## Ubuntu deployment

### 1. Build the frontend

```bash
npm run build
```

Serve the contents of `dist/` from Nginx.

### 2. Run the API with systemd

Example unit:

```ini
[Unit]
Description=Andrea Palacio Inquiry API
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/andreapalaciophoto
ExecStart=/usr/bin/node /var/www/andreapalaciophoto/server/index.js
Restart=always
RestartSec=5
Environment=PORT=8787
Environment=RESEND_API_KEY=re_xxxxxxxxx
Environment=INQUIRY_TO_EMAIL=hello@andreapalacio.art
Environment=INQUIRY_FROM_EMAIL=Andrea Palacio <inquiries@andreapalacio.art>
Environment=INQUIRY_AUTOREPLY=true

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable andreapalacio-inquiry
sudo systemctl start andreapalacio-inquiry
sudo systemctl status andreapalacio-inquiry
```

### 3. Nginx reverse proxy

Add an API location to your site config:

```nginx
server {
    server_name andreapalacio.art www.andreapalacio.art;

    root /var/www/andreapalaciophoto/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Manual steps you still need to do

1. Create a Resend account.
2. Verify your sending domain in Resend.
3. Choose the inbox that should receive inquiries.
4. Add the environment variables on your Ubuntu server.
5. Start the API service and reload Nginx.

## Quick checks

- Health endpoint: `GET /api/health`
- Production submit endpoint: `POST /api/inquiry`

If you want stronger protection next, the best follow-up is adding Turnstile or hCaptcha on top of the honeypot and rate limiting.
