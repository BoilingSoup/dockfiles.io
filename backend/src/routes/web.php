<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Helpers\Routes\RouteHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

RouteHelper::includeRouteFiles(__DIR__ . '/socialite');

Route::get('/', function () {
    $authStatus = Auth::check() ? 'Authenticated' : 'Unauthenticated';
    return 'test' . '<br>' . $authStatus;
});
