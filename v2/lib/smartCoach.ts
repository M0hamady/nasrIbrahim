export type SkillScore = { subject: string; score: number; attempts: number };

export function buildCoachMessage(scores: SkillScore[]) {
  if (!scores.length) return {
    headline: "Ready for your first mission?",
    message: "Start with one short activity. I’ll use your results to suggest what to practise next.",
    action: "Choose a learning path",
  };
  const sorted = [...scores].sort((a, b) => a.score - b.score);
  const focus = sorted[0];
  const strength = [...scores].sort((a, b) => b.score - a.score)[0];
  if (focus.score < 65) return {
    headline: \`Let’s strengthen \${focus.subject}\`,
    message: \`Your recent accuracy is \${focus.score}%. Try a short visual practice set, then explain one answer in your own words. Your strongest area is \${strength.subject}.\`,
    action: \`Practise \${focus.subject}\`,
  };
  if (scores.every((s) => s.score >= 85)) return {
    headline: "Challenge mode unlocked!",
    message: "You’re showing strong understanding. Try a mixed challenge and explain how you know your answer.",
    action: "Try a challenge",
  };
  return {
    headline: "Keep the streak going",
    message: \`A quick 10-minute session in \${focus.subject} will balance your progress. Finish with one question from \${strength.subject} for confidence.\`,
    action: "Start 10-minute plan",
  };
}
