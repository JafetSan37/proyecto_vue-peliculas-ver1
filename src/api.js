import axios from "axios";

const API_KEY = "184743f81e323770fee4bced181625c3";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&language=es-MX`);
    return response.data.results;
};

export const getMovieDetails = async (movieId) => {
    const movieResponse = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-MX`);
    const creditsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=es-MX`);

    const movieData = movieResponse.data;
    const creditsData = creditsResponse.data;

    const director = creditsData.crew.find(person => person.job === "Director");

    return {
        ...movieData,
        director: director ? director.name : "Desconocido"
    };
};
