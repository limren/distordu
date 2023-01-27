<?php

namespace App\Http\Controllers;

use App\Models\FriendRequests;
use App\Models\Friends;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FriendRequestsController extends Controller
{
    public function getFriendRequests(Request $request)
    {
        return FriendRequests::where("user_id", $request->user_id)->get();
    }
    public function createFriendRequest(Request $request)
    {
        $validateFriendRequest = Validator::make($request->all(), [
            'user_id' => 'required|unique:friends,friend_id',
            'friend_id' => 'required|unique:friends,user_id'
        ]);
        if ($validateFriendRequest->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'An error occured please try again',
                'errors' => $validateFriendRequest->errors()
            ]);
        }
        FriendRequests::create([
            'user_id' => $request->user_id,
            'friend_id' => $request->friend_id
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Friend request has been sent'
        ]);
    }
    public function acceptFriendRequest(Request $request)
    {
        $validateFriendRequest = Validator::make($request->all(), [
            'user_id' => 'required',
            'friend_id' => 'required'
        ]);
        if ($validateFriendRequest->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'An error occured, please try again',
                'errors' => $validateFriendRequest->errors()
            ]);
        }
        Friends::create([
            'user_id' => $request->user_id,
            'friend_id' => $request->friend_id,
            'status' => "accepted"
        ]);
        Friends::create([
            'user_id' => $request->friend_id,
            'friend_id' => $request->user_id,
            'status' => "accepted"
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Friend request has been accepted successfully',
        ]);
    }

    public function denyFriendRequest(Request $request)
    {
        $validateFriendRequest = Validator::make($request->all(), [
            'user_id' => 'required',
            'friend_id' => 'required'
        ]);

        if ($validateFriendRequest->fails()) {
            return response()->json([
                'status' => false,
                'message' => "An error occurred, please try again.",
                'errors' => $validateFriendRequest->errors()
            ]);
        }
        Friends::where("user_id", $request->user_id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Friend request successfully deleted !',
        ]);
    }
}
