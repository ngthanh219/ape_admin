<?php

namespace App\Http\Controllers;

use App\Libraries\Message;
use App\Services\SystemModeService;
use Illuminate\Http\Request;

class SystemModeController extends Controller
{
    protected $systemModeService;
    public $pageName = 'System mode';

    public function __construct(
        SystemModeService $systemModeService
    ) {
        $this->systemModeService = $systemModeService;
    }


    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.system-mode.index', compact([
            'pageName'
        ]));
    }

    public function getSystemModeData()
    {
        return $this->systemModeService->getSystemModeData();
    }

    public function updateSystemModeData(Request $request, $systemModeId)
    {   
        return $this->systemModeService->updateSystemModeData($request, $systemModeId);
    }
}
