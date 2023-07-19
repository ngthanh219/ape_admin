<?php

namespace App\Services;

use App\Libraries\Message;
use Illuminate\Support\Facades\Http;

class FeedbackService extends BaseService
{
    const END_POINT = 'admin/feedback-data';

    public function __construct(

    ) {

    }

    public function getFeedbackData($request)
    {
        $data = $request->all();
        $params['limit'] = $data['limit'];
        $params['offset'] = $data['offset'];

        if (isset($data['user_information'])) {
            $params['user_information'] = $data['user_information'];
        }

        if (isset($data['status'])) {
            $params['status'] = $data['status'];
        }

        if (isset($data['date_from'])) {
            if (!isset($data['date_to'])) {
                $params['date_from'] = $data['date_from'];
            } else {
                $params['date_to'] = $data['date_to'];
                $params['date_from'] = $data['date_from'];
            }
        }

        $feedbackData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT, $params);

        if (!$feedbackData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return response()->json($feedbackData->json());
    }

    public function showFeedbackData($id)
    {
        $feedbackData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . self::END_POINT . '/' . $id);

        if (!$feedbackData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $feedbackData->json();
    }

    public function replyFeedbackData($request, $id)
    {
        $params['content'] = $request->content;

        $feedbackData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . self::END_POINT . '-reply/' . $id, $params);

        if (!$feedbackData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $feedbackData->json();
    }

    public function updateFeedbackData($request, $id)
    {
        $params['status'] = $request->status;

        $feedbackData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->put(config('admin.ape_url') . self::END_POINT . '/' . $id, $params);

        if (!$feedbackData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $feedbackData->json();
    }

    public function deleteFeedbackData($request, $id)
    {
        $feedbackData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->delete(config('admin.ape_url') . self::END_POINT . '/' . $id);

        if (!$feedbackData->json()) {
            return response()->json([
                'success' => 0,
                'error' => [
                    'error_message' => Message::API_ERROR
                ]
            ]);
        }

        return $feedbackData->json();
    }

    public function getListUser()
    {
        $params['limit'] = 100;
        $params['offset'] = 1;

        $userData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->get(config('admin.ape_url') . 'admin/send-mail-to-user', $params);

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

    public function sendMailToUser($request)
    {

        $userData = Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . 'admin/send-mail-to-user', $request->all());

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
