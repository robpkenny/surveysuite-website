import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Demo videos are hosted on YouTube (see src/content/videos.ts), never in this repo.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
