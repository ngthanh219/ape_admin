<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class SystemModeService extends BaseService
{
    const END_POINT_GET = 'admin/system-mode-data';
    
    public function getSystemModeData()
    {
        $systemModeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET);

        if (!$systemModeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return response()->json($systemModeData->json());
    }

    public function updateSystemModeData($request, $id)
    {
        $systemModeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$systemModeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemModeData->json();
    }
}