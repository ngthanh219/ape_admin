<?php

namespace App\Services;

use App\Imports\SystemConfigImport;
use App\Libraries\Message;
use Illuminate\Support\Facades\Http;
use Maatwebsite\Excel\Facades\Excel;

class SystemConfigService extends BaseService
{
    const END_POINT_GET = 'admin/system-config-data';
    
    public function __construct(

    ) {

    }
    
    public function getSystemConfigData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return response()->json($systemConfigData->json());
    }

    public function storeSystemConfigData($request)
    {
        $params['key'] = $request->key;
        $params['value'] = $request->value;

        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemConfigData->json();
    }

    public function showSystemConfigData($id)
    {
        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemConfigData->json();
    }

    public function updateSystemConfigData($request, $id)
    {
        $params['key'] = $request->key;
        $params['value'] = $request->value;

        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT_GET . '/' . $id, $params);

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemConfigData->json();
    }

    public function deleteSystemConfigData($id)
    {
        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->delete(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemConfigData->json();
    }

    public function getAllSystemConfigs()
    {
        $systemConfigData = Http::post(config('admin.ape_url') . 'system-configs');

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemConfigData->json();
    }

    public function importData($data)
    {
        $params['data'] = $data;

        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT_GET . '-import', $params);

        if (!$systemConfigData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        
        return $systemConfigData->json();
    }
}