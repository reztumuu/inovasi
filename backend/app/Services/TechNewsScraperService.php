<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TechNewsScraperService
{
    /**
     * Fallback high quality technology image URLs.
     */
    private static array $fallbackImages = [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    ];

    /**
     * Run scraping based on source.
     */
    public function scrape(string $source = 'all', int $limit = 5): array
    {
        $created = [];
        $skipped = 0;
        $errors = [];

        if ($source === 'all' || $source === 'antara') {
            $antaraRes = $this->scrapeAntara($limit);
            $created = array_merge($created, $antaraRes['created']);
            $skipped += $antaraRes['skipped'];
            $errors = array_merge($errors, $antaraRes['errors']);
        }

        if ($source === 'all' || $source === 'devto') {
            $devtoRes = $this->scrapeDevTo($limit);
            $created = array_merge($created, $devtoRes['created']);
            $skipped += $devtoRes['skipped'];
            $errors = array_merge($errors, $devtoRes['errors']);
        }

        return [
            'status' => 'success',
            'scraped_count' => count($created),
            'skipped_count' => $skipped,
            'articles' => $created,
            'errors' => $errors,
            'message' => count($created) . ' berita baru berhasil ditambahkan (' . $skipped . ' sudah ada).'
        ];
    }

    /**
     * Scrape technology news from Antara News RSS (Indonesian).
     */
    public function scrapeAntara(int $limit = 5): array
    {
        $created = [];
        $skipped = 0;
        $errors = [];

        try {
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept' => 'application/rss+xml, application/xml, text/xml',
            ])->timeout(15)->get('https://www.antaranews.com/rss/tekno.xml');

            if (!$response->ok()) {
                $errors[] = 'Gagal menghubungi Antara RSS: HTTP ' . $response->status();
                return ['created' => $created, 'skipped' => $skipped, 'errors' => $errors];
            }

            $xml = @simplexml_load_string($response->body(), 'SimpleXMLElement', LIBXML_NOCDATA);
            if (!$xml || !isset($xml->channel->item)) {
                $errors[] = 'Format XML Antara tidak valid.';
                return ['created' => $created, 'skipped' => $skipped, 'errors' => $errors];
            }

            $count = 0;
            foreach ($xml->channel->item as $item) {
                if ($count >= $limit) break;

                $title = trim((string) $item->title);
                if (empty($title)) continue;

                // Check duplicate title or similar
                if (Post::where('title', $title)->exists()) {
                    $skipped++;
                    continue;
                }

                $link = trim((string) $item->link);
                $rawDesc = (string) $item->description;
                $cleanDesc = trim(strip_tags($rawDesc));
                $cleanDesc = preg_replace('/\s+/', ' ', $cleanDesc);

                // Image extraction
                $imageUrl = '';
                if (isset($item->enclosure) && !empty($item->enclosure['url'])) {
                    $imageUrl = (string) $item->enclosure['url'];
                }
                if (empty($imageUrl) && preg_match('/src=["\']([^"\']+)["\']/i', $rawDesc, $m)) {
                    $imageUrl = $m[1];
                }
                if (empty($imageUrl)) {
                    $imageUrl = self::$fallbackImages[array_rand(self::$fallbackImages)];
                }

                // Build rich article content
                $content = $this->buildAntaraContent($title, $cleanDesc, $link);
                $summary = Str::limit($cleanDesc, 260, '...');

                $slug = Str::slug($title);
                if (Post::where('slug', $slug)->exists()) {
                    $slug .= '-' . rand(100, 999);
                }

                $post = Post::create([
                    'title' => $title,
                    'slug' => $slug,
                    'summary' => $summary,
                    'content' => $content,
                    'image_url' => $imageUrl,
                    'author_name' => 'Antara Tekno',
                ]);

                $created[] = [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'source' => 'Antara Tekno',
                ];
                $count++;
            }
        } catch (\Throwable $e) {
            Log::error('Scrape Antara Error: ' . $e->getMessage());
            $errors[] = 'Error Antara: ' . $e->getMessage();
        }

        return ['created' => $created, 'skipped' => $skipped, 'errors' => $errors];
    }

    /**
     * Scrape technology & web dev articles from Dev.to API (Global).
     */
    public function scrapeDevTo(int $limit = 5): array
    {
        $created = [];
        $skipped = 0;
        $errors = [];

        try {
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CodevoraScraper/1.0',
                'Accept' => 'application/json',
            ])->timeout(15)->get('https://dev.to/api/articles', [
                'tag' => 'technology',
                'per_page' => $limit * 2,
            ]);

            if (!$response->ok()) {
                $errors[] = 'Gagal menghubungi Dev.to API: HTTP ' . $response->status();
                return ['created' => $created, 'skipped' => $skipped, 'errors' => $errors];
            }

            $articles = $response->json();
            if (!is_array($articles)) {
                $errors[] = 'Respon Dev.to bukan format array.';
                return ['created' => $created, 'skipped' => $skipped, 'errors' => $errors];
            }

            $count = 0;
            foreach ($articles as $art) {
                if ($count >= $limit) break;

                $title = trim($art['title'] ?? '');
                if (empty($title)) continue;

                if (Post::where('title', $title)->exists()) {
                    $skipped++;
                    continue;
                }

                // Fetch full article markdown
                $artId = $art['id'] ?? null;
                $markdown = '';
                if ($artId) {
                    try {
                        $detailRes = Http::withHeaders([
                            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CodevoraScraper/1.0',
                        ])->timeout(10)->get("https://dev.to/api/articles/{$artId}");
                        if ($detailRes->ok()) {
                            $detailData = $detailRes->json();
                            $markdown = $detailData['body_markdown'] ?? '';
                        }
                    } catch (\Throwable) {
                        // fallback to description
                    }
                }

                $description = trim($art['description'] ?? '');
                if (empty($markdown)) {
                    $markdown = $description . "\n\nArtikel ini membahas perkembangan teknologi terkini dan dampaknya pada industri digital modern.";
                }

                $imageUrl = $art['cover_image'] ?? $art['social_image'] ?? '';
                if (empty($imageUrl)) {
                    $imageUrl = self::$fallbackImages[array_rand(self::$fallbackImages)];
                }

                $author = $art['user']['name'] ?? 'Dev.to Tech';
                $summary = Str::limit($description, 260, '...');

                $slug = Str::slug($title);
                if (Post::where('slug', $slug)->exists()) {
                    $slug .= '-' . rand(100, 999);
                }

                $post = Post::create([
                    'title' => $title,
                    'slug' => $slug,
                    'summary' => $summary,
                    'content' => $markdown,
                    'image_url' => $imageUrl,
                    'author_name' => $author,
                ]);

                $created[] = [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'source' => 'Dev.to',
                ];
                $count++;
            }
        } catch (\Throwable $e) {
            Log::error('Scrape Dev.to Error: ' . $e->getMessage());
            $errors[] = 'Error Dev.to: ' . $e->getMessage();
        }

        return ['created' => $created, 'skipped' => $skipped, 'errors' => $errors];
    }

    /**
     * Build informative multi-paragraph content from Antara RSS item.
     */
    private function buildAntaraContent(string $title, string $desc, string $sourceUrl): string
    {
        $paragraphs = [];
        $paragraphs[] = "### Ringkasan Informasi\n\n" . $desc;
        $paragraphs[] = "Perkembangan pesat di bidang teknologi dan kecerdasan buatan terus mengubah cara hidup masyarakat dan ekosistem industri modern. Pemahaman yang mendalam mengenai inovasi digital menjadi kunci untuk mengoptimalkan potensi serta menjaga keamanan data dalam aktivitas sehari-hari.";
        $paragraphs[] = "Melalui inovasi yang terus bertumbuh, adopsi teknologi mutakhir diharapkan mampu memberikan solusi praktis, efisien, dan berdaya saing tinggi bagi masyarakat maupun dunia usaha di era serba terhubung saat ini.";
        if (!empty($sourceUrl)) {
            $paragraphs[] = "*Sumber referensi berita: [ANTARA News](" . $sourceUrl . ")*";
        }

        return implode("\n\n", $paragraphs);
    }
}
