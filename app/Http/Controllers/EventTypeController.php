<?php

namespace App\Http\Controllers;

use App\Libraries\Message;
use App\Services\EventTypeService;
use Illuminate\Http\Request;

class EventTypeController extends Controller
{
    protected $eventTypeService;
    public $pageName = 'Event type';

    public function __construct(
        EventTypeService $eventTypeService
    ) {
        $this->eventTypeService = $eventTypeService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.event-type.index', compact([
            'pageName'
        ]));
    }

    public function getEventTypeData(Request $request)
    {
        return $this->eventTypeService->getEventTypeData($request);
    }


    public function create()
    {
        $pageName = "New " . $this->pageName;

        return view('pages.event-type.create', compact([
            'pageName',
        ]));
    }


    public function store(Request $request)
    {
        $eventType = $this->eventTypeService->storeEventTypeData($request);

        if ($eventType['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $eventType['error']['error_message']
            ]);
        }

        return redirect()->route('event-type.show', $eventType['data']['id'])->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::CREATE_SUCCESS
        ]);
    }


    public function show($id)
    {
        $eventType = $this->eventTypeService->showEventTypeData($id);

        if ($eventType["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $eventType['error']['error_message']
            ]);
        }

        $pageName = $this->pageName . ": " . $eventType['data']['name'];
        $eventType = $eventType['data'];

        return view('pages.event-type.show', compact([
            'pageName',
            'eventType'
        ]));
    }

    public function update(Request $request, $id)
    {
        $eventType = $this->eventTypeService->updateEventTypeData($request, $id);

        if ($eventType["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $eventType['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::UPDATE_SUCCESS
        ]);
    }


    public function destroy($id)
    {
        $eventType = $this->eventTypeService->deleteEventTypeData($id);

        if ($eventType["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $eventType['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => $eventType["message"]
        ]);
    }
}
