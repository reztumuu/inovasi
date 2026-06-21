<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portfolios = Portfolio::orderBy('order', 'asc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $portfolios
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'required|url',
            'tech_stack' => 'required|array',
            'tech_stack.*' => 'string',
            'live_url' => 'nullable|url',
            'order' => 'integer'
        ]);

        $portfolio = Portfolio::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Portfolio created successfully',
            'data' => $portfolio
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio)
    {
        return response()->json([
            'status' => 'success',
            'data' => $portfolio
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image_url' => 'sometimes|required|url',
            'tech_stack' => 'sometimes|required|array',
            'tech_stack.*' => 'string',
            'live_url' => 'nullable|url',
            'order' => 'sometimes|integer'
        ]);

        $portfolio->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Portfolio updated successfully',
            'data' => $portfolio
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Portfolio deleted successfully'
        ]);
    }
}
