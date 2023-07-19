<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToArray;

class SystemConfigImport implements ToArray
{
    /**
    * @param Collection $collection
    */
    public function array(array $row)
    {
        return $row;
    }
}
