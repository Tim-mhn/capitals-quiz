import { computed, onMounted, ref, watch, type Ref } from "vue";
import {
  buildCapitalsQuiz,
  getShuffledArr,
  type CapitalsQuiz,
} from "./build-quiz";
import { stringsAreSimilar } from "./strings-similarty";
import { pointsStore, type QuizMode } from "./points-storage";

export function useCapitalsQuiz(
  getAllCapitals: () => Promise<Array<{ country: string; capital: string }>>
) {
  const points = ref(0);
  const quiz = ref<CapitalsQuiz>();

  const currentQuestionIndex = ref(0);

  const currentQuestion = computed(
    () => quiz.value?.[currentQuestionIndex.value]
  );

  const answered = ref(false);
  const answer = ref<string>();

  function guessCapital(capitalOption: string) {
    if (!quiz.value) {
      console.warn("No quiz available");
      return;
    }

    if (!currentQuestion.value) {
      console.warn(`No question at index ${currentQuestionIndex.value}`);
      return;
    }

    answer.value = capitalOption;
    answered.value = true;

    setTimeout(() => {
      if (capitalOption === currentQuestion.value?.correctAnswer) {
        points.value++;
      }
      answered.value = false;
      currentQuestionIndex.value++;
    }, 1000);
  }

  const addGoodAnswerStyle = (capitalOption: string) =>
    currentQuestion?.value?.correctAnswer === capitalOption && answered.value;
  const addBadAnswerStyle = (capitalOption: string) =>
    capitalOption === answer.value &&
    currentQuestion?.value?.correctAnswer !== answer.value &&
    answered;

  onMounted(async () => {
    quiz.value = await buildCapitalsQuiz(getAllCapitals);
  });

  return {
    guessCapital,
    points,
    quiz,
    currentQuestionIndex,
    currentQuestion,
    addGoodAnswerStyle,
    addBadAnswerStyle,
  };
}

export const CONTINENTS = [
  "Europe",
  "Asia",
  "America",
  "Oceania",
  "Africa",
] as const;
export type Continent = (typeof CONTINENTS)[number];

export function useTextCapitalsQuiz(continent?: Continent, questions?: number) {
  const MAX_QUESTIONS = 10; // questions;

  const mode: QuizMode = continent
    ? {
        continent,
      }
    : {
        mode: "all",
        questions: questions || "all",
      };

  console.log({ MAX_QUESTIONS });
  const quiz: Ref<Array<{ capital: string; country: string }>> = ref([]);
  const points = ref(0);
  const currentQuestionIndex = ref(0);
  const currentCountry = computed(
    () => quiz.value[currentQuestionIndex.value]?.country || "??"
  );

  const isEndOfQuiz = computed(
    () =>
      currentQuestionIndex.value === quiz.value.length &&
      currentQuestionIndex.value > 0
  );

  const answerStatus = ref<"pending" | "error" | "close" | "exact">("pending");

  const answer = computed(
    () => quiz.value[currentQuestionIndex.value]?.capital
  );
  const showAnswer = computed(() => answerStatus.value !== "pending");

  const bestScore = pointsStore.getBestPoints(mode);

  const maxPossibleScore = ref(0);
  onMounted(async () => {
    const countries = (await import("./countries")).default;

    const shuffledCountries = getShuffledArr(countries);

    const allPossibleQuestions = continent
      ? shuffledCountries.filter((c) => c.continent === continent)
      : shuffledCountries;

    const questionsCount = MAX_QUESTIONS
      ? Math.min(MAX_QUESTIONS, allPossibleQuestions.length)
      : allPossibleQuestions.length;

    quiz.value = allPossibleQuestions.slice(0, questionsCount);

    console.log(quiz.value);
  });

  function giveAnswer(answer: string) {
    console.log(currentQuestionIndex.value);
    const capital = quiz.value[currentQuestionIndex.value].capital;

    console.log(capital);
    const comparison = stringsAreSimilar(answer, capital);
    if (comparison.isExact) {
      points.value += 1;
      answerStatus.value = "exact";
    } else if (comparison.isSimilar) {
      points.value += 0.5;
      answerStatus.value = "close";
    } else {
      answerStatus.value = "error";
    }

    maxPossibleScore.value += 1;

    setTimeout(() => {
      currentQuestionIndex.value += 1;
      answerStatus.value = "pending";
    }, 2000);
  }

  watch(isEndOfQuiz, () => {
    if (isEndOfQuiz.value) {
      pointsStore.storeIfBest(points.value, mode);
    }
  });

  const bestScoreText = computed(() => {
    const newBestScore = Math.max(bestScore, points.value);

    return `Best score: ${newBestScore}/${quiz.value.length}`;
  });

  return {
    quiz,
    points,
    giveAnswer,
    currentCountry,
    showAnswer,
    answer,
    answerStatus,
    isEndOfQuiz,
    bestScore,
    bestScoreText,
    currentQuestionIndex,
    maxPossibleScore,
  };
}
