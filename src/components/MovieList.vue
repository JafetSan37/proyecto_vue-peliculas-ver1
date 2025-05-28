<template>
  <div class="search-container">
    <input v-model="searchQuery" @input="fetchMovies" placeholder="Buscar película..." class="search-box" />

    <select v-model="selectedGenre" @change="fetchMovies" class="filter-dropdown">
      <option value="">Todos los géneros</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <select v-model="selectedYear" @change="fetchMovies" class="filter-dropdown">
  <option value="">Todos los años</option>
  <option v-for="year in availableYears" :key="year" :value="year">
    {{ year }}
  </option>
</select>

    <div v-if="movies.length" class="movie-list">
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

const selectedYear = ref("");
const availableYears = ref([]);

// Generar años desde 1980 hasta el actual
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1980; year--) {
    availableYears.value.push(year);
  }
};

const fetchMovies = async () => {
  let url;
  
if (searchQuery.value) {
    url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery.value}&api_key=184743f81e323770fee4bced181625c3&language=es-MX`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=184743f81e323770fee4bced181625c3&language=es-MX`;
    
    if (selectedGenre.value) {
      url += `&with_genres=${selectedGenre.value}`;
    }
    if (selectedYear.value) {
      url += `&primary_release_year=${selectedYear.value}`;
    }
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
  generateYears();
});
</script>

<style scoped>
.search-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* Espacio entre elementos */
}

.search-box {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
}

.filter-dropdown {
  width: 30%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
}

.movie-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

</style>
