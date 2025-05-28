<template>
  <div>
    <input v-model="searchQuery" @input="fetchMovies" placeholder="Buscar película..." />
    <div v-if="movies.length">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @click="showDetails(movie.id)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getMovies } from "@/api";
import MovieCard from "./MovieCard.vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const movies = ref([]);
const router = useRouter();

const fetchMovies = async () => {
  if (searchQuery.value) {
    movies.value = await getMovies(searchQuery.value);
  }
};

const showDetails = (movieId) => {
  router.push(`/movie/${movieId}`);
};
</script>
