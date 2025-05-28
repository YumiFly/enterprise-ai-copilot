export type SocialMention = {
  id: number
  platform: string
  username: string
  content: string
  timestamp: string
  sentiment: "positive" | "neutral" | "negative"
}

export const socialMentions: SocialMention[] = [
  {
    id: 1,
    platform: "Twitter",
    username: "techuser42",
    content: "Just tried @OpsPilot and it's revolutionizing how we handle customer feedback! #AI #CustomerService",
    timestamp: "10 minutes ago",
    sentiment: "positive",
  },
  {
    id: 2,
    platform: "LinkedIn",
    username: "Sarah Johnson",
    content:
      "Our team has been using OpsPilot for the past month and we've seen a 30% increase in response efficiency.",
    timestamp: "2 hours ago",
    sentiment: "positive",
  },
  {
    id: 3,
    platform: "Twitter",
    username: "productguru",
    content: "Having some issues with @OpsPilot integration. Anyone else experiencing this? #TechSupport",
    timestamp: "4 hours ago",
    sentiment: "negative",
  },
  {
    id: 4,
    platform: "Facebook",
    username: "Michael Chen",
    content: "OpsPilot is okay, but I wish it had better reporting features for enterprise use cases.",
    timestamp: "Yesterday",
    sentiment: "neutral",
  },
  {
    id: 5,
    platform: "Instagram",
    username: "tech_reviewer",
    content: "Testing out OpsPilot this week for our company review series. Initial impressions are promising!",
    timestamp: "Yesterday",
    sentiment: "positive",
  },
  {
    id: 6,
    platform: "Twitter",
    username: "startup_founder",
    content: "OpsPilot has completely transformed our customer service workflow. Highly recommend!",
    timestamp: "2 days ago",
    sentiment: "positive",
  },
]

export type Alert = {
  id: number
  type: "sentiment" | "mention" | "issue"
  title: string
  description: string
  timestamp: string
  priority: "high" | "medium" | "low"
  icon: string
}

export const alerts: Alert[] = [
  {
    id: 1,
    type: "sentiment",
    title: "Negative Sentiment Spike",
    description: "Detected 25% increase in negative sentiment in the last hour",
    timestamp: "10 minutes ago",
    priority: "high",
    icon: "TrendingDown",
  },
  {
    id: 2,
    type: "mention",
    title: "High-Profile Mention",
    description: "Your product was mentioned by an influencer with 500K+ followers",
    timestamp: "1 hour ago",
    priority: "medium",
    icon: "MessageSquare",
  },
  {
    id: 3,
    type: "issue",
    title: "Recurring Customer Issue",
    description: "Multiple reports of login problems in the last 24 hours",
    timestamp: "3 hours ago",
    priority: "high",
    icon: "AlertTriangle",
  },
  {
    id: 4,
    type: "sentiment",
    title: "Sentiment Change",
    description: "Overall sentiment trending positive after latest feature release",
    timestamp: "Yesterday",
    priority: "low",
    icon: "TrendingDown",
  },
  {
    id: 5,
    type: "mention",
    title: "Competitor Comparison",
    description: "Your product is being compared to a competitor in industry forums",
    timestamp: "2 days ago",
    priority: "medium",
    icon: "MessageSquare",
  },
]

export const mentionsChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Social Mentions",
      data: [120, 150, 180, 220, 270, 250, 300, 350, 380, 400, 450, 500],
      borderColor: "hsl(var(--primary))",
      backgroundColor: "transparent",
      tension: 0.4,
    },
    {
      label: "Positive Sentiment",
      data: [100, 120, 140, 160, 200, 190, 220, 260, 290, 310, 340, 380],
      borderColor: "hsl(142, 76%, 36%)",
      backgroundColor: "transparent",
      tension: 0.4,
    },
    {
      label: "Negative Sentiment",
      data: [20, 30, 40, 60, 70, 60, 80, 90, 90, 90, 110, 120],
      borderColor: "hsl(346, 84%, 61%)",
      backgroundColor: "transparent",
      tension: 0.4,
    },
  ],
}

export const engagementChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Engagement Rate",
      data: [3.2, 3.5, 3.8, 4.1, 4.5, 4.3, 4.7, 5.0, 5.2, 5.5, 5.8, 6.0],
      borderColor: "hsl(var(--primary))",
      backgroundColor: "transparent",
      tension: 0.4,
    },
  ],
}
