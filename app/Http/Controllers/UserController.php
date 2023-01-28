<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function getProfilePicture(Request $request)
    {
        $validateUserID = Validator::make($request->all(), [
            'user_id' => 'required'
        ]);
        if ($validateUserID->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'An error occured, please try again',
                    'errors' => $validateUserID->errors()
                ],
                500
            );
        }
        return User::find($request->user_id)->select("img_path")->first();
    }
    public function storeProfilePicture()
    {
    }
    public function updateProfilePicture()
    {
    }
    public function updateUsername()
    {
    }
}
