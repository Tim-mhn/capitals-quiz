<script lang="ts" setup>
import { CONTINENTS } from "../useCapitalsQuiz";
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="grid cards-grid grid-cols-2 md:grid-cols-3 gap-2">
      <RouterLink
        class="card"
        v-for="continent of CONTINENTS"
        :to="`/text?continent=${continent}`"
        >{{ continent }}</RouterLink
      >

      <RouterLink class="card" to="/text?questions=10"
        >All (10 questions)</RouterLink
      >

      <RouterLink class="card" to="/text?questions=20"
        >All (20 questions)</RouterLink
      >

      <RouterLink class="card" to="/text?questions=50"
        >All (50 questions)</RouterLink
      >

      <RouterLink class="card" to="/text?questions=200">All</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply h-40 md:h-60 hover:border bg-fuchsia-100 border-slate-200 rounded-sm shadow-sm flex justify-center items-center flex-col cursor-pointer hover:bg-fuchsia-200 !text-slate-800;
}

.grid-cards {
  @apply m-2 md:m-4 md:w-[1120px];
}

.card:last-child {
  @apply col-span-2 md:col-span-1;
}
</style>
