# Vibe Coding 技术栈决策器

一个 Toy Workshop 风格的技术栈决策小工具，用四个问题把项目需求收敛到更合适的开发路线。它不是只推荐固定的 Next.js 四件套，而是会根据运行平台、项目本质、规模预期和技术背景组合出不同工具箱。

## 功能亮点

- 四问决策框架：运行平台、项目本质、规模预期、技术背景。
- 项目本质支持多选，例如同时选择登录、存储、AI 和设备原生能力。
- 技术背景支持主背景 + 备选背景，用来表达“我主要会 Java，但也想考虑 C++/Qt”这类想法。
- 结果页会给出主推荐路线，并在合适时补充备选路线，方便比较 Web、桌面、原生移动和跨平台 App。
- 支持 Web、桌面、Android 原生、iOS 原生、跨平台 App、CLI、嵌入式或硬件。
- 支持 JavaScript/TypeScript、Python、C/C++、Java 和全新学习者路线。
- 针对 Android + Java、Qt + C++、React Native / Expo、Flutter、SwiftUI、FastAPI 等场景给出不同推荐。
- 支持分享链接、复制方案、导出 Markdown。

## 决策模型

1. 运行平台：Web 应用、桌面应用、Android 原生、iOS 原生、跨平台 App、CLI 工具、嵌入式或硬件。
2. 项目本质：展示内容、登录、持久化存储、AI、本地工具、设备原生能力，可以多选。
3. 规模预期：个人或小规模、中等规模、大规模。
4. 技术背景：JavaScript/TypeScript、Python、C/C++、Java、全新学习，第一次点击是主背景，第二个不同选项是备选背景。

## 分享参数

- `target`：运行平台，例如 `webApp`、`desktopApp`、`androidNative`、`iosNative`、`crossPlatformApp`。
- `need`：项目本质，支持逗号分隔的多选值，例如 `login,storage,ai`。
- `scale`：规模预期，例如 `small`、`medium`、`large`。
- `bg`：主技术背景，例如 `java`。
- `bg2`：备选技术背景，例如 `cpp`。

## 示例链接

```text
/?target=androidNative&need=nativeDevice&scale=small&bg=java
/?target=androidNative&need=login,storage,nativeDevice&scale=small&bg=java&bg2=cpp
/?target=androidNative&need=ai&scale=medium&bg=java
/?target=iosNative&need=nativeDevice&scale=small&bg=newLearner
/?target=crossPlatformApp&need=login&scale=medium&bg=javascript
/?target=desktopApp&need=localTool&scale=small&bg=cpp
```

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- lucide-react

## 本地运行

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:3000
```


## 校验与构建

```bash
npm run lint
npm run build
```

## 项目结构

```text
src/components/DecisionWizard.tsx  # 交互界面、分享链接、导出 Markdown
src/lib/decision-data.ts           # 问题配置和推荐逻辑
src/types/decision.ts              # 决策模型类型
src/app/globals.css                # Toy Workshop 视觉样式
```

## 部署

这是一个标准 Next.js 应用，可以部署到 Vercel、Netlify 或其他支持 Next.js 的平台。

## 致谢
[LinuxDO社区](https://linux.do/)
