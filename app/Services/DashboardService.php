<?php

namespace App\Services;

use App\Libraries\Message;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class DashboardService extends BaseService
{
    const END_POINT = 'admin/dashboard';

    public function __construct(

    ) {

    }

    public function getDashboardTotalData()
    {
        $dashboardData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '-total');

        if (!$dashboardData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($dashboardData->json());
    }

    public function getEarnedDashboardData($request)
    {
        $params = [];

        if ($request->type_search_date) {
            $params['finish_time'] = new Carbon($request->finish_time);
            $params['start_time'] = new Carbon($request->start_time);
            $params['finish_time'] =  $params['finish_time']->format('Y-m-d');
            $params['start_time'] =  $params['start_time']->format('Y-m-d');
        } else {
            $params['finish_time'] = now()->format('Y-m-d');
            $params['start_time'] = now()->subDays(30)->format('Y-m-d');
        }

        $dashboardData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '-earned', $params);

        if (!$dashboardData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($dashboardData->json());
    }

    public function getGearDashboardData($request)
    {
        $dashboardData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '-gear', $request->all());

        if (!$dashboardData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($dashboardData->json());
    }

    public function getTrackingBurnDashboardData($request)
    {
        $params = [];
        $params['finish_time'] = now()->format('Y-m-d');
        $params['start_time'] = now()->subDays(30)->format('Y-m-d');

        if ($request->start_time) {
            $params['start_time'] = $request->start_time;
        }

        if ($request->finish_time) {
            $params['finish_time'] = $request->finish_time;
        }

        $dashboardData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '-tracking-burn', $params);

        if (!$dashboardData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($dashboardData->json());
    }
}
