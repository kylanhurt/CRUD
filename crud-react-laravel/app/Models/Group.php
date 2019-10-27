<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = 'groups';

    public function people()
    {
        return $this->hasMany(People::class);
    }
}
