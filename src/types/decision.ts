export type QuestionId = "projectType" | "currentStage" | "comfortLevel" | "priority";

export type OptionId =
  | "site"
  | "tool"
  | "saas"
  | "content"
  | "automation"
  | "idea"
  | "draft"
  | "prototype"
  | "ready"
  | "beginner"
  | "editor"
  | "builder"
  | "validate"
  | "visual"
  | "complete"
  | "cost";

export type AnswerMap = Partial<Record<QuestionId, OptionId>>;

export interface DecisionOption {
  id: OptionId;
  label: string;
  shortLabel: string;
  description: string;
  signal: string;
}

export interface DecisionQuestion {
  id: QuestionId;
  eyebrow: string;
  title: string;
  options: DecisionOption[];
}

export interface Recommendation {
  routeTitle: string;
  routeSummary: string;
  routeTag: string;
  stack: string[];
  todayTasks: string[];
  weekTasks: string[];
  launchChecks: string[];
  risks: string[];
  nextMove: string;
}
