<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SettingController extends Controller
{
    private $filePath;

    public function __construct()
    {
        $this->filePath = storage_path('app/settings.json');
    }

    private function getDefaults()
    {
        return [
            'site_name' => 'Codevora',
            'site_logo' => '',
            'site_favicon' => '',
            'link_rel' => '',
            'google_analytics_id' => '',
            'google_tag_manager_id' => '',
            'meta_description' => '',
            'meta_keywords' => '',
            'robots' => 'index, follow'
        ];
    }

    public function index()
    {
        if (!File::exists($this->filePath)) {
            $settings = $this->getDefaults();
            File::ensureDirectoryExists(dirname($this->filePath));
            File::put($this->filePath, json_encode($settings, JSON_PRETTY_PRINT));
        } else {
            $settings = json_decode(File::get($this->filePath), true);
            // Ensure all keys are populated
            $settings = array_merge($this->getDefaults(), $settings);
        }

        return response()->json([
            'status' => 'success',
            'data' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_logo' => 'nullable|string',
            'site_favicon' => 'nullable|string',
            'link_rel' => 'nullable|string',
            'google_analytics_id' => 'nullable|string|max:50',
            'google_tag_manager_id' => 'nullable|string|max:50',
            'meta_description' => 'nullable|string|max:320',
            'meta_keywords' => 'nullable|string|max:500',
            'robots' => 'nullable|string|max:100'
        ]);

        File::ensureDirectoryExists(dirname($this->filePath));
        File::put($this->filePath, json_encode($validated, JSON_PRETTY_PRINT));

        return response()->json([
            'status' => 'success',
            'message' => 'Settings updated successfully',
            'data' => $validated
        ]);
    }
}
