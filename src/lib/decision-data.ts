import type { AnswerMap, DecisionQuestion, Recommendation, StackItem } from "@/types/decision";

export const questions: DecisionQuestion[] = [
  {
    id: "deliveryTarget",
    eyebrow: "问题一：运行平台",
    title: "这个项目最终运行在哪里？",
    options: [
      {
        id: "webApp",
        label: "Web 应用",
        shortLabel: "Web",
        description: "浏览器访问的网站、后台、SaaS、内容站、AI Web 工具或在线业务系统。",
        signal: "优先考虑前端框架、后端接口、托管平台和浏览器体验。"
      },
      {
        id: "desktopApp",
        label: "桌面应用",
        shortLabel: "桌面",
        description: "运行在 Windows、macOS 或 Linux 的本地软件，需要窗口、菜单、文件系统或原生能力。",
        signal: "优先考虑 Qt、Electron、Tauri、PySide6 等桌面技术。"
      },
      {
        id: "androidNative",
        label: "Android 原生",
        shortLabel: "Android",
        description: "主要面向 Android 手机、平板、扫码枪、车机或其他 Android 设备。",
        signal: "优先 Android Studio、Android SDK、Gradle、Kotlin 或 Java。"
      },
      {
        id: "iosNative",
        label: "iOS 原生",
        shortLabel: "iOS",
        description: "主要面向 iPhone、iPad 或 Apple 生态里的原生体验。",
        signal: "优先 Swift、SwiftUI、Xcode 和 Apple 平台规范。"
      },
      {
        id: "crossPlatformApp",
        label: "跨平台 App",
        shortLabel: "跨端",
        description: "一套主要代码同时发布 Android 和 iOS，例如 Flutter、React Native / Expo。",
        signal: "优先跨端框架，同时保留原生模块扩展空间。"
      },
      {
        id: "cliTool",
        label: "CLI 工具",
        shortLabel: "CLI",
        description: "命令行工具、脚本型工作流、开发者工具、批处理或自动化入口。",
        signal: "优先命令解析、日志输出、打包分发和本地配置。"
      },
      {
        id: "embeddedApp",
        label: "嵌入式或硬件",
        shortLabel: "硬件",
        description: "运行在开发板、单片机、边缘设备或需要连接硬件的系统。",
        signal: "优先目标平台 SDK、C/C++、交叉编译和设备调试链路。"
      }
    ]
  },
  {
    id: "projectNeed",
    eyebrow: "问题二：项目本质",
    title: "这个项目本质上需要做什么？",
    options: [
      {
        id: "contentOnly",
        label: "展示内容为主",
        shortLabel: "展示",
        description: "作品集、落地页、文档、课程、活动页、应用壳或信息展示，核心是让用户阅读和理解。",
        signal: "优先静态站点、轻量页面、内容结构或平台原生展示控件。"
      },
      {
        id: "login",
        label: "需要用户登录",
        shortLabel: "登录",
        description: "有账号、权限、个人资料、团队空间或用户专属数据。",
        signal: "需要可信后端、认证方案、会话/Token 策略和权限边界。"
      },
      {
        id: "storage",
        label: "需要持久化存储",
        shortLabel: "存储",
        description: "有订单、任务、客户、文章、记录、收藏、配置或可编辑数据。",
        signal: "需要数据库、本地存储、数据模型、迁移和备份策略。"
      },
      {
        id: "ai",
        label: "需要 AI 能力",
        shortLabel: "AI",
        description: "要调用模型生成、分析、总结、对话、检索或自动化处理。",
        signal: "需要 AI API、提示词管理、流式输出、成本控制和失败兜底。"
      },
      {
        id: "localTool",
        label: "本地工具与文件",
        shortLabel: "本地",
        description: "要处理本地文件、剪贴板、系统托盘、快捷键、批处理或离线工作流。",
        signal: "需要本地权限、文件 I/O、设置保存和可安装分发。"
      },
      {
        id: "nativeDevice",
        label: "设备原生能力",
        shortLabel: "设备",
        description: "要用相机、定位、蓝牙、传感器、通知、扫码、USB 或硬件接口。",
        signal: "需要原生 SDK、权限处理、设备兼容性和真机测试。"
      }
    ]
  },
  {
    id: "expectedScale",
    eyebrow: "问题三：规模预期",
    title: "用户规模、分发范围或并发预期是多少？",
    options: [
      {
        id: "small",
        label: "个人或小规模",
        shortLabel: "小规模",
        description: "个人使用、内部工具、早期 MVP、小范围安装，访问量或分发范围都比较低。",
        signal: "选择简单方案，优先少服务、少运维、快验证。"
      },
      {
        id: "medium",
        label: "预期中等规模",
        shortLabel: "中等",
        description: "会有真实用户增长、多人协作、稳定访问、应用发布或基础运营需求。",
        signal: "需要考虑扩展性、监控、缓存、后台任务、发布通道和环境隔离。"
      },
      {
        id: "large",
        label: "预期大规模",
        shortLabel: "大规模",
        description: "面向高并发、大量安装、复杂权限、大量数据或重要业务系统。",
        signal: "需要架构设计、容量规划、可观测性、自动化发布和回滚策略。"
      }
    ]
  },
  {
    id: "techBackground",
    eyebrow: "问题四：技术背景",
    title: "团队或个人更熟悉什么？",
    options: [
      {
        id: "javascript",
        label: "熟悉 JavaScript / TypeScript",
        shortLabel: "JS/TS",
        description: "能写 React、Node、前端工程，愿意在同一语言生态里做产品。",
        signal: "Web 优先 Next.js；跨端 App 优先 React Native / Expo。"
      },
      {
        id: "python",
        label: "熟悉 Python",
        shortLabel: "Python",
        description: "更习惯用 Python 写接口、脚本、数据处理、桌面小工具或 AI 工作流。",
        signal: "优先 FastAPI、Typer、PySide6/PyQt 或 Python SDK。"
      },
      {
        id: "cpp",
        label: "熟悉 C / C++",
        shortLabel: "C/C++",
        description: "熟悉原生性能、系统能力、桌面框架、嵌入式或需要更强控制力。",
        signal: "桌面优先 Qt；CLI/嵌入式优先 CMake 和平台 SDK。"
      },
      {
        id: "java",
        label: "熟悉 Java",
        shortLabel: "Java",
        description: "熟悉 Java 生态、面向对象工程、Android 传统开发或后端服务。",
        signal: "Android 原生可走 Java；Web 后端可走 Spring Boot。"
      },
      {
        id: "newLearner",
        label: "全新学习",
        shortLabel: "新手",
        description: "希望 AI 容易协助、资料多、部署顺，少踩工程化坑。",
        signal: "选择 AI 支持好、生态成熟、教程充足的技术栈。"
      }
    ]
  }
];

const defaultRisks = [
  "不要因为技术栈很流行就提前引入当前版本用不到的数据库、登录、队列和复杂发布系统。",
  "技术选型要服务第一版目标，先完整一条路径，再扩展架构。",
  "规模预期如果没有真实数据，先用托管服务、清晰边界和可迁移设计保留调整空间。"
];

const targetLabel: Record<NonNullable<AnswerMap["deliveryTarget"]>, string> = {
  webApp: "Web 应用",
  desktopApp: "桌面应用",
  androidNative: "Android 原生",
  iosNative: "iOS 原生",
  crossPlatformApp: "跨平台 App",
  cliTool: "CLI 工具",
  embeddedApp: "嵌入式或硬件"
};

const needLabel: Record<NonNullable<AnswerMap["projectNeed"]>, string> = {
  contentOnly: "展示内容为主",
  login: "需要用户登录",
  storage: "需要持久化存储",
  ai: "需要 AI 能力",
  localTool: "本地工具与文件",
  nativeDevice: "设备原生能力"
};

const scaleLabel: Record<NonNullable<AnswerMap["expectedScale"]>, string> = {
  small: "个人或小规模",
  medium: "预期中等规模",
  large: "预期大规模"
};

const backgroundLabel: Record<NonNullable<AnswerMap["techBackground"]>, string> = {
  javascript: "熟悉 JavaScript / TypeScript",
  python: "熟悉 Python",
  cpp: "熟悉 C / C++",
  java: "熟悉 Java",
  newLearner: "全新学习"
};

function stackItem(label: string, source: string, reason: string): StackItem {
  return { label, reason, source };
}

function uniqueStack(items: StackItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.label)) {
      return false;
    }

    seen.add(item.label);
    return true;
  });
}

function addStack(stack: StackItem[], items: StackItem[]) {
  stack.push(...items);
}

function addAndroidStack(stack: StackItem[], background: AnswerMap["techBackground"], need: AnswerMap["projectNeed"]) {
  if (background === "java") {
    addStack(stack, [
      stackItem("Android Studio", "平台：Android 原生", "官方 IDE，项目模板、调试、模拟器、签名和发布链路最完整。"),
      stackItem("Android SDK", "平台：Android 原生", "提供系统 API、设备能力、权限、调试工具和构建目标。"),
      stackItem("Gradle", "构建系统", "管理 Android 构建、依赖、变体、签名和发布包。"),
      stackItem("Java", "技术背景：Java", "Java 背景可以直接落地 Android 原生应用，并逐步补 Kotlin。"),
      stackItem("XML Views / Material Components", "UI 层", "Java 路线更适合先用 XML Views，Jetpack Compose 更偏 Kotlin-first。")
    ]);
    return;
  }

  if (background === "javascript") {
    addStack(stack, [
      stackItem("React Native / Expo", "技术背景：JS/TS", "能用 React 心智做 Android，同时保留后续发布 iOS 的空间。"),
      stackItem("Android Studio", "原生调试", "涉及相机、蓝牙、通知等能力时仍需要 Android 工具链调试。"),
      stackItem("TypeScript", "工程约束", "约束组件、接口和原生模块调用边界。")
    ]);
    return;
  }

  if (background === "python") {
    addStack(stack, [
      stackItem("Kotlin / Java Android 客户端", "平台：Android 原生", "Python 更适合做后端或 AI 服务，Android 客户端仍建议走原生栈。"),
      stackItem("FastAPI 后端可选", "技术背景：Python", "把账号、AI、同步和业务逻辑放到 Python 服务端更自然。"),
      stackItem("Retrofit / OkHttp", "客户端网络", "Android 端调用 Python 后端或第三方 API 的常用网络层。")
    ]);
    return;
  }

  addStack(stack, [
    stackItem("Kotlin", "平台：Android 原生", "Android 现代样例和官方学习路径更偏 Kotlin。"),
    stackItem("Android Studio", "平台：Android 原生", "开发、调试、模拟器、签名和发布链路完整。"),
    stackItem("Jetpack Compose", "UI 层", "新手做现代 Android UI 更直接，但需要接受 Kotlin 生态。"),
    stackItem("Gradle", "构建系统", "管理依赖、构建变体和发布包。")
  ]);

  if (need === "nativeDevice") {
    stack.push(stackItem("Android 权限与真机测试", "项目本质：设备原生能力", "相机、定位、蓝牙、传感器等能力必须在真机和多系统版本上验证。"));
  }
}

function addIosStack(stack: StackItem[], background: AnswerMap["techBackground"]) {
  addStack(stack, [
    stackItem("Swift", "平台：iOS 原生", "iOS 原生开发的主语言，适合系统 API、设备能力和长期维护。"),
    stackItem("SwiftUI", "UI 层", "现代 iOS UI 的推荐起点，适合新项目和快速迭代。"),
    stackItem("Xcode", "平台：iOS 原生", "构建、模拟器、签名、调试和 App Store 发布都依赖 Xcode。"),
    stackItem("App Store Connect", "发布渠道", "管理 TestFlight、审核、版本和线上发布。")
  ]);

  if (background === "javascript" || background === "java") {
    stack.push(stackItem("跨平台 App 可选", "技术背景提示", "如果不想学习 Swift，可以改选跨平台 App，用一套主代码覆盖 Android 和 iOS。"));
  }
}

function addCrossPlatformStack(stack: StackItem[], background: AnswerMap["techBackground"]) {
  if (background === "javascript") {
    addStack(stack, [
      stackItem("React Native / Expo", "技术背景：JS/TS", "用 React 和 TypeScript 做 Android+iOS，一套主代码快速发布双端。"),
      stackItem("Expo Router", "应用结构", "适合快速搭建导航、页面组织、预览和 OTA 更新。"),
      stackItem("EAS Build", "发布构建", "托管 Android/iOS 构建和签名流程，减少本机环境折腾。")
    ]);
    return;
  }

  if (background === "java") {
    addStack(stack, [
      stackItem("Flutter", "跨平台 App", "Java 背景可较快理解 Dart 的面向对象模型，且跨端生态成熟。"),
      stackItem("Dart", "跨平台 App", "Flutter 的主语言；Java 不是当前主流跨平台移动首选。"),
      stackItem("Android Studio", "开发工具", "可用于 Flutter、Android 调试和模拟器管理。")
    ]);
    return;
  }

  if (background === "python") {
    addStack(stack, [
      stackItem("Flutter", "跨平台 App", "Python 更适合后端/AI，移动端用 Flutter 保持双端体验和发布链路稳定。"),
      stackItem("FastAPI 后端可选", "技术背景：Python", "账号、同步、AI 和业务逻辑可放到 Python 服务端。"),
      stackItem("Dart", "跨平台 App", "Flutter 的主语言，需要作为移动端学习成本纳入计划。")
    ]);
    return;
  }

  addStack(stack, [
    stackItem("Flutter", "跨平台 App", "新手默认选择稳定跨端路线，一套 UI 覆盖 Android 和 iOS。"),
    stackItem("Dart", "跨平台 App", "Flutter 主语言，文档和组件生态完整。"),
    stackItem("Firebase / Supabase 可选", "托管后端", "登录、数据库、存储和推送可先用托管服务减少后端负担。")
  ]);
}

function addDesktopStack(stack: StackItem[], background: AnswerMap["techBackground"]) {
  if (background === "cpp") {
    addStack(stack, [
      stackItem("Qt 6", "平台：桌面应用", "适合 C++ 桌面程序、原生窗口、复杂控件、本地文件和跨桌面系统发布。"),
      stackItem("C++20", "技术背景：C/C++", "用现代 C++ 管理类型、资源和模块边界。"),
      stackItem("CMake", "构建系统", "Qt/C++ 项目跨平台构建、依赖和 CI 更容易统一。"),
      stackItem("Qt Creator / CLion", "开发工具", "Qt Creator 对 Qt 项目最顺，CLion 更适合已有 CMake/C++ 工作流。"),
      stackItem("Qt Installer Framework / CPack", "发布分发", "桌面应用需要安装包、依赖打包和升级策略。")
    ]);
    return;
  }

  if (background === "python") {
    addStack(stack, [
      stackItem("PySide6 / PyQt", "平台：桌面应用", "Python 背景做桌面 GUI 的自然选择，能调用 Qt 控件和本地能力。"),
      stackItem("Python", "技术背景：Python", "适合文件处理、自动化、AI 调用和内部桌面工具。"),
      stackItem("PyInstaller / Briefcase", "发布分发", "把 Python 桌面工具打包成可安装或可执行文件。")
    ]);
    return;
  }

  if (background === "javascript") {
    addStack(stack, [
      stackItem("Electron", "技术背景：JS/TS", "用 Web 技术做桌面应用，生态成熟，适合复杂 UI 和本地能力。"),
      stackItem("Tauri 可选", "桌面轻量方案", "更轻但需要 Rust/原生桥接心智，适合对包体和性能敏感的项目。"),
      stackItem("TypeScript", "工程约束", "约束主进程、渲染进程和本地 API 边界。")
    ]);
    return;
  }

  addStack(stack, [
    stackItem("Electron / Tauri", "平台：桌面应用", "新手如果已有 Web 心智，可以先用桌面壳快速完成本地应用。"),
    stackItem("Qt 6 可选", "原生桌面路线", "如果目标是长期原生桌面软件，再考虑 Qt/C++ 或 PySide6。"),
    stackItem("本地设置与安装包", "桌面分发", "桌面应用必须考虑配置保存、安装、更新和卸载体验。")
  ]);
}

function addCliStack(stack: StackItem[], background: AnswerMap["techBackground"]) {
  if (background === "python" || background === "newLearner") {
    addStack(stack, [
      stackItem("Typer", "平台：CLI 工具", "Python CLI 心智清晰，适合参数、子命令和类型提示。"),
      stackItem("Rich", "命令行输出", "让日志、表格、进度条和错误提示更清楚。"),
      stackItem("pipx / uv tool", "分发方式", "方便把工具安装到本机并反复使用。")
    ]);
    return;
  }

  if (background === "cpp") {
    addStack(stack, [
      stackItem("CMake", "平台：CLI 工具", "管理 C/C++ 构建、依赖和跨平台产物。"),
      stackItem("CLI11 / argparse", "命令解析", "减少手写参数解析，保证帮助信息和错误提示一致。"),
      stackItem("vcpkg / Conan 可选", "依赖管理", "需要第三方库时更容易跨平台复现。")
    ]);
    return;
  }

  if (background === "java") {
    addStack(stack, [
      stackItem("Picocli", "平台：CLI 工具", "Java CLI 常用框架，适合子命令、参数校验和帮助信息。"),
      stackItem("Gradle / Maven", "构建系统", "管理依赖、测试和打包。"),
      stackItem("GraalVM Native Image 可选", "分发优化", "需要单文件启动体验时可考虑原生镜像。")
    ]);
    return;
  }

  addStack(stack, [
    stackItem("Node.js + commander", "技术背景：JS/TS", "适合用 JavaScript/TypeScript 快速做开发者工具。"),
    stackItem("tsx / tsup", "构建分发", "让 TypeScript CLI 更容易本地开发和打包。"),
    stackItem("npm package", "分发方式", "适合通过 npm 安装和更新。")
  ]);
}

function addEmbeddedStack(stack: StackItem[], background: AnswerMap["techBackground"]) {
  if (background === "cpp" || background === "newLearner") {
    addStack(stack, [
      stackItem("C / C++", "平台：嵌入式或硬件", "硬件 SDK、驱动和实时约束通常以 C/C++ 为主。"),
      stackItem("CMake / PlatformIO", "构建系统", "统一管理目标板、依赖、烧录和调试。"),
      stackItem("目标平台 SDK", "硬件接口", "ESP32、STM32、Arduino、Raspberry Pi Pico 等平台需要各自 SDK。"),
      stackItem("串口日志 / 硬件调试", "验证方式", "硬件项目必须把日志、烧录、断点和设备回归测试纳入流程。")
    ]);
    return;
  }

  addStack(stack, [
    stackItem("目标平台 SDK", "平台：嵌入式或硬件", "先根据硬件型号确定工具链，再决定上层语言。"),
    stackItem("C/C++ 协作层", "硬件接口", "Python、JavaScript 或 Java 通常需要和底层 C/C++ SDK 协作。"),
    stackItem("设备调试清单", "验证方式", "硬件兼容、供电、连接、日志和固件升级都要提前规划。")
  ]);
}

function addWebStack(stack: StackItem[], background: AnswerMap["techBackground"], need: AnswerMap["projectNeed"]) {
  if (background === "python") {
    if (need === "contentOnly") {
      addStack(stack, [
        stackItem("Astro / MkDocs", "技术背景：Python", "内容展示可以保持静态化，用 Python 负责内容整理、脚本生成或数据清洗。"),
        stackItem("Python 内容脚本", "技术背景：Python", "适合把 Markdown、CSV、接口数据整理成可发布的内容源。")
      ]);
      return;
    }

    addStack(stack, [
      stackItem("FastAPI", "技术背景：Python", "适合快速做 API、AI 调用、数据处理和后台逻辑。"),
      stackItem("Vite + React", "前端搭配", "把前端体验和 Python 后端解耦，开发心智更清楚。")
    ]);
    return;
  }

  if (background === "java") {
    addStack(stack, [
      stackItem("Spring Boot", "技术背景：Java", "Java 背景做 Web 后端的成熟选择，适合登录、数据和业务系统。"),
      stackItem("React / Vue 前端", "前端搭配", "前后端分离能让 Java 后端和浏览器体验各自清晰。"),
      stackItem("Gradle / Maven", "构建系统", "管理依赖、测试、打包和部署。")
    ]);
    return;
  }

  if (background === "cpp") {
    addStack(stack, [
      stackItem("Web 前端 + C++ 服务可选", "技术背景：C/C++", "C++ 不适合作为多数 Web MVP 的默认入口，可把高性能模块独立成服务。"),
      stackItem("Next.js / Astro", "Web 入口", "浏览器体验仍建议使用成熟 Web 框架。"),
      stackItem("WebAssembly 可选", "性能模块", "只有需要把 C/C++ 算法跑在浏览器里时再引入。")
    ]);
    return;
  }

  if (background === "newLearner" && need === "contentOnly") {
    addStack(stack, [
      stackItem("Astro", "技术背景：全新学习", "内容站心智简单、产物轻，AI 也容易生成清晰页面和内容结构。"),
      stackItem("Tailwind CSS", "技术背景：全新学习", "少写分散 CSS，适合快速搭建一致界面。"),
      stackItem("Vercel / Netlify / Cloudflare Pages", "部署方案", "静态站点部署简单，预览和回滚都方便。")
    ]);
    return;
  }

  if (background === "newLearner") {
    addStack(stack, [
      stackItem("Next.js", "技术背景：全新学习", "资料多、AI 生成代码质量稳定，也方便从页面扩展到后端。"),
      stackItem("TypeScript", "技术背景：全新学习", "让 AI 生成的字段和组件更容易被检查。"),
      stackItem("Tailwind CSS", "技术背景：全新学习", "少写分散 CSS，适合快速搭建一致界面。")
    ]);
    return;
  }

  if (need === "contentOnly") {
    addStack(stack, [
      stackItem("Astro", "技术背景：JS/TS", "展示内容为主时比全栈框架更轻，适合文档、作品集和营销页。"),
      stackItem("TypeScript 可选", "技术背景：JS/TS", "页面交互变多时再补类型约束，不必一开始把内容站做重。"),
      stackItem("Tailwind CSS", "技术背景：JS/TS", "适合快速搭建可维护的视觉系统。")
    ]);
    return;
  }

  addStack(stack, [
    stackItem("Next.js", "技术背景：JS/TS", "适合在同一个项目里处理页面、接口和服务端逻辑。"),
    stackItem("TypeScript", "技术背景：JS/TS", "让组件、接口、数据库字段和 AI 返回结构更可控。"),
    stackItem("Tailwind CSS", "技术背景：JS/TS", "适合快速搭建可维护的视觉系统。")
  ]);
}

function addPlatformStack(
  stack: StackItem[],
  target: AnswerMap["deliveryTarget"],
  background: AnswerMap["techBackground"],
  need: AnswerMap["projectNeed"]
) {
  if (target === "androidNative") {
    addAndroidStack(stack, background, need);
    return;
  }

  if (target === "iosNative") {
    addIosStack(stack, background);
    return;
  }

  if (target === "crossPlatformApp") {
    addCrossPlatformStack(stack, background);
    return;
  }

  if (target === "desktopApp") {
    addDesktopStack(stack, background);
    return;
  }

  if (target === "cliTool") {
    addCliStack(stack, background);
    return;
  }

  if (target === "embeddedApp") {
    addEmbeddedStack(stack, background);
    return;
  }

  addWebStack(stack, background, need);
}

export function createRecommendation(answers: AnswerMap): Recommendation {
  const deliveryTarget = answers.deliveryTarget ?? "webApp";
  const projectNeed = answers.projectNeed ?? "contentOnly";
  const expectedScale = answers.expectedScale ?? "small";
  const techBackground = answers.techBackground ?? "newLearner";

  let routeTitle = "Web 应用技术栈";
  let routeSummary = "先按目标平台确定主技术栈，再根据项目本质补上登录、存储、AI 或本地能力。";
  let routeTag = "Platform first";
  let nextMove = "先确认目标平台、第一版用户路径和必须接入的系统能力。";
  const todayTasks = [
    "写清楚这个项目的运行平台、第一版核心能力和最小可交付范围。",
    "列出第一版必须出现的 3 个页面、窗口、命令或设备动作。",
    "删掉第一版不需要的技术能力，尤其是登录、数据库、复杂发布和多端同步。"
  ];
  const weekTasks = [
    "做出一个可安装、可访问或可运行的预览版本。",
    "用真实内容、真实样例或真实设备替换占位数据。",
    "记录下一阶段才需要引入的能力和迁移边界。"
  ];
  const launchChecks = [
    "用户能在 5 秒内理解项目用途。",
    "技术栈里每个服务、SDK 或框架都有明确理由。",
    "上线、安装或分发方式与预期规模匹配。"
  ];
  const risks = [...defaultRisks];
  const stack: StackItem[] = [];
  const decisionPath = [
    `运行平台：${targetLabel[deliveryTarget]}`,
    `项目本质：${needLabel[projectNeed]}`,
    `规模预期：${scaleLabel[expectedScale]}`,
    `技术背景：${backgroundLabel[techBackground]}`
  ];

  addPlatformStack(stack, deliveryTarget, techBackground, projectNeed);

  if (deliveryTarget === "androidNative") {
    routeTag = "Android native";
    routeTitle =
      techBackground === "java"
        ? "Android 原生应用：Java 可落地，Kotlin 可渐进"
        : techBackground === "newLearner"
          ? "Android 原生应用：Kotlin + Compose"
          : "Android 原生应用技术栈";
    routeSummary =
      techBackground === "java"
        ? "Java 背景可以直接做 Android 原生应用，第一版建议用 XML Views / Material Components，之后再渐进学习 Kotlin 和 Compose。"
        : "Android 原生项目要先围绕 Android Studio、SDK、权限、真机测试和发布包建立主路径。";
    nextMove = "先创建 Android Studio 最小项目，跑通一个真机页面和核心权限申请。";
    launchChecks.unshift("已经在至少一台真实 Android 设备上验证安装、权限和核心路径。");
  }

  if (deliveryTarget === "iosNative") {
    routeTag = "iOS native";
    routeTitle = "iOS 原生应用：Swift + SwiftUI + Xcode";
    routeSummary = "iOS 原生项目优先围绕 Swift、SwiftUI、Xcode、签名和 TestFlight 建立闭环。";
    nextMove = "先用 SwiftUI 做出一个可在模拟器和真机运行的最小页面。";
    launchChecks.unshift("已经确认 Apple Developer、签名、设备测试和 TestFlight 路径。");
  }

  if (deliveryTarget === "crossPlatformApp") {
    routeTag = "Mobile cross-platform";
    routeTitle = techBackground === "javascript" ? "React Native / Expo 跨平台 App" : "Flutter 跨平台 App";
    routeSummary =
      "跨平台 App 的目标是一套主要代码发布 Android 和 iOS，但相机、通知、蓝牙等能力仍要预留原生模块和真机测试。";
    nextMove = "先跑通一个 Android+iOS 双端可预览的空项目，再接入第一个真实页面。";
    launchChecks.unshift("已经明确哪些能力能用跨端插件，哪些需要原生模块。");
  }

  if (deliveryTarget === "desktopApp") {
    routeTag = "Desktop native";
    routeTitle = techBackground === "cpp" ? "Qt 6 + C++ 桌面应用" : "桌面应用技术栈";
    routeSummary =
      techBackground === "cpp"
        ? "C++ 背景做桌面程序时，Qt 6 + CMake 是稳定路线，适合窗口、控件、本地文件和跨桌面系统分发。"
        : "桌面应用要优先考虑本地权限、安装包、更新、配置保存和操作系统差异。";
    nextMove = "先做一个能打开窗口、读写本地设置并生成安装包草稿的最小桌面应用。";
    launchChecks.unshift("安装、卸载、配置保存和系统权限在目标系统上验证过。");
  }

  if (deliveryTarget === "cliTool") {
    routeTag = "CLI workflow";
    routeTitle = "CLI 工具技术栈";
    routeSummary = "CLI 工具要把命令参数、日志输出、错误码、配置文件和安装方式作为第一版核心体验。";
    nextMove = "先定义一个主命令、两个参数和一条真实输入到输出的路径。";
  }

  if (deliveryTarget === "embeddedApp") {
    routeTag = "Device first";
    routeTitle = "嵌入式或硬件技术栈";
    routeSummary = "硬件项目先由目标设备决定 SDK、语言、烧录、日志和调试链路，再考虑上层应用形态。";
    nextMove = "先确定目标板卡、SDK、烧录方式和第一条设备日志。";
    launchChecks.unshift("已经验证目标设备的烧录、日志、断电恢复和基础接口。");
  }

  if (deliveryTarget === "webApp") {
    routeTag = "Web app";
    if (projectNeed === "contentOnly") {
      routeTitle = techBackground === "python" ? "静态站点 + Python 内容脚本" : "静态站点 / 纯前端优先";
      routeSummary = "项目核心是内容展示，优先选静态站点、纯前端框架或文件型内容系统，避免过早加后端。";
      nextMove = "先做静态版本，只有出现账号、数据写入或 AI 处理时再升级架构。";
    }
  }

  if (projectNeed === "contentOnly") {
    stack.push(
      stackItem("内容结构 / 信息架构", "项目本质：展示内容", "先把内容、入口、详情和下一步行动整理清楚。")
    );
    todayTasks[1] = "确定首页、主界面或详情页，以及用户下一步行动入口。";
  }

  if (projectNeed === "login") {
    stack.push(
      stackItem("认证后端", "项目本质：需要用户登录", "登录意味着需要可信服务端边界，移动端和桌面端也不能只靠本地状态。"),
      stackItem("Token / Session 策略", "认证方案", "明确登录态刷新、过期、退出、设备丢失和权限校验。"),
      stackItem("权限模型", "项目本质：需要用户登录", "先区分公开能力、登录后能力、管理员能力和数据归属。")
    );
    risks.unshift("登录会立刻带来权限、隐私、Token 保存和错误状态，第一版要减少角色数量。");
    nextMove = "先画出公开路径、登录后路径和每类用户能看到的数据。";
  }

  if (projectNeed === "storage") {
    stack.push(
      stackItem("PostgreSQL / SQLite / Room", "项目本质：需要持久化存储", "按平台选择服务端数据库或本地数据库，先定义数据模型和同步边界。"),
      stackItem("Schema / Migration", "数据访问层", "用 schema 和迁移管理字段变化，避免直接散写数据结构。"),
      stackItem("对象存储 / 本地文件", "数据补充", "图片、附件、导入文件要和结构化数据分开管理。")
    );
    todayTasks[1] = "写出核心数据对象、字段和状态流转。";
    weekTasks.unshift("先用假数据走通列表、详情、创建和编辑，再接真实存储。");
    nextMove = "先定义核心数据结构，再决定本地存储、托管数据库或后端服务。";
  }

  if (projectNeed === "ai") {
    stack.push(
      stackItem("OpenAI API", "项目本质：需要 AI 能力", "负责生成、分析、总结、对话或结构化输出。"),
      stackItem("AI 调用封装", "AI 调用层", "统一封装模型调用、流式输出、超时、重试和错误处理。"),
      stackItem("Prompt / Eval 日志", "AI 质量控制", "记录输入输出和版本，方便排查质量波动。")
    );
    todayTasks[1] = "定义 AI 输入、输出格式和失败时给用户的兜底结果。";
    risks.unshift("AI 能力要先设成本上限、API Key 保存方式和重试策略，否则真实使用后费用不可控。");
    nextMove = "先做一个固定输入到固定输出的最小 AI 调用。";
  }

  if (projectNeed === "localTool") {
    stack.push(
      stackItem("本地配置保存", "项目本质：本地工具", "桌面、CLI 或本地 App 都需要稳定保存设置、路径和用户偏好。"),
      stackItem("文件 I/O 边界", "项目本质：本地工具", "明确读写目录、权限、备份、覆盖和错误恢复。")
    );
    todayTasks[1] = "列出第一版要读写的本地文件、目录、配置和失败提示。";
  }

  if (projectNeed === "nativeDevice") {
    stack.push(
      stackItem("权限处理", "项目本质：设备原生能力", "相机、定位、蓝牙、通知、USB 等能力都需要用户授权和失败兜底。"),
      stackItem("真机 / 真设备测试", "验证方式", "设备能力不能只在模拟器或理想环境里验证。")
    );
    todayTasks[1] = "列出必须接入的设备能力、权限文案和无权限时的替代路径。";
  }

  if (expectedScale === "small") {
    routeSummary = `${routeSummary} 当前规模适合选择简单方案，先避免自建复杂基础设施。`;
    stack.push(
      stackItem("单体 / 单应用优先", "规模预期：个人或小规模", "一个仓库、一套发布链路更容易维护，也更适合 MVP。"),
      stackItem("托管服务 / 本地存储优先", "规模预期：个人或小规模", "把能托管的运维交给平台，把能本地完成的能力先本地化。")
    );
    launchChecks.unshift("没有引入当前规模用不到的队列、缓存、微服务或复杂多端同步。");
  }

  if (expectedScale === "medium") {
    routeSummary = `${routeSummary} 中等规模需要保留扩展空间：环境隔离、监控、缓存、后台任务和发布通道要提前留接口。`;
    stack.push(
      stackItem("Staging / Production 环境", "规模预期：中等规模", "真实用户增长后，需要先在预发布环境验证变更。"),
      stackItem("后台任务 / 队列", "规模预期：中等规模", "邮件、AI 批处理、导入导出、同步不应阻塞主流程。"),
      stackItem("Sentry / 崩溃与日志监控", "规模预期：中等规模", "上线后要能看到错误、慢请求、崩溃和用户卡点。")
    );
    weekTasks.unshift("把开发、预览、生产或测试发布通道的配置边界列出来。");
  }

  if (expectedScale === "large") {
    routeSummary = `${routeSummary} 大规模预期不适合只做工具拼装，需要先做架构设计、容量边界和发布回滚策略。`;
    stack.push(
      stackItem("架构设计文档", "规模预期：大规模", "先确定模块边界、读写路径、容量估算和故障兜底。"),
      stackItem("缓存 + 队列", "规模预期：大规模", "高并发、慢任务和同步压力需要削峰、异步和重试机制。"),
      stackItem("可观测性", "规模预期：大规模", "日志、指标、追踪、崩溃和告警是上线基础。"),
      stackItem("CI/CD + 回滚策略", "规模预期：大规模", "减少发布风险，保证出问题时能快速恢复。")
    );
    risks.unshift("如果真的预期大规模，技术选型前要先做容量假设和关键路径设计。");
    nextMove = "先写一页架构草图：入口、客户端、服务、数据、缓存、队列和发布边界。";
  }

  if (techBackground === "javascript") {
    stack.push(stackItem("ESLint + TypeScript 严格检查", "技术背景：JS/TS", "减少 AI 生成代码里的字段错配和运行时错误。"));
  }

  if (techBackground === "python") {
    stack.push(stackItem("Pydantic", "技术背景：Python", "适合校验 API 入参、AI 输出和配置结构。"));
  }

  if (techBackground === "cpp") {
    stack.push(stackItem("vcpkg / Conan 可选", "技术背景：C/C++", "需要第三方库时更容易复现依赖和跨平台构建。"));
  }

  if (techBackground === "java") {
    stack.push(stackItem("JUnit / Gradle 测试", "技术背景：Java", "给业务逻辑、Android ViewModel 或服务端模块建立基础回归测试。"));
  }

  if (techBackground === "newLearner") {
    risks.unshift("新手不要同时学太多平台概念，优先选择文档多、AI 示例多、能快速跑起来的组合。");
  }

  return {
    routeTitle,
    routeSummary,
    routeTag,
    decisionPath,
    stack: uniqueStack(stack),
    todayTasks,
    weekTasks,
    launchChecks,
    risks: Array.from(new Set(risks)).slice(0, 5),
    nextMove
  };
}
