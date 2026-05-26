import type { AnswerMap, DecisionQuestion, Recommendation } from "@/types/decision";

export const questions: DecisionQuestion[] = [
  {
    id: "projectType",
    eyebrow: "项目类型",
    title: "你想先做成什么？",
    options: [
      {
        id: "site",
        label: "展示型网站",
        shortLabel: "网站",
        description: "作品集、品牌页、活动页、产品介绍。",
        signal: "需要清楚表达价值和建立可信度。"
      },
      {
        id: "tool",
        label: "小工具",
        shortLabel: "工具",
        description: "计算器、生成器、表单助手、查询面板。",
        signal: "需要把一个动作做得快、稳、好用。"
      },
      {
        id: "saas",
        label: "SaaS 雏形",
        shortLabel: "SaaS",
        description: "有仪表盘、列表、状态流转或团队协作。",
        signal: "需要尽早收缩范围，先验证一个核心工作流。"
      },
      {
        id: "content",
        label: "内容产品",
        shortLabel: "内容",
        description: "课程、指南、资料库、知识地图。",
        signal: "需要结构清晰，方便持续扩展。"
      },
      {
        id: "automation",
        label: "自动化流程",
        shortLabel: "自动化",
        description: "把重复操作变成表单、脚本或工作流。",
        signal: "需要先画清输入、处理和输出。"
      }
    ]
  },
  {
    id: "currentStage",
    eyebrow: "当前阶段",
    title: "现在手里有什么？",
    options: [
      {
        id: "idea",
        label: "只有想法",
        shortLabel: "想法",
        description: "还没有页面、文案或具体流程。",
        signal: "先把目标用户、核心场景和最小结果写出来。"
      },
      {
        id: "draft",
        label: "已有草稿",
        shortLabel: "草稿",
        description: "有文案、截图、表格或功能清单。",
        signal: "可以整理成页面结构和任务列表。"
      },
      {
        id: "prototype",
        label: "已有原型",
        shortLabel: "原型",
        description: "已经画过界面或搭过可点击版本。",
        signal: "可以直接定义组件、状态和交互细节。"
      },
      {
        id: "ready",
        label: "准备开发",
        shortLabel: "开发",
        description: "目标、页面和核心流程基本确定。",
        signal: "可以进入技术实现和上线准备。"
      }
    ]
  },
  {
    id: "comfortLevel",
    eyebrow: "技术舒适度",
    title: "你希望自己参与到哪一步？",
    options: [
      {
        id: "beginner",
        label: "完全零基础",
        shortLabel: "零基础",
        description: "希望 AI 给出清楚指令，自己负责判断结果。",
        signal: "减少技术概念，一次只推进一个可见变化。"
      },
      {
        id: "editor",
        label: "会改代码",
        shortLabel: "能修改",
        description: "能看懂简单文件，愿意调整文案和样式。",
        signal: "适合用组件化任务让 AI 和自己分工。"
      },
      {
        id: "builder",
        label: "能独立开发",
        shortLabel: "能开发",
        description: "可以处理状态、接口、部署和调试。",
        signal: "可以更快进入架构和边界条件。"
      }
    ]
  },
  {
    id: "priority",
    eyebrow: "优先级",
    title: "第一版最该优化什么？",
    options: [
      {
        id: "validate",
        label: "快速验证",
        shortLabel: "验证",
        description: "尽快让真实用户看到并反馈。",
        signal: "把范围压到一个承诺和一个行动。"
      },
      {
        id: "visual",
        label: "视觉体验",
        shortLabel: "视觉",
        description: "希望第一眼就专业、清楚、有记忆点。",
        signal: "先建立页面系统，再补功能深度。"
      },
      {
        id: "complete",
        label: "功能完整",
        shortLabel: "完整",
        description: "需要把关键流程走通，而不是只做展示。",
        signal: "要明确状态、异常和完成标准。"
      },
      {
        id: "cost",
        label: "低成本上线",
        shortLabel: "成本",
        description: "尽量少接服务，控制维护难度。",
        signal: "优先静态、无后端或托管服务。"
      }
    ]
  }
];

const defaultRisks = [
  "一次塞进太多用户角色，会让第一版没有清晰判断标准。",
  "过早接数据库和登录，会把验证节奏拖慢。",
  "只追求页面好看但没有明确行动，会降低真实反馈质量。"
];

export function createRecommendation(answers: AnswerMap): Recommendation {
  const projectType = answers.projectType;
  const currentStage = answers.currentStage;
  const comfortLevel = answers.comfortLevel;
  const priority = answers.priority;

  let routeTitle = "先做静态原型";
  let routeSummary = "用一组清晰页面把想法讲完整，再根据反馈决定是否进入功能开发。";
  let routeTag = "Prototype first";
  let stack = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"];
  let todayTasks = [
    "写下目标用户、使用场景和第一版只解决的一个问题。",
    "列出首页或主界面的 3 个核心区块。",
    "准备 5 条真实文案，不用占位语。"
  ];
  let weekTasks = [
    "完成一个可点击页面，并让 3 位目标用户看懂它。",
    "记录用户最常问的问题，删掉没有帮助的功能点。",
    "把最终页面部署到 Vercel，拿到可分享链接。"
  ];
  let launchChecks = [
    "首屏能在 5 秒内说明价值。",
    "主要按钮指向一个明确行动。",
    "移动端没有文字溢出和按钮误触。"
  ];
  let risks = [...defaultRisks];
  let nextMove = "先把第一屏、核心说明和一个行动按钮做出来。";

  if (projectType === "tool" || projectType === "automation") {
    routeTitle = "先做表单流程";
    routeSummary = "从输入、处理、输出三段拆开，把最常发生的一次任务做顺。";
    routeTag = "Workflow first";
    stack = ["Next.js", "TypeScript", "Tailwind CSS", "Server Actions 或本地计算", "Vercel"];
    todayTasks = [
      "写清用户输入哪些信息，以及每项信息是否必填。",
      "定义输出结果的格式，例如清单、表格、文本或下载文件。",
      "做一个无账号版本，先让流程跑通。"
    ];
    weekTasks = [
      "补齐空状态、错误状态和完成状态。",
      "用 5 组真实样例测试结果是否稳定。",
      "整理一个可复制的使用结果，方便用户分享。"
    ];
    launchChecks = [
      "用户不需要说明书也能完成一次操作。",
      "每个输入项都有明确标签和限制。",
      "失败时页面能告诉用户怎么修正。"
    ];
    risks = [
      "过早加入太多高级设置，会让零基础用户不敢开始。",
      "没有真实样例测试，工具很容易只在理想输入下可用。",
      "输出结果如果不能复制或保存，用户会难以复用。"
    ];
    nextMove = "先画一条从输入到输出的单线流程。";
  }

  if (projectType === "saas") {
    routeTitle = "先做 MVP 后台";
    routeSummary = "只保留一个核心对象和一个核心状态流转，先验证它是否真的省时间。";
    routeTag = "MVP dashboard";
    stack = ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"];
    todayTasks = [
      "定义一个核心对象，例如项目、客户、订单、任务或内容条目。",
      "写出它从创建到完成的状态变化。",
      "删掉第一版不影响验证的团队、权限和统计功能。"
    ];
    weekTasks = [
      "完成列表、详情、创建表单和状态更新。",
      "用假数据先走通全流程，再决定是否接数据库。",
      "邀请 1 位真实用户完成一次任务并观察卡点。"
    ];
    launchChecks = [
      "核心流程不超过 4 个页面或面板。",
      "每个状态都有明确下一步动作。",
      "数据字段只保留能支持决策的部分。"
    ];
    risks = [
      "一开始做完整后台，会把 MVP 变成大型系统。",
      "权限、计费和通知应在核心流程验证后再加入。",
      "仪表盘指标如果没有真实使用数据，容易造成假复杂。"
    ];
    nextMove = "先定义一个核心对象和它的状态流转。";
  }

  if (projectType === "content") {
    routeTitle = "先做内容地图";
    routeSummary = "把内容整理成可浏览、可筛选、可持续扩展的结构，再决定是否产品化。";
    routeTag = "Content system";
    stack = ["Next.js", "TypeScript", "MDX 或本地数据", "Tailwind CSS", "Vercel"];
    todayTasks = [
      "列出 6 到 10 个内容条目，按用户问题而不是作者思路命名。",
      "定义分类、难度和使用场景三个字段。",
      "写一个能让用户立刻开始的入口内容。"
    ];
    weekTasks = [
      "完成目录页、详情页和筛选体验。",
      "补齐每个条目的摘要、适合人群和行动清单。",
      "用真实用户搜索过的问题重排内容结构。"
    ];
    launchChecks = [
      "用户能在 30 秒内找到第一篇该看的内容。",
      "每个内容页都有下一步行动。",
      "新增内容不需要改动页面结构。"
    ];
    risks = [
      "按知识点堆内容，容易让新手不知道从哪里开始。",
      "没有筛选和下一步，资料库会变成收藏夹。",
      "第一版内容太多会拖慢发布，先保证少而准。"
    ];
    nextMove = "先整理第一批内容条目和分类字段。";
  }

  if (currentStage === "idea") {
    todayTasks = [
      "用一句话写清这个产品帮谁完成什么。",
      "列出最小可演示版本必须出现的 3 个画面或动作。",
      "找一个相似产品，标注你要保留和避开的地方。"
    ];
  }

  if (currentStage === "prototype" || currentStage === "ready") {
    weekTasks = [
      "把原型拆成组件、状态和数据字段。",
      "让 AI 先实现主路径，再补边界状态。",
      "部署预览版本并收集真实反馈。"
    ];
  }

  if (comfortLevel === "beginner") {
    stack = stack.filter((item) => item !== "Supabase");
    stack.push(projectType === "saas" ? "本地假数据优先" : "无后端优先");
    risks.unshift("每次只让 AI 改一个明确模块，否则很难判断问题来自哪里。");
  }

  if (comfortLevel === "builder" && !stack.includes("Supabase") && projectType !== "site") {
    stack.splice(stack.length - 1, 0, "Supabase 可选");
  }

  if (priority === "visual") {
    routeSummary = `${routeSummary} 第一轮实现要先建立视觉系统，保证页面看起来可信。`;
    todayTasks[1] = "确定导航、按钮、表单和结果卡片的基础样式。";
    launchChecks.unshift("关键页面在桌面和手机上都保持专业、稳定。");
  }

  if (priority === "complete") {
    routeSummary = `${routeSummary} 同时要补齐空状态、错误状态和完成状态。`;
    weekTasks.unshift("为主流程写出成功、失败、空数据三类状态。");
    risks.unshift("功能完整不等于功能很多，先完整一个流程。");
  }

  if (priority === "cost") {
    stack = stack.filter((item) => item !== "Supabase");
    if (!stack.includes("本地数据")) {
      stack.splice(stack.length - 1, 0, "本地数据");
    }
    risks.unshift("低成本上线适合先少接服务，但要保留以后迁移的字段结构。");
  }

  if (priority === "validate") {
    nextMove = "今天先做一个能发给目标用户看的版本。";
    launchChecks.unshift("页面里有一个可追踪的反馈或联系入口。");
  }

  return {
    routeTitle,
    routeSummary,
    routeTag,
    stack: Array.from(new Set(stack)),
    todayTasks,
    weekTasks,
    launchChecks,
    risks: Array.from(new Set(risks)).slice(0, 4),
    nextMove
  };
}
