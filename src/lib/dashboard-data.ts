export type ColumnId =
  | "backlog"
  | "ai-review"
  | "applied"
  | "interviewing"
  | "offer"
  | "archived";

export interface TimelineEvent {
  at: string;
  label: string;
  file?: string;
}

export interface JobCard {
  id: string;
  title: string;
  company: string;
  logo?: string;
  // match: number;
  dateTag: string;
  stack: string[];
  status: { label: string; tone: "info" | "warn" | "ok" }[];
  column: ColumnId;
  salary?: string;
  url?: string;
  appliedAt: string;
  resume?: string;
  timeline: TimelineEvent[];
  notes?: string;
}

export const COLUMNS: { id: ColumnId; label: string; hint: string }[] = [
  { id: "backlog", label: "岗位池", hint: "刚收集到的岗位" },
  { id: "ai-review", label: "待评估", hint: "需要人工确认匹配度" },
  { id: "applied", label: "已投递", hint: "简历已提交" },
  { id: "interviewing", label: "面试中", hint: "笔试 → HR 面" },
  { id: "offer", label: "已获 Offer", hint: "谈薪与入职" },
  { id: "archived", label: "已归档", hint: "被拒或已关闭" },
];

export const JOBS: JobCard[] = [
  {
    id: "j1",
    title: "内容运营实习生",
    company: "小红书",
    logo: "小红书",
    // match: 92,
    dateTag: "9月2日 投递",
    stack: ["内容策划", "数据看板", "SQL"],
    status: [
      { label: "简历 v2 已生成", tone: "ok" },
      { label: "待跟进", tone: "warn" },
    ],
    column: "applied",
    salary: "200–250 元/天",
    url: "https://job.xiaohongshu.com",
    appliedAt: "2026年9月2日",
    resume: "v2_内容运营_小红书.pdf",
    timeline: [
      { at: "9月2日 09:15", label: "岗位JD导入并完成关键词分析" },
      { at: "9月2日 09:16", label: "生成定制简历", file: "v1_内容运营.pdf" },
      { at: "9月3日 10:00", label: "通过官网提交申请" },
      { at: "9月12日 08:00", label: "暂无回复，建议跟进" },
    ],
    notes: "面试官方向：社区内容生态。准备一两个自己做过的选题案例。",
  },
  {
    id: "j2",
    title: "产品运营实习生",
    company: "字节跳动",
    logo: "字节",
    // match: 88,
    dateTag: "9月8日 导入",
    stack: ["需求分析", "用户调研", "Excel"],
    status: [{ label: "待评估匹配度", tone: "info" }],
    column: "backlog",
    salary: "220–300 元/天",
    url: "https://jobs.bytedance.com",
    appliedAt: "—",
    resume: "—",
    timeline: [{ at: "9月8日 19:42", label: "从岗位订阅中导入" }],
    notes: "",
  },
  {
    id: "j3",
    title: "新媒体运营实习生",
    company: "腾讯",
    logo: "腾讯",
    // match: 79,
    dateTag: "9月6日 起草",
    stack: ["公众号运营", "短视频", "选题策划"],
    status: [{ label: "简历 v1 已生成", tone: "ok" }],
    column: "ai-review",
    salary: "180–240 元/天",
    url: "https://join.qq.com",
    appliedAt: "—",
    resume: "v1_新媒体_腾讯.pdf",
    timeline: [
      { at: "9月6日 11:02", label: "岗位JD导入并完成关键词分析" },
      { at: "9月6日 11:04", label: "生成定制简历", file: "v1_新媒体_腾讯.pdf" },
    ],
    notes: "突出校园媒体运营经历与阅读量数据。",
  },
  {
    id: "j4",
    title: "用户增长运营实习生",
    company: "美团",
    logo: "美团",
    // match: 71,
    dateTag: "8月28日 投递",
    stack: ["活动策划", "A/B 测试", "SQL"],
    status: [{ label: "笔试已通过", tone: "ok" }],
    column: "interviewing",
    salary: "200–260 元/天",
    url: "https://zhaopin.meituan.com",
    appliedAt: "2026年8月28日",
    resume: "v3_增长_美团.pdf",
    timeline: [
      { at: "8月28日 08:10", label: "岗位JD导入并完成关键词分析" },
      { at: "8月28日 08:12", label: "生成定制简历", file: "v3_增长_美团.pdf" },
      { at: "8月29日 09:30", label: "通过招聘官网提交" },
      { at: "9月10日 14:30", label: "已安排 HR 初面" },
    ],
    notes: "初面重点：讲清一个从0到1做过的小活动，以及怎么衡量效果。",
  },
  {
    id: "j5",
    title: "社区运营实习生",
    company: "哔哩哔哩",
    logo: "B站",
    // match: 84,
    dateTag: "8月20日 投递",
    stack: ["社群运营", "内容审核", "数据分析"],
    status: [{ label: "Offer 待确认", tone: "ok" }],
    column: "offer",
    salary: "200–260 元/天",
    url: "https://jobs.bilibili.com",
    appliedAt: "2026年8月20日",
    resume: "v2_社区_哔哩哔哩.pdf",
    timeline: [
      { at: "8月20日 10:00", label: "通过内推提交" },
      { at: "8月27日 15:00", label: "完成业务面" },
      { at: "9月9日 17:15", label: "收到实习 Offer" },
    ],
    notes: "确认实习周期与转正机会，问清每周到岗天数要求。",
  },
  {
    id: "j6",
    title: "内容运营（校招实习）",
    company: "网易",
    logo: "网易",
    // match: 63,
    dateTag: "8月14日 结束",
    stack: ["文案撰写", "选题管理", "PS"],
    status: [{ label: "简历初筛未通过", tone: "warn" }],
    column: "archived",
    salary: "180–220 元/天",
    url: "https://hr.163.com",
    appliedAt: "2026年8月5日",
    resume: "v1_内容_网易.pdf",
    timeline: [
      { at: "8月5日 09:00", label: "通过招聘平台提交" },
      { at: "8月14日 16:20", label: "收到感谢信" },
    ],
    notes: "复盘：作品集里缺少数据化的成果描述，下次补上阅读量与转化率。",
  },
  {
    id: "j7",
    title: "数据运营实习生",
    company: "快手",
    logo: "快手",
    // match: 90,
    dateTag: "9月11日 导入",
    stack: ["SQL", "Excel", "可视化"],
    status: [{ label: "匹配度高", tone: "info" }],
    column: "backlog",
    salary: "220–280 元/天",
    url: "https://zhaopin.kuaishou.cn",
    appliedAt: "—",
    resume: "—",
    timeline: [{ at: "9月11日 06:20", label: "岗位JD导入并完成关键词分析" }],
    notes: "",
  },
  {
    id: "j8",
    title: "商家运营实习生",
    company: "阿里巴巴",
    logo: "阿里",
    // match: 86,
    dateTag: "9月1日 投递",
    stack: ["商家沟通", "活动落地", "数据复盘"],
    status: [{ label: "业务面 9月15日", tone: "info" }],
    column: "interviewing",
    salary: "200–280 元/天",
    url: "https://talent.alibaba.com",
    appliedAt: "2026年9月1日",
    resume: "v4_商家运营.pdf",
    timeline: [
      { at: "9月1日 08:40", label: "岗位JD导入并完成关键词分析" },
      { at: "9月1日 08:43", label: "生成定制简历", file: "v4_商家运营.pdf" },
      { at: "9月2日 09:00", label: "通过官网提交" },
      { at: "9月8日 13:00", label: "完成 HR 初面" },
    ],
    notes: "准备：如何用一页纸讲清一次活动从策划到复盘的完整链路。",
  },
];

export const SKILL_DEMAND = [
  { name: "SQL", demand: 85, jobs: 20, inProfile: true },
  { name: "Excel / 数据透视", demand: 82, jobs: 19, inProfile: true },
  { name: "内容策划", demand: 78, jobs: 18, inProfile: true },
  { name: "短视频剪辑", demand: 60, jobs: 14, inProfile: false },
  { name: "用户调研", demand: 58, jobs: 13, inProfile: true },
  { name: "Python", demand: 44, jobs: 10, inProfile: false },
  { name: "A/B 测试", demand: 41, jobs: 9, inProfile: false },
  { name: "Figma", demand: 22, jobs: 5, inProfile: true },
];

export const SKILL_GAPS = ["Python", "A/B 测试", "Tableau", "私域运营", "SEO"];

export const REMINDERS = [
  {
    id: "r1",
    kind: "followup" as const,
    title: "跟进小红书投递",
    detail: "内容运营岗 — 投出去 12 天没回音",
    meta: "12 天",
  },
  {
    id: "r2",
    kind: "followup" as const,
    title: "腾讯简历还没投",
    detail: "定制简历已生成，但一直没提交",
    meta: "11 天",
  },
  {
    id: "r3",
    kind: "interview" as const,
    title: "美团 HR 初面",
    detail: "使用 v3_增长_美团.pdf",
    meta: "2 天后",
  },
  {
    id: "r4",
    kind: "interview" as const,
    title: "阿里业务面",
    detail: "使用 v4_商家运营.pdf",
    meta: "4 天后",
  },
];
