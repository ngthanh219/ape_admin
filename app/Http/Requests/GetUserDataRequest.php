<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use App\Services\BaseService;
use App\Libraries\ErrorCode;
use App\Libraries\Message;

class GetUserDataRequest extends FormRequest
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
        $userInformation = "nullable";

        if (isset($data["user_information"])) {
            if (is_numeric($data["user_information"])) {
                $userInformation .= "|integer";
            }
            
            if (filter_var($userInformation, FILTER_VALIDATE_EMAIL)) {
                $userInformation .= "|email";
            }
        }

        return [
            "limit" => "required|integer|min:0",
            "offset" => "required|integer|min:0",
            "user_information" => $userInformation
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = $this->service->responseError(Message::VALIDATION_ERROR, 400, ErrorCode::VALIDATION_ERROR);

        throw new ValidationException($validator, $response);
    }
}
