<?php

namespace App\Http\Controllers;

use App\Services\GearService;
use Illuminate\Http\Request;

class GearController extends Controller
{
    protected $gearService;
    public $pageName = 'Gear';

    public function __construct(
        GearService $gearService
    ) {
        $this->gearService = $gearService;
    }

    public function getGear(Request $request)
    {
        $pageName = $this->pageName;

        return view('pages.gear.index', compact([
            'pageName'
        ]));
    }

    public function getGearData(Request $request)
    {
        return $this->gearService->getGearData($request);
    }

    public function getGearDetailPopup()
    {
        return view('pages.gear.detail');
    }

    public function getGearDetail($id)
    {
        return $this->gearService->getGearDetail($id);
    }
}
