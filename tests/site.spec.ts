import { test, expect, type Page } from '@playwright/test';

const REAL_BACKEND = process.env.E2E_REAL_BACKEND === '1';

const pages = [
  '/',
  '/sistemas-aluminio/',
  '/sistemas-aluminio/abatibles/',
  '/sistemas-aluminio/muro-cortina/',
  '/materiales-adicionales/',
  '/materiales-adicionales/vidrios-acristalamientos/',
  '/otros-productos/',
  '/otros-productos/cerrajeria/',
  '/empresa/',
  '/consejos/',
  '/consejos/rotura-puente-termico/',
  '/contacto/',
  '/privacidad/',
];

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
};

test.describe('Páginas', () => {
  for (const path of pages) {
    test(`${path} carga sin errores, con un H1 y sin desbordamiento horizontal`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      // Fuerza la carga de imágenes diferidas y comprueba que ninguna falle
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await page.waitForLoadState('networkidle');
      const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
      expect(broken).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test('todas las URL del sitemap responden 200, sin imágenes rotas ni desbordamiento', async ({ page, request }) => {
    test.setTimeout(120_000);
    const xml = await (await request.get('/sitemap-0.xml')).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(urls.length).toBeGreaterThanOrEqual(25);
    const errors = collectErrors(page);
    for (const path of urls) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(200);
      await expect(page.locator('h1'), path).toHaveCount(1);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 20));
        }
      });
      await page.waitForLoadState('networkidle');
      const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
      expect(broken, path).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
    expect(errors).toEqual([]);
  });

  test('una URL inexistente devuelve 404 con página útil', async ({ page }) => {
    const res = await page.goto('/esta-pagina-no-existe/');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('No encontramos');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('Navegación', () => {
  test('el menú permite llegar a todas las fichas', async ({ page, isMobile }, testInfo) => {
    await page.goto('/');
    const narrow = (page.viewportSize()?.width ?? 1366) < 1100;
    if (narrow) {
      const menuBtn = page.getByRole('button', { name: 'Menú' });
      await menuBtn.click();
      await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    }
    const toggle = page.getByRole('button', { name: 'Mostrar sistemas en aluminio' });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#sub-0').getByRole('link', { name: 'Muro cortina' }).click();
    await expect(page).toHaveURL(/\/sistemas-aluminio\/muro-cortina\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muro cortina');
    void isMobile;
    void testInfo;
  });

  test('navegación con teclado: enlace de salto y menú desplegable', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 1100, 'Solo escritorio');
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Saltar al contenido' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#contenido')).toBeFocused();

    const toggle = page.getByRole('button', { name: 'Mostrar materiales adicionales' });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#sub-1').getByRole('link', { name: 'Mosquiteras de aluminio' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('las migas de pan llevan a la categoría', async ({ page }) => {
    await page.goto('/otros-productos/estores/');
    await page.getByRole('navigation', { name: 'Migas de pan' }).getByRole('link', { name: 'Otros productos' }).click();
    await expect(page).toHaveURL(/\/otros-productos\/$/);
  });
});

test.describe('Contacto', () => {
  test('teléfonos y correos son enlaces tel: y mailto:', async ({ page }) => {
    await page.goto('/contacto/');
    await expect(page.getByRole('main').locator('a[href="tel:+34913038775"]').first()).toBeVisible();
    await expect(page.locator('a[href="tel:+34635304043"]').first()).toBeAttached();
    await expect(page.locator('a[href="mailto:info@talleresverjano.com"]').first()).toBeAttached();
    await expect(page.locator('a[href="mailto:clientes@talleresverjano.com"]').first()).toBeAttached();
  });

  test('el mapa solo se carga al pulsar el botón', async ({ page }) => {
    await page.goto('/contacto/');
    await expect(page.locator('iframe')).toHaveCount(0);
    await page.getByRole('button', { name: 'Mostrar mapa' }).click();
    await expect(page.locator('iframe[title^="Mapa"]')).toHaveCount(1);
  });

  test('la ficha preselecciona el producto en el formulario', async ({ page }) => {
    await page.goto('/sistemas-aluminio/correderas/');
    await page.getByRole('complementary').getByRole('link', { name: 'Pedir presupuesto' }).click();
    await expect(page).toHaveURL(/producto=correderas/);
    await expect(page.getByLabel('¿Qué le interesa?')).toHaveValue('correderas');
  });

  test('validación: errores accesibles y sin envío', async ({ page }) => {
    let posted = false;
    await page.route('**/api/contacto.php', (route) => {
      posted = true;
      return route.fulfill({ json: { ok: true } });
    });
    await page.goto('/contacto/');
    await page.getByRole('button', { name: 'Enviar solicitud' }).click();
    const summary = page.getByRole('alert').filter({ hasText: 'Revise los siguientes campos' });
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(page.getByLabel('Nombre')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#e-telefono')).toHaveText('Indique un teléfono o un correo electrónico.');
    await expect(page.locator('#e-privacidad')).toContainText('política de privacidad');
    await page.getByLabel('Correo electrónico').fill('correo-mal');
    await page.getByRole('button', { name: 'Enviar solicitud' }).click();
    await expect(page.locator('#e-email')).toContainText('no parece válido');
    expect(posted).toBe(false);
  });

  const fillValid = async (page: Page) => {
    await page.getByLabel('Nombre').fill('Prueba automática');
    await page.getByLabel('Teléfono').fill('600 000 000');
    await page.getByLabel('Correo electrónico').fill('qa@example.com');
    await page.getByLabel('Cuéntenos qué necesita').fill('Prueba automática del formulario: 2 ventanas correderas.');
    await page.getByLabel(/He leído y acepto/).check();
    // La trampa temporal del servidor rechaza envíos en menos de 3 s
    await page.waitForTimeout(REAL_BACKEND ? 3200 : 0);
  };

  test('error del servidor: no se muestra éxito y se ofrecen alternativas', async ({ page }) => {
    test.skip(REAL_BACKEND, 'Simulado');
    await page.route('**/api/contacto.php', (route) => route.fulfill({ status: 500, json: { ok: false, error: 'Fallo simulado.' } }));
    await page.goto('/contacto/');
    await fillValid(page);
    await page.getByRole('button', { name: 'Enviar solicitud' }).click();
    await expect(page.getByText('No hemos podido enviar su solicitud.')).toBeVisible();
    await expect(page.getByText('Fallo simulado.')).toBeVisible();
    await expect(page.getByText('Solicitud enviada')).toBeHidden();
  });

  test('respuesta no JSON (p. ej. hosting sin PHP): se trata como error', async ({ page }) => {
    test.skip(REAL_BACKEND, 'Simulado');
    await page.route('**/api/contacto.php', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<?php ... ?>' }));
    await page.goto('/contacto/');
    await fillValid(page);
    await page.getByRole('button', { name: 'Enviar solicitud' }).click();
    await expect(page.getByText('No hemos podido enviar su solicitud.')).toBeVisible();
    await expect(page.getByText('Solicitud enviada')).toBeHidden();
  });

  test('envío correcto: estado de envío y confirmación del servidor', async ({ page }) => {
    if (!REAL_BACKEND) {
      await page.route('**/api/contacto.php', async (route) => {
        const body = route.request().postData() ?? '';
        expect(body).toContain('Prueba autom');
        await new Promise((r) => setTimeout(r, 300));
        await route.fulfill({ json: { ok: true } });
      });
    }
    await page.goto('/contacto/');
    await fillValid(page);
    const submit = page.getByRole('button', { name: 'Enviar solicitud' });
    await submit.click();
    const ok = page.getByRole('status').filter({ hasText: 'Solicitud enviada' });
    await expect(ok).toBeVisible({ timeout: 10_000 });
    await expect(ok).toBeFocused();
  });
});

test.describe('SEO', () => {
  test('metadatos básicos y datos estructurados', async ({ page }) => {
    await page.goto('/sistemas-aluminio/elevables/');
    await expect(page).toHaveTitle(/Talleres Verjano$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/sistemas-aluminio\/elevables\/$/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https?:\/\//);
    const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent ?? '{}')['@type']));
    expect(ld).toContain('BreadcrumbList');
  });

  test('las URL antiguas redirigen (solo con Apache real)', async ({ request }) => {
    test.skip(!REAL_BACKEND, 'Requiere Apache con .htaccess');
    const res = await request.get('/01aluminio_sistemas_abatibles.html', { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(res.headers()['location']).toMatch(/\/sistemas-aluminio\/abatibles\/$/);
  });
});
