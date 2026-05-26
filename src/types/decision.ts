export type QuestionId = "deliveryTarget" | "projectNeed" | "expectedScale" | "techBackground";

export type DeliveryTargetOptionId =
  | "webApp"
  | "desktopApp"
  | "androidNative"
  | "iosNative"
  | "crossPlatformApp"
  | "cliTool"
  | "embeddedApp";

export type ProjectNeedOptionId =
  | "contentOnly"
  | "login"
  | "storage"
  | "ai"
  | "localTool"
  | "nativeDevice";

export type ExpectedScaleOptionId = "small" | "medium" | "large";
export type TechBackgroundOptionId = "javascript" | "python" | "cpp" | "java" | "newLearner";

export type OptionId =
  | DeliveryTargetOptionId
  | ProjectNeedOptionId
  | ExpectedScaleOptionId
  | TechBackgroundOptionId;

export type AnswerMap = Partial<{
  deliveryTarget: DeliveryTargetOptionId;
  projectNeed: ProjectNeedOptionId;
  expectedScale: ExpectedScaleOptionId;
  techBackground: TechBackgroundOptionId;
}>;

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

export interface StackItem {
  label: string;
  reason: string;
  source: string;
}

export interface Recommendation {
  routeTitle: string;
  routeSummary: string;
  routeTag: string;
  decisionPath: string[];
  stack: StackItem[];
  todayTasks: string[];
  weekTasks: string[];
  launchChecks: string[];
  risks: string[];
  nextMove: string;
}
