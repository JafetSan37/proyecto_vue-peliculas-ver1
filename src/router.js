import { createRouter, createWebHistory } from "vue-router";
import MovieList from "@/components/MovieList.vue";
import MovieDetails from "@/components/MovieDetails.vue";

const routes = [
    { path: "/", component: MovieList },
    { path: "/movie/:id", component: MovieDetails },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
