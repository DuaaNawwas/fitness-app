<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BodyLogController;
use App\Http\Controllers\CaloriesController;
use App\Http\Controllers\WorkoutController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/googleLogin', [AuthController::class, 'googleLogin']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // All endpoints for bmi weight related apis
    Route::resource('/bodyLogs', BodyLogController::class);

    // All endpoints for workouts related apis
    Route::resource('/workouts', WorkoutController::class);

    // Endpoint for getting all calories consumed for a specific user
    Route::get('/caloriesin', [CaloriesController::class, 'caloriesIn']);

    // Endpoint for storing calories consumed for a specific user
    Route::post('/caloriesin', [CaloriesController::class, 'storeCaloriesIn']);

    // Endpoint for getting all calories burnt for a specific user
    Route::get('/caloriesout', [CaloriesController::class, 'caloriesOut']);

    // Endpoint for storing calories burnt for a specific user
    Route::post('/caloriesout', [CaloriesController::class, 'storeCaloriesOut']);

    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});
