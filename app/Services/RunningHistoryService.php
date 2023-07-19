<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class RunningHistoryService extends BaseService
{
    const END_POINT = 'admin/running-history-data';

    public function __construct(

    ) {

    }

    public function getRunningHistoryData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];
        $params['date_from'] = now()->subDays(30)->format('Y-m-d');
        $params['date_to'] = now()->format('Y-m-d');

        if (isset($data['date_from'])) {
            if (!isset($data['date_to'])) {
                $params['date_from'] = $data['date_from'];
            } else {
                $params['date_to'] = $data['date_to'];
                $params['date_from'] = $data['date_from'];
            }
        }

        if (isset($data['user_information'])) {
            $params['user_information'] = $data['user_information'];
        }

        if (isset($data['distance_from'])) {
            if (!isset($data['distance_to'])) {
                $params['distance_from'] = $data['distance_from'];
            } else {
                $params['distance_to'] = $data['distance_to'];
                $params['distance_from'] = $data['distance_from'];
            }
        }

        if (isset($data['order_by_distance'])) {
            $params['order_by_distance'] = $data['order_by_distance'];
        }

        if (isset($data['order_by_time'])) {
            $params['order_by_time'] = $data['order_by_time'];
        }

        if (isset($data['order_by_step'])) {
            $params['order_by_step'] = $data['order_by_step'];
        }

        if (isset($data['order_by_nft_step'])) {
            $params['order_by_nft_step'] = $data['order_by_nft_step'];
        }

        if (isset($data['order_by_earn'])) {
            $params['order_by_earn'] = $data['order_by_earn'];
        }

        if (isset($data['order_by_earn_bape'])) {
            $params['order_by_earn_bape'] = $data['order_by_earn_bape'];
        }

        $runningHistoryData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT, $params);

        if (!$runningHistoryData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }
        $data = $runningHistoryData->json();
        if ($data['data'])
        {
            $data['data']['date_to'] = $params['date_to'];
            $data['data']['date_from'] = $params['date_from'];
        }

        return response()->json($data);
    }

    public function getUserRunningHistoryData($request, $userId)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        if (isset($data['running_history_id'])) {
            $params['running_history_id'] = $data['running_history_id'];
        }

        $runningHistoryData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '/' . $userId, $params);

        if (!$runningHistoryData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($runningHistoryData->json());
    }

    public function getUserRunningHistoryLogData($request, $runningHistoryId)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        $runningHistoryData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '/logs/' . $runningHistoryId, $params);

        if (!$runningHistoryData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($runningHistoryData->json());
    }

    public function deleteRunningHistoryLogsData($request)
    {
        $runningHistoryData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->delete(config('admin.ape_url') . self::END_POINT . '/logs');

        if (!$runningHistoryData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $runningHistoryData->json();
    }
}
