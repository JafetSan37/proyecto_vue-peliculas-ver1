<template>
  <div v-if="movie">
    <h2>{{ movie.title }}</h2>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Póster" />
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMovieDetails } from "@/api";
import { useRoute } from "vue-router";

const route = useRoute();
const movie = ref(null);

onMounted(async () => {
  movie.value = await getMovieDetails(route.params.id);
});
</script>
