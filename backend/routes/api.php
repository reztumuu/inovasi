<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\UploadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// --- Public Endpoints ---
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/portfolios', [PortfolioController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'showBySlug']);
Route::post('/leads', [LeadController::class, 'store']);
Route::get('/settings', [SettingController::class, 'index']);

// --- Auth Endpoints ---
Route::post('/login', [AuthController::class, 'login']);

// --- Admin Endpoints (Protected) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // Lead Management
    Route::get('/admin/leads', [LeadController::class, 'index']);
    Route::patch('/admin/leads/{id}/status', [LeadController::class, 'updateStatus']);
    Route::delete('/admin/leads/{id}', [LeadController::class, 'destroy']);
    
    // CRUD Endpoints for core resources
    Route::apiResource('admin/services', ServiceController::class);
    Route::apiResource('admin/portfolios', PortfolioController::class);
    Route::apiResource('admin/posts', PostController::class);
    
    // Settings & uploads
    Route::post('/admin/settings', [SettingController::class, 'update']);
    Route::post('/admin/upload', [UploadController::class, 'upload']);
});
