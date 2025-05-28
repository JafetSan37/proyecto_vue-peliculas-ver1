import { createRouter, createWebHistory } from "vue-router";
import MovieList from "@/components/MovieList.vue";
import MovieDetails from "@/components/MovieDetails.vue";
import AboutView from "./views/AboutView.vue";

const routes = [
    { path: "/", component: MovieList },
    { path: "/src/views", component: AboutView },
    { path: "/movie/:id", component: MovieDetails },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
