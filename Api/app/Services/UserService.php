<?php

namespace App\Services;

use App\Events\VerifyEmailEvent;
use App\Exceptions\GeneralExceptionCatch;
use App\Exceptions\UserException;
use App\Http\Resources\AuthLoginResource;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Jobs\SendVerifyEmailJob;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserService
{
    public function __construct(private Request $request) {}

    public function login(array $data)
    {
        try {
            if (!$token = Auth::attempt($data)) {
                return response()->json(['message' => 'email or password wrong'], status: 400);
            }

            return response()->json(['token' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'error login'], 401);
        }
    }

    public function store(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);

            $user = User::create($data);

            return response()->json(['message' => 'success'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'error store'], 401);
        }
    }
}
