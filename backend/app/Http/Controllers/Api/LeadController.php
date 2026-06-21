<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the leads (Admin API).
     */
    public function index()
    {
        $leads = Lead::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $leads
        ]);
    }

    /**
     * Store a newly created lead in storage (Public API).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'project_type' => 'required|string|max:255',
            'message' => 'required|string|max:2000'
        ]);

        $lead = Lead::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Your message has been sent successfully. We will contact you soon!',
            'data' => $lead
        ], 201);
    }

    /**
     * Update the status of a lead (Admin API).
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,contacted,archived'
        ]);

        $lead = Lead::findOrFail($id);
        $lead->status = $validated['status'];
        $lead->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Lead status updated successfully',
            'data' => $lead
        ]);
    }

    /**
     * Delete a lead (Admin API).
     */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Lead deleted successfully'
        ]);
    }
}
