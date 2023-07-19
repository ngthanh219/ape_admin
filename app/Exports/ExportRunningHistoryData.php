<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class ExportRunningHistoryData implements FromCollection
{
    private $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return collect($this->data);
    }

    public function headings() :array
    {
        return [
            'ID',
            'Avatar',
            'First name',
            'Last name',
            'Email',
            'Email',
            "Total distances",
            "Total steps",
            "Total times",
            "Total earned"
        ];
    }
}
