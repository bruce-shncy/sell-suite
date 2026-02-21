<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
       $this->call(RoleSeeder::class);

       $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@sellsuite.com',
            'password' => 'password',
            'email_verified_at' => now(),
       ]);

       $admin->assignRole(Roles::ADMIN->value);

    }
}
