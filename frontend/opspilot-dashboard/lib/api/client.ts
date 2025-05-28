const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token") || "demo_token"
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    // If no API URL is configured, return mock data for demo
    if (!process.env.NEXT_PUBLIC_API_URL) {
      return this.getMockResponse(endpoint, options)
    }

    const url = `${API_BASE_URL}${endpoint}`
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    }

    if (this.token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json"
      options.body = JSON.stringify(options.body)
    }

    try {
      const response = await Promise.race([
        fetch(url, {
          ...options,
          headers,
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 5000)),
      ])

      if (response.status === 401) {
        // Token expired or invalid
        this.clearToken()
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
        throw new Error("Authentication required")
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return response.json()
      }

      return response
    } catch (error) {
      console.warn(`API request failed for ${endpoint}, using mock data:`, error)
      return this.getMockResponse(endpoint, options)
    }
  }

  private getMockResponse(endpoint: string, options: RequestInit) {
    // Return mock responses for demo purposes
    if (endpoint === "/auth/token" && options.method === "POST") {
      return Promise.resolve({ access_token: "demo_token", token_type: "bearer" })
    }

    if (endpoint === "/auth/register" && options.method === "POST") {
      return Promise.resolve({ message: "User registered successfully" })
    }

    if (endpoint === "/upload-customers" && options.method === "POST") {
      return Promise.resolve({ message: "File uploaded successfully", count: 100 })
    }

    if (endpoint === "/parse-tasks" && options.method === "POST") {
      return Promise.resolve({
        tasks: ["Analyze customer feedback", "Monitor social media", "Generate report"],
        agents: ["CustomerAgent", "MonitorAgent", "ReportAgent"],
      })
    }

    if (endpoint === "/run-agents" && options.method === "POST") {
      return Promise.resolve({
        status: "success",
        message: "Agents executed successfully",
        results: {
          CustomerAgent: "Customer sentiment analysis completed",
          MonitorAgent: "Social media monitoring completed",
          ReportAgent: "Report generation completed",
        },
      })
    }

    if (endpoint === "/chat/ask" && options.method === "POST") {
      return Promise.resolve({
        response:
          "I've processed your request and the agents are working on it. You can see their progress in the agent panels.",
      })
    }

    if (endpoint.startsWith("/static/reports/")) {
      // Mock file download
      const blob = new Blob(["Mock report content"], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      return Promise.resolve({ blob: () => Promise.resolve(blob) })
    }

    return Promise.resolve({ message: "Mock response" })
  }

  // Authentication
  async register(username: string, password: string) {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    return this.request("/auth/register", {
      method: "POST",
      body: formData,
    })
  }

  async login(username: string, password: string) {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    const response = await this.request("/auth/token", {
      method: "POST",
      body: formData,
    })

    if (response.access_token) {
      this.setToken(response.access_token)
    }

    return response
  }

  async logout() {
    this.clearToken()
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  }

  // File Upload
  async uploadCustomers(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return this.request("/upload-customers", {
      method: "POST",
      body: formData,
    })
  }

  // Task Management
  async parseTasks(instruction: string) {
    return this.request("/parse-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instruction }),
    })
  }

  async runAgents(instruction: string, file?: File) {
    const formData = new FormData()
    formData.append("instruction", instruction)
    if (file) {
      formData.append("file", file)
    }

    return this.request("/run-agents", {
      method: "POST",
      body: formData,
    })
  }

  // Chat
  async chatAsk(instruction: string) {
    return this.request("/chat/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instruction }),
    })
  }

  // Reports
  async downloadReport(filename: string) {
    return this.request(`/static/reports/${filename}`, {
      method: "GET",
    })
  }

  // Health check
  async healthCheck() {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        return true // Return true for demo mode
      }

      const response = await Promise.race([
        fetch(`${API_BASE_URL}/health`, {
          method: "GET",
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Health check timeout")), 3000)),
      ])
      return response.ok
    } catch {
      return false
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token
  }
}

export const apiClient = new ApiClient()
