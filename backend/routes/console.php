<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Services\TechNewsScraperService;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('posts:scrape {source=all} {limit=5}', function (TechNewsScraperService $scraper) {
    $source = $this->argument('source');
    $limit = (int) $this->argument('limit');
    $this->info("Memulai auto-scraping berita teknologi (Sumber: {$source}, Limit: {$limit})...");

    $res = $scraper->scrape($source, $limit);

    $this->info($res['message']);
    if (!empty($res['errors'])) {
        foreach ($res['errors'] as $err) {
            $this->error($err);
        }
    }
})->purpose('Scrape latest technology news from external sources');

Schedule::command('posts:scrape all 5')->dailyAt('06:00');
