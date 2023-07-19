<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class EventService extends BaseService
{
    const END_POINT_GET = 'admin/event-data';

    public function __construct() {
    }

    public function getEventData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        $eventData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$eventData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($eventData->json());
    }

    public function storeEventData($request)
    {
        $params = $request->all();

        $eventData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT_GET, $params);

        if (!$eventData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventData->json();
    }

    public function showEventData($id)
    {
        $eventData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$eventData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventData->json();
    }

    public function updateEventData($request, $id)
    {
        $params = $request->all();

        $eventData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT_GET . '/' . $id, $params);

        if (!$eventData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventData->json();
    }

    public function deleteEventData($id)
    {
        $eventData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->delete(config('admin.ape_url') . self::END_POINT_GET . '/' . $id);

        if (!$eventData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $eventData->json();
    }

    public function getListEventTypeData()
    {
        $eventTypeData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . "admin/event-type-data", ["limit" => 50, "offset" => 1]);

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
