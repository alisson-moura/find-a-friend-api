// vitest.config.integration.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/http/**/*.spec.ts'],
    threads: false,
    setupFiles: ['src/helpers/tests/setup.ts']
  }
});
