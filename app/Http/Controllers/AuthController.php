<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required',
                    'birthdate' => 'required'
                ]
            );
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong',
                    'errors' => $validateUser->errors()
                ], 401);
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'birthdate' => new Carbon($request->birthdate)
            ]);
            return response()->json([
                'status' => true,
                'message' => 'User created successfully',
                'token' => $user->createToken("api_token")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Wrong creds',
                    'errors' => $validateUser->errors()
                ], 500);
            }
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Email & password don\'t match our database'
                    ],
                    401
                );
            }
            $user = User::where('email', $request->email)->first();
            return response()->json([
                'user' => $user,
                'status' => true,
                'message' => 'User logged in successfully',
                'token' => $user->createToken('api_token')->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message' => 'Successfully logged out'
            ],
            200
        );
    }
}
