<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workout extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id',
        'workout_id',
        'workout_name',
        'workout_categ',
        'workout_equip',
    ];
    // Workout - User relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
