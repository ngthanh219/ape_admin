<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetDashboardDataRequest;
use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public $pageName = 'Dashboard';

    public function __construct(
        DashboardService $dashboardService
    ) {
        $this->dashboardService = $dashboardService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.dashboard.dashboard_v1', compact([
            'pageName'
        ]));
    }

    public function getDashboardTotalData()
    {
        return $this->dashboardService->getDashboardTotalData();
    }

    public function getEarnedDashboardData(GetDashboardDataRequest $request)
    {
        return $this->dashboardService->getEarnedDashboardData($request);
    }

    public function getGearDashboardData(Request $request)
    {
        return $this->dashboardService->getGearDashboardData($request);
    }

    public function getTrackingBurnDashboardData(Request $request)
    {
        return $this->dashboardService->getTrackingBurnDashboardData($request);
    }
}
