<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CaloriesOut extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id',
        'calories',
    ];

    // CaloriesOut - User relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
