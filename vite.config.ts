import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    // Ensure environment variables are available in production
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://fuwfnakfiykehjkklqrb.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d2ZuYWtmaXlrZWhqa2tscXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzAzNDAsImV4cCI6MjA3NTg0NjM0MH0.V1grr6bROoWO9XDUERD8hj41aMS0Q7sSMkS2JUHfi2w')
  }
})

