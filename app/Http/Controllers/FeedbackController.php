<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FeedbackService;
use App\Http\Requests\GetUserDataRequest;
use App\Libraries\Message;

class FeedbackController extends Controller
{
    protected $feedbackService;
    public $pageName = 'Feedback';

    public function __construct(
        FeedbackService $feedbackService
    ) {
        $this->feedbackService = $feedbackService;
    }

    public function index(Request $request)
    {
        $pageName = $this->pageName;

        return view('pages.feedback.index', compact([
            'pageName'
        ]));
    }

    public function getFeedbackData(Request $request)
    {
        return $this->feedbackService->getFeedbackData($request);
    }

    public function showFeedback($id)
    {
        $feedback = $this->feedbackService->showFeedbackData($id);

        if ($feedback["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $feedback['error']['error_message']
            ]);
        }

        $feedback = $feedback['data'];
        $pageName = $this->pageName . ": " . $feedback['id'];

        return view('pages.feedback.detail', compact([
            'pageName',
            'feedback'
        ]));
    }

    public function showFeedbackData($id)
    {
        return $this->feedbackService->showFeedbackData($id);
    }

    public function replyFeedbackData(Request $request, $id)
    {
        $feedback = $this->feedbackService->replyFeedbackData($request, $id);

        if ($feedback["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $feedback['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::SENT_SUCCESS
        ]);
    }

    public function updateFeedbackData(Request $request, $id)
    {
        return $this->feedbackService->updateFeedbackData($request, $id);
    }

    public function deleteFeedbackData(Request $request, $id)
    {
        return $this->feedbackService->deleteFeedbackData($request, $id);
    }

    public function indexCustomMail()
    {
        $pageName = $this->pageName;

        $users = $this->feedbackService->getListUser()['data']['data'];

        return view('pages.feedback.custom-mail', compact([
            'pageName',
            'users'
        ]));
    }

    public function sendMailToUser(Request $request)
    {
        $mail = $this->feedbackService->sendMailToUser($request);

        if ($mail["success"] == 0) {
            return redirect()->back()->with('notification', [
                'icon' => 'ban',
                'type' => 'danger',
                'message' => $mail['error']['error_message']
            ]);
        }

        return redirect()->back()->with('notification', [
            'icon' => 'check',
            'type' => 'success',
            'message' => Message::SENT_SUCCESS
        ]);
    }

}
