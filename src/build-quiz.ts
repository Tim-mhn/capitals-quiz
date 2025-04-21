export const getShuffledArr = <T>(arr: Array<T>): Array<T> => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const randomInt = ({ min, max }: { min: number; max: number }) => {
  return Math.floor((max - min) * Math.random()) + min;
};

const generateNUniqueNumbers = ({
  min,
  max,
  length,
  not,
}: {
  min: number;
  max: number;
  length: number;
  not: number;
}) => {
  const numbers: number[] = [];

  while (numbers.length < length) {
    const num = randomInt({ min, max });
    if (num !== not && !numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
};

export type CapitalsQuiz = Array<{
  country: string;
  answers: Array<string>;
  correctAnswer: string;
}>;
export const getCountriesFromJson = async () => {
  const countries: Array<{ country: string; capital: string }> = (
    await import("./countries")
  ).default;
  return countries;
};
export async function buildCapitalsQuiz(
  getAllCountries: () => Promise<Array<{ country: string; capital: string }>>
): Promise<CapitalsQuiz> {
  const countries = await getAllCountries();

  const shuffledCountries = getShuffledArr(countries);
  const questions: CapitalsQuiz = shuffledCountries.map(
    ({ country, capital }, correctAnswerIndex) => {
      const otherAnswers = generateNUniqueNumbers({
        min: 0,
        max: countries.length - 1,
        length: 3,
        not: correctAnswerIndex,
      }).map((randomIndex) => shuffledCountries[randomIndex].capital);

      console.log(otherAnswers.length);
      return {
        answers: getShuffledArr([capital, ...otherAnswers]),
        correctAnswer: capital,
        country,
      };
    }
  );

  return questions;
}

buildCapitalsQuiz(async () => [
  { country: "Abkhazia", capital: "Sukhumi", type: "countryCapital" },
  { country: "Afghanistan", capital: "Kabul", type: "countryCapital" },
  {
    country: "Akrotiri and Dhekelia",
    capital: "Episkopi Cantonment",
    type: "countryCapital",
  },
  { country: "Albania", capital: "Tirana", type: "countryCapital" },
  { country: "Algeria", capital: "Algiers", type: "countryCapital" },
  {
    country: "American Samoa",
    capital: "Pago Pago",
    type: "countryCapital",
  },
]).then(console.log);
