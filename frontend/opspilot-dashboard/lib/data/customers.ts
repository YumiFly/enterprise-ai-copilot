export type Customer = {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  sentiment: "positive" | "neutral" | "negative"
  lastContact: string
}

export const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "active",
    sentiment: "positive",
    lastContact: "2023-05-12",
  },
  {
    id: "CUST-002",
    name: "TechNova Inc.",
    email: "info@technova.com",
    status: "active",
    sentiment: "neutral",
    lastContact: "2023-05-10",
  },
  {
    id: "CUST-003",
    name: "Global Solutions Ltd.",
    email: "support@globalsolutions.com",
    status: "inactive",
    sentiment: "negative",
    lastContact: "2023-04-28",
  },
  {
    id: "CUST-004",
    name: "Bright Future Co.",
    email: "hello@brightfuture.co",
    status: "active",
    sentiment: "positive",
    lastContact: "2023-05-15",
  },
  {
    id: "CUST-005",
    name: "Innovative Systems",
    email: "contact@innovativesystems.org",
    status: "active",
    sentiment: "positive",
    lastContact: "2023-05-14",
  },
]

export type CustomerStats = {
  totalCustomers: number
  totalGrowth: string
  satisfactionRate: number
  satisfactionGrowth: string
  feedbackReceived: number
  feedbackGrowth: string
  openIssues: number
  openIssuesGrowth: string
}

export const customerStats: CustomerStats = {
  totalCustomers: 2853,
  totalGrowth: "+12%",
  satisfactionRate: 87,
  satisfactionGrowth: "+3%",
  feedbackReceived: 1248,
  feedbackGrowth: "+18%",
  openIssues: 42,
  openIssuesGrowth: "-8%",
}
