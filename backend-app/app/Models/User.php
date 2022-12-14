<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\BodyLog;
use App\Models\Workout;
use App\Models\CaloriesOut;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id'
    ];

    // User - Logs relationship
    public function logs()
    {
        return  $this->hasMany(BodyLog::class);
    }

    // User - Workouts relationship
    public function workouts()
    {
        return  $this->hasMany(Workout::class);
    }

    // User - CaloriesOut relationship
    public function caloriesout()
    {
        return  $this->hasMany(CaloriesOut::class);
    }

    // User - CaloriesIn relationship
    public function caloriesin()
    {
        return  $this->hasMany(CaloriesOut::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
