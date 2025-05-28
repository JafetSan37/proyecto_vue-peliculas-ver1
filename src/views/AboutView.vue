<template>
  <div class="about-container">
    <h1>Sobre el Proyecto</h1>
    <p>
      <br>Este proyecto es una página de búsqueda de películas basada en la API de TMDb. 
      Permite a los usuarios explorar películas por título, género y año de estreno.
      Proyecto de la materia Tópicos Avanzados de Programación.
    </p>
    <p>
      <br>Imagen utilizada en este proyecto por cortesía de 
      <a href="http://www.freepik.com" target="_blank">coolvector / Freepik</a>
    </p>

    <p>
      <br>Código fuente en mi repositorio de GitHub:
    </p>
    <a href="https://github.com/JafetSan37/proyecto_vue-peliculas-ver1" target="_blank" class="github-link">
      Visitar el repositorio en GitHub
    </a>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.github-link {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #0077cc;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.github-link:hover {
  background-color: #005fa3;
}
</style>
