<script lang="ts" setup>
import { ref } from "vue";
import { useTextCapitalsQuiz, type Continent } from "../useCapitalsQuiz";
import { useRoute } from "vue-router";

const answerInput = ref("");

const route = useRoute();

const continent = (route.query.continent as Continent) || "";

const {
  currentCountry,
  answer,
  giveAnswer,
  points,
  quiz,
  showAnswer,
  answerStatus,
  isEndOfQuiz,
  bestScoreText,
  currentQuestionIndex,
  maxPossibleScore,
} = useTextCapitalsQuiz(continent);

function guessCapital() {
  giveAnswer(answerInput.value);
  answerInput.value = "";
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <div v-if="!isEndOfQuiz" class="text-xl">
      Q{{ currentQuestionIndex + 1 }} / {{ quiz.length }}. What is the capital
      of <span class="font-semibold"> {{ currentCountry }} </span> ?
    </div>
    <div
      class="w-full flex flex-col gap-2 md:w-fit m-auto"
      v-if="quiz && !isEndOfQuiz"
    >
      <div class="flex gap-1 relative items-center justify-center w-full">
        <input
          type="text"
          class="outline outline-offset-1 rounded-sm w-full md:w-[380px]"
          v-model="answerInput"
          :class="{
            'outline-slate-700': answerStatus === 'pending',
            'outline-green-600 outline-2': answerStatus === 'exact',
            'outline-orange-600 outline-2': answerStatus === 'close',
            'outline-red-600 outline-2': answerStatus === 'error',
          }"
          @keydown.enter="guessCapital"
        />

        <span
          v-if="showAnswer"
          class="absolute w-40 top-[-40px] md:top-0 md:bottom-0 md:left-[400px] bg-green-300 p-1 rounded-md"
        >
          {{ answer }}</span
        >
      </div>
      <button @click="guessCapital" type="button">Answer</button>
      <button @click="guessCapital" type="button">Pass</button>
    </div>

    <div v-if="isEndOfQuiz">End</div>

    <div class="text-5xl">{{ points }} / {{ maxPossibleScore }}</div>

    <div v-if="isEndOfQuiz">
      {{ bestScoreText }}
    </div>
  </div>
</template>
