<?php

namespace App\Http\Controllers;

use App\Libraries\Message;
use App\Services\EventService;
use App\Services\EventTypeService;
use Illuminate\Http\Request;

class EventController extends Controller
{
    protected $eventService;
    protected $eventTypeService;
    public $pageName = 'Event';

    public function __construct(
        EventService $eventService,
        EventTypeService $eventTypeService
    ) {
        $this->eventService = $eventService;
        $this->eventTypeService = $eventTypeService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.event.index', compact([
            'pageName'
        ]));
    }

    public function getEventData(Request $request)
    {
        return $this->eventService->getEventData($request);
    }


    public function create()
    {
        $pageName = "New " . $this->pageName;
        $eventTypeData = $this->eventService->getListEventTypeData();

        if ($eventTypeData['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $eventTypeData['error']['error_message']
            ]);
        }

        $eventTypeData = $eventTypeData['data']['data'];

        return view('pages.event.create', compact([
            'pageName',
            'eventTypeData',
        ]));
    }


    public function store(Request $request)
    {
        $event = $this->eventService->storeEventData($request);

        if ($event['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $event['error']['error_message']
            ]);
        }

        return redirect()->route('event.show', $event['data']['id'])->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::CREATE_SUCCESS
        ]);
    }


    public function show($id)
    {
        $event = $this->eventService->showEventData($id);
        $eventTypeData = $this->eventService->getListEventTypeData();

        if ($event["success"] == 0 && $eventTypeData["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $event['error']['error_message'] . ' ' . $eventTypeData['error']['error_message']
            ]);
        }

        $pageName = $this->pageName . ": " . $event['data']['name'];
        $event = $event['data'];
        $eventTypeData = $eventTypeData['data']['data'];

        return view('pages.event.show', compact([
            'pageName',
            'event',
            'eventTypeData',
        ]));
    }

    public function update(Request $request, $id)
    {
        $event = $this->eventService->updateEventData($request, $id);

        if ($event["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $event['error']['error_message']
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
        $event = $this->eventService->deleteEventData($id);

        if ($event["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $event['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => $event["message"]
        ]);
    }
}
