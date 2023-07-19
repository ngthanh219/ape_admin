<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class QuizImport implements WithMultipleSheets 
{
    public function sheets(): array
    {
        return [
            '1-STAR' => new FirstSheetImport(),
            '2-STAR' => new SecondSheetImport(),
            '3-STAR' => new ThirdSheetImport()
        ];
    }
}
