<template>
  <div class="movie-card">
    <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="Póster" />
    <h3>{{ movie.title }}</h3>
  </div>
</template>

<script setup>
defineProps({
  movie: Object,
});
</script>

<style scoped>
.movie-card {
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
</style>
