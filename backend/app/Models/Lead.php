<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'email', 'company', 'project_type', 'message', 'status'])]
class Lead extends Model
{
    //
}
