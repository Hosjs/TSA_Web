<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\QuestionType;
class QuestionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        QuestionType::insert([
            ['name'=> 'MCQSingle'],
            ['name'=> 'MCQMulti'],
            ['name'=> 'Essay'],
            ['name'=> 'Fill']
        ]);
    }
}
