"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  Code2,
  Compass,
  Copy,
  Download,
  Layers3,
  Link2,
  RefreshCcw,
  Rocket,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { createRecommendation, questions } from "@/lib/decision-data";
import type {
  AnswerMap,
  DecisionOption,
  DeliveryTargetOptionId,
  ExpectedScaleOptionId,
  OptionId,
  ProjectNeedOptionId,
  QuestionId,
  Recommendation,
  StackItem,
  TechBackgroundOptionId
} from "@/types/decision";

const storageKey = "vibe-coding-decision-state";

const queryKeys: Record<QuestionId, string> = {
  deliveryTarget: "target",
  projectNeed: "need",
  expectedScale: "scale",
  techBackground: "bg"
};
const secondaryTechBackgroundQueryKey = "bg2";

interface SavedWizardState {
  answers: AnswerMap;
  showResult: boolean;
  step: number;
}

interface ToyTheme {
  accent: string;
  deep: string;
  tint: string;
}

const emptyWizardState: SavedWizardState = {
  answers: {},
  showResult: false,
  step: 0
};

const optionIcons: Record<OptionId, ComponentType<{ className?: string }>> = {
  webApp: Compass,
  desktopApp: Code2,
  androidNative: Rocket,
  iosNative: Sparkles,
  crossPlatformApp: Layers3,
  cliTool: ClipboardCheck,
  embeddedApp: ShieldAlert,
  contentOnly: Compass,
  login: ClipboardCheck,
  storage: Layers3,
  ai: Sparkles,
  localTool: Code2,
  nativeDevice: Rocket,
  small: Rocket,
  medium: Layers3,
  large: ShieldAlert,
  javascript: Code2,
  python: ClipboardCheck,
  cpp: ShieldAlert,
  java: Rocket,
  newLearner: Compass
};

const optionThemes: Record<OptionId, ToyTheme> = {
  webApp: { accent: "#2563eb", deep: "#172554", tint: "#dbeafe" },
  desktopApp: { accent: "#0f9f7a", deep: "#064e3b", tint: "#d8f5ea" },
  androidNative: { accent: "#14b8a6", deep: "#134e4a", tint: "#ccfbf1" },
  iosNative: { accent: "#ef4444", deep: "#7f1d1d", tint: "#ffe2dc" },
  crossPlatformApp: { accent: "#f97316", deep: "#7c2d12", tint: "#ffedd5" },
  cliTool: { accent: "#f4c430", deep: "#713f12", tint: "#fff3bf" },
  embeddedApp: { accent: "#334155", deep: "#0f172a", tint: "#e2e8f0" },
  contentOnly: { accent: "#f4c430", deep: "#713f12", tint: "#fff3bf" },
  login: { accent: "#2563eb", deep: "#172554", tint: "#dbeafe" },
  storage: { accent: "#0f9f7a", deep: "#064e3b", tint: "#d8f5ea" },
  ai: { accent: "#ef4444", deep: "#7f1d1d", tint: "#ffe2dc" },
  localTool: { accent: "#f97316", deep: "#7c2d12", tint: "#ffedd5" },
  nativeDevice: { accent: "#14b8a6", deep: "#134e4a", tint: "#ccfbf1" },
  small: { accent: "#14b8a6", deep: "#134e4a", tint: "#ccfbf1" },
  medium: { accent: "#f97316", deep: "#7c2d12", tint: "#ffedd5" },
  large: { accent: "#ef4444", deep: "#7f1d1d", tint: "#ffe2dc" },
  javascript: { accent: "#2563eb", deep: "#172554", tint: "#dbeafe" },
  python: { accent: "#0f9f7a", deep: "#064e3b", tint: "#d8f5ea" },
  cpp: { accent: "#334155", deep: "#0f172a", tint: "#e2e8f0" },
  java: { accent: "#ef4444", deep: "#7f1d1d", tint: "#ffe2dc" },
  newLearner: { accent: "#f4c430", deep: "#713f12", tint: "#fff3bf" }
};

const stepAccents = ["#ef4444", "#2563eb", "#f4c430", "#0f9f7a"];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getAnsweredCount(answers: AnswerMap) {
  return questions.filter((question) => isQuestionAnswered(answers, question.id)).length;
}

function isComplete(answers: AnswerMap) {
  return questions.every((question) => isQuestionAnswered(answers, question.id));
}

function isQuestionAnswered(answers: AnswerMap, questionId: QuestionId) {
  if (questionId === "projectNeed") {
    return Boolean(answers.projectNeed?.length);
  }

  return Boolean(answers[questionId]);
}

function isValidOption(questionId: QuestionId, optionId: string | null): optionId is OptionId {
  if (!optionId) {
    return false;
  }

  return questions.some(
    (question) => question.id === questionId && question.options.some((option) => option.id === optionId)
  );
}

function assignSingleAnswer(answers: AnswerMap, questionId: QuestionId, optionId: OptionId) {
  if (questionId === "deliveryTarget") {
    answers.deliveryTarget = optionId as DeliveryTargetOptionId;
    return;
  }

  if (questionId === "projectNeed") {
    answers.projectNeed = [optionId as ProjectNeedOptionId];
    return;
  }

  if (questionId === "expectedScale") {
    answers.expectedScale = optionId as ExpectedScaleOptionId;
    return;
  }

  answers.techBackground = optionId as TechBackgroundOptionId;
}

function normalizeNeedList(needs: ProjectNeedOptionId[] | undefined) {
  return needs?.length ? Array.from(new Set(needs)) : undefined;
}

function toValidOption(questionId: QuestionId, value: unknown) {
  return typeof value === "string" && isValidOption(questionId, value) ? value : undefined;
}

function toValidNeeds(value: unknown) {
  if (Array.isArray(value)) {
    return normalizeNeedList(
      value.filter((item): item is ProjectNeedOptionId => toValidOption("projectNeed", item) !== undefined)
    );
  }

  const optionId = toValidOption("projectNeed", value);

  return optionId ? [optionId as ProjectNeedOptionId] : undefined;
}

function normalizeLegacyAnswers(answers: AnswerMap) {
  const normalizedAnswers: AnswerMap = {
    ...answers,
    projectNeed: normalizeNeedList(answers.projectNeed)
  };

  if (
    normalizedAnswers.secondaryTechBackground &&
    normalizedAnswers.secondaryTechBackground === normalizedAnswers.techBackground
  ) {
    delete normalizedAnswers.secondaryTechBackground;
  }

  if (
    !normalizedAnswers.deliveryTarget &&
    (normalizedAnswers.projectNeed || normalizedAnswers.expectedScale || normalizedAnswers.techBackground)
  ) {
    return { ...normalizedAnswers, deliveryTarget: "webApp" as DeliveryTargetOptionId };
  }

  return normalizedAnswers;
}

function withAnswer(answers: AnswerMap, questionId: QuestionId, optionId: OptionId) {
  const nextAnswers: AnswerMap = { ...answers };

  if (questionId === "projectNeed") {
    const needId = optionId as ProjectNeedOptionId;
    const currentNeeds = nextAnswers.projectNeed ?? [];
    const projectNeed = currentNeeds.includes(needId)
      ? currentNeeds.filter((item) => item !== needId)
      : [...currentNeeds, needId];

    nextAnswers.projectNeed = projectNeed.length ? projectNeed : undefined;
    return nextAnswers;
  }

  if (questionId === "techBackground") {
    const backgroundId = optionId as TechBackgroundOptionId;

    if (nextAnswers.techBackground === backgroundId) {
      if (nextAnswers.secondaryTechBackground) {
        nextAnswers.techBackground = nextAnswers.secondaryTechBackground;
        delete nextAnswers.secondaryTechBackground;
      } else {
        delete nextAnswers.techBackground;
      }

      return nextAnswers;
    }

    if (nextAnswers.secondaryTechBackground === backgroundId) {
      delete nextAnswers.secondaryTechBackground;
      return nextAnswers;
    }

    if (!nextAnswers.techBackground) {
      nextAnswers.techBackground = backgroundId;
      return nextAnswers;
    }

    nextAnswers.secondaryTechBackground = backgroundId;
    return nextAnswers;
  }

  assignSingleAnswer(nextAnswers, questionId, optionId);

  return nextAnswers;
}

function getOption(questionId: QuestionId, optionId: OptionId | undefined) {
  const question = questions.find((item) => item.id === questionId);

  return question?.options.find((item) => item.id === optionId);
}

function getNeedOptionsFromValue(value: string | null) {
  if (!value) {
    return undefined;
  }

  const needs = value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is ProjectNeedOptionId => isValidOption("projectNeed", item));

  return normalizeNeedList(needs);
}

function parseAnswersFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const parsedAnswers: AnswerMap = {};

  questions.forEach((question) => {
    const value = params.get(queryKeys[question.id]);

    if (question.id === "projectNeed") {
      parsedAnswers.projectNeed = getNeedOptionsFromValue(value);
      return;
    }

    if (isValidOption(question.id, value)) {
      assignSingleAnswer(parsedAnswers, question.id, value);
    }
  });

  const secondaryBackground = params.get(secondaryTechBackgroundQueryKey);

  if (isValidOption("techBackground", secondaryBackground)) {
    parsedAnswers.secondaryTechBackground = secondaryBackground as TechBackgroundOptionId;
  }

  return normalizeLegacyAnswers(parsedAnswers);
}

function readSavedState(): SavedWizardState | null {
  try {
    const rawState = window.localStorage.getItem(storageKey);

    if (!rawState) {
      return null;
    }

    const parsed = JSON.parse(rawState) as Partial<SavedWizardState>;
    const savedAnswers = parsed.answers as Record<string, unknown> | undefined;
    const answers: AnswerMap = {};

    questions.forEach((question) => {
      const rawAnswer = savedAnswers?.[question.id];

      if (question.id === "projectNeed") {
        answers.projectNeed = toValidNeeds(rawAnswer);
        return;
      }

      const optionId = toValidOption(question.id, rawAnswer);

      if (optionId) {
        assignSingleAnswer(answers, question.id, optionId);
      }
    });

    const secondaryBackground = toValidOption("techBackground", savedAnswers?.secondaryTechBackground);

    if (secondaryBackground) {
      answers.secondaryTechBackground = secondaryBackground as TechBackgroundOptionId;
    }

    const normalizedAnswers = normalizeLegacyAnswers(answers);

    return {
      answers: normalizedAnswers,
      showResult: Boolean(parsed.showResult) && isComplete(normalizedAnswers),
      step:
        typeof parsed.step === "number"
          ? Math.min(Math.max(parsed.step, 0), questions.length - 1)
          : Math.min(getAnsweredCount(normalizedAnswers), questions.length - 1)
    };
  } catch {
    return null;
  }
}

function getInitialWizardState(): SavedWizardState {
  if (typeof window === "undefined") {
    return emptyWizardState;
  }

  const urlAnswers = parseAnswersFromSearch(window.location.search);
  const urlAnswerCount = getAnsweredCount(urlAnswers);

  if (urlAnswerCount > 0) {
    return {
      answers: urlAnswers,
      showResult: isComplete(urlAnswers),
      step: Math.min(urlAnswerCount, questions.length - 1)
    };
  }

  return readSavedState() ?? emptyWizardState;
}

function saveWizardState(state: SavedWizardState) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    return false;
  }

  return true;
}

function getAnswerLabel(questionId: QuestionId, answers: AnswerMap) {
  if (questionId === "projectNeed") {
    return answers.projectNeed?.map((optionId) => getOption("projectNeed", optionId)?.label).filter(Boolean).join(" + ") || "未选择";
  }

  if (questionId === "techBackground") {
    const primaryLabel = answers.techBackground ? getOption("techBackground", answers.techBackground)?.label : undefined;
    const secondaryLabel = answers.secondaryTechBackground
      ? getOption("techBackground", answers.secondaryTechBackground)?.label
      : undefined;

    if (primaryLabel && secondaryLabel) {
      return `${primaryLabel} + ${secondaryLabel}`;
    }

    return primaryLabel ?? "未选择";
  }

  const optionId = answers[questionId] as OptionId | undefined;
  const option = getOption(questionId, optionId);

  return option?.label ?? "未选择";
}

function getAnswerShortLabel(questionId: QuestionId, answers: AnswerMap) {
  if (questionId === "projectNeed") {
    const needs = answers.projectNeed ?? [];

    if (!needs.length) {
      return "待装配";
    }

    if (needs.length > 2) {
      return `${getOption("projectNeed", needs[0])?.shortLabel ?? "已选"} +${needs.length - 1}`;
    }

    return needs.map((optionId) => getOption("projectNeed", optionId)?.shortLabel).filter(Boolean).join(" + ");
  }

  if (questionId === "techBackground") {
    const primary = answers.techBackground ? getOption("techBackground", answers.techBackground)?.shortLabel : undefined;
    const secondary = answers.secondaryTechBackground
      ? getOption("techBackground", answers.secondaryTechBackground)?.shortLabel
      : undefined;

    return primary && secondary ? `${primary} + ${secondary}` : primary ?? "待装配";
  }

  const optionId = answers[questionId] as OptionId | undefined;

  return optionId ? getOption(questionId, optionId)?.shortLabel ?? "已选择" : "待装配";
}

function isOptionSelected(questionId: QuestionId, optionId: OptionId, answers: AnswerMap) {
  if (questionId === "projectNeed") {
    return answers.projectNeed?.includes(optionId as ProjectNeedOptionId) ?? false;
  }

  if (questionId === "techBackground") {
    return answers.techBackground === optionId || answers.secondaryTechBackground === optionId;
  }

  return answers[questionId] === optionId;
}

function getOptionRoleLabel(questionId: QuestionId, optionId: OptionId, answers: AnswerMap) {
  if (questionId === "techBackground") {
    if (answers.techBackground === optionId) {
      return "主背景";
    }

    if (answers.secondaryTechBackground === optionId) {
      return "备选";
    }

    return undefined;
  }

  return isOptionSelected(questionId, optionId, answers) ? "已选" : undefined;
}

function createShareUrl(answers: AnswerMap) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams();

  questions.forEach((question) => {
    if (question.id === "projectNeed") {
      if (answers.projectNeed?.length) {
        params.set(queryKeys[question.id], answers.projectNeed.join(","));
      }

      return;
    }

    if (question.id === "techBackground") {
      if (answers.techBackground) {
        params.set(queryKeys[question.id], answers.techBackground);
      }

      if (answers.secondaryTechBackground) {
        params.set(secondaryTechBackgroundQueryKey, answers.secondaryTechBackground);
      }

      return;
    }

    const answer = answers[question.id];

    if (answer) {
      params.set(queryKeys[question.id], answer as string);
    }
  });

  url.search = params.toString();

  return url.toString();
}

function formatList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function formatStack(items: StackItem[]) {
  return items.map((item) => `- ${item.label}（${item.source}）：${item.reason}`).join("\n");
}

function formatAlternateRoutes(routes: Recommendation["alternateRoutes"]) {
  if (!routes.length) {
    return "- 当前选择已经足够聚焦，暂不需要额外分支路线。";
  }

  return routes
    .map((route) => `### ${route.title}\n${route.summary}\n\n${formatStack(route.stack)}`)
    .join("\n\n");
}

function createResultMarkdown(answers: AnswerMap, recommendation: Recommendation) {
  const answerSummary = questions
    .map((question) => `- ${question.eyebrow}: ${getAnswerLabel(question.id, answers)}`)
    .join("\n");

  return `# Vibe Coding 技术栈决策

## 你的选择
${answerSummary}

## 决策路径
${formatList(recommendation.decisionPath)}

## 推荐技术栈
${recommendation.routeTitle}

${recommendation.routeSummary}

## 推荐工具箱
${formatStack(recommendation.stack)}

## 备选路线
${formatAlternateRoutes(recommendation.alternateRoutes)}

## 今天开始
${formatList(recommendation.todayTasks)}

## 本周完成
${formatList(recommendation.weekTasks)}

## 上线前检查
${formatList(recommendation.launchChecks)}

## 风险提醒
${formatList(recommendation.risks)}

## 下一步
${recommendation.nextMove}
`;
}

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function downloadMarkdown(markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "vibe-coding-stack-decision.md";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getToyStyle(theme: ToyTheme): CSSProperties {
  return {
    "--toy-accent": theme.accent,
    "--toy-deep": theme.deep,
    "--toy-tint": theme.tint
  } as CSSProperties;
}

function TaskList({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <section className="toy-task-card" style={{ "--toy-accent": accent } as CSSProperties}>
      <div className="flex items-center gap-2">
        <span className="toy-mini-light" aria-hidden="true" />
        <h3 className="text-sm font-black text-[#172033]">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-[#334155]" key={item}>
            <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--toy-accent)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StackToolbox({ items }: { items: StackItem[] }) {
  return (
    <section className="toy-toolbox">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="toy-kicker">Matched Kit</p>
          <h3 className="text-lg font-black text-[#172033]">推荐工具箱</h3>
        </div>
        <span className="toy-counter">{items.length} 件</span>
      </div>
      <div className="toy-stack-grid mt-4">
        {items.map((item) => (
          <article className="toy-stack-card" key={`${item.source}-${item.label}`}>
            <span className="toy-stack-source">{item.source}</span>
            <h4>{item.label}</h4>
            <p>{item.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AlternateRoutes({ routes }: { routes: Recommendation["alternateRoutes"] }) {
  return (
    <section className="toy-alt-routes">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="toy-kicker">Alternate Routes</p>
          <h3 className="text-lg font-black text-[#172033]">备选路线</h3>
        </div>
        <span className="toy-counter">{routes.length || 1} 条</span>
      </div>

      {routes.length ? (
        <div className="toy-alt-grid mt-4">
          {routes.map((route) => (
            <article className="toy-alt-card" key={route.title}>
              <div>
                <p className="toy-alt-label">Plan B</p>
                <h4>{route.title}</h4>
                <p>{route.summary}</p>
              </div>
              <div className="toy-alt-stack" aria-label={`${route.title} 工具箱`}>
                {route.stack.map((item) => (
                  <span key={`${route.title}-${item.source}-${item.label}`}>{item.label}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="toy-alt-empty mt-4">当前选择已经足够聚焦，暂不需要额外分支路线。</p>
      )}
    </section>
  );
}

function DecisionPath({ items }: { items: string[] }) {
  return (
    <section className="toy-decision-path" aria-label="四问决策路径">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="toy-kicker">Decision Path</p>
          <h3 className="text-lg font-black text-[#172033]">四问决策路径</h3>
        </div>
        <span className="toy-counter">{items.length} 问</span>
      </div>
      <ol className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <li className="toy-path-step" key={item} style={{ "--toy-accent": stepAccents[index] } as CSSProperties}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WorkshopAction({
  children,
  disabled,
  onClick,
  tone = "plain"
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  tone?: "plain" | "primary" | "danger";
}) {
  return (
    <button
      className={cx("toy-action", tone === "primary" && "toy-action-primary", tone === "danger" && "toy-action-danger")}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function OptionButton({
  option,
  selected,
  badge,
  onClick
}: {
  option: DecisionOption;
  selected: boolean;
  badge?: string;
  onClick: () => void;
}) {
  const Icon = optionIcons[option.id] ?? Sparkles;
  const theme = optionThemes[option.id];

  return (
    <button
      className={cx("toy-option", selected && "is-selected")}
      onClick={onClick}
      style={getToyStyle(theme)}
      type="button"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="toy-option-icon">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="toy-check-slot">
          {selected ? <Check className="h-4 w-4" aria-hidden="true" /> : <span className="toy-empty-screw" />}
        </span>
      </span>
      <span className="mt-5 block text-lg font-black text-[#172033]">{option.label}</span>
      <span className="mt-3 block text-sm leading-6 text-[#334155]">{option.description}</span>
      <span className="mt-auto flex flex-wrap items-end gap-2 pt-4">
        <span className="toy-label-tape">{option.signal}</span>
        {badge ? <span className="toy-option-badge">{badge}</span> : null}
      </span>
    </button>
  );
}

function StepButton({
  question,
  index,
  active,
  done,
  answerLabel,
  onClick
}: {
  question: (typeof questions)[number];
  index: number;
  active: boolean;
  done: boolean;
  answerLabel: string;
  onClick: () => void;
}) {
  const accent = stepAccents[index % stepAccents.length];

  return (
    <button
      className={cx("toy-step", active && "is-active", done && "is-done")}
      onClick={onClick}
      style={{ "--toy-accent": accent } as CSSProperties}
      type="button"
    >
      <span className="toy-step-index">{done ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-[#172033]">{question.eyebrow}</span>
        <span className="block truncate text-xs font-semibold text-[#64748b]">{answerLabel}</span>
      </span>
    </button>
  );
}

function SideTray({
  answers,
  actionFeedback,
  progress,
  recommendation,
  showResult
}: {
  answers: AnswerMap;
  actionFeedback: string | null;
  progress: number;
  recommendation: Recommendation;
  showResult: boolean;
}) {
  return (
    <aside className="toy-side-tray">
      <section className="toy-side-section">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black text-[#172033]">装配进度</p>
          <span className="toy-counter">{progress}%</span>
        </div>
        <div className="toy-ruler mt-4" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        {actionFeedback ? <p className="toy-feedback mt-4">{actionFeedback}</p> : null}
      </section>

      <section className="toy-side-section">
        <p className="text-sm font-black text-[#172033]">{showResult ? "推荐工具箱" : "已选零件"}</p>
        {showResult ? (
          <div className="mt-3 space-y-2">
            {recommendation.stack.map((item) => (
              <div className="toy-token" key={`${item.source}-${item.label}`}>
                <span>{item.label}</span>
                <small>{item.source}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {questions.map((question, index) => (
              <div className="toy-answer-row" key={question.id}>
                <span className="toy-answer-dot" style={{ background: stepAccents[index % stepAccents.length] }} />
                <span className="min-w-0 truncate">{question.eyebrow}</span>
                <span className="ml-auto max-w-24 truncate font-black text-[#172033]">
                  {getAnswerLabel(question.id, answers)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="toy-side-section hidden lg:block">
        <p className="text-sm font-black text-[#172033]">工位状态</p>
        <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden="true">
          <span className="toy-worklight bg-[#ef4444]" />
          <span className="toy-worklight bg-[#f4c430]" />
          <span className="toy-worklight bg-[#0f9f7a]" />
        </div>
      </section>
    </aside>
  );
}

export default function DecisionWizard() {
  const [wizardState, setWizardState] = useState<SavedWizardState>(emptyWizardState);
  const hasRestoredState = useRef(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const { answers, showResult, step } = wizardState;
  const question = questions[step];
  const answeredCount = getAnsweredCount(answers);
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLastStep = step === questions.length - 1;
  const currentQuestionAnswered = isQuestionAnswered(answers, question.id);
  const recommendation = useMemo(() => createRecommendation(answers), [answers]);
  const resultMarkdown = useMemo(() => createResultMarkdown(answers, recommendation), [answers, recommendation]);

  useEffect(() => {
    window.queueMicrotask(() => {
      setWizardState(getInitialWizardState());
      hasRestoredState.current = true;
    });
  }, []);

  useEffect(() => {
    if (!hasRestoredState.current) {
      return;
    }

    saveWizardState(wizardState);
  }, [wizardState]);

  useEffect(() => {
    if (!actionFeedback) {
      return;
    }

    const timerId = window.setTimeout(() => setActionFeedback(null), 2200);

    return () => window.clearTimeout(timerId);
  }, [actionFeedback]);

  function selectOption(questionId: QuestionId, optionId: DecisionOption["id"]) {
    setWizardState((current) => ({
      ...current,
      answers: withAnswer(current.answers, questionId, optionId)
    }));
    setActionFeedback("已放入工作台");
  }

  function goNext() {
    if (!currentQuestionAnswered) {
      return;
    }

    if (isLastStep) {
      setWizardState((current) => ({ ...current, showResult: true }));
      setActionFeedback("技术栈已装配完成");
      return;
    }

    setWizardState((current) => ({ ...current, step: Math.min(current.step + 1, questions.length - 1) }));
  }

  function goBack() {
    if (showResult) {
      setWizardState((current) => ({ ...current, showResult: false, step: questions.length - 1 }));
      return;
    }

    setWizardState((current) => ({ ...current, step: Math.max(current.step - 1, 0) }));
  }

  function restart() {
    setWizardState(emptyWizardState);
    setActionFeedback(null);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      setActionFeedback("当前浏览器未允许清除本地保存");
    }
    window.history.replaceState(null, "", window.location.pathname);
  }

  async function copyResult() {
    try {
      await writeClipboard(resultMarkdown);
      setActionFeedback("方案已复制");
    } catch {
      setActionFeedback("复制失败，请手动选择文本");
    }
  }

  async function copyShareLink() {
    try {
      await writeClipboard(createShareUrl(answers));
      setActionFeedback("分享链接已复制");
    } catch {
      setActionFeedback("复制失败，请检查浏览器权限");
    }
  }

  function exportMarkdown() {
    downloadMarkdown(resultMarkdown);
    setActionFeedback("Markdown 已导出");
  }

  return (
    <main className="toy-page text-[#172033]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="toy-topbar">
          <div className="flex min-w-0 items-center gap-3">
            <span className="toy-brand-mark" aria-hidden="true">
              <Code2 className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="toy-kicker">Toy Workshop</p>
              <h1 className="truncate text-2xl font-black sm:text-3xl">Vibe Coding 技术栈装配台</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden min-w-52 sm:block">
              <div className="flex items-center justify-between text-xs font-black text-[#475569]">
                <span>Build Meter</span>
                <span>{answeredCount}/{questions.length}</span>
              </div>
              <div className="toy-ruler mt-2" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <WorkshopAction onClick={restart} tone="danger">
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              重选
            </WorkshopAction>
          </div>
        </header>

        <div className="grid flex-1 gap-4 py-5 lg:grid-cols-[300px_minmax(0,1fr)_270px]">
          <aside className="toy-pegboard">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-[#172033]">零件架</p>
              <span className="toy-counter">{answeredCount}/{questions.length}</span>
            </div>
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1" aria-label="决策步骤">
              {questions.map((item, index) => (
                <StepButton
                  active={!showResult && index === step}
                  answerLabel={getAnswerShortLabel(item.id, answers)}
                  done={isQuestionAnswered(answers, item.id)}
                  index={index}
                  key={item.id}
                  onClick={() => {
                    setWizardState((current) => ({ ...current, step: index, showResult: false }));
                  }}
                  question={item}
                />
              ))}
            </nav>
          </aside>

          <section className="toy-workbench">
            {!showResult ? (
              <div className="flex min-h-full flex-col">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="toy-stage-label">
                      <span style={{ background: stepAccents[step % stepAccents.length] }} />
                      {question.eyebrow}
                    </p>
                    <h2 className="mt-3 text-3xl font-black leading-tight text-[#172033] sm:text-4xl">
                      {question.title}
                    </h2>
                  </div>
                  <span className="toy-step-chip">
                    {step + 1} / {questions.length}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {question.options.map((option) => (
                    <OptionButton
                      badge={getOptionRoleLabel(question.id, option.id, answers)}
                      key={option.id}
                      onClick={() => selectOption(question.id, option.id)}
                      option={option}
                      selected={isOptionSelected(question.id, option.id, answers)}
                    />
                  ))}
                </div>

                <div className="mt-auto flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <WorkshopAction disabled={step === 0} onClick={goBack}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    上一步
                  </WorkshopAction>
                  <WorkshopAction disabled={!currentQuestionAnswered} onClick={goNext} tone="primary">
                    {isLastStep ? "生成技术栈" : "下一步"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </WorkshopAction>
                </div>
              </div>
            ) : (
              <div className="flex min-h-full flex-col">
                <div className="toy-result-head">
                  <div className="max-w-3xl">
                    <p className="toy-stage-label">
                      <span style={{ background: "#0f9f7a" }} />
                      {recommendation.routeTag}
                    </p>
                    <h2 className="mt-3 text-3xl font-black leading-tight text-[#172033] sm:text-4xl">
                      {recommendation.routeTitle}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[#334155]">{recommendation.routeSummary}</p>
                  </div>
                  <div className="toy-next-note">
                    <p className="text-sm font-black text-[#172033]">下一步</p>
                    <p className="mt-2 text-sm leading-6 text-[#334155]">{recommendation.nextMove}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <WorkshopAction onClick={copyResult}>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    复制方案
                  </WorkshopAction>
                  <WorkshopAction onClick={copyShareLink}>
                    <Link2 className="h-4 w-4" aria-hidden="true" />
                    分享链接
                  </WorkshopAction>
                  <WorkshopAction onClick={exportMarkdown}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    导出 Markdown
                  </WorkshopAction>
                </div>

                <div className="mt-5">
                  <DecisionPath items={recommendation.decisionPath} />
                </div>

                <div className="mt-5">
                  <StackToolbox items={recommendation.stack} />
                </div>

                <div className="mt-5">
                  <AlternateRoutes routes={recommendation.alternateRoutes} />
                </div>

                <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
                  <div className="grid gap-3 md:grid-cols-3">
                    <TaskList accent="#ef4444" title="今天开始" items={recommendation.todayTasks} />
                    <TaskList accent="#2563eb" title="本周完成" items={recommendation.weekTasks} />
                    <TaskList accent="#0f9f7a" title="上线前检查" items={recommendation.launchChecks} />
                  </div>

                  <section className="toy-risk-box">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-[#ef4444]" aria-hidden="true" />
                      <h3 className="text-sm font-black text-[#172033]">风险提醒</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {recommendation.risks.map((risk) => (
                        <li className="text-sm leading-6 text-[#334155]" key={risk}>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="mt-auto flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <WorkshopAction onClick={goBack}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    修改答案
                  </WorkshopAction>
                  <WorkshopAction onClick={restart} tone="primary">
                    <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                    重新开始
                  </WorkshopAction>
                </div>
              </div>
            )}
          </section>

          <SideTray
            actionFeedback={actionFeedback}
            answers={answers}
            progress={progress}
            recommendation={recommendation}
            showResult={showResult}
          />
        </div>
      </div>
    </main>
  );
}
