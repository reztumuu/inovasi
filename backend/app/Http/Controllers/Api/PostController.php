<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ]);
    }

    /**
     * Display the specified resource by slug (Public API).
     */
    public function showBySlug($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return response()->json([
            'status' => 'success',
            'data' => $post
        ]);
    }

    /**
     * Store a newly created resource in storage (Admin API).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'summary' => 'required|string|max:500',
            'image_url' => 'required|url',
            'author_name' => 'nullable|string|max:255'
        ]);

        // Auto generate slug from title
        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(1000, 9999);
        $validated['author_name'] = $validated['author_name'] ?? 'Admin';

        $post = Post::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Blog post created successfully',
            'data' => $post
        ], 201);
    }

    /**
     * Display the specified resource by ID (Admin API).
     */
    public function show(Post $post)
    {
        return response()->json([
            'status' => 'success',
            'data' => $post
        ]);
    }

    /**
     * Update the specified resource in storage (Admin API).
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'summary' => 'sometimes|required|string|max:500',
            'image_url' => 'sometimes|required|url',
            'author_name' => 'sometimes|required|string|max:255'
        ]);

        if (isset($validated['title']) && $validated['title'] !== $post->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(1000, 9999);
        }

        $post->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Blog post updated successfully',
            'data' => $post
        ]);
    }

    /**
     * Remove the specified resource from storage (Admin API).
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Blog post deleted successfully'
        ]);
    }

    /**
     * Trigger auto-scraping of technology articles (Admin API).
     */
    public function scrape(Request $request, \App\Services\TechNewsScraperService $scraper)
    {
        $source = $request->input('source', 'all');
        $limit = (int) $request->input('limit', 5);
        if ($limit < 1 || $limit > 20) {
            $limit = 5;
        }

        $result = $scraper->scrape($source, $limit);

        return response()->json($result);
    }

    /**
     * Get scraper status & settings (Admin API).
     */
    public function scraperStatus()
    {
        $totalPosts = Post::count();
        $latestScraped = Post::where('author_name', 'like', '%Antara%')
            ->orWhere('author_name', 'like', '%Dev.to%')
            ->orderBy('created_at', 'desc')
            ->first();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_posts' => $totalPosts,
                'last_scraped_at' => $latestScraped ? $latestScraped->created_at->toIso8601String() : null,
                'last_scraped_title' => $latestScraped ? $latestScraped->title : null,
                'available_sources' => [
                    ['id' => 'all', 'name' => 'Semua Sumber (Indonesia & Global)'],
                    ['id' => 'antara', 'name' => 'ANTARA News Tekno (Indonesia)'],
                    ['id' => 'devto', 'name' => 'Dev.to Tech & WebDev (Global)'],
                ]
            ]
        ]);
    }
}
