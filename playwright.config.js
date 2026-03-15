const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/regression',
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: false,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    channel: 'chrome',
    serviceWorkers: 'block',
    viewport: { width: 1440, height: 1200 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4173/index.html',
    cwd: __dirname,
    reuseExistingServer: true,
    timeout: 30_000
  }
});
