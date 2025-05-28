export type Agent = {
  name: string
  icon: string
  description: string
  model: string
  prompt: string
  enabled: boolean
}

export const agents: Record<string, Agent> = {
  customerAgent: {
    name: "CustomerAgent",
    icon: "Users",
    description: "Analyzes customer feedback and sentiment",
    model: "gpt-4",
    prompt:
      "You are CustomerAgent, an AI assistant specialized in analyzing customer feedback and sentiment. Your goal is to extract valuable insights from customer data and provide actionable recommendations.",
    enabled: true,
  },
  monitorAgent: {
    name: "MonitorAgent",
    icon: "Activity",
    description: "Monitors social media and web mentions",
    model: "gpt-4",
    prompt:
      "You are MonitorAgent, an AI assistant specialized in monitoring social media and web mentions. Your goal is to track brand mentions, analyze sentiment, and identify trending topics related to the product.",
    enabled: true,
  },
  reportAgent: {
    name: "ReportAgent",
    icon: "FileText",
    description: "Generates reports and summaries",
    model: "gpt-4",
    prompt:
      "You are ReportAgent, an AI assistant specialized in generating reports and summaries. Your goal is to compile data from other agents, generate insights, and create comprehensive reports with recommendations.",
    enabled: true,
  },
}
