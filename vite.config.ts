import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-routes',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/')) {
            const apiPath = path.join(
              __dirname,
              'src',
              req.url + '.js'
            );

            if (fs.existsSync(apiPath)) {
              try {
                const module = await import(apiPath + '?t=' + Date.now());
                const handler = module[req.method as keyof typeof module];

                if (handler) {
                  const chunks: Buffer[] = [];
                  await new Promise((resolve) => {
                    req.on('data', chunk => chunks.push(chunk));
                    req.on('end', resolve);
                  });
                  const bodyBuffer = Buffer.concat(chunks);
                  const request = new Request('http://localhost' + req.url, {
                    method: req.method,
                    headers: req.headers as any,
                    body: bodyBuffer.toString()
                  });
                  const response = await handler(request);
                  const body = await response.text();
                  res.statusCode = response.status;
                  response.headers.forEach((value: string, key: string) => {
                    res.setHeader(key, value);
                  });
                  res.end(body);
                  return;
                }
              } catch (error) {
                console.error('API Route error:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
              }
            }
          }
          next();
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
