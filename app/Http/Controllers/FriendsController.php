<?php

namespace App\Http\Controllers;

use App\Models\Friends;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FriendsController extends Controller
{

    public function getFriends(String $user_id)
    {
        $friendsArray = [];
        $friends = Friends::where("friend_id", $user_id)->get();
        foreach ($friends as $friend) {
            $friendsProfile = User::where("id", $friend->user_id)->first();
            // TODO: Reconsider what will be pushed regarding friends info into array
            if ($friend->status === "accepted") {
                array_push($friendsArray, $friendsProfile);
            }
        }
        return $friendsArray;
    }
    public function deleteFriend(Request $request)
    {
        try {
            $validateRequest = Validator::make($request->all(), [
                'user_id' => 'required',
                'friend_id' => 'required'
            ]);
            if ($validateRequest->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'An error occured please try again',
                    'error' => $validateRequest->errors()
                ], 500);
            }

            $userFriend = Friends::where("user_id", $request->user_id)->where("friend_id", $request->friend_id)->get();
            if ($userFriend) {
                Friends::where("user_id", $request->user_id)->where("friend_id", $request->friend_id)->delete();
                Friends::where("user_id", $request->friend_id)->where("friend_id", $request->user_id)->delete();
            }
            return response()->json([
                'status' => true,
                'message' => 'Friend have been successfully deleted',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
