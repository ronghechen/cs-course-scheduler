/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import TanStackRouterVite from '@tanstack/router-plugin/vite';

// https://github.com/reactjs/react.dev/issues/8353
export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
    babel({
      plugins: ['babel-plugin-react-compiler'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vite-setup.ts',
  },
})
