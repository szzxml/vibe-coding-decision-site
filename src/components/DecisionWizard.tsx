"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  Code2,
  Compass,
  Layers3,
  RefreshCcw,
  Rocket,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";

import { createRecommendation, questions } from "@/lib/decision-data";
import type { AnswerMap, DecisionOption, QuestionId } from "@/types/decision";

const optionIcons: Record<string, ComponentType<{ className?: string }>> = {
  site: Sparkles,
  tool: ClipboardCheck,
  saas: Layers3,
  content: Compass,
  automation: Code2,
  idea: Sparkles,
  draft: ClipboardCheck,
  prototype: Layers3,
  ready: Rocket,
  beginner: Compass,
  editor: ClipboardCheck,
  builder: Code2,
  validate: Rocket,
  visual: Sparkles,
  complete: Layers3,
  cost: ShieldAlert
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getAnsweredCount(answers: AnswerMap) {
  return questions.filter((question) => answers[question.id]).length;
}

function TaskList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-slate-650" key={item}>
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OptionButton({
  option,
  selected,
  onClick
}: {
  option: DecisionOption;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = optionIcons[option.id] ?? Sparkles;

  return (
    <button
      className={cx(
        "group flex min-h-36 w-full flex-col rounded-lg border p-4 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
        selected
          ? "border-teal-600 bg-teal-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      )}
      onClick={onClick}
      type="button"
    >
      <span className="flex items-center justify-between gap-3">
        <span
          className={cx(
            "grid h-10 w-10 shrink-0 place-items-center rounded-lg border",
            selected ? "border-teal-200 bg-white text-teal-700" : "border-slate-200 bg-slate-50 text-slate-700"
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span
          className={cx(
            "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
            selected ? "border-teal-600 bg-teal-600 text-white" : "border-slate-300 text-transparent"
          )}
        >
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </span>
      <span className="mt-4 text-base font-semibold text-slate-950">{option.label}</span>
      <span className="mt-2 text-sm leading-6 text-slate-650">{option.description}</span>
      <span className="mt-auto pt-4 text-xs font-medium uppercase text-slate-500">{option.signal}</span>
    </button>
  );
}

export default function DecisionWizard() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const question = questions[step];
  const answeredCount = getAnsweredCount(answers);
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLastStep = step === questions.length - 1;
  const currentAnswer = answers[question.id];
  const recommendation = useMemo(() => createRecommendation(answers), [answers]);

  function selectOption(questionId: QuestionId, optionId: DecisionOption["id"]) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  function goNext() {
    if (!currentAnswer) {
      return;
    }

    if (isLastStep) {
      setShowResult(true);
      return;
    }

    setStep((current) => Math.min(current + 1, questions.length - 1));
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
      setStep(questions.length - 1);
      return;
    }

    setStep((current) => Math.max(current - 1, 0));
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">Vibe Coding Decision</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">从想法到开发路线</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden min-w-44 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:block">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>进度</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              onClick={restart}
              type="button"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              重选
            </button>
          </div>
        </header>

        <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:border-r lg:border-slate-200 lg:pr-6">
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1" aria-label="决策步骤">
              {questions.map((item, index) => {
                const isActive = !showResult && index === step;
                const isDone = Boolean(answers[item.id]);

                return (
                  <button
                    className={cx(
                      "flex min-h-16 items-center gap-3 rounded-lg border px-3 py-2 text-left transition",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
                      isActive
                        ? "border-teal-600 bg-teal-50"
                        : isDone
                          ? "border-emerald-200 bg-white"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                    )}
                    key={item.id}
                    onClick={() => {
                      setStep(index);
                      setShowResult(false);
                    }}
                    type="button"
                  >
                    <span
                      className={cx(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold",
                        isDone ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-950">{item.eyebrow}</span>
                      <span className="block truncate text-xs text-slate-500">
                        {answers[item.id]
                          ? item.options.find((option) => option.id === answers[item.id])?.shortLabel
                          : "未选择"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="min-w-0">
            {!showResult ? (
              <div className="mx-auto max-w-4xl">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-teal-700">{question.eyebrow}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-950">{question.title}</h2>
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    {step + 1} / {questions.length}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {question.options.map((option) => (
                    <OptionButton
                      key={option.id}
                      onClick={() => selectOption(question.id, option.id)}
                      option={option}
                      selected={currentAnswer === option.id}
                    />
                  ))}
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={step === 0}
                    onClick={goBack}
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    上一步
                  </button>
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    disabled={!currentAnswer}
                    onClick={goNext}
                    type="button"
                  >
                    {isLastStep ? "生成路线" : "下一步"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-5xl">
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-sm font-semibold text-teal-700">{recommendation.routeTag}</p>
                      <h2 className="mt-2 text-3xl font-semibold text-slate-950">{recommendation.routeTitle}</h2>
                      <p className="mt-3 text-base leading-7 text-slate-650">{recommendation.routeSummary}</p>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 lg:w-72">
                      <p className="text-sm font-semibold text-amber-950">下一步</p>
                      <p className="mt-2 text-sm leading-6 text-amber-900">{recommendation.nextMove}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div className="grid gap-4 md:grid-cols-3">
                    <TaskList title="今天开始" items={recommendation.todayTasks} />
                    <TaskList title="本周完成" items={recommendation.weekTasks} />
                    <TaskList title="上线前检查" items={recommendation.launchChecks} />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-slate-950">推荐工具栈</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {recommendation.stack.map((item) => (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-rose-950">
                        <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                        风险提醒
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {recommendation.risks.map((risk) => (
                          <li className="text-sm leading-6 text-rose-900" key={risk}>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    onClick={goBack}
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    修改答案
                  </button>
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    onClick={restart}
                    type="button"
                  >
                    <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                    重新开始
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
