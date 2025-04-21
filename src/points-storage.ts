import type { Continent } from "./useCapitalsQuiz";

export type QuizMode =
  | {
      continent: Continent;
    }
  | {
      mode: "all";
      questions: number | "all";
    };

type Points = number;
type QuestionsCount = number | "all";

type AllContinentsModeKey = `all_${QuestionsCount}`;
type BestScoresJson = Partial<
  Record<Continent, Points> & {
    [K in AllContinentsModeKey]: Points;
  }
>;

class PointsStore {
  private readonly key = "capitals_quiz_points";

  storeIfBest(points: number, mode: QuizMode) {
    const storage = this.getStorage();

    const bestPoints = this.getBestPoints(mode);
    if (points > bestPoints) {
      const modeKey = this.getModeKey(mode);
      storage[modeKey] = points;
      localStorage.setItem(this.key, JSON.stringify(storage));
    }
  }

  private getStorage(): BestScoresJson {
    try {
      const points = JSON.parse(
        localStorage.getItem(this.key) || "{}"
      ) as BestScoresJson;

      if (typeof points !== "object") return {};
      return points;
    } catch (err) {
      console.error(err);

      return {};
    }
  }

  private getModeKey(
    mode: QuizMode = {
      mode: "all",
      questions: "all",
    }
  ): Continent | AllContinentsModeKey {
    console.log({ mode });

    if ("continent" in mode) {
      return mode.continent;
    }

    return `all_$${mode.questions}` as AllContinentsModeKey;
  }

  getBestPoints(mode: QuizMode) {
    const storage = this.getStorage();

    const modeKey = this.getModeKey(mode);

    return storage[modeKey] || 0;
  }
}

export const pointsStore = new PointsStore();
