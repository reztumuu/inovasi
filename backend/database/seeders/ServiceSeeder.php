<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Custom website development, corporate portals, e-commerce systems, and SaaS platforms built using modern technologies like Next.js, React, and Laravel.',
                'icon_name' => 'Globe',
                'order' => 1
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'High-performance native and cross-platform mobile applications for iOS and Android, powered by React Native, Flutter, Swift, and Kotlin.',
                'icon_name' => 'Smartphone',
                'order' => 2
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Intuitive, human-centered UI/UX designs. We construct detailed wireframes, high-fidelity prototypes, and design systems focused on conversion.',
                'icon_name' => 'Palette',
                'order' => 3
            ],
            [
                'title' => 'Cloud & DevOps Solutions',
                'description' => 'Secure, scalable cloud architectures on AWS, GCP, and Azure. We automate deployment pipelines with CI/CD and manage containers via Docker and Kubernetes.',
                'icon_name' => 'Cloud',
                'order' => 4
            ],
            [
                'title' => 'AI & Intelligent Systems',
                'description' => 'Harnessing the power of AI to optimize your workflows. We develop custom chatbot applications, NLP engines, data models, and workflow automation.',
                'icon_name' => 'Cpu',
                'order' => 5
            ]
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['title' => $service['title']],
                $service
            );
        }
    }
}
