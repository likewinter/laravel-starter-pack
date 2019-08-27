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

        if (app()->environment('local')) {
            $hotFilePath = public_path('hot');
            if (File::exists($hotFilePath)) {
                $manifest = json_decode(
                    file_get_contents(
                        File::get($hotFilePath) . 'manifest.json',
                        false,
                        // Turns off self-signer certificates check
                        stream_context_create([
                            'ssl' => [
                                'verify_peer' => false,
                                'verify_peer_name' => false,
                            ],
                        ])
                    ),
                    true
                );

                return $manifest[$assetName];
            }
        }

        return asset($manifest[$assetName] ?? $assetName);
    }
}
