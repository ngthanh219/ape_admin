<?php

namespace App\Libraries;

class ErrorCode
{
    const SERVER_ERROR = 1;
    const PARAM_INVALID = 2;
    const VALIDATION_ERROR = 3;
    const API_NOT_FOUND = 4;
    const AUTH_ERROR = 5;
    const PARAM_EXISTS = 6;
    const TOKEN_EXPIRED = 7;
    const EMPTY_RESULT = 8;
    const ACTION_FAIL = 9;
    const NO_PERMISSION_ERROR = 10;
    const SERVER_MAINTAINING = 11;
}
