import { PERSONALITIES, QUESTIONS, type CareerPersonality } from "./data";

/** Same weighted tally and stable tie breaker as the cloned interview. */
export function scorePersonality(answers: Record<number, number>): CareerPersonality {
  const scores: Record<string, number> = Object.fromEntries(Object.keys(PERSONALITIES).map((id) => [id, 0]));
  for (const [questionIndex, optionIndex] of Object.entries(answers)) {
    const option = QUESTIONS[Number(questionIndex)]?.options[optionIndex];
    if (!option) continue;
    for (const [id, weight] of Object.entries(option.personalityWeights)) {
      if (id in scores) scores[id] = scores[id]! + weight;
    }
  }
  const id = Object.keys(scores).reduce((winner, id) => scores[id]! > scores[winner]! ? id : winner);
  return PERSONALITIES[id]!;
}
