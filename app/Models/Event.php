<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;
    //mass assignable
    protected $fillable = [
        'name',
        'description',
        'start_time',
        'end_time',
        'location',
        'user_id',
    ];

    //events belongs to users
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
