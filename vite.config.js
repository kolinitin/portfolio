import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, join } from 'path';
import fs from 'fs';

function contentSyncPlugin() {
  const syncContent = () => {
    const rootContentDir = resolve(__dirname, 'content');
    const publicContentDir = resolve(__dirname, 'public/content');
    if (fs.existsSync(rootContentDir)) {
      if (!fs.existsSync(publicContentDir)) {
        fs.mkdirSync(publicContentDir, { recursive: true });
      }
      const files = fs.readdirSync(rootContentDir);
      for (const file of files) {
        const srcPath = join(rootContentDir, file);
        const destPath = join(publicContentDir, file);
        if (fs.statSync(srcPath).isFile()) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  };

  return {
    name: 'content-sync-plugin',
    buildStart() {
      syncContent();
    },
    configureServer(server) {
      syncContent();

      // Intercept /content/ requests in dev mode to serve directly from root content/ directory
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        const url = rawUrl.split('?')[0];
        if (url.startsWith('/content/')) {
          const fileName = url.replace('/content/', '');
          const rootFilePath = resolve(__dirname, 'content', fileName);
          if (fs.existsSync(rootFilePath) && fs.statSync(rootFilePath).isFile()) {
            res.setHeader('Content-Type', fileName.endsWith('.json') ? 'application/json' : 'text/plain; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            return res.end(fs.readFileSync(rootFilePath));
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    contentSyncPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        work: resolve(__dirname, 'work.html'),
        caseStudy: resolve(__dirname, 'case-study.html'),
      },
    },
  },
});

