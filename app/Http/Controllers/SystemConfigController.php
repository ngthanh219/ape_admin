<?php

namespace App\Http\Controllers;

use App\Exports\SystemConfigExport;
use App\Http\Requests\GetSystemConfigDataRequest;
use App\Imports\SystemConfigImport;
use App\Libraries\Message;
use Illuminate\Http\Request;
use App\Services\SystemConfigService;
use Maatwebsite\Excel\Facades\Excel;

class SystemConfigController extends Controller
{   
    protected $systemConfigService;
    public $pageName = 'System config';

    public function __construct(
        SystemConfigService $systemConfigService
    ) {
        $this->systemConfigService = $systemConfigService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.system-config.index', compact([
            'pageName'
        ]));
    }

    public function getSystemConfigData(GetSystemConfigDataRequest $request)
    {
        return $this->systemConfigService->getSystemConfigData($request);
    }

    public function createSystemConfigData()
    {
        $pageName = "New " . $this->pageName;

        return view('pages.system-config.create', compact([
            'pageName',
        ]));
    }

    public function storeSystemConfigData(Request $request)
    {
        $systemConfig = $this->systemConfigService->storeSystemConfigData($request);

        if ($systemConfig['success'] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        return redirect()->route('system-config.show', $systemConfig['data']['id'])->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::CREATE_SUCCESS
        ]);
    }

    public function showSystemConfigData($id)
    {
        $systemConfig = $this->systemConfigService->showSystemConfigData($id);

        if ($systemConfig["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }
        
        $pageName = $this->pageName . ": " . $systemConfig['data']['key'];
        $systemConfig = $systemConfig['data'];

        if (gettype($systemConfig['value']) == 'array') {
            $systemConfig['value'] = json_encode($systemConfig['value']);
        }

        return view('pages.system-config.show', compact([
            'pageName',
            'systemConfig'
        ]));
    }

    public function updateSystemConfigData(Request $request, $id)
    {
        $systemConfig = $this->systemConfigService->updateSystemConfigData($request, $id);

        if ($systemConfig["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::UPDATE_SUCCESS
        ]);
    }

    public function deleteSystemConfigData(Request $request, $id)
    {
        $systemConfig = $this->systemConfigService->deleteSystemConfigData($id);

        if ($systemConfig["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => $systemConfig["message"]
        ]);
    }

    public function exportData(Request $request)
    {
        $systemConfigs = $this->systemConfigService->getAllSystemConfigs();

        if ($systemConfigs["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfigs['error']['error_message']
            ]);
        }

        $data = [];

        foreach ($systemConfigs['data'] as $key => $item) {
            array_push($data, [
                'key' => $key,
                'value' => $item
            ]);
        }

        return Excel::download(new SystemConfigExport($data), 'system-config-' . now() . '.xlsx');
    }

    public function getImportForm()
    {
        $pageName = "Import " . $this->pageName;

        return view('pages.system-config.import', compact([
            'pageName',
        ]));
    }

    public function importData(Request $request)
    {
        $file = $request->file('file');
        $data = Excel::toArray(new SystemConfigImport, $file)[0];
        $systemConfig = $this->systemConfigService->importData($data);

        if ($systemConfig["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        return redirect()->route('system-config')->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => $systemConfig["message"]
        ]);
    }
}
