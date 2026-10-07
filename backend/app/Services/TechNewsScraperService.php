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
                $articleData = $this->fetchAntaraFullArticle($link, $title, $cleanDesc);
                $content = $articleData['content'];
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

                $artUrl = $art['url'] ?? "https://dev.to";
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
                    $markdown = $description . "\n\n## Overview\n\nThis article examines current technological developments and software engineering patterns in modern distributed ecosystems.";
                }

                // Strip ads / scripts / raw HTML leaked from the source markdown
                $markdown = $this->sanitizeContent($markdown);

                // Append official credit with clean markdown link
                $author = $art['user']['name'] ?? 'Dev.to Tech';
                $markdown .= "\n\n---\n\n*Original article published by [{$author} on Dev.to]({$artUrl})*";

                $imageUrl = $art['cover_image'] ?? $art['social_image'] ?? '';
                if (empty($imageUrl)) {
                    $imageUrl = self::$fallbackImages[array_rand(self::$fallbackImages)];
                }

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
     * Strip ads, tracking scripts, and leftover raw HTML from scraped content
     * so things like "(adsbygoogle = window.adsbygoogle || []).push({});"
     * never leak into the stored article body.
     */
    private function sanitizeContent(string $content): string
    {
        // Remove full <script>...</script> blocks (ads, trackers, etc.)
        $content = preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $content);

        // Remove self-closing or unclosed script tags
        $content = preg_replace('/<script\b[^>]*>/i', '', $content);
        $content = preg_replace('/<\/script>/i', '', $content);

        // Remove <ins class="adsbygoogle">...</ins> ad units (with or without closing tag)
        $content = preg_replace('/<ins\b[^>]*adsbygoogle[^>]*>.*?<\/ins>/is', '', $content);
        $content = preg_replace('/<ins\b[^>]*adsbygoogle[^>]*>/i', '', $content);

        // Remove leftover inline ad trigger, e.g. "(adsbygoogle = window.adsbygoogle || []).push({});"
        $content = preg_replace(
            '/\(\s*adsbygoogle\s*=\s*window\s*\.\s*adsbygoogle\s*(?:\|\||or)\s*\[\s*\]\s*\)\s*\.\s*push\s*\(\s*\{[^}]*\}\s*\)\s*;?/i',
            '',
            $content
        );

        // Remove generic google ad markup fragments / comments
        $content = preg_replace('/<!--?\s*(?:google_|adsense|adsbygoogle)[^>]*>?/i', '', $content);
        $content = preg_replace('/<div\b[^>]*id=["\']google_ads[^>]*>.*?<\/div>/is', '', $content);
        $content = preg_replace('/<iframe\b[^>]*googlesyndication[^>]*>.*?<\/iframe>/is', '', $content);

        // Remove leftover raw HTML tags that are not valid markdown
        $content = preg_replace('/<\/?(?:script|ins|iframe|noscript|object|embed)\b[^>]*>/i', '', $content);

        // Drop now-empty paragraphs and collapse excessive blank lines
        $content = preg_replace('/<p>\s*<\/p>/i', '', $content);
        $content = preg_replace("/\n{3,}/", "\n\n", $content);

        return trim($content);
    }

    /**
     * Fetch and build structured article from Antara website.
     */
    private function fetchAntaraFullArticle(string $url, string $title, string $desc): array
    {
        $content = '';
        $videoId = null;

        try {
            $res = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept' => 'text/html,application/xhtml+xml',
            ])->timeout(10)->get($url);

            if ($res->ok()) {
                $html = $res->body();

                // Check for YouTube Video Embed
                if (preg_match('/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i', $html, $vMatch)) {
                    $videoId = $vMatch[1];
                }

                preg_match_all('/<p>(.*?)<\/p>/s', $html, $matches);
                $validParagraphs = [];
                foreach ($matches[1] as $p) {
                    $text = trim(strip_tags($p));
                    $text = $this->sanitizeContent($text);
                    if (
                        strlen($text) > 40 &&
                        !str_starts_with($text, 'Baca juga') &&
                        !str_starts_with($text, 'Pewarta') &&
                        !str_starts_with($text, 'Editor') &&
                        !str_starts_with($text, 'Copyright') &&
                        !str_starts_with($text, 'Foto:')
                    ) {
                        $validParagraphs[] = $text;
                    }
                }

                if (count($validParagraphs) >= 2) {
                    $sections = [];
                    if ($videoId) {
                        $sections[] = "<!-- FLAMES_YOUTUBE_VIDEO_ID:{$videoId} -->";
                    }

                    $opening = array_slice($validParagraphs, 0, 2);
                    $sections[] = implode("\n\n", $opening);

                    if (count($validParagraphs) > 2) {
                        $sections[] = "## Pembahasan & Fakta Utama";
                        $mid = array_slice($validParagraphs, 2, 4);
                        $sections[] = implode("\n\n", $mid);
                    }

                    if (count($validParagraphs) > 6) {
                        $sections[] = "## Dampak & Informasi Lanjutan";
                        $rest = array_slice($validParagraphs, 6, 5);
                        $sections[] = implode("\n\n", $rest);
                    }

                    $sections[] = "## Kesimpulan";
                    $sections[] = "Perkembangan informasi teknologi seperti ini penting untuk dipahami agar kita senantiasa waspada dan dapat memanfaatkan teknologi secara tepat, aman, dan optimal.";
                    $sections[] = "---\n\n*Sumber berita resmi: [ANTARA News Tekno]({$url})*";

                    $content = implode("\n\n", $sections);
                }
            }
        } catch (\Throwable $e) {
            Log::warning("Fetch full Antara failed: " . $e->getMessage());
        }

        if (empty($content)) {
            $sections = [];
            if ($videoId) {
                $sections[] = "<!-- FLAMES_YOUTUBE_VIDEO_ID:{$videoId} -->";
            }
            $sections[] = $desc;
            $sections[] = "## Poin Penting";
            $sections[] = "- Pemahaman terhadap perkembangan teknologi terkini membantu menjaga keamanan data dan perangkat pribadi.\n- Pastikan selalu memverifikasi informasi dan mempraktikkan langkah keamanan yang direkomendasikan para ahli.";
            $sections[] = "## Kesimpulan";
            $sections[] = "Di tengah arus digitalisasi yang kian cepat, edukasi teknologi menjadi pilar utama untuk aktivitas digital yang aman dan produktif.";
            $sections[] = "---\n\n*Sumber berita resmi: [ANTARA News Tekno]({$url})*";
            $content = implode("\n\n", $sections);
        }

        return ['content' => $content, 'video_id' => $videoId];
    }
}
