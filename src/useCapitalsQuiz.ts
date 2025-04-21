import { computed, onMounted, ref, type Ref } from "vue";
import {
  buildCapitalsQuiz,
  getShuffledArr,
  type CapitalsQuiz,
} from "./build-quiz";

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

    // if (capitalOption === currentQuestion.value.correctAnswer) {
    //   points.value++;
    // }

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
type Continent = "Europe" | "Asia" | "America" | "Oceania";

export function useTextCapitalsQuiz(continent?: Continent) {
  const quiz: Ref<Array<{ capital: string; country: string }>> = ref([]);
  const points = ref(0);
  const currentQuestionIndex = ref(0);
  const currentCountry = computed(
    () => quiz.value[currentQuestionIndex.value]?.country
  );

  const answer = computed(
    () => quiz.value[currentQuestionIndex.value]?.capital
  );
  const showAnswer = ref(false);

  onMounted(async () => {
    const countries = (await import("./countries")).default;

    const shuffledCountries = getShuffledArr(countries);

    if (continent) {
      quiz.value = shuffledCountries.filter((c) => c.continent === continent);
    } else {
      quiz.value = shuffledCountries;
    }
  });

  const stringsMatch = (str1: string, str2: string) =>
    str1.toLowerCase().trim() === str2.toLowerCase().trim();

  function giveAnswer(answer: string) {
    const capital = quiz.value[currentQuestionIndex.value].capital;
    if (stringsMatch(answer, capital)) {
      points.value += 1;
    }

    showAnswer.value = true;

    setTimeout(() => {
      currentQuestionIndex.value += 1;
      showAnswer.value = false;
    }, 500);
  }

  return {
    quiz,
    points,
    giveAnswer,
    currentCountry,
    showAnswer,
    answer,
  };
}
