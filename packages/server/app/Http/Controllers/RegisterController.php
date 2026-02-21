<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());
        

        $user->assignRole(Roles::MERCHANT->value);
        event(new Registered($user));

        Auth::login($user);

        $request->session()->regenerate();

        return response()->json([
            'user' => $user, 
            'message' => 'Registration succesful. Please verify your email'
        ], 201);

    }
}
