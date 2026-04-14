<?php

require 'vendor/autoload.php';

use GeoIp2\Database\Reader;

// Get IP (query param or fallback)
$ip = $_GET['ip'] ?? $_SERVER['REMOTE_ADDR'];

try {
    $reader = new Reader(__DIR__ . '/GeoLite2-City.mmdb');
    $record = $reader->city($ip);

    $response = [
        "ip" => $ip,
        "country" => $record->country->name,
        "country_code" => $record->country->isoCode,
        "region" => $record->mostSpecificSubdivision->name,
        "city" => $record->city->name,
        "lat" => $record->location->latitude,
        "lon" => $record->location->longitude,
        "timezone" => $record->location->timeZone,
    ];

} catch (Exception $e) {
    $response = [
        "error" => "Invalid IP or lookup failed"
    ];
}

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);