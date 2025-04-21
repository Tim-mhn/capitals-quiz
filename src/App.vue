<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  buildCapitalsQuiz,
  getCountriesFromJson,
  type CapitalsQuiz,
} from "./build-quiz";

import TextCapitalsQuiz from "./components/TextCapitalsQuiz.vue";
import { useCapitalsQuiz } from "./useCapitalsQuiz";

// const capitalsQuiz = ref<CapitalsQuiz>();
// const points = ref(0);
// const currentQuestionIndex = ref(0);

// const currentQuestion = computed(
//   () => capitalsQuiz.value?.[currentQuestionIndex.value]
// );

// const answered = ref(false);
// const answer = ref<string>();
// function guessCapital(capitalOption: string) {
//   if (!capitalsQuiz.value) {
//     console.warn("No quiz available");
//     return;
//   }

//   if (!currentQuestion.value) {
//     console.warn(`No question at index ${currentQuestionIndex.value}`);
//     return;
//   }

//   if (capitalOption === currentQuestion.value.correctAnswer) {
//     points.value++;
//   }

//   answer.value = capitalOption;
//   answered.value = true;

//   setTimeout(() => {
//     answered.value = false;
//     currentQuestionIndex.value++;
//   }, 1000);
// }

const {
  points,
  guessCapital,
  currentQuestionIndex,
  quiz,
  currentQuestion,
  addBadAnswerStyle,
  addGoodAnswerStyle,
} = useCapitalsQuiz(getCountriesFromJson);
// onMounted(async () => {
//   const countries = (await import("./countries.json")).default;
//   console.log(countries);

//   capitalsQuiz.value = await buildCapitalsQuiz(getCountriesFromJson);
// });

const TEXT_MODE = true;
</script>

<template>
  <div v-if="!TEXT_MODE" class="flex flex-col gap-12">
    <h1>Capitals Quiz</h1>

    <div class="text-xl">
      What is the capital of
      <span class="font-semibold"> {{ currentQuestion?.country }} </span> ?
    </div>
    <div class="grid grid-rows-2 grid-cols-2 gap-4 w-fit m-auto" v-if="quiz">
      <div
        class="shadow-sm rounded-md bg-white border border-slate-800 h-40 w-40 p-1 text-xl flex justify-center items-center cursor-pointer hover:bg-slate-50"
        v-for="capitalOption of currentQuestion?.answers"
        :key="capitalOption"
        @click="guessCapital(capitalOption)"
        :class="{
          goodAnswer: addGoodAnswerStyle(capitalOption),
          badAnswer: addBadAnswerStyle(capitalOption),
        }"
      >
        {{ capitalOption }}
      </div>
    </div>

    <div class="text-5xl">{{ points }}/{{ currentQuestionIndex }}</div>
  </div>

  <TextCapitalsQuiz v-else />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

@keyframes animatedGreenBackground {
  0% {
    background: #32de84;
  }
  20% {
    background: #03c03c;
  }
  40% {
    background: #4fffb0;
  }
  60% {
    background: #87a96b;
  }
  100% {
    background: #66ff00;
  }
}

.goodAnswer {
  animation: animatedGreenBackground 5s infinite;
}

.badAnswer {
  background: red;
}
</style>
