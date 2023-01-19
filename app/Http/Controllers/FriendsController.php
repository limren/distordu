<?php

namespace App\Http\Controllers;

use App\Models\Friends;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FriendsController extends Controller
{

    public function createFriend(int $user_id, int $friend_id)
    {
        // $validateRequest = Validator::make($request->all(), [
        //     'user_id' => 'required',
        //     'friend_id' => 'required'
        // ]);
        // if ($validateRequest->fails()) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'An error occurred, please try again',
        //         'errorrs' => $validateRequest->errors()
        //     ]);
        // }
        Friends::create([
            'user_id' => $user_id,
            'friend_id' => $friend_id,
            'status' => "accepted"
        ]);
        Friends::create([
            'user_id' => $friend_id,
            'friend_id' => $user_id,
            'status' => "accepted"
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Friend request has been accepted successfully',
        ]);
    }
    public function getFriends(Request $request)
    {

        return Friends::where("user_id", $request->user_id)->where('status', 'accepted')->get();
    }
}
