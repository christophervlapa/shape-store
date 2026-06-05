const http = require('node:http');
const path = require('node:path');
const PORT = 3000;
const allowedOrigins = ['http://localhost:5173'];

const fs = require('node:fs');
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.includes(req.headers.origin) ? req.headers.origin : '');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle the data endpoint
  if (req.method === 'GET' && req.url === '/api/data') {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to read file' }));
        return;
      }
      console.log('DATA SENT');
      res.writeHead(200);
      res.end(data);
    });
    return; // Important: exit early
  }

  // Handle all other routes
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`[*] HTTP server running at http://localhost:${PORT}`);
});