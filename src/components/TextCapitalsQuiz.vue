<script lang="ts" setup>
import { ref } from "vue";
import { useTextCapitalsQuiz } from "../useCapitalsQuiz";

const answerInput = ref("");
const { currentCountry, answer, giveAnswer, points, quiz, showAnswer } =
  useTextCapitalsQuiz("Europe");

function guessCapital() {
  giveAnswer(answerInput.value);
  answerInput.value = "";
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <h1>Capitals Quiz</h1>

    <div class="text-xl">
      What is the capital of
      <span class="font-semibold"> {{ currentCountry }} </span> ?
    </div>
    <div class="flex flex-col gap-2 w-fit m-auto" v-if="quiz">
      <div class="flex gap-1">
        <input
          type="text"
          class="outline outline-offset-1 rounded-sm outline-slate-700"
          v-model="answerInput"
          @keydown.enter="guessCapital"
        />
        <span v-if="showAnswer"> {{ answer }}</span>
      </div>
      <button @click="guessCapital" type="button">Answer</button>
      <button @click="guessCapital" type="button">Pass</button>
    </div>

    <div class="text-5xl">{{ points }}</div>
  </div>
</template>
