<script lang="ts" setup>
import { ref } from "vue";
import { useTextCapitalsQuiz, type Continent } from "../useCapitalsQuiz";
import { useRoute } from "vue-router";

const answerInput = ref("");

const route = useRoute();

const continent = (route.query.continent as Continent) || "";

const getQuestionsFromQueryParam = () => {
  try {
    const questions = route.query.questions?.toString();
    if (questions) {
      return Number.parseInt(questions);
    }
  } catch (e) {
    console.error("Error parsing questions from query param", e);
  }
};
const questions = getQuestionsFromQueryParam();

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
} = useTextCapitalsQuiz(continent, questions);

function guessCapital() {
  giveAnswer(answerInput.value);
  answerInput.value = "";
}
</script>

<template>
  <div
    class="flex flex-col h-full w-full md:max-w-[400px] px-2 justify-start md:justify-center gap-12"
  >
    <div v-if="!isEndOfQuiz" class="text-xl flex flex-col gap-3">
      <div class="text-4xl text-center font-extralight">
        Q{{ currentQuestionIndex + 1 }} / {{ quiz.length }}.
      </div>
      <div>
        What is the capital of
        <span class="font-semibold"> {{ currentCountry }} </span> ?
      </div>
    </div>
    <div
      class="w-full flex flex-col gap-2 md:w-fit mx-auto"
      v-if="quiz && !isEndOfQuiz"
    >
      <div class="flex gap-1 relative items-center justify-center w-full">
        <input
          type="text"
          class="outline outline-offset-1 rounded-sm w-full md:w-[380px]"
          v-model="answerInput"
          :class="{
            'outline-slate-700': answerStatus === 'Pending',
            'outline-green-600 outline-2': answerStatus === 'Exact',
            'outline-orange-600 outline-2': answerStatus === 'Close',
            'outline-red-600 outline-2': answerStatus === 'Wrong',
          }"
          @keydown.enter="guessCapital"
        />

        <span
          v-if="showAnswer"
          class="absolute w-full md:w-40 top-[-40px] md:top-0 md:bottom-0 md:left-[400px] bg-green-300 p-1 rounded-md"
          :class="{
            'bg-green-300 ': answerStatus === 'Exact',
            'bg-orange-300 ': answerStatus === 'Close',
            'bg-red-300 text-white': answerStatus === 'Wrong',
          }"
        >
          {{ answerStatus }}
          <span v-if="answerStatus !== 'Exact'">
            .&nbsp;Correct answer: {{ answer }}</span
          >
        </span>
      </div>
      <button @click="guessCapital" type="button">Answer</button>
      <button @click="guessCapital" type="button">Pass</button>
    </div>

    <div v-if="isEndOfQuiz">End</div>

    <div class="text-5xl mx-auto">{{ points }} / {{ maxPossibleScore }}</div>

    <div v-if="isEndOfQuiz">
      {{ bestScoreText }}
    </div>
  </div>
</template>
