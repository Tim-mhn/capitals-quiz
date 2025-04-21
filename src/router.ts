import { createRouter, createWebHistory } from "vue-router";

import TextCapitalsQuizPage from "./pages/TextCapitalsQuizPage.vue";
import HomePage from "./pages/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/text", component: TextCapitalsQuizPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
