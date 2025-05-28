export type Report = {
  id: string
  title: string
  type: string
  date: string
  status: "completed" | "in_progress"
}

export const reports: Report[] = [
  {
    id: "REP-001",
    title: "Weekly Customer Feedback Summary",
    type: "Customer Feedback",
    date: "2023-05-15",
    status: "completed",
  },
  {
    id: "REP-002",
    title: "Monthly Social Media Analysis",
    type: "Social Media",
    date: "2023-05-01",
    status: "completed",
  },
  {
    id: "REP-003",
    title: "Quarterly Performance Review",
    type: "Performance",
    date: "2023-04-01",
    status: "completed",
  },
  {
    id: "REP-004",
    title: "Customer Sentiment Analysis",
    type: "Sentiment",
    date: "2023-05-10",
    status: "completed",
  },
  {
    id: "REP-005",
    title: "Competitor Benchmark Report",
    type: "Competitive Analysis",
    date: "2023-05-05",
    status: "completed",
  },
  {
    id: "REP-006",
    title: "Product Feedback Summary",
    type: "Product Feedback",
    date: "2023-05-18",
    status: "in_progress",
  },
]

export const reportTypes = [
  "Customer Feedback",
  "Social Media",
  "Performance",
  "Sentiment",
  "Competitive Analysis",
  "Product Feedback",
]
