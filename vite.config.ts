// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace YOUR_USERNAME and YOUR_REPO
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/yadnyesh2906/react-app/', // This should match your GitHub repo name
})