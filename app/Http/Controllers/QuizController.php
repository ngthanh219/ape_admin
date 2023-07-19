<?php

namespace App\Http\Controllers;

use App\Imports\QuizImport;
use App\Services\QuizService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class QuizController
{
    public $pageName = 'Quiz';
    protected $quizService;

    public function __construct(
        QuizService $quizService
    ) {
        $this->quizService = $quizService;
    }

    public function importDataQA(Request $request)
    {
        $file = $request->file('file');
        $data = Excel::toArray(new QuizImport, $file);

        $systemConfig = $this->quizService->importDataQA($data);

        if ($systemConfig["success"] == 0) {
            return redirect()->back()->with('quiz', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $systemConfig['error']['error_message']
            ]);
        }

        return redirect()->route('quiz.index')->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => 'Import success'
        ]);
    }   

    public function index(Request $request)
    {
        $pageName = $this->pageName;

        return view('pages.quiz.index', compact([
            'pageName'
        ]));
    }

    public function getImportForm()
    {
        $pageName = "Import " . $this->pageName;

        return view('pages.quiz.import', compact([
            'pageName',
        ]));
    }
}
