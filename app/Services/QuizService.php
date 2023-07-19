<?php

namespace App\Services;

use App\Imports\SystemConfigImport;
use App\Libraries\Message;
use Illuminate\Support\Facades\Http;
use Maatwebsite\Excel\Facades\Excel;

class QuizService extends BaseService
{
    public function __construct()
    {
    }

    const END_POINT = 'admin/quiz-banks';

    public function importDataQA($data)
    {
        $params['data'] = $data;

        $systemConfigData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT . '-import', $params);

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
