import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), wasm()],
    base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/edu_web_3D/' : '/'),
    build: {
        target: 'ES2022'
    }
})
