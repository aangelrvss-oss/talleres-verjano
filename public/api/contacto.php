<?php
/**
 * Talleres Verjano — receptor del formulario de presupuesto.
 *
 * Requisitos: PHP 7.4+ con la función mail() configurada en el alojamiento
 * (el alojamiento actual ya ejecuta PHP). Sin dependencias.
 *
 * Configuración (variables de entorno o, si no existen, config.php):
 *   TV_FORM_TO       Buzón que recibe las solicitudes.
 *   TV_FORM_FROM     Remitente técnico del dominio (debe pertenecer al dominio
 *                    para no fallar SPF/DKIM), p. ej. web@talleresverjano.com.
 *   TV_FORM_DRY_RUN  "1" = no envía correo: guarda el mensaje en el registro
 *                    temporal. Solo para pruebas locales.
 *
 * Respuestas:
 *   - Con "Accept: application/json": JSON {ok: bool, error?: string, fields?: {campo: mensaje}}
 *   - Sin JavaScript: redirección 303 a /contacto/enviado/ o página de error.
 */

declare(strict_types=1);

$config = [
    'to' => 'info@talleresverjano.com',
    'from' => 'web@talleresverjano.com',
    'dry_run' => false,
    'max_per_hour' => 5,
];
if (is_file(__DIR__ . '/config.php')) {
    $config = array_merge($config, (array) require __DIR__ . '/config.php');
}
$config['to'] = getenv('TV_FORM_TO') ?: $config['to'];
$config['from'] = getenv('TV_FORM_FROM') ?: $config['from'];
$config['dry_run'] = getenv('TV_FORM_DRY_RUN') === '1' ? true : (bool) $config['dry_run'];

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(bool $ok, int $status, string $error = '', array $fields = []): void
{
    global $wantsJson;
    http_response_code($status);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        $body = ['ok' => $ok];
        if ($error !== '') {
            $body['error'] = $error;
        }
        if ($fields) {
            $body['fields'] = $fields;
        }
        echo json_encode($body, JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($ok) {
        header('Location: /contacto/enviado/', true, 303);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $msg = htmlspecialchars($error ?: 'Revise los datos del formulario.', ENT_QUOTES, 'UTF-8');
    $list = '';
    foreach ($fields as $m) {
        $list .= '<li>' . htmlspecialchars($m, ENT_QUOTES, 'UTF-8') . '</li>';
    }
    echo '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex"><title>No se ha podido enviar | Talleres Verjano</title>'
        . '<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.6;color:#14202e}a{color:#0b4ea2}</style></head><body>'
        . '<h1>No se ha podido enviar su solicitud</h1><p>' . $msg . '</p>' . ($list ? '<ul>' . $list . '</ul>' : '')
        . '<p><a href="/contacto/#presupuesto">Volver al formulario</a> o llámenos al <a href="tel:+34913038775">91 303 87 75</a>.</p></body></html>';
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, 'Método no permitido.');
}

/** Limpia una cadena de una línea (evita inyección de cabeceras). */
function one_line(string $v, int $max): string
{
    $v = trim(preg_replace('/[\r\n\t]+/', ' ', $v) ?? '');
    return mb_substr($v, 0, $max, 'UTF-8');
}

$nombre = one_line((string) ($_POST['nombre'] ?? ''), 100);
$telefono = one_line((string) ($_POST['telefono'] ?? ''), 30);
$email = one_line((string) ($_POST['email'] ?? ''), 150);
$producto = one_line((string) ($_POST['producto'] ?? ''), 60);
$mensaje = trim(mb_substr((string) ($_POST['mensaje'] ?? ''), 0, 3000, 'UTF-8'));
$privacidad = !empty($_POST['privacidad']);
$honeypot = trim((string) ($_POST['web'] ?? ''));
$ts = (int) ($_POST['t'] ?? 0);

// Spam: campo trampa relleno o envío en menos de 3 segundos desde la carga.
// Se responde como éxito para no dar pistas a los bots, pero no se envía nada.
if ($honeypot !== '' || ($ts > 0 && (microtime(true) * 1000 - $ts) < 3000)) {
    respond(true, 200);
}

$fields = [];
if (mb_strlen($nombre, 'UTF-8') < 2) {
    $fields['nombre'] = 'Escriba su nombre.';
}
if ($telefono === '' && $email === '') {
    $fields['telefono'] = 'Indique un teléfono o un correo electrónico.';
}
if ($telefono !== '' && !preg_match('/^[+()\d\s.\-]{9,30}$/', $telefono)) {
    $fields['telefono'] = 'El teléfono no parece válido.';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fields['email'] = 'El correo electrónico no parece válido.';
}
if (mb_strlen($mensaje, 'UTF-8') < 10) {
    $fields['mensaje'] = 'Cuéntenos brevemente qué necesita (mínimo 10 caracteres).';
}
if (!$privacidad) {
    $fields['privacidad'] = 'Debe aceptar la política de privacidad.';
}
if ($fields) {
    respond(false, 422, 'Revise los datos del formulario.', $fields);
}

// Límite básico por IP (archivo en el directorio temporal del servidor).
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|tv-form');
$rateFile = sys_get_temp_dir() . '/tv-form-' . substr($ipHash, 0, 32) . '.json';
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter((array) json_decode((string) file_get_contents($rateFile), true), fn ($t) => is_int($t) && $t > $now - 3600);
}
if (count($hits) >= (int) $config['max_per_hour']) {
    respond(false, 429, 'Ha enviado demasiadas solicitudes. Inténtelo más tarde o llámenos por teléfono.');
}

$lines = [
    'Nueva solicitud desde el formulario de la web',
    '',
    'Nombre:    ' . $nombre,
    'Teléfono:  ' . ($telefono ?: '—'),
    'Email:     ' . ($email ?: '—'),
    'Interés:   ' . ($producto ?: '—'),
    '',
    'Mensaje:',
    $mensaje,
    '',
    '—',
    'Enviado el ' . date('d/m/Y H:i') . ' desde ' . ($_SERVER['HTTP_HOST'] ?? 'la web'),
    'El remitente aceptó la política de privacidad.',
];
$body = implode("\r\n", $lines);
$subject = 'Solicitud de presupuesto web: ' . $nombre;

$headers = [
    'From: Web Talleres Verjano <' . $config['from'] . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
];
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}

if ($config['dry_run']) {
    $log = sys_get_temp_dir() . '/tv-form-dry-run.log';
    $sent = file_put_contents($log, "To: {$config['to']}\r\nSubject: {$subject}\r\n" . implode("\r\n", $headers) . "\r\n\r\n{$body}\r\n\r\n=====\r\n", FILE_APPEND) !== false;
} else {
    $sent = mail($config['to'], mb_encode_mimeheader($subject, 'UTF-8'), $body, implode("\r\n", $headers), '-f' . $config['from']);
}

if (!$sent) {
    error_log('[tv-form] mail() devolvió false');
    respond(false, 500, 'El servidor no ha podido enviar el correo.');
}

$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)));

respond(true, 200);
