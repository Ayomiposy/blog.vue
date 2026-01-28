<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

interface Post {
  id: string;
  title: string;
  content: string;
  // Add other fields from your API response
  author?: string;
  date?: string;
  category?: string;
}

const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch("https://api.oluwasetemi.dev/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    posts.value = result.data; // Adjust based on your API response structure
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An error occurred";
  } finally {
    loading.value = false;
  }
});

// defining linkt to individual post view
const visitPost = (id: string) => {
  window.location.href = `/blogs/${id}`;
};
</script>

<template>
  <div>
    <!-- While waiting for data do loading -->
    <div
      v-if="loading"
      class="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div class="text-white text-xl">Loading posts...</div>
    </div>

    <!-- If there is an error show error message -->
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div class="text-red-500 text-xl">Error: {{ error }}</div>
    </div>

    <div
      v-else
      class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-6xl mx-auto">
        <h2 class="text-5xl font-bold text-white mb-12 text-center">
          Latest Posts
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="post in posts"
            :key="post.id"
            @click="visitPost(post.id)"
            class="bg-linear-to-br from-slate-700 to-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-600"
          >
            <h4 class="text-xl font-bold text-white mb-3 line-clamp-2">
              {{ post.title }}
            </h4>
            <p class="text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed">
              {{ post.content }}
            </p>
            <div class="flex items-center justify-between">
              <span
                class="inline-block bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >{{ post.category || "Uncategorized" }}</span
              >

              <RouterLink
                :to="`/blogs/${post.id}`"
                class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >Read More →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
