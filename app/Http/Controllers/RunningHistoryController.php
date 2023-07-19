<?php

namespace App\Http\Controllers;

use App\Exports\ExportRunningHistoryData;
use App\Http\Requests\GetRunningHistoryDataRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Maatwebsite\Excel\Facades\Excel;
use App\Services\RunningHistoryService;

class RunningHistoryController extends Controller
{
    protected $runningHistoryService;
    public $pageName = 'Running history';

    public function __construct(
        RunningHistoryService $runningHistoryService
    ) {
        $this->runningHistoryService = $runningHistoryService;
    }
    
    public function index(Request $request)
    {
        $pageName = $this->pageName;

        return view('pages.running-history.index', compact([
            'pageName'
        ]));
    }

    public function getRunningHistoryData(GetRunningHistoryDataRequest $request)
    {
        return $this->runningHistoryService->getRunningHistoryData($request);
    }

    public function getUserRunningHistoryDataPopup()
    {
        return view('pages.running-history.user-log-popup');
    }

    public function getUserRunningHistoryData(GetRunningHistoryDataRequest $request, $userId)
    {
        return $this->runningHistoryService->getUserRunningHistoryData($request, $userId);
    }

    public function exportRunningHistoryData(Request $request)
    {

    }

    public function getRunningHistoryLog($runningHistoryId)
    {
        $pageName = $this->pageName . " logs";
        
        return view('pages.running-history.log-detail', compact([
            'pageName',
            'runningHistoryId'
        ]));
    }

    public function getUserRunningHistoryLogData(Request $request, $runningHistoryId)
    {
        return $this->runningHistoryService->getUserRunningHistoryLogData($request, $runningHistoryId);
    }

    public function deleteRunningHistoryLogsData(Request $request)
    {
        return $this->runningHistoryService->deleteRunningHistoryLogsData($request);
    }
}
