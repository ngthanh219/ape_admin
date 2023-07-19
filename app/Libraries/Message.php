<?php

namespace App\Libraries;

class Message
{
    // auth
    const LOGIN_FAIL = "Login information is incorrect";

    // system
    const SERVER_ERROR = 'System error';
    const API_ERROR = "API is error";
    const API_ERROR_SYSTEM_CONFIG = "Miss data system config";
    const CREATE_SUCCESS = "Information is created";
    const UPDATE_SUCCESS = "Information is updated";
    const DELETE_SUCCESS = "Information is deleted";
    const VALIDATION_ERROR = 'The given data was invalid';
    const SENT_SUCCESS = "Sent success!";
}
