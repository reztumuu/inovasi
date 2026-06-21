<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolios = [
            [
                'title' => 'E-Commerce Re-architecture',
                'client_name' => 'Apex Retailers Group',
                'category' => 'Web Development',
                'description' => 'Re-engineered a legacy monolithic platform into a decoupled headless solution, resulting in 40% faster load times and a 15% increase in conversion rates.',
                'image_url' => 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80',
                'tech_stack' => ['Next.js', 'Laravel API', 'MySQL', 'Redis', 'Docker', 'Stripe'],
                'live_url' => 'https://apex-retail.demo.com',
                'order' => 1
            ],
            [
                'title' => 'FitTrack Mobile Application',
                'client_name' => 'FitLife Global Inc.',
                'category' => 'Mobile App Development',
                'description' => 'Developed a cross-platform fitness app featuring real-time health data sync, push notifications, and customizable workout schedules.',
                'image_url' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
                'tech_stack' => ['React Native', 'Laravel API', 'MySQL', 'Firebase', 'Apple HealthKit'],
                'live_url' => 'https://fittrack-app.demo.com',
                'order' => 2
            ],
            [
                'title' => 'Secure AWS Cloud Infrastructure Migration',
                'client_name' => 'FinTech Ventures',
                'category' => 'Cloud & DevOps Solutions',
                'description' => 'Successfully migrated legacy financial software systems to a containerized, auto-scaling AWS infrastructure with a full CI/CD delivery pipeline.',
                'image_url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
                'tech_stack' => ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Laravel'],
                'live_url' => null,
                'order' => 3
            ]
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::updateOrCreate(
                ['title' => $portfolio['title']],
                $portfolio
            );
        }
    }
}
