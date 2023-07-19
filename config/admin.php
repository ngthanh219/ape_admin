<?php

$apeURL = env("DEV_APE_URL");

if (env("ENVIRONMENT") == "product") {
    $apeURL = env("APE_URL"); 
}

return [
    "environment" => env("ENVIRONMENT"),
    "ape_url" => $apeURL
];