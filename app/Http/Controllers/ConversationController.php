<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConversationController extends Controller
{
    public function createConversation(Request $request)
    {
        $validateConversation = Validator::make($request->all(), [
            "user1_id" => 'required',
            "user2_id" => 'required'
        ]);

        if ($validateConversation->fails()) {
            return response()->json([
                "status" => false,
                "message" => "An error occurred please try again",
                "errors" => $validateConversation->errors()
            ], 500);
        }
        Conversation::create([
            "user1" => $request->user1_id,
            "user2" => $request->user2_id
        ]);
        return response()->json([
            "status" => true,
            "message" => "Conversation has been created successfully",
        ], 200);
    }
}
