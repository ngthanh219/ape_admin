<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\GearController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PointClaimHistoryController;
use App\Http\Controllers\RunningHistoryController;
use App\Http\Controllers\SystemConfigController;
use App\Http\Controllers\SystemModeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventTypeController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MiningController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

Route::get('', [AuthController::class, 'index'])->name('login-form');
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::group([
    'middleware' => 'auth'
], function () {
    // auth
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh-token', [AuthController::class, 'refreshToken'])->name('refresh-token');

    // dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // user
    Route::get('user', [UserController::class, 'index'])->name('user');
    Route::get('anonymos-user', [UserController::class, 'indexAnonymosUser'])->name('anonymos-user');

    // running history
    Route::get('running-history', [RunningHistoryController::class, 'index'])->name('running-history');
    Route::get('running-history-log/{running_history_id}', [RunningHistoryController::class, 'getRunningHistoryLog']);

    // system config
    Route::get('system-config', [SystemConfigController::class, 'index'])->name('system-config');
    Route::get('create-system-config', [SystemConfigController::class, 'createSystemConfigData'])->name('system-config.create');
    Route::post('system-config', [SystemConfigController::class, 'storeSystemConfigData'])->name('system-config.store');
    Route::get('system-config/{system_config_id}', [SystemConfigController::class, 'showSystemConfigData'])->name('system-config.show');
    Route::put('system-config/{system_config_id}', [SystemConfigController::class, 'updateSystemConfigData'])->name('system-config.update');
    Route::delete('system-config/{system_config_id}', [SystemConfigController::class, 'deleteSystemConfigData'])->name('system-config.delete');
    Route::post('system-config/export', [SystemConfigController::class, 'exportData'])->name('system-config.export');
    Route::get('system-config-import', [SystemConfigController::class, 'getImportForm'])->name('system-config.import');
    Route::post('system-config-import', [SystemConfigController::class, 'importData'])->name('system-config.import-file');

    // Quiz
    Route::resource('quiz', QuizController::class);
    Route::post('import-question-banks', [QuizController::class, 'importDataQA'])->name('quiz.import-file');
    Route::get('quiz-import', [QuizController::class, 'getImportForm'])->name('quiz.import');

    // system mode
    Route::get('system-mode', [SystemModeController::class, 'index'])->name('system-mode');

    // gear
    Route::get('gear', [GearController::class, 'getGear'])->name('gear');

    // feedback
    Route::get('feedback', [FeedbackController::class, 'index'])->name('feedback');
    Route::get('show-feedback/{feedback_id}', [FeedbackController::class, 'showFeedback'])->name('show-feedback');
    Route::post('feedback-data-reply/{feedback_id}', [FeedbackController::class, 'replyFeedbackData'])->name('reply-feedback');
    Route::get('send-mail-to-user', [FeedbackController::class, 'indexCustomMail'])->name('custom-email');
    Route::post('send-mail-to-user', [FeedbackController::class, 'sendMailToUser'])->name('send-custom-email');

    //event
    Route::resource('event-type', EventTypeController::class);
    Route::resource('event', EventController::class);

    // Transaction
    Route::get('point-claim-history', [PointClaimHistoryController::class, 'index'])->name('point-claim.index');

    // Notification
    Route::resource('notification', NotificationController::class);

    // Mining
    Route::get('mining', [MiningController::class, 'index'])->name('mining.index');

    Route::group([
        'prefix' => 'api/v1'
    ], function () {
        Route::get("dashboard-total", [DashboardController::class, "getDashboardTotalData"]);
        Route::get("dashboard-earned", [DashboardController::class, "getEarnedDashboardData"]);
        Route::get("dashboard-gear", [DashboardController::class, "getGearDashboardData"]);
        Route::get("dashboard-tracking-burn", [DashboardController::class, "getTrackingBurnDashboardData"]);

        Route::get('running-history-data', [RunningHistoryController::class, 'getRunningHistoryData']);
        Route::get('user-running-history-data-popup', [RunningHistoryController::class, 'getUserRunningHistoryDataPopup']);
        Route::get('running-history-data/{user_id}', [RunningHistoryController::class, 'getUserRunningHistoryData']);
        Route::get('running-history-log-data/{running_history_id}', [RunningHistoryController::class, 'getUserRunningHistoryLogData']);
        Route::get('export-running-history-data', [RunningHistoryController::class, 'exportRunningHistoryData']);
        Route::delete("running-history-data/logs", [RunningHistoryController::class, "deleteRunningHistoryLogsData"]);

        Route::get('user-data', [UserController::class, 'getUserData']);
        Route::put("user-data/{user_id}", [UserController::class, "updateUserStatus"]);

        Route::get('anonymos-user-data', [UserController::class, 'getAnonymosUserData']);
        Route::put("anonymos-user-data/{user_id}", [UserController::class, "updateAnonymosUserStatus"]);

        Route::get('system-config-data', [SystemConfigController::class, 'getSystemConfigData']);

        Route::get('event-data', [EventController::class, 'getEventData']);
        Route::get('event-type-data', [EventTypeController::class, 'getEventTypeData']);

        Route::get('system-mode-data', [SystemModeController::class, 'getSystemModeData']);
        Route::put('system-mode-data/{system_mode_id}', [SystemModeController::class, 'updateSystemModeData']);

        Route::get('gear-data', [GearController::class, 'getGearData']);
        Route::get('gear-detail-popup', [GearController::class, 'getGearDetailPopup']);
        Route::get('gear-data-detail/{gear_id}', [GearController::class, 'getGearDetail']);

        Route::get('feedback-data', [FeedbackController::class, 'getFeedbackData']);
        Route::get('feedback-data/{feedback_id}', [FeedbackController::class, 'showFeedbackData']);
        Route::put("feedback-data/{feedback_id}", [FeedbackController::class, "updateFeedbackData"]);
        Route::delete("feedback-data/{feedback_id}", [FeedbackController::class, "deleteFeedbackData"]);

        Route::get('point-claim-history', [PointClaimHistoryController::class, 'getPointClaimData']);
        Route::get('point-claim-history-chart', [PointClaimHistoryController::class, 'getPointClaimChartData']);

        Route::get('notification', [NotificationController::class, 'getNotificationData']);
        Route::get('mining-data', [MiningController::class, 'getMiningData']);
    });
});
