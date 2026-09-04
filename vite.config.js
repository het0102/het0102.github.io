import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      'react-reveal/Fade': path.resolve(__dirname, 'src/components/common/Reveal.jsx'),
      'react-reveal/Tada': path.resolve(__dirname, 'src/components/common/Reveal.jsx'),
      'react-reveal/Zoom': path.resolve(__dirname, 'src/components/common/Reveal.jsx'),
      'react-reveal/Bounce': path.resolve(__dirname, 'src/components/common/Reveal.jsx'),
      'react-reveal': path.resolve(__dirname, 'src/components/common/Reveal.jsx'),
      'animated-number-react': path.resolve(__dirname, 'src/components/common/AnimatedNumber.jsx'),
      'react-scroll': path.resolve(__dirname, 'src/components/common/ScrollHelper.jsx'),
      'typewriter-effect': path.resolve(__dirname, 'src/components/common/Typewriter.jsx'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 2500,
  },
});
