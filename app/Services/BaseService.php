<?php

namespace App\Services;

use App\Libraries\ErrorCode;
use App\Libraries\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;

class BaseService
{
    /**
     * convert record format
     * @param LengthAwarePaginator $awarePaginator
     * @return array
     */
    public function convertPagination(LengthAwarePaginator $awarePaginator)
    {
        return [
            'total_record' => $awarePaginator->total(),
            //'current_page' => $awarePaginator->currentPage(),
            //'per_page' => (int) $awarePaginator->perPage(),
            'total_page' => $awarePaginator->lastPage(),
            'data' => $awarePaginator->items(),
        ];
    }

    /**
     * @param null $data
     * @return JsonResponse
     */
    public function responseSuccess($data = null, $appends = [], $message = "")
    {
        $response['success'] = 1;

        if ($data) {
            $response['data'] = $data;
        }

        $response['message'] = $message;

        return response()->json(array_merge($response, $appends));
    }

    /**
     *
     * return error
     * @param int $httpCode
     * @param string $errorMessage
     * @param int $errorCode
     * @return JsonResponse
     */
    public function responseError($errorMessage = Message::SERVER_ERROR, $httpCode = 500, $errorCode = ErrorCode::SERVER_ERROR, $appends = [])
    {
        $errorCode = 'E' . str_pad($errorCode, 4, 0, STR_PAD_LEFT);

        return response()->json(array_merge([
            'success' => 0,
            'error' => [
                'error_code' => $errorCode,
                'error_message' => $errorMessage,
            ],
        ], $appends), $httpCode);
    }

    public function responseMetaData($object)
    {
        $data["id"] = $object->id;
        $data["name"] = $object->id;
        $data["description"] = $object->id;
        $data["image"] = $object->image;
        $data["is_favorite"] = $object->is_favorite;
        $data["attributes"] = [];

        for ($i = 0; $i < count($object->attributeValues); $i++) {
            array_push($data["attributes"], [
                "trait_type" => $object->attributeValues[$i]->attribute->name,
                "value" => $object->attributeValues[$i]->value
            ]);
        }

        array_push($data["attributes"], [
            "trait_type" => "cost",
            "value" => $object->cost
        ]);

        if (!empty($data["attributes"])) {
            $attTypeIndex = '';
            foreach ($data["attributes"] as $kAtt1 => $att1) {
                if ($att1['trait_type'] == "type_id") {
                    $attTypeIndex = $kAtt1;
                    break;
                }
            }

            foreach ($data["attributes"] as $kAtt2 => $att2) {
                if ($att2['trait_type'] == "is_box" && $att2['value'] == 1) {
                    unset($data["attributes"][$attTypeIndex]);
                    $data["attributes"] = array_values($data["attributes"]);
                }
            }
        }

        return $data;
    }

    /**
     * format GearData for mobile app
     *
     * @param App\Models\Gear $object
     * @return Object
     */
    public function responseAppData($object)
    {
        for ($i = 0; $i < count($object->attributeValues); $i++) {
            $object[$object->attributeValues[$i]->attribute->name] = $object->attributeValues[$i]->value;
        }

        unset($object['attributeValues']);
        unset($object['contract_address_config_id']);

        return $object;
    }

    public function responseExposeData($object)
    {
        $data["id"] = $object->id;
        $data["name"] = $object->id;
        $data["description"] = $object->id;
        $data["image"] = $object->image;
        $data["attributes"] = [];

        for ($i = 0; $i < count($object->attributes); $i++) {
            array_push($data["attributes"], [
                "trait_type" => $object->attributes[$i]->name,
                "value" => $object->attributes[$i]->value
            ]);
        }

        array_push($data["attributes"], [
            "trait_type" => "cost",
            "value" => $object->cost
        ]);

        return $data;
    }

    public function refreshToken()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . 'auth/refresh-token', [
            'access_token' => session('tokens.access_token'),
            'refresh_token' => session('tokens.refresh_token')
        ]);

        $response = $response->json();
        session()->put('tokens.access_token', $response['data']['access_token']);
        session()->put('tokens.refresh_token', $response['data']['refresh_token']);
        session()->save();
    }
}
