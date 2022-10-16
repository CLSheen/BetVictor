<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SportsController;

Route::get('/sports', [SportsController::class, 'index']);
Route::get('/sports/{sportId}', [SportsController::class, 'showSport']);
Route::get('/sports/{sportId}/events', [SportsController::class, 'showEvents']);
Route::get('/sports/{sportId}/events/{eventId}', [SportsController::class, 'showEvent']);