<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StateController extends Controller
{
    public function global(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'auth' => $user !== null,
            'userId' => optional($user)->id,
        ]);
    }
}
