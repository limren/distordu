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
        // An easy way to make unique conversation and not struggle to render it on the front
        if ($request->user1_id > $request->user2_id) {
            $greatest = $request->user1_id;
            $least = $request->user2_id;
        } else {
            $greatest = $request->user2_id;
            $least = $request->user1_id;
        }
        Conversation::create([
            "user1" => $greatest,
            "user2" => $least
        ]);
        return response()->json([
            "status" => true,
            "message" => "Conversation has been created successfully",
        ], 200);
    }
    public function getConversationId(Request $request)
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
        // An easy way to make unique conversation and not struggle to render it on the front
        if ($request->user1_id > $request->user2_id) {
            $greatest = $request->user1_id;
            $least = $request->user2_id;
        } else {
            $greatest = $request->user2_id;
            $least = $request->user1_id;
        }
        $conversation = Conversation::where("user1", $greatest)->where("user2", $least)->first();

        if (!$conversation) {
            return response()->json([
                "status" => false,
                "message" => "No conversation founded"
            ], 404);
        }
        return response()->json([
            "status" => true,
            "conversation_id" => $conversation->id
        ], 200);
    }
}
