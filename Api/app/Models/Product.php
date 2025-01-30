<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'id';
    protected $table = "products";
    protected $fillable = ['name', 'description', 'preco', 'disponible'];
}
