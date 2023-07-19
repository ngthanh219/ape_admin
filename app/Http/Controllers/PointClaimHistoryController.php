<?php

namespace App\Http\Controllers;

use App\Libraries\Message;
use App\Services\EventService;
use App\Services\EventTypeService;
use App\Services\PointClaimHistoryService;
use Illuminate\Http\Request;

class PointClaimHistoryController extends Controller
{
    protected $pointClaimHistoryService;
    public $pageName = 'Point Claim History';

    public function __construct(
        PointClaimHistoryService $pointClaimHistoryService
    ) {
        $this->pointClaimHistoryService = $pointClaimHistoryService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.point-claim-history.index', compact([
            'pageName'
        ]));
    }

    public function getPointClaimData(Request $request)
    {
        return $this->pointClaimHistoryService->getPointClaimData($request);
    }

    public function getPointClaimChartData(Request $request)
    {
        return $this->pointClaimHistoryService->getPointClaimChartData($request);
    }
}
