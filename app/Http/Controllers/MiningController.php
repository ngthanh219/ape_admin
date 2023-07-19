<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MiningService;

class MiningController
{
    protected $miningService;
    public $pageName = 'Mining of user';

    public function __construct(
        MiningService $miningService
    ) {
        $this->miningService = $miningService;
    }

    public function index()
    {
        $pageName = $this->pageName;

        return view('pages.mining.index', compact([
            'pageName'
        ]));
    }

    public function getMiningData(Request $request)
    {
        return $this->miningService->getMiningData($request);
    }
}
