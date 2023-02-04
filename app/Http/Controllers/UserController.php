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
    public function storeProfilePicture(Request $request)
    {
        $validatePFPStorage = Validator::make($request->all(), [
            "user" => "required",
            "pfp_image" => "required|mimes:png,jpg,jpeg"
        ]);
        if ($validatePFPStorage->fails()) {
            return response()->json([
                "status" => false,
                "message" => "An error occured, please try again",
                "errors" => $validatePFPStorage->errors()
            ], 401);
        }
        $imageName = time() . '.' . $request->pfp_image->extension();
        User::where('id', $request->user['id'])->update(array('img_path' => $imageName));
        $request->pfp_image->Storage::move(public_path('images/', $imageName));
        return response()->json([
            'status' => true,
            'message' => 'Profile picture has been successfully changed',
        ], 200);
    }
    public function updateUsername(Request $request)
    {
        $validateRequest = Validator::make($request->all(), [
            'user_id' => 'required',
            'new_username' => 'required'
        ]);
        if ($validateRequest->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'An error occured please try again',
                'errors' => $validateRequest->errors()
            ], 500);
        }
        $user = User::findOrFail($request->user_id);
        $user->username = $request->new_username;

        return response()->json([
            'status' => true,
            'message' => 'Your username has been successfully updated',
        ], 200);
    }
    public function deleteProfilePicture(Request $request)
    {
        $validatePFPDelete = Validator::make($request->all(), [
            "user" => "required",
            "pfp_image" => "required|mimes:png,jpg,jpeg"
        ]);
        if ($validatePFPDelete->fails()) {
            return response()->json([
                "status" => false,
                "message" => "An error occured, please try again",
                "errors" => $validatePFPDelete->errors()
            ], 401);
        }
        $imageName = time() . '.' . $request->pfp_image->extension();
        $request->pfp_image->Storage::delete(public_path('images', $imageName));
        User::where('id', $request->user['id'])->update(array('img_path' => "default.svg"));
        return response()->json([
            'status' => true,
            'message' => 'Profile picture has been successfully deleted',
        ], 200);
    }
}
