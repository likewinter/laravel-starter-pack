<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Share user api token -->
    @auth
    <script>
      window.__API_TOKEN = '{{ Auth::user()->api_token }}'
    </script>
    @endauth

    <!-- Scripts -->
    <script src="{{ asset_webpack('vendor.js') }}" defer></script>
    <script src="{{ asset_webpack('app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset_webpack('app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app">
    @include('layouts._navbar')
    <main class="py-4">
        <test-component></test-component>
        @yield('content')
    </main>
</div>
</body>
</html>
