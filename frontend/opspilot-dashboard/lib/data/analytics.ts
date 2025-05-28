export type PerformanceMetric = {
  name: string
  value: string | number
  change: string
  icon: string
}

export const performanceMetrics: PerformanceMetric[] = [
  {
    name: "Tasks Processed",
    value: 1284,
    change: "+24%",
    icon: "Activity",
  },
  {
    name: "Avg. Response Time",
    value: "1.8s",
    change: "-0.3s",
    icon: "Clock",
  },
  {
    name: "System Efficiency",
    value: "94%",
    change: "+2%",
    icon: "Zap",
  },
  {
    name: "Resource Usage",
    value: "68%",
    change: "-5%",
    icon: "Cpu",
  },
]

export const taskDistributionData = {
  labels: ["CustomerAgent", "MonitorAgent", "ReportAgent", "Other Agents"],
  datasets: [
    {
      label: "Task Distribution",
      data: [35, 25, 20, 20],
      backgroundColor: ["hsl(215, 70%, 60%)", "hsl(145, 63%, 49%)", "hsl(275, 80%, 60%)", "hsl(45, 90%, 60%)"],
      borderWidth: 1,
    },
  ],
}

export const taskCompletionData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Tasks Completed",
      data: [450, 520, 580, 620, 700, 750, 800, 850, 900, 950, 1000, 1050],
      backgroundColor: "hsl(var(--primary) / 0.8)",
    },
  ],
}

export const responseTimeData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Avg. Response Time (seconds)",
      data: [3.2, 3.0, 2.8, 2.5, 2.3, 2.2, 2.0, 1.9, 1.8, 1.8, 1.7, 1.7],
      borderColor: "hsl(var(--primary))",
      backgroundColor: "transparent",
      tension: 0.4,
    },
  ],
}
