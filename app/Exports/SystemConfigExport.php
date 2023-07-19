<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class SystemConfigExport implements FromCollection
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
            'Key',
            'Value',
        ];
    }
}
