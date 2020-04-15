<?php
if (!function_exists('asset_webpack')) {
    /**
     * Get asset path from Webpack manifest or from local dev server
     *
     * @param string $assetName
     *
     * @return string
     */
    function asset_webpack(string $assetName): string
    {
        $manifestFilePath = public_path('manifest.json');
        if (File::exists($manifestFilePath)) {
            $manifest = json_decode(File::get($manifestFilePath), true);
        }

        return asset($manifest[$assetName] ?? $assetName);
    }
}
