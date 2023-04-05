<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    //
    public function getMessageUser(int $conversation_id, int $user_id)
    {
        return Message::where("conversation_id", $conversation_id)->where("user_id_sender", $user_id)->get();
    }
    public function getMessageConversation(int $conversation_id)
    {
        return Message::where("conversation_id", $conversation_id)->get();
    }
    public function postMessage(Request $request)
    {
        $validateMessage = Validator::make($request->all(), [
            "conversation_id" => "required",
            "user_id" => "required",
            "message" => "required|string|min:1|max:1500"
        ]);

        if ($validateMessage->fails()) {
            return response()->json([
                "status" => false,
                "message" => "An error occured, please try again",
                "errors" => $validateMessage->errors()
            ], 500);
        }
        $message = Message::create([
            "conversation_id" => $request->conversation_id,
            "user_id_sender" => $request->user_id, // Maybe not the best name 
            "message" => $request->message
        ]);
        return response()->json([
            "status" => true,
            "message" => $message,
            "message_status" => "Message created successfully",
        ], 200);
    }
    public function getAllMessages(int $conversation_id)
    {
        return Message::where("conversation_id", $conversation_id)->get();
    }
}
