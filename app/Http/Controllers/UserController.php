<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetUserDataRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;
    public $pageName = 'Users';

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $pageName = $this->pageName;

        return view('pages.user.index', compact([
            'pageName'
        ]));
    }

    public function indexAnonymosUser(Request $request)
    {
        $pageName = "Anonymos ".$this->pageName;

        return view('pages.user.index-anonymos-user', compact([
            'pageName'
        ]));
    }

    public function getUserData(GetUserDataRequest $request)
    {
        return $this->userService->getUserData($request);
    }

    public function updateUserStatus(Request $request, $id)
    {
        return $this->userService->updateUserStatus($request, $id);
    }

    public function getAnonymosUserData(GetUserDataRequest $request)
    {
        return $this->userService->getAnonymosUserData($request);
    }

    public function updateAnonymosUserStatus(Request $request, $id)
    {
        return $this->userService->updateAnonymosUserStatus($request, $id);
    }

}
