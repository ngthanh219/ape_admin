<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class UserService extends BaseService
{
    const END_POINT = 'admin/user-data';
    const END_POINT_ANONYMOS = 'admin/anonymos-user-data';

    public function __construct(

    ) {

    }

    public function getUserData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        if (isset($data['user_information'])) {
            $params['user_information'] = $data['user_information'];
        }

        if (isset($data['user_status'])) {
            $params['user_status'] = $data['user_status'];
        }

        if (isset($data['order_by_id'])) {
            $params['order_by_id'] = $data['order_by_id'];
        }

        if (isset($data['order_by_bape_coin'])) {
            $params['order_by_bape_coin'] = $data['order_by_bape_coin'];
        }

        if (isset($data['order_by_ape_coin'])) {
            $params['order_by_ape_coin'] = $data['order_by_ape_coin'];
        }

        if (isset($data['order_by_current_coin'])) {
            $params['order_by_current_coin'] = $data['order_by_current_coin'];
        }

        $userData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT, $params);

        if (!$userData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($userData->json());
    }

    public function updateUserStatus($request, $id)
    {
        $params['status'] = $request->status;

        $userData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT . '/' . $id, $params);

        if (!$userData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $userData->json();
    }

    public function getAnonymosUserData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        if (isset($data['user_information'])) {
            $params['user_information'] = $data['user_information'];
        }

        if (isset($data['user_status'])) {
            $params['user_status'] = $data['user_status'];
        }

        if (isset($data['order_by_id'])) {
            $params['order_by_id'] = $data['order_by_id'];
        }

        $userData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_ANONYMOS, $params);

        if (!$userData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($userData->json());
    }

    public function updateAnonymosUserStatus($request, $id)
    {
        $params['status'] = $request->status;

        $userData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT_ANONYMOS . '/' . $id, $params);

        if (!$userData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $userData->json();
    }

}
