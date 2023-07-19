<?php

namespace App\Services;

use App\Libraries\Message;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class PointClaimHistoryService extends BaseService
{
    const END_POINT_GET = 'admin/point-claim';

    public function __construct() {
    }

    public function getPointClaimData($request)
    {
        $pointClaimData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET, $request->all());

        if (!$pointClaimData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($pointClaimData->json());
    }

    public function getPointClaimChartData($request)
    {
        $params = [];
        $params['finish_time'] = now()->format('Y-m-d');
        $params['start_time'] = now()->subDays(30)->format('Y-m-d');
        $params['status'] = $request->status;


        if ($request->start_time) {
            $params['start_time'] = $request->start_time;
        }

        if ($request->finish_time) {
            $params['finish_time'] = $request->finish_time;
        }

        $pointClaimData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET."-chart", $params);

        if (!$pointClaimData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        $data = $pointClaimData->json();
        if ($data['success'] == 0) {
            return response()->json($data);
        }

        $params['start_time'] = new Carbon($params['start_time']);
        $params['finish_time'] = new Carbon($params['finish_time']);
        $dateDiff = date_diff($params['start_time'], $params['finish_time'])->days;
        $chartData = collect($data['data']['chart']);
        $data['data']['start_time'] = $params['start_time']->format('m/d/Y');
        $data['data']['finish_time'] = $params['finish_time']->format('m/d/Y');

        if ($dateDiff > 0) {
            for ($i = 0; $i <= $dateDiff; $i++) {
                $itemApe = $chartData->where('day',$params['start_time']->day)
                    ->where('month', $params['start_time']->month)
                    ->where('point', 'ape')
                    ->first();
                $itemBape = $chartData->where('day', $params['start_time']->day)
                    ->where('month', $params['start_time']->month)
                    ->where('point', 'bape')
                    ->first();
                $data['data']['chart_data'][$i] = (object) [
                    'day' => $params['start_time']->format('m/d'),
                    'total_ape' => $itemApe ? round($itemApe['amount'], 2) : 0,
                    'total_bape' => $itemBape ? round($itemBape['amount'], 2) : 0
                ];

                $params['start_time']->addDay();
            }
        } else {
            for ($i = 1; $i <= 24; $i++) {
                $itemApe = $chartData->where('point', 'ape')->where('hour', $i)->first();
                $itemBape = $chartData->where('point', 'bape')->where('hour', $i)->first();
                $data['data']['chart_data'][$i] = (object) [
                    'hour' => $i,
                    'total_ape' => $itemApe ? round($itemApe['amount'], 2) : 0,
                    'total_bape' => $itemBape ? round($itemBape['amount'], 2) : 0
                ];
            }
        }

        $data['data']['chart_data'] = array_values( $data['data']['chart_data']);
        unset($data['data']['chart']);

        return response()->json($data);
    }
}
