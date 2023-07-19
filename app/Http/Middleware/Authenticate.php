<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, $guard = null)
    {
        $tokens = session('tokens');

        if (!isset($tokens) || $tokens == null) {
            return redirect()->route('login-form');
        }

        return $next($request);
    }
}
