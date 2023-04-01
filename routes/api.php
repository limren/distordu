<?php

use App\Events\ChatMessageEvent;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FriendRequestsController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    // API endpoints concerning friends model
    Route::get('friends/get/{user_id}', [FriendsController::class, 'getFriends']);
    Route::post('friends/delete', [FriendsController::class, 'deleteFriend']);
    // API endpoints concerning friend requests model
    Route::post('friendrequests/get', [FriendRequestsController::class, "getFriendRequests"]);
    Route::post('friendrequests/create', [FriendRequestsController::class, 'createFriendRequest']);
    Route::post('friendrequests/accept', [FriendRequestsController::class, 'acceptFriendRequest']);
    Route::post('friendrequests/deny', [FriendRequestsController::class, 'denyFriendRequest']);


    // API endpoints related to user's profile
    Route::controller(UserController::class)->group(function () {
        // Profile picture of the user
        Route::post("profile/profilepicture", "storeProfilePicture");
        Route::put("profile/profilepicture", "storeProfilePicture");
        Route::delete("profile/profilepicture", "deleteProfilePicture");
        // Username
        Route::put("profile/username", "updateUsername");
    });
    Route::get("/message/{conversation_id}/{user_id}", [MessageController::class, "getMessage"]);
    Route::post("/message/post", [MessageController::class, "postMessage"]);
    Route::get("/chatmessage", function (Request $request) {
        event(new ChatMessageEvent($request->message, $request->conversation_id));
        return null;
    });
    Route::post("/conversation/create", [ConversationController::class, "createConversation"]);
    Route::post("/conversation/getId", [ConversationController::class, "getConversationId"]);
});

Route::get("profile/profilepicture", [UserController::class, "getProfilePicture"]);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
