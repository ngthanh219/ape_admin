<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class GearService extends BaseService
{
    const END_POINT = 'admin/gear-data';

    public function __construct(

    ) {

    }

    public function getGearData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        if (isset($data['user_status'])) {
            $params['user_status'] = $data['user_status'];
        }

        if (isset($data['upgrade_flag_event'])) {
            $params['upgrade_flag_event'] = $data['upgrade_flag_event'];
        }

        if (isset($data['order_by_level'])) {
            $params['order_by_level'] = $data['order_by_level'];
        }

        if (isset($data['param_filter']) && isset($data['param_value'])) {
            $params['param_filter'] = $data['param_filter'];
            $params['param_value'] = $data['param_value'];
        }

        if (isset($data['level'])) {
            $params['level'] = $data['level'];
        }

        $gears = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT, $params);

        if (!$gears->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($gears->json());
    }

    public function getGearDetail($id)
    {
        $gear = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '/' . $id);

        if (!$gear->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($gear->json());
    }
}
