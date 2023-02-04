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
    // Create an unique bar code for user
    public function genBarCode(string $username)
    {
        $barCodeUser = mt_rand(0, 9999);
        // If the bar code already exists, then create another one until it's unique
        if ($this->genBarCodeExists($barCodeUser, $username)) {
            return $this->genBarCode($username);
        }
        return $barCodeUser;
    }
    public function genBarCodeExists(int $barcode, string $username)
    {
        if (User::where("barcode", "=", $barcode)->where("username", "=", $username)->get()) {
            return 0;
        } else {
            return 1;
        }
    }
    public function register(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'username' => 'required',
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
            // Create an unique bar code for each user
            $barCode = $this->genBarCode($request->username);
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'birthdate' => new Carbon($request->birthdate),
                'barcode' => $barCode,
                'img_path' => null
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
