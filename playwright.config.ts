import { defineConfig, devices } from '@playwright/test';

/**
 * Por defecto se prueba el sitio compilado con `astro preview` y el
 * formulario se simula con page.route().
 * Para probar contra un Apache+PHP real (redirecciones, .htaccess y envío):
 *   BASE_URL=http://localhost:8099 E2E_REAL_BACKEND=1 npx playwright test
 */
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: BASE_URL, trace: 'off' },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 900 } } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
    { name: 'tableta', use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 }, hasTouch: true } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'npx astro preview --port 4321 --ignore-lock', url: BASE_URL, reuseExistingServer: true, timeout: 60_000 },
});
