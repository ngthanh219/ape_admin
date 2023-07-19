<?php

namespace App\Services;

use App\Libraries\Message;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;

class NotificationService extends BaseService
{
    const END_POINT_GET = 'admin/notification';

    public function __construct() {
    }

    public function getNotificationData($request)
    {
        $notificationData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET, $request->all());

        if (!$notificationData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        $notification = $notificationData->json();
        if ($notification['success'] == 1) {
            foreach ($notification['data']['data'] as $key => $item) {
                $notification['data']['data'][$key]['start_time'] =
                    $this->setTimeZoneUTC($notification['data']['data'][$key]['start_time'],
                        'UTC', 'Asia/Ho_Chi_Minh');
                $notification['data']['data'][$key]['finish_time'] =
                    $this->setTimeZoneUTC($notification['data']['data'][$key]['finish_time'],
                        'UTC', 'Asia/Ho_Chi_Minh');
            }
        }

        $systemConfig = $this->getSystemConfig();
        if ($systemConfig['success'] == 0 || !count($systemConfig['data']['data'])) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR_SYSTEM_CONFIG
                ]
            ]);
        }
        $notification['data']['type_message'] = $systemConfig['data']['data'][0]['value'];

        return $notification;
    }

    public function storeNotificationData($request)
    {
        $params = $request->all();

        if ($this->validationDataMaintenance($params))
            return [
                'success' => 0,
                'error' => [
                    'error_message' => Message::VALIDATION_ERROR
                ]
            ];

        $params = $this->convertTimeZoneParams($params, 'Asia/Ho_Chi_Minh', 'UTC');

        $notificationData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$notificationData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $notificationData->json();
    }

    public function setTimeZoneUTC($time, $timeZoneFrom, $timeZoneTo)
    {
        $time = new Carbon($time, $timeZoneFrom);
        return $time->setTimezone($timeZoneTo)->format('Y-m-d H:i:s');
    }

    public function convertTimeZoneParams($params, $timeZoneFrom, $timeZoneTo)
    {
        $params['status'] = isset($params['status']) ? 1:0;
        $params['start_time'] = $this->setTimeZoneUTC($params['start_time'], $timeZoneFrom, $timeZoneTo);
        $params['finish_time'] = $this->setTimeZoneUTC($params['finish_time'], $timeZoneFrom, $timeZoneTo);

        if ($params['data']) {
            $params['data'] = json_decode($params['data'], true);
            if (isset($params['data']['start_time']))
                $params['data']['start_time'] = $this->setTimeZoneUTC($params['data']['start_time'], $timeZoneFrom, $timeZoneTo);
            if (isset($params['data']['finish_time']))
                $params['data']['finish_time'] = $this->setTimeZoneUTC($params['data']['finish_time'], $timeZoneFrom, $timeZoneTo);

            $params['data'] = json_encode($params['data']);
        }

        return $params;
    }

    public function showNotificationData($id)
    {
        $notificationData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$notificationData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $notificationData->json();
    }

    public function updateNotificationData($request, $id)
    {
        $params = $request->all();

        if ($this->validationDataMaintenance($params))
            return [
                'success' => 0,
                'error' => [
                    'error_message' => Message::VALIDATION_ERROR
                ]
            ];

        $params = $this->convertTimeZoneParams($params, 'Asia/Ho_Chi_Minh', 'UTC');

        $notificationData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT_GET . '/' . $id, $params);

        if (!$notificationData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $notificationData->json();
    }

    public function deleteNotificationData($id)
    {
        $notificationData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->delete(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$notificationData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $notificationData->json();
    }

    public function getSystemConfig() {
        $param = [
            'limit' => 15,
            'offset' => 1,
            'key' => 'type_message'
        ];

        $systemConfig = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . "admin/system-config-data", $param);

        if (!$systemConfig->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $systemConfig->json();
    }

    public function validationDataMaintenance($params) {
        if ($params['type'] == 0 && $params['data']) {
            $params['data'] = json_decode($params['data'], true);
            if (!isset($params['data']['start_time']) || !isset($params['data']['finish_time']))
                return true;
        }
        return false;
    }

}
