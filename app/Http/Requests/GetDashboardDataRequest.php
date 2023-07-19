<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use App\Services\BaseService;
use App\Libraries\ErrorCode;
use App\Libraries\Message;

class GetDashboardDataRequest extends FormRequest
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
        return [
            "type_search_date" => "required|int|min:0|max:1"
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = $this->service->responseError(Message::VALIDATION_ERROR, 400, ErrorCode::VALIDATION_ERROR);

        throw new ValidationException($validator, $response);
    }
}
