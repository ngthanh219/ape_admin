<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use App\Services\BaseService;
use App\Libraries\ErrorCode;
use App\Libraries\Message;

class GetRunningHistoryDataRequest extends FormRequest
{
    protected $service;

    public function __construct(BaseService $service)
    {
        $this->service = $service;
    }

    public function authorize()
    {
        return true;
    }
    
    public function rules()
    {
        $data = $this->input();
        $dateFrom = "nullable|date";
        $dateTo = "nullable|date";
        $userInformation = "nullable";
        $distanceFrom = "nullable|numeric";
        $distanceTo = "nullable|numeric";
        $orderByDistance = "nullable|numeric";
        $orderByTime = "nullable|numeric";
        $orderByStep = "nullable|numeric";
        $orderByEarn = "nullable|numeric";
        $runningHistoryId = "nullable|numeric";

        if (isset($data["date_to"])) {
            $dateFrom = "required|date";
        }

        if (isset($data["user_information"])) {
            if (is_numeric($data["user_information"])) {
                $userInformation .= "|integer";
            }

            if (filter_var($userInformation, FILTER_VALIDATE_EMAIL)) {
                $userInformation .= "|email";
            }
        }

        if (isset($data["distance_to"])) {
            $distanceFrom = "required|numeric";
        }

        return [
            "limit" => "required|integer|min:0",
            "offset" => "required|integer|min:0",
            "date_from" => $dateFrom,
            "date_to" => $dateTo,
            "user_information" => $userInformation,
            "distance_from" => $distanceFrom,
            "distance_to" => $distanceTo,
            "order_by_distance" => $orderByDistance,
            "order_by_time" => $orderByTime,
            "order_by_step" => $orderByStep,
            "order_by_earn" => $orderByEarn,
            "running_history_id" => $runningHistoryId
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = $this->service->responseError(Message::VALIDATION_ERROR, 400, ErrorCode::VALIDATION_ERROR);

        throw new ValidationException($validator, $response);
    }
}
