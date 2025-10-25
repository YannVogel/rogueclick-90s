import { defineConfig } from '@pandacss/dev'
export default defineConfig({
  preflight: true,
  include: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: {
        colors: {
          bg:   { value: '#0b0b12' },
          card: { value: '#141428' },
          text: { value: '#e6e6f0' },
          neon: { value: '#20f7ff' }
        },
        radii: { xl: { value: '16px' } }
      }
    }
  }
})
