<script lang="ts" setup></script>

<template>
  <div class="h-screen w-screen p-2 md:py-8">
    <div class="flex flex-col h-full gap-8 md:w-[800px] m-auto">
      <div class="flex items-center gap-2 justify-around">
        <RouterLink to="/">Back</RouterLink>
        <h1>Capitals Quiz</h1>
        <span></span>
      </div>
      <div class="flex flex-col grow justify-center items-center">
        <RouterView />
      </div>
    </div>
  </div>
</template>
