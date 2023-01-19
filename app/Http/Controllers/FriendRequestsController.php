<?php

namespace App\Http\Controllers;

use App\Models\Friends;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FriendRequestsController extends Controller
{
    public function createFriendRequest(Request $request)
    {
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
                'message' => 'An error occurred, please try again',
                'errors' => $validateFriendRequest->errors()
            ]);
        }
        Friends::create([
            'user_id' => $request->user_id,
            'friend_id' => $request->friend_id,
            'status' => "accepted"
        ]);
        Friends::create([
            'user_id' => $request->user_id,
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
    }
}
