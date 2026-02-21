<?php 

namespace App\Enums; 


enum Roles: string
{
    case ADMIN =  'ADMIN';
    case MERCHANT = 'MERCHANT';

    public function label(): string 
    {
        return $this->value;
    }
}