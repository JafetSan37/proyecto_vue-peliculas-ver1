<template>
  <div class="search-container">
    <input v-model="searchQuery" @input="fetchMovies" placeholder="Buscar película..." />

    <select v-model="selectedGenre" @change="fetchMovies">
      <option value="">Todos los géneros</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <div v-if="movies.length">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @click="showDetails(movie.id)" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMovies } from "@/api";
import MovieCard from "./MovieCard.vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const movies = ref([]);
const genres = ref([]);
const selectedGenre = ref("");
const router = useRouter();

const fetchGenres = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=184743f81e323770fee4bced181625c3&language=es-MX`);
    const data = await response.json();
    genres.value = data.genres;
  } catch (error) {
    console.error("Error al obtener los géneros:", error);
  }
};

const fetchMovies = async () => {
  let url;
  
  if (searchQuery.value) {
    url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery.value}&api_key=184743f81e323770fee4bced181625c3&language=es-MX`;
  } else if (selectedGenre.value) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=184743f81e323770fee4bced181625c3&language=es-MX&with_genres=${selectedGenre.value}`;
  } else {
    return;
  }

  const response = await fetch(url);
  const data = await response.json();
  movies.value = data.results;
};

const showDetails = (movieId) => {
  router.push(`/movie/${movieId}`);
};

onMounted(() => {
  fetchGenres();
});
</script>

<style scoped>
.search-container {
  text-align: center;
}

.filters {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.filters select,
.filters input {
  padding: 8px;
}
</style>
