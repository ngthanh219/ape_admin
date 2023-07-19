<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Libraries\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function index()
    {
        $tokens = session('tokens');

        if (isset($tokens) || $tokens != null) {
            return redirect()->route('user');
        }

        return view("auth.login");
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $request->all();
            $params = [
                'email' => $data['email'],
                'password' => $data['password']
            ];
            
            $user = Http::withHeaders([
                'secret' => config('app.ape_secret'),
            ])->post(config('admin.ape_url') . 'admin/login', $params);

            $response = $user->json();

            if (!$response) {
                return redirect()->back()->with('message', Message::API_ERROR)->withInput();
            }

            if ($response['success'] == 0) {
                return redirect()->back()->with('message', $response['error']['error_message'])->withInput();
            }

            session([
                'tokens' => [
                    'email' => $response['data']['email'],
                    'access_token' => $response['data']['tokens']['access_token'],
                    'refresh_token' => $response['data']['tokens']['refresh_token']
                ]
            ]);
            
            return redirect()->route('user');
        } catch (\Exception $ex) {
            return redirect()->back()->with('message', Message::API_ERROR)->withInput();
        }
    }

    public function logout(Request $request)
    {
        Http::withHeaders([
            'secret' => config('app.ape_secret'),
            'Authorization' => 'Bearer ' . session('tokens.access_token')
        ])->post(config('admin.ape_url') . 'logout');

        session()->forget('tokens');

        return redirect()->route('login-form');
    }

    public function refreshToken(Request $request)
    {
        try {
            $tokens = Http::withHeaders([
                'Authorization' => 'Bearer ' . session('tokens.access_token')
            ])->post(config('admin.ape_url') . 'auth/refresh-token', [
                'access_token' => $request->access_token,
                'refresh_token' => $request->refresh_token
            ]);

            $response = $tokens->json();

            if (!$response) {
                return redirect()->back()->with('message', Message::API_ERROR)->withInput();
            }

            if ($response['success'] == 0) {
                session()->forget('tokens');
        
                return redirect()->route('login-form');
            }
            
            session()->put('tokens.access_token', $response['data']['access_token']);
            session()->put('tokens.refresh_token', $response['data']['refresh_token']);
            session()->save();

            return redirect()->route('user')->with('notification', [
                'icon' => 'check',
                'type' => 'success',
                'message' => 'Refresh token is success'
            ]);
        } catch (\Exception $ex) {
            return redirect()->back()->with('message', Message::API_ERROR)->withInput();
        }
    }
}
