<?php
function getUserIP() {
    // Check if using Cloudflare
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return $_SERVER['HTTP_CF_CONNECTING_IP'];
    }

    // Check for shared internet / proxies
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // X-Forwarded-For can contain multiple IPs, take the first one
        $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ipList[0]);
    }

    // Default fallback
    return $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
}

header('Content-Type: application/json');

echo json_encode([
    'ip' => getUserIP()
]);