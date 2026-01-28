<script lang="ts" setup></script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
  >
    <h1 class="text-6xl font-bold text-white mb-4">404</h1>
    <p class="text-white text-xl mb-8">Page Not Found</p>
    <RouterLink
      to="/"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Go to Home
    </RouterLink>
  </div>
</template>
