# 求职舱 · JobDesk

> 一个完全离线的求职管理桌面应用。管投递进度、存简历版本、对着 JD 看还差哪些关键词。
> 本项目基于 [CV Maker Engine](https://github.com/Tibab222/cvMaker)（MIT 许可）改造而来。

## 这是什么

校招和实习季里，真正麻烦的不是投不出去，而是投着投着就乱了：哪家投过、投的哪一版简历、面试约到第几轮、上个月那家为什么没回音。用表格记，一周就懒得维护。

求职舱把这些东西收进一个看板里：

- **投递看板**：岗位池 → 待评估 → 已投递 → 面试中 → 已获 Offer → 已归档，拖一下卡片就能改阶段
- **简历库**：同一份经历可以针对不同岗位生成多个版本，每个版本都跟着岗位走
- **关键词匹配**：把岗位 JD 和档案里的技能、项目做对比，直接告诉你缺哪几个关键词
- **定制简历与导出**：勾选要展示的板块，导出干净的 PDF
- **本地优先**：数据存在本机的 SQLite 里，不联网、不上传、不需要注册账号

AI 相关的功能（JD 自动解析、匹配打分）是**可选的**：装了 [Ollama](https://ollama.com) 并下载一个模型就能本地跑；不装也不影响看板、简历库和 PDF 导出这些核心功能。

## 相对上游改了什么

这是课程作业的改造版本，改动集中在"能不能给中文求职者直接用"这件事上：

| 改动 | 位置 | 说明 |
| --- | --- | --- |
| 应用更名「求职舱」 | `package.json`、`forge.config.cjs` | 菜单栏、访达、安装后的应用名 |
| 应用标识改为 `com.j2026coder.qiuzhicang` | `forge.config.cjs` | 原来的 `com.electron.cv-maker` 是模板默认值 |
| 全新应用图标 | `assets/logo.icns`、`logo.png`、`logo.ico` | 代码绘制：浅灰渐变底 + 黑色机身 + 琥珀色折面的实心纸飞机（黑黄配色，无描边），覆盖 macOS 全套尺寸 |
| 左侧导航与界面中文化 | `src/components/general/`、`src/components/dashboard/` | 总览、我的档案、我的文档、设置等全部中文 |
| 看板与示例数据本地化 | `src/lib/dashboard-data.ts` | 六列改成中文阶段名，示例岗位换成国内互联网实习岗 |
| 简历默认语言改为英语 | `src/components/general/Home.tsx` | 原来默认法语，对国内用户没有意义 |

## 本地运行

需要 Node.js 18 以上（本项目在 Node 22、macOS 15 上验证通过）。

```bash
npm install
npm run dev
```

`npm install` 会下载 Electron 二进制和三个原生模块（`better-sqlite3`、`sharp`、`onnxruntime`），首次安装大约 5—10 分钟。

**如果卡在下载 Electron 上**（国内直连 GitHub 经常超时），先设镜像再装：

```bash
export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm install --registry=https://registry.npmmirror.com
```

判断是否装完整：`ls node_modules/electron/dist` 里应该有 `Electron.app`。

## 打包成安装包（macOS）

```bash
npm run make
```

这条命令依次做四件事：清理 `out/`、TypeScript 编译 + 前端构建、把原生模块重新编译到 Electron 的 ABI（`electron-rebuild`）、调用 `electron-forge make` 生成安装包。

产物在 `out/make/` 下面：

- `out/make/*.dmg` — 磁盘映像，双击挂载后把应用拖进「应用程序」
- `out/make/zip/darwin/*.zip` — 压缩包版本

默认同时为 `arm64`（Apple 芯片）和 `x64`（Intel）构建。只想要当前架构，可以：

```bash
npx electron-forge make --arch=arm64
```

### 关于签名

本项目**没有配置代码签名**（`forge.config.cjs` 里没有 `osxSign` / `osxNotarize`），所以第一次打开会提示"无法验证开发者"。这是未签名的正常现象，不是安装包损坏：

- 右键点击应用 → **打开** → 在弹窗里再点一次 **打开**
- 或者到「系统设置 → 隐私与安全性」里点「仍要打开」

真要分发给他人的话，需要 Apple 开发者账号（99 美元/年）并配置公证，这一步超出了课程作业的范围。

## 常见问题

**`npm run make` 报 `electron-rebuild` 失败**
说明本机缺少 C++ 编译工具链。执行 `xcode-select --install` 安装命令行工具后重试。

**打开后一片空白**
先确认是用 `npm run make` 打出来的包，而不是直接双击 `dist-electron` 里的文件。开发模式下用 `npm run dev`。

**提示浏览器扩展不可用**
浏览器扩展（`navigator_extension/`）是可选的，用来从招聘网站一键抓岗位。不装扩展也能手动新增岗位。

## 技术栈

React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui，Electron 41，electron-forge 打包，SQLite（better-sqlite3）本地存储，Zustand 状态管理。语义匹配用 transformers.js 在本地跑，不上传任何数据。

## 许可与致谢

### 本项目

MIT。原始项目的版权归 Thibaut Delahaie 及贡献者所有，本仓库的修改部分同样以 MIT 许可发布，原版权声明与许可全文见 [LICENSE](LICENSE)。

MIT 允许使用、复制、修改、合并、发布、分发与商业使用，前提是保留版权声明与许可文本。本仓库保留 `LICENSE` 原文未作修改，并在 README、应用内「关于」信息中标注了上游出处。

### 上游

- **CV Maker Engine** — https://github.com/Tibab222/cvMaker
- Copyright (c) 2026 Thibaut Delahaie
- 许可：MIT

改造范围见上文「相对上游改了什么」：更名与包标识、图标重绘、界面中文化与看板数据本地化、默认语言调整、README 重写、打包脚本补充。

### 图标

`assets/logo.icns`、`logo.png`、`logo.ico` 为本仓库自行绘制（Python + Pillow 脚本生成矢量形状后导出多尺寸位图），不含任何第三方素材或字体轮廓。命名「求职舱」为本项目自用；上游的项目名与作者标识归其权利人所有，本项目不以官方名义发布。

### 第三方依赖

安装包内分发的依赖均按其各自许可证随附：

- MIT：Electron、React、Vite、better-sqlite3、zustand、framer-motion 等
- Apache-2.0：sharp、@xenova/transformers、@google/genai 等

完整清单与许可证文本见 `package.json` 及各依赖目录下的 `LICENSE` 文件。

### 数据与商标

界面中的公司名称仅作为岗位示例的叙述性使用，不涉及任何企业的商标授权或合作关系；示例数据均为虚构，不对应真实招聘信息。

### 致谢

感谢 Thibaut Delahaie 将 CV Maker Engine 以 MIT 许可开放，本作业得以在一个完整可用的桌面应用上做改造；也感谢 Electron Forge、Vite、shadcn/ui 等开源工具链。

