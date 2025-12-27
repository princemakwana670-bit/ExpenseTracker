import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ensures correct routing
  build: {
    outDir: 'dist', // default, matches your Render publish directory
  },
})
