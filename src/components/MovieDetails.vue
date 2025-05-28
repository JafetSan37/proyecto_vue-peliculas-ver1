<template>
  <div v-if="movie" class="movie-details">
    <h2>{{ movie.title }}</h2>
    
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Póster" class="movie-poster"/>
    
    <p class="synopsis"><strong>Sinopsis:</strong> {{ movie.overview }}</p>
    
    <div class="movie-info">
      <p><strong>Calificación:</strong> {{ movie.vote_average.toFixed(1) }} / 10 ⭐</p>
      <p><strong>Fecha de estreno:</strong> {{ movie.release_date }}</p>
      <p><strong>Géneros:</strong> {{ movie.genres.map(g => g.name).join(", ") }}</p>
      <p><strong>Duración:</strong> {{ movie.runtime }} minutos</p>
      <p><strong>Director:</strong> {{ director }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMovieDetails } from "@/api";
import { useRoute } from "vue-router";

const route = useRoute();
const movie = ref(null);
const director = ref("Desconocido");

onMounted(async () => {
  movie.value = await getMovieDetails(route.params.id);

  if (movie.value) {
    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=TU_API_KEY&language=es-MX`);
    const creditsData = await creditsResponse.json();
    const directorInfo = creditsData.crew.find(person => person.job === "Director");
    director.value = directorInfo ? directorInfo.name : "Desconocido";
  }
});
</script>

<style scoped>
.movie-details {
  text-align: center;
  max-width: 600px;
  margin: auto;
}

.movie-poster {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  display: block;
}

.synopsis {
  margin-top: 20px;
  font-size: 18px;
}

.movie-info {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 2px solid #ddd;
  font-size: 16px;
}
</style>
