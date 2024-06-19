import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', './vitest-environment-prisma/prisma.ts'],
    ],
    dir: 'src', // Essa linha
  },
})
