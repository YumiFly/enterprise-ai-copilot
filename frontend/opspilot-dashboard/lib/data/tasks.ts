export type Task = {
  id: string
  instruction: string
  date: string
  status: "completed" | "failed" | "in_progress"
  agents: string[]
  duration: string
}

export const tasks: Task[] = [
  {
    id: "TASK-001",
    instruction: "Summarize last week's customer feedback and monitor social sentiment",
    date: "2023-05-15 14:30",
    status: "completed",
    agents: ["CustomerAgent", "MonitorAgent", "ReportAgent"],
    duration: "4m 12s",
  },
  {
    id: "TASK-002",
    instruction: "Generate monthly performance report for Q1",
    date: "2023-05-14 10:15",
    status: "completed",
    agents: ["ReportAgent"],
    duration: "6m 45s",
  },
  {
    id: "TASK-003",
    instruction: "Analyze customer sentiment for new product launch",
    date: "2023-05-12 16:20",
    status: "completed",
    agents: ["CustomerAgent", "ReportAgent"],
    duration: "5m 30s",
  },
  {
    id: "TASK-004",
    instruction: "Monitor social media for brand mentions during event",
    date: "2023-05-10 09:45",
    status: "completed",
    agents: ["MonitorAgent"],
    duration: "3m 15s",
  },
  {
    id: "TASK-005",
    instruction: "Prepare weekly executive summary of customer feedback",
    date: "2023-05-08 11:30",
    status: "completed",
    agents: ["CustomerAgent", "ReportAgent"],
    duration: "7m 20s",
  },
  {
    id: "TASK-006",
    instruction: "Analyze competitor mentions on social media",
    date: "2023-05-05 15:10",
    status: "failed",
    agents: ["MonitorAgent"],
    duration: "2m 05s",
  },
]
