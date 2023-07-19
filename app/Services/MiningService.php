<?php

namespace App\Services;

use App\Libraries\Message;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class MiningService extends BaseService
{
    const END_POINT_GET = 'admin/';

    public function __construct() {
    }

    public function getMiningData($request)
    {
        $miningData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET . 'list-mining', $request->all());

        if (!$miningData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($miningData->json());
    }
}
