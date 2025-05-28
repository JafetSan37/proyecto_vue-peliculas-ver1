<template>
  <div v-if="movie">
    <h2>{{ movie.title }}</h2>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Póster" />
    <p><strong>Sinopsis:</strong> {{ movie.overview }}</p>
    <p><strong>Calificación:</strong> {{ movie.vote_average.toFixed(1) }} / 10 ⭐</p>
    <p><strong>Fecha de estreno:</strong> {{ movie.release_date }}</p>
    <p><strong>Géneros:</strong> {{ movie.genres.map(g => g.name).join(", ") }}</p>
    <p><strong>Duración:</strong> {{ movie.runtime }} minutos</p>
    <p><strong>Director:</strong> {{ director }}</p>
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
