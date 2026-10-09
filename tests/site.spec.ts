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
      const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => i.checkVisibility() && (!i.complete || i.naturalWidth === 0)).map((i) => i.src));
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
      const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => i.checkVisibility() && (!i.complete || i.naturalWidth === 0)).map((i) => i.src));
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
  const isNarrow = (page: Page) => (page.viewportSize()?.width ?? 1366) < 1100;

  test('el menú «Productos» permite llegar a cualquier ficha', async ({ page }) => {
    await page.goto('/');
    if (isNarrow(page)) {
      const menuBtn = page.getByRole('button', { name: 'Menú' });
      await menuBtn.click();
      await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    }
    const productos = page.getByRole('button', { name: 'Productos' });
    await productos.click();
    await expect(productos).toHaveAttribute('aria-expanded', 'true');
    const mega = page.locator('#mega');
    await expect(mega.getByRole('link', { name: 'Muro cortina' })).toBeVisible();
    // 3 categorías + 15 fichas (+ accesos de presupuesto en escritorio)
    expect(await mega.getByRole('link').count()).toBeGreaterThanOrEqual(18);
    await mega.getByRole('link', { name: 'Muro cortina' }).click();
    await expect(page).toHaveURL(/\/sistemas-aluminio\/muro-cortina\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muro cortina');
  });

  test('mega menú en escritorio: hover, clic, teclado y Escape', async ({ page }) => {
    test.skip(isNarrow(page), 'Solo escritorio');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
    const productos = page.getByRole('button', { name: 'Productos' });
    await productos.hover();
    await expect(productos).toHaveAttribute('aria-expanded', 'true');
    // Un clic justo después del hover no debe cerrarlo
    await productos.click();
    await expect(productos).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.move(10, 700);
    await expect(productos).toHaveAttribute('aria-expanded', 'false');

    await productos.focus();
    await page.keyboard.press('Enter');
    await expect(productos).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(page.locator('#mega a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(productos).toHaveAttribute('aria-expanded', 'false');
    await expect(productos).toBeFocused();
  });

  test('menú móvil: se abre, se cierra con Escape y con el fondo', async ({ page }) => {
    test.skip(!isNarrow(page), 'Solo móvil y tableta');
    await page.goto('/empresa/');
    const menuBtn = page.getByRole('button', { name: 'Menú' });
    await menuBtn.click();
    await expect(page.locator('#menu-principal')).toBeVisible();
    await expect(page.locator('#menu-principal').getByRole('link', { name: 'Consejos' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(menuBtn).toBeFocused();
    await menuBtn.click();
    await page.locator('[data-scrim]').click({ position: { x: 5, y: 300 }, force: true });
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('las migas de pan y el índice de la ficha llevan a la categoría', async ({ page }) => {
    await page.goto('/otros-productos/estores/');
    await page.getByRole('navigation', { name: 'Migas de pan' }).getByRole('link', { name: 'Otros productos' }).click();
    await expect(page).toHaveURL(/\/otros-productos\/$/);
    await expect(page.getByRole('navigation', { name: 'Categorías del catálogo' }).getByRole('link', { name: /Otros productos/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('ficha: anterior/siguiente e índice con sección activa', async ({ page }) => {
    await page.goto('/sistemas-aluminio/abatibles/');
    const toc = page.getByRole('navigation', { name: 'En esta ficha' });
    await toc.getByRole('link', { name: 'Documentación' }).click();
    await expect(page).toHaveURL(/#documentacion$/);
    await expect(toc.getByRole('link', { name: 'Documentación' })).toHaveAttribute('aria-current', 'true');
    const pager = page.getByRole('navigation', { name: /Otras fichas/ });
    await pager.getByRole('link', { name: /Siguiente/ }).click();
    await expect(page).toHaveURL(/\/sistemas-aluminio\/correderas\/$/);
  });
});

test.describe('Movimiento y accesibilidad', () => {
  test('los bloques animados aparecen al hacer scroll', async ({ page }) => {
    await page.goto('/');
    const steps = page.locator('.step').last();
    await steps.scrollIntoViewIfNeeded();
    await expect(steps).toHaveClass(/is-in/);
    await expect(steps).toHaveCSS('opacity', '1', { timeout: 3000 });
  });

  test('con movimiento reducido todo el contenido es visible sin desplazarse', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(new URL('/', test.info().project.use.baseURL).href);
    const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    expect(hidden).toBe(0);
    await ctx.close();
  });

  test('sin JavaScript el contenido sigue visible y navegable', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(new URL('/sistemas-aluminio/', test.info().project.use.baseURL).href);
    const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    expect(hidden).toBe(0);
    await expect(page.getByRole('heading', { level: 2, name: 'Muro cortina' })).toBeVisible();
    await ctx.close();
  });

  test('barra de contacto móvil: aparece al desplazarse y se oculta junto al formulario', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1366) >= 768, 'Solo móvil');
    await page.goto('/');
    const bar = page.getByRole('region', { name: 'Contacto rápido' });
    await expect(bar).toBeHidden();
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: 'Llamar' })).toHaveAttribute('href', 'tel:+34913038775');
    await page.goto('/contacto/#presupuesto');
    await page.locator('#presupuesto').scrollIntoViewIfNeeded();
    await expect(bar).toBeHidden();
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
    if (!REAL_BACKEND) await expect(page.locator('[data-submit]')).toHaveAttribute('aria-busy', 'true');
    const ok = page.getByRole('status').filter({ hasText: 'Solicitud enviada' });
    await expect(ok).toBeVisible({ timeout: 10_000 });
    await expect(ok).toBeFocused();
  });
});

test.describe('Contenido v3', () => {
  test('portada: imagen principal prioritaria y datos técnicos con su serie', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.hero__media img');
    await expect(hero).toHaveAttribute('fetchpriority', 'high');
    await expect(hero).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.hero__credit')).toContainText('Imagen ilustrativa');
    // Las cifras técnicas solo aparecen junto a la serie a la que se refieren
    await expect(page.locator('.hero')).not.toContainText('62 mm');
    const facts = page.locator('.tech__facts');
    await expect(facts).toContainText('Q87C16');
    await expect(facts).toContainText('Q120');
    await expect(page.locator('main')).not.toContainText(/\d{2}\s?% de ahorro/);
  });

  test('catálogo de la portada: 1 tarjeta principal y 2 secundarias, enlazadas', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.bento .tile')).toHaveCount(3);
    await expect(page.locator('.bento .tile--lg')).toHaveCount(1);
    await page.locator('.bento .tile').nth(1).locator('.tile__title a').click();
    await expect(page).toHaveURL(/\/materiales-adicionales\/$/);
  });

  test('tabla de series legible: todas las columnas y sin desbordar a 375 px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/sistemas-aluminio/abatibles/');
    const table = page.locator('.series table');
    await expect(table.locator('thead th')).toHaveCount(5);
    await expect(page.locator('.series figcaption')).toContainText('rotura de puente térmico');
    const [sw, cw] = await page.locator('.series__scroll').evaluate((e) => [e.scrollWidth, e.clientWidth]);
    expect(sw).toBeLessThanOrEqual(cw);
  });

  test('formulario: «teléfono o correo» marca ambos campos y se corrige con uno', async ({ page }) => {
    await page.goto('/contacto/');
    await page.locator('[data-submit]').click();
    await expect(page.locator('#f-telefono')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid', 'true');
    await page.locator('#f-email').fill('ana@ejemplo.es');
    await page.locator('#f-mensaje').focus();
    await expect(page.locator('#f-telefono')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.locator('#e-telefono')).toBeEmpty();
  });

  test('documentación: PDF del fabricante en pestaña nueva', async ({ page }) => {
    await page.goto('/sistemas-aluminio/elevables/');
    const doc = page.locator('.docs a').first();
    await expect(doc).toHaveAttribute('href', /^\/archivos\/.+\.pdf$/);
    await expect(doc).toHaveAttribute('target', '_blank');
    await expect(doc).toHaveAttribute('rel', /noopener/);
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
