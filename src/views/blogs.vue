<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

interface Post {
  id: string;
  title: string;
  content: string;
  author?: string;
  userId?: number;
}

const route = useRoute();
const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// fetch a single post by ID
const fetchPost = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
      `https://api.oluwasetemi.dev/posts/${route.params.id}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    posts.value = [result]; // Wrap in array since template expects array
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An error occurred";
  } finally {
    loading.value = false;
  }
};

// Fetch post after component has mounted
onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div>
    <!-- While waiting for data do loading -->
    <div
      v-if="loading"
      class="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div class="text-white text-xl">Loading post...</div>
    </div>

    <!-- If there is an error show error message -->
    <div
      v-else-if="error"
      class="h-screen flex flex-col justify-center items-center w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div class="text-red-500 text-xl">Error: {{ error }}</div>
      <RouterLink
        to="/"
        class="text-blue-400 hover:text-blue-300 transition-colors"
        >← Back to Home</RouterLink
      >
    </div>

    <div
      v-else
      class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-3xl mx-auto">
        <!-- Back Button -->
        <RouterLink
          to="/"
          class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 font-semibold"
        >
          ← Back to Home
        </RouterLink>

        <!-- Post Card -->
        <article
          class="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-10 shadow-2xl border border-slate-600"
        >
          <!-- Post Title -->
          <h1 class="text-5xl font-bold text-white mb-6 leading-tight">
            {{ posts[0]?.title }}
          </h1>

          <!-- Post Metadata -->
          <div class="flex flex-wrap gap-4 mb-8 pb-8 border-b border-slate-600">
            <div class="flex items-center gap-2">
              <span class="text-slate-400">Author:</span>
              <span class="text-white font-semibold">{{
                posts[0]?.author || "Unknown"
              }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-slate-400">User ID:</span>
              <span class="text-white font-semibold">{{
                posts[0]?.userId || "N/A"
              }}</span>
            </div>
          </div>

          <!-- Post Content -->
          <div class="prose prose-invert max-w-none mb-8">
            <p
              class="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap"
            >
              {{ posts[0]?.content }}
            </p>
          </div>

          <!-- Footer with Back Button -->
          <div
            class="flex justify-between items-center pt-8 border-t border-slate-600"
          >
            <RouterLink
              to="/"
              class="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              ← Back to Posts
            </RouterLink>
            <span class="text-slate-400 text-sm">{{
              new Date().toLocaleDateString()
            }}</span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
