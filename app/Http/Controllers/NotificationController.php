<?php

namespace App\Http\Controllers;

use App\Libraries\Message;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NotificationController
{
    protected $notificationService;
    public $pageName = 'Notification';

    public function __construct(
        NotificationService $notificationService
    ) {
        $this->notificationService = $notificationService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.notification.index', compact([
            'pageName'
        ]));
    }

    public function getNotificationData(Request $request)
    {
        return $this->notificationService->getNotificationData($request);
    }

    public function create()
    {
        $pageName = "New " . $this->pageName;

        $systemConfig = $this->notificationService->getSystemConfig();
        if ($systemConfig['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        if (count($systemConfig['data']['data'])){
            $systemConfig = $systemConfig['data']['data'][0]['value'];
        } else {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => Message::API_ERROR_SYSTEM_CONFIG
            ]);
        }

        return view('pages.notification.create', compact([
            'pageName',
            'systemConfig'
        ]));
    }

    public function store(Request $request)
    {
        $notification = $this->notificationService->storeNotificationData($request);

        if ($notification['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $notification['error']['error_message']
            ]);
        }

        return redirect()->route('notification.show', $notification['data']['id'])->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => $notification["message"]
        ]);
    }

    public function show($id)
    {
        $notification = $this->notificationService->showNotificationData($id);

        if ($notification["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $notification['error']['error_message']
            ]);
        }
        $systemConfig = $this->notificationService->getSystemConfig();
        if ($systemConfig['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        $pageName = $this->pageName;
        $notification = $notification['data'];
        $notification['start_time'] = $this->notificationService
            ->setTimeZoneUTC($notification['start_time'],'UTC', 'Asia/Ho_Chi_Minh');
        $notification['finish_time'] = $this->notificationService
            ->setTimeZoneUTC($notification['finish_time'], 'UTC', 'Asia/Ho_Chi_Minh');
        if (gettype($notification['data']) == 'array') {
            if (isset($notification['data']['start_time']))
                $notification['data']['start_time'] = $this->notificationService
                    ->setTimeZoneUTC($notification['data']['start_time'], 'UTC', 'Asia/Ho_Chi_Minh');
            if (isset($notification['data']['finish_time']))
                $notification['data']['finish_time'] = $this->notificationService
                    ->setTimeZoneUTC($notification['data']['finish_time'], 'UTC', 'Asia/Ho_Chi_Minh');
            $notification['data'] = json_encode($notification['data']);
        }

        if (count($systemConfig['data']['data'])){
            $systemConfig = $systemConfig['data']['data'][0]['value'];
        } else {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => Message::API_ERROR_SYSTEM_CONFIG
            ]);
        }

        return view('pages.notification.show', compact([
            'pageName',
            'notification',
            'systemConfig'
        ]));
    }

    public function update(Request $request, $id)
    {
        $notification = $this->notificationService->updateNotificationData($request, $id);

        if ($notification["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $notification['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => $notification["message"]
        ]);
    }


    public function destroy($id)
    {
        $notification = $this->notificationService->deleteNotificationData($id);

        if ($notification["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $notification['error']['error_message']
            ]);
        }

        return redirect()->route('notification.index');
    }
}
