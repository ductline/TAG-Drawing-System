const http = require('http');
const https = require('https');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // CORS headers — allow your GitHub Pages domain or * for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return;
  }

  if (req.method === 'POST' && req.url === '/api/messages') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(body)
        }
      };

      const proxy = https.request(options, upstream => {
        res.writeHead(upstream.statusCode, { 'Content-Type': 'application/json' });
        upstream.pipe(res);
      });

      proxy.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { message: err.message } }));
      });

      proxy.write(body);
      proxy.end();
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Ductline proxy running on http://localhost:${PORT}`);
  console.log(`API key: ${ANTHROPIC_API_KEY ? 'SET ✓' : 'NOT SET ✗ — set ANTHROPIC_API_KEY env var'}`);
});
