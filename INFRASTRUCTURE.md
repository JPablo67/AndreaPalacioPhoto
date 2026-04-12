# Infrastructure & Deployment Setup

This document details the production infrastructure, deployment pipeline, and networking setup for the Andrea Palacio Photography platform.

## 1. Architecture Overview
- **Hosting:** Ubuntu Server (Local/Self-Hosted)
- **Containerization:** Docker & Docker Compose
- **Networking:** Cloudflare Tunnels (`cloudflared`) - no open inbound ports required.
- **CI/CD:** GitHub Actions via a Self-Hosted Runner.

---

## 2. Docker & Application Ports
The application is orchestrated via `docker-compose.yml` and consists of two main services:
- **`web`**: Nginx serving the static Vite frontend.
- **`api`**: Node.js backend.

### **Production Environment (`.env.production`)**
The application requires an environment file on the Ubuntu Server located at `~/Documents/Projects/AndreaPalacioPhoto/.env.production`.
Essential configuration:
```env
WEB_PORT=3003
PORT=8787
# ... (email and other API keys)
```
**Important:** The web container is explicitly bound to `localhost:3003` to avoid conflicts with other existing services on the Ubuntu Server (like Grafana on 3002).

---

## 3. Cloudflare Tunnel setup (`cloudflared`)
Traffic is routed securely to the server using Cloudflare Tunnels. 

### **Tunnel Configuration**
On the Ubuntu Server, the `cloudflared` configuration is located at `/etc/cloudflared/config.yml`. It intercepts traffic for specific hostnames and forwards it to the local Docker ports.

```yaml
tunnel: 89b3beb5-c66e-4094-b92f-4a288cd92c27
credentials-file: /etc/cloudflared/89b3beb5-c66e-4094-b92f-4a288cd92c27.json

ingress:
  - hostname: andreapalacio.art
    service: http://localhost:3003
  
  - hostname: www.andreapalacio.art
    service: http://localhost:3003

  # ... other services (e.g., grafana)
  - service: http_status:404
```
*Note: Any time this configuration changes, you must run `sudo systemctl restart cloudflared`.*

### **DNS Configuration**
In the Cloudflare Dashboard, the following DNS records are set up to map the domain to the tunnel:
- **Type:** `CNAME`
- **Name:** `@` (and `www`)
- **Target:** `89b3beb5-c66e-4094-b92f-4a288cd92c27.cfargotunnel.com`
- **Proxy status:** Proxied (Orange Cloud)

---

## 4. CI/CD: GitHub Actions (Self-Hosted Runner)
Deployments are fully automated. When code is pushed to the `main` branch, a GitHub Action triggers a build.

### **Runner Setup on Ubuntu Server**
Because the server handles the builds, a dedicated runner is installed in `~/actions-runner-andrea`. 
To set up a runner initially:
1. Generate the token from GitHub `Settings > Actions > Runners > New self-hosted runner`.
2. Download and configure the runner in the server's terminal:
   ```bash
   mkdir -p ~/actions-runner-andrea && cd ~/actions-runner-andrea
   # (Download the archive via curl as provided by GitHub)
   tar xzf ./actions-runner-linux-x64-*.tar.gz
   ./config.sh --url https://github.com/JPablo67/AndreaPalacioPhoto --token <YOUR_TOKEN>
   ```
3. Install and run as a background service so it persists across reboots:
   ```bash
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```

### **Deployment Workflow (`.github/workflows/deploy.yml`)**
The predefined Github Action performs the following steps:
1. Navigates to `~/Documents/Projects/AndreaPalacioPhoto`
2. Pulls the latest code from `main`.
3. Re-builds and restarts the Docker containers:
   ```bash
   sudo docker compose --env-file .env.production build
   sudo docker compose --env-file .env.production up -d --force-recreate --no-build
   ```
4. Cleans up old dangling Docker images to save space.
