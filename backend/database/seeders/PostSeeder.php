<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Why Headless Architecture is the Future of Web Development',
                'slug' => 'why-headless-architecture-is-the-future-of-web-development',
                'summary' => 'Discover why separating your frontend from your backend can dramatically improve speed, scale, developer productivity, and multi-channel content delivery.',
                'content' => "### Introduction\n\nIn the early days of the web, monolithic frameworks ruled. Your HTML, database, and logic were tightly bound. While simple to launch, monoliths scale poorly when you need to serve content to web browsers, mobile applications, smartwatches, and third-party integrations simultaneously.\n\nEnter **Headless (Decoupled) Architecture**.\n\n### What is Headless?\n\nA headless architecture divides your system into two independent layers:\n1. **The Backend (Headless CMS / Custom API):** Handles data storage, business logic, authentication, and database writes. It exposes this data through secure endpoints (REST or GraphQL).\n2. **The Frontend (The Head):** Fetches data from the API and renders it. You can build separate heads for web (Next.js/React), iOS, Android, and kiosks.\n\n### Core Benefits\n\n- **Improved Speed:** Frontends can be statically generated (SSG) or server-rendered (SSR), caching content globally on CDNs.\n- **Technology Agnosticism:** Your backend developers can build in Laravel 13, while your frontend developers use Next.js and React 19.\n- **Scalability:** High frontend traffic won't bog down database servers. Your static assets are delivered via Edge networks, reducing backend overhead.\n\n### Conclusion\n\nFor modern agencies and software houses, decoupled stacks provide the agility required to launch premium, interactive, and high-performance applications.",
                'image_url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                'author_name' => 'John Doe (CTO)'
            ],
            [
                'title' => 'A Deep Dive into Laravel 13 Features',
                'slug' => 'deep-dive-laravel-13-features',
                'summary' => 'Laravel 13 introduces incredible performance boosts, full PHP 8.4 attributes support for Eloquent models, and a streamlined routing architecture. Let\'s explore what\'s new.',
                'content' => "### The Evolution of Laravel\n\nLaravel continues to dominate the PHP ecosystem. In Laravel 13, the focus is squarely on performance, Developer Experience (DX), and utilizing the latest features of PHP 8.4.\n\n### 1. Eloquent Attributes\n\nPreviously, defining model configurations required properties inside class definitions:\n\n```php\nprotected \$fillable = ['name', 'email'];\nprotected \$hidden = ['password'];\n```\n\nLaravel 13 leverages PHP attributes to declare model configurations cleanly:\n\n```php\n#[Fillable(['name', 'email'])]\n#[Hidden(['password'])]\nclass User extends Authenticatable\n```\n\nThis keeps classes incredibly neat and readable.\n\n### 2. Streamlined Routing & App Bootstrapping\n\nLaravel 13 refines the directory layout, making config file publication and routing structures completely plug-and-play. Bootstrap processes have been optimized to decrease framework overhead by 20% compared to previous versions.\n\n### 3. Native Concurrency\n\nLaravel 13 includes first-class support for parallel execution of asynchronous tasks using PHP fibers, permitting concurrent external API calls or database reads out-of-the-box.\n\n### Wrap Up\n\nLaravel 13 proves that PHP is a modern, fast, and feature-rich language for enterprise backend services.",
                'image_url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                'author_name' => 'Jane Smith (Lead Architect)'
            ],
            [
                'title' => 'Designing Premium Web UX: Gradients, Glassmorphism, and Animations',
                'slug' => 'designing-premium-web-ux',
                'summary' => 'Make your applications feel tactile, premium, and interactive by using modern design patterns responsibly. We discuss how to combine glassmorphism and micro-animations.',
                'content' => "### Aesthetics Sell Software\n\nWhen users land on a website, they form an opinion in less than 50 milliseconds. A generic, flat interface looks like an MVP. A premium interface feels trustworthy, reliable, and premium. Let's look at three design trends that define premium websites in 2026.\n\n### 1. Glassmorphism\n\nGlassmorphism relies on background blur, frosted borders, and subtle shadows to create depth. To make glassmorphism look premium:\n- Use a semi-transparent background color (e.g. `rgba(255, 255, 255, 0.05)`)\n- Add `backdrop-filter: blur(12px)`\n- Use a fine border: `1px solid rgba(255, 255, 255, 0.1)`\n- Place bright, colorful shapes *behind* the blurred elements to create stunning light refractions.\n\n### 2. Tailored Color Gradients\n\nAvoid flat primaries. Instead, combine analogous colors (e.g., deep space indigo to bright electric cyan) or use gradient text masking:\n\n```css\nbackground: linear-gradient(135deg, #a855f7, #06b6d4);\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;\n```\n\n### 3. Tactile Micro-Animations\n\nInteractive elements should feel alive. When a user hovers over a service card, don't just jump. Transition the border glow, lift the card vertically by a few pixels, and scale up any internal icons. Keep transition times short (`0.3s ease`) to make interactions snappy, not sluggish.",
                'image_url' => 'https://images.unsplash.com/photo-1541462608141-2ffb6cc0e9e0?auto=format&fit=crop&w=800&q=80',
                'author_name' => 'Alice Johnson (Lead Designer)'
            ]
        ];

        foreach ($posts as $post) {
            Post::updateOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }
    }
}
