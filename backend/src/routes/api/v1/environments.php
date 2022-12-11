<?php

use App\Http\Controllers\EnvironmentsController;

Route::get('environments', [EnvironmentsController::class, 'index'])->name('environments.index');

Route::get('environments/{string_id}', [EnvironmentsController::class, 'show'])->name('environments.show');
