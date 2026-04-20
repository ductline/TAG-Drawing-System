# Ductline Manufacturing — TAG Drawing System

Internal HVAC Tag & BOM Generator for Ductline Manufacturing.

---

## Quick Start (Local)

### 1. Install Node.js
Download from [nodejs.org](https://nodejs.org) if not already installed.

### 2. Start the proxy server
The proxy is required — browsers block direct calls to the Anthropic API (CORS restriction).

```bash
# Mac / Linux
ANTHROPIC_API_KEY=sk-ant-your-key-here node proxy.js

# Windows
set ANTHROPIC_API_KEY=sk-ant-your-key-here
node proxy.js
```

You should see:
```
Ductline proxy running on http://localhost:3000
API key: SET ✓
```

### 3. Open the app
Open `index.html` in your browser. Done.

---

## Deploying (GitHub Pages + Cloud Proxy)

### Step 1 — Deploy the proxy to Render.com (free)
1. Push repo to GitHub
2. [render.com](https://render.com) → New Web Service → connect repo
3. Start command: `node proxy.js`
4. Add env var: `ANTHROPIC_API_KEY` = your key
5. Copy your deployed URL e.g. `https://ductline-proxy.onrender.com`

### Step 2 — Update PROXY_URL in index.html
```js
const PROXY_URL = 'https://ductline-proxy.onrender.com/api/messages';
```

### Step 3 — Enable GitHub Pages
Settings → Pages → Source: main branch / root

---

## Configuration

| Setting | Where | Default |
|---|---|---|
| Team password | `index.html` → `TEAM_PASSWORD` | `ductline2024` |
| Proxy URL | `index.html` → `PROXY_URL` | `http://localhost:3000/api/messages` |
| API key | env var `ANTHROPIC_API_KEY` | — |

---

Internal use only — Ductline Manufacturing
