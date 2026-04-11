# Deployment

This project can be deployed with the same pattern you already use on your self-hosted GitHub Actions runner:

1. Pull latest code
2. Build Docker images
3. Recreate containers
4. Run a localhost health check

## Files added

- `.github/workflows/deploy.yml`
- `docker-compose.yml`
- `Dockerfile.web`
- `Dockerfile.api`
- `deploy/nginx/default.conf`
- `.env.production.example`

## Architecture

- `web`: Nginx container serving the built Vite site
- `api`: lightweight Node container running `server/index.js`
- Nginx inside the `web` container proxies `/api/*` to the `api` container

The public site is exposed on `localhost:3001` by default, matching the style of your current deployment flow.

## Server setup

Clone the repo to:

```bash
~/Documents/Projects/AndreaPalacioPhoto
```

Create a production env file:

```bash
cp .env.production.example .env.production
```

Then fill in:

- `RESEND_API_KEY`
- `INQUIRY_TO_EMAIL`
- `INQUIRY_FROM_EMAIL`

## GitHub Actions

The workflow in `.github/workflows/deploy.yml` assumes:

- branch: `main`
- self-hosted runner available on the server
- repo path: `~/Documents/Projects/AndreaPalacioPhoto`
- public port: `3001`

If your path is different, update:

```yaml
APP_DIR=~/Documents/Projects/AndreaPalacioPhoto
```

If you want a different port, update:

```yaml
WEB_PORT=3001
```

and set the same value in `.env.production`.

## Manual first deploy

Run once on the server:

```bash
cd ~/Documents/Projects/AndreaPalacioPhoto
cp .env.production.example .env.production
docker compose build
docker compose up -d
curl -sf http://localhost:3001/api/health
```

## Reverse proxy

If you already use host-level Nginx, point your domain to:

```nginx
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Notes

- The health check targets `/api/health` so both the web container and inquiry API are validated.
- The API rate limiter is currently in-memory, which is fine for a single-instance deploy like this.
- If you later move behind Cloudflare, I’d recommend adding Turnstile as the next anti-spam layer.
