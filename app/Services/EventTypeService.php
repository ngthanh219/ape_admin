<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class EventTypeService extends BaseService
{
    const END_POINT_GET = 'admin/event-type-data';

    public function __construct() {
    }

    public function getEventTypeData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        $eventTypeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$eventTypeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($eventTypeData->json());
    }

    public function storeEventTypeData($request)
    {
        $params = $request->all();

        $eventTypeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$eventTypeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventTypeData->json();
    }

    public function showEventTypeData($id)
    {
        $eventTypeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$eventTypeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventTypeData->json();
    }

    public function updateEventTypeData($request, $id)
    {
        $params = $request->all();

        $eventTypeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT_GET . '/' . $id, $params);

        if (!$eventTypeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventTypeData->json();
    }

    public function deleteEventTypeData($id)
    {
        $eventTypeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->delete(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$eventTypeData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventTypeData->json();
    }
}
