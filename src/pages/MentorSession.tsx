import { useState } from "react";
import {
  Bookmark,
  Check,
  ChevronLeft,
  MessageCircle,
  PlayCircle,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { TabPanel, Tabs } from "@/components/ui/Tabs";
import { MENTORS, MENTOR_BY_ID } from "@/data/mentors";
import type { QuizQuestion } from "@/data/types";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

const DISCUSSION = [
  {
    id: "d1",
    person: "Chidinma O.",
    body: "The point about ops roles being the way in completely changed how I am reading job adverts.",
    timeAgo: "2h ago",
  },
  {
    id: "d2",
    person: "Tunde A.",
    body: "I built the one-page case study she described and got a reply within three days. It works.",
    timeAgo: "yesterday",
  },
];

function QuizBlock({ questions, onPassed }: { questions: QuizQuestion[]; onPassed: () => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answeredAll = questions.every((question) => question.id in answers);
  const correctCount = questions.filter((q) => answers[q.id] === q.answerIndex).length;

  return (
    <div className="space-y-5">
      {questions.map((question, index) => {
        const chosen = answers[question.id];
        const answered = chosen !== undefined;

        return (
          <fieldset key={question.id} className="rounded-card border border-line bg-surface p-4">
            <legend className="px-1 text-sm font-bold text-ink">
              Question {index + 1} of {questions.length}
            </legend>
            <p className="mt-1 text-sm text-ink-soft">{question.prompt}</p>
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => {
                const isChosen = chosen === optionIndex;
                const isCorrect = optionIndex === question.answerIndex;

                return (
                  <label
                    key={option}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition-colors",
                      !answered && "border-line hover:border-brand-300 hover:bg-brand-50/50",
                      answered && isCorrect && "border-success bg-success-soft",
                      answered && isChosen && !isCorrect && "border-danger bg-danger-soft",
                      answered && !isChosen && !isCorrect && "border-line opacity-60",
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      className="mt-0.5 size-4 accent-[var(--color-brand-500)]"
                      checked={isChosen}
                      disabled={answered}
                      onChange={() =>
                        setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }))
                      }
                    />
                    <span className="text-ink-soft">{option}</span>
                  </label>
                );
              })}
            </div>
            {answered ? (
              <p className="mt-3 rounded-xl bg-canvas px-3 py-2.5 text-sm text-ink-soft">
                <span className="font-semibold text-ink">
                  {chosen === question.answerIndex ? "Correct. " : "Not quite. "}
                </span>
                {question.explanation}
              </p>
            ) : null}
          </fieldset>
        );
      })}

      {answeredAll ? (
        <Card className="flex flex-wrap items-center gap-4">
          <p className="min-w-[12rem] flex-1 text-sm text-ink-soft">
            <span className="font-bold text-ink">
              {correctCount} of {questions.length} correct.
            </span>{" "}
            Claim your XP and the takeaways stay saved to your profile.
          </p>
          <Button onClick={onPassed}>Claim XP</Button>
        </Card>
      ) : null}
    </div>
  );
}

export default function MentorSession() {
  const { mentorId } = useParams<{ mentorId: string }>();
  const mentor = mentorId ? MENTOR_BY_ID[mentorId] : undefined;
  const { complete, hasCompleted } = useProgress();
  const [tab, setTab] = useState("overview");
  const [question, setQuestion] = useState("");
  const [questionSent, setQuestionSent] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!mentor) return <Navigate to="/mentorship" replace />;

  const watchKey = `session:${mentor.id}`;
  const quizKey = `quiz:${mentor.id}`;
  const watched = hasCompleted(watchKey);
  const related = MENTORS.filter((item) => item.id !== mentor.id).slice(0, 3);

  return (
    <div className="space-y-6">
      <Link
        to="/mentorship"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
        All sessions
      </Link>

      {/* Video hero — kept dominant. --------------------------------------- */}
      <div className="overflow-hidden rounded-panel bg-shell">
        <div className="relative grid aspect-video place-items-center bg-linear-to-br from-brand-600 to-brand-900">
          <button
            type="button"
            onClick={() =>
              complete({
                key: watchKey,
                xp: mentor.xp,
                label: `Session watched: ${mentor.sessionTitle}`,
                effect: `Curiosity to Explore strengthened · ${mentor.sector} insight added`,
              })
            }
            className="flex flex-col items-center gap-2 rounded-panel px-6 py-4 text-white transition-transform hover:scale-105"
          >
            <PlayCircle aria-hidden="true" className="size-16" />
            <span className="text-sm font-bold">
              {watched ? "Watch again" : `Play session · ${mentor.duration}`}
            </span>
          </button>
          {watched ? (
            <span className="absolute top-4 right-4">
              <Pill tone="success" icon={<Check />}>
                Watched
              </Pill>
            </span>
          ) : null}
        </div>
      </div>

      <header>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill tone="brand">{mentor.sector}</Pill>
          <Pill tone="neutral">{mentor.duration}</Pill>
          <Pill tone="xp" icon={<Sparkles />}>
            +{mentor.xp} XP
          </Pill>
          <Pill tone="neutral" icon={<MessageCircle />}>
            {mentor.questionsAnswered} questions answered
          </Pill>
        </div>
        <h1 className="mt-3 text-title text-ink">{mentor.sessionTitle}</h1>
      </header>

      {/* Mentor credibility ----------------------------------------------- */}
      <Card className="flex flex-wrap items-start gap-4">
        <Avatar name={mentor.name} size="lg" ring />
        <div className="min-w-[14rem] flex-1">
          <h2 className="text-base font-bold text-ink">{mentor.name}</h2>
          <p className="text-sm font-semibold text-brand-600">
            {mentor.role}, {mentor.company}
          </p>
          <p className="mt-2 text-sm text-muted">{mentor.bio}</p>
        </div>
        {/* Secondary actions stay compact rather than competing with the video. */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-pressed={saved}
            onClick={() => setSaved((value) => !value)}
          >
            <Bookmark aria-hidden="true" className={cn("size-4", saved && "fill-current")} />
            {saved ? "Saved" : "Save"}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 aria-hidden="true" className="size-4" />
            Share
          </Button>
        </div>
      </Card>

      {/* Progressive disclosure of everything else ------------------------- */}
      <Tabs
        group="session"
        items={[
          { id: "overview", label: "Overview" },
          { id: "quiz", label: "Quiz", badge: mentor.quiz.length },
          { id: "discussion", label: "Discussion", badge: DISCUSSION.length },
          { id: "ask", label: "Ask" },
        ]}
        value={tab}
        onChange={setTab}
        label="Session sections"
      />

      <div className="mt-4">
        <TabPanel group="session" id="overview" value={tab}>
          <Card>
            <h3 className="text-base font-bold text-ink">What you will take away</h3>
            <ul className="mt-3 space-y-3">
              {mentor.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-sm text-ink-soft">{takeaway}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabPanel>

        <TabPanel group="session" id="quiz" value={tab}>
          {hasCompleted(quizKey) ? (
            <Card>
              <Pill tone="success" icon={<Check />}>
                Quiz completed
              </Pill>
              <p className="mt-3 text-sm text-muted">
                Your answers are saved. The takeaways from this session now count toward your
                Curiosity to Explore pillar.
              </p>
            </Card>
          ) : (
            <QuizBlock
              questions={mentor.quiz}
              onPassed={() =>
                complete({
                  key: quizKey,
                  xp: 40,
                  label: `Quiz completed: ${mentor.sessionTitle}`,
                  effect: "Curiosity to Explore progress recorded",
                })
              }
            />
          )}
        </TabPanel>

        <TabPanel group="session" id="discussion" value={tab}>
          <ul className="space-y-3">
            {DISCUSSION.map((entry) => (
              <li key={entry.id}>
                <Card className="flex gap-3">
                  <Avatar name={entry.person} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">
                      {entry.person}
                      <span className="ml-2 text-xs font-normal text-muted">{entry.timeAgo}</span>
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{entry.body}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </TabPanel>

        <TabPanel group="session" id="ask" value={tab}>
          <Card>
            <h3 className="text-base font-bold text-ink">Ask {mentor.name} a question</h3>
            <p className="mt-1 text-sm text-muted">
              Questions are answered in a monthly round-up. Asking one counts as a professional
              interaction and strengthens your Social Skills & Networks pillar.
            </p>

            {questionSent ? (
              <div className="mt-4 rounded-xl bg-success-soft px-4 py-3 text-sm font-medium text-success">
                Question sent. You will be notified when {mentor.name.split(" ")[0]} replies.
              </div>
            ) : (
              <form
                className="mt-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!question.trim()) return;
                  setQuestionSent(true);
                  complete({
                    key: `ask:${mentor.id}`,
                    xp: 50,
                    label: `You contacted ${mentor.name}`,
                    effect: "Social Skills & Networks — professional interaction logged",
                  });
                }}
              >
                <label htmlFor="mentor-question" className="text-sm font-semibold text-ink">
                  Your question
                </label>
                <textarea
                  id="mentor-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  rows={4}
                  required
                  placeholder="Be specific — what exactly are you stuck on?"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas p-3 text-sm text-ink placeholder:text-muted"
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={!question.trim()}>
                    <Send aria-hidden="true" className="size-4" />
                    Send question
                  </Button>
                  <Pill tone="xp" icon={<Sparkles />}>
                    +50 XP
                  </Pill>
                </div>
              </form>
            )}
          </Card>
        </TabPanel>
      </div>

      <section aria-labelledby="related">
        <h2 id="related" className="mb-3 text-lg font-bold text-ink">
          Related sessions
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.id}>
              <Link
                to={`/mentorship/${item.id}`}
                className="block h-full rounded-card border border-line bg-surface p-4 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-raised"
              >
                <Pill tone="brand" size="sm">
                  {item.sector}
                </Pill>
                <p className="mt-2 text-sm font-bold text-ink">{item.sessionTitle}</p>
                <p className="mt-1 text-xs text-muted">
                  {item.name} · {item.duration}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
