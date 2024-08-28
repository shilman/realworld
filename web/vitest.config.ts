import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-vitest/plugin";
import vitePluginNext from 'vite-plugin-storybook-nextjs'

export default defineConfig({
  plugins: [
    storybookTest(),
vitePluginNext()
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: 'chromium',
      provider: 'playwright',
    },
    include: ['**/*.stories.?(m)[jt]s?(x)'],
    setupFiles: ['./.storybook/vitest.setup.ts'],
  },
});