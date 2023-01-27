<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FriendRequestsController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    // API endpoints concerning friends model
    Route::get('friends/get', [FriendsController::class, 'getFriends']);
    Route::post('friends/delete', [FriendsController::class, 'deleteFriend']);
    // API endpoints concerning friend requests model
    Route::post('friendrequests/get', [FriendRequestsController::class, "getFriendRequests"]);
    Route::post('friendrequests/create', [FriendRequestsController::class, 'createFriendRequest']);
    Route::post('friendrequests/accept', [FriendRequestsController::class, 'acceptFriendRequest']);
    Route::post('friendrequests/deny', [FriendRequestsController::class, 'denyFriendRequest']);
    // API endpoints related to user's profile

    Route::controller(UserController::class)->group(function () {
        // Profile picture of the user
        Route::get("profile/profilepicture", "getProfilePicture");
        Route::post("profile/profilepicture", "getProfilePicture");
        Route::put("profile/profilepicture", "updateProfilePicture");
        // Username
        Route::put("profile/username", "updateUsername");
    });
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
