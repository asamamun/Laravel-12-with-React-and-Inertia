<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'start_time' => fake()->dateTime(),
            'end_time' => fake()->dateTime(),
            'location' => fake()->city(),
            'user_id' => 1, // Assuming user with ID 1 exists            
        ];
    }
}
