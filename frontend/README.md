# OpsPilot Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-Latest-000000?style=for-the-badge&logo=shadcnui" alt="shadcn/ui" />
</div>

<div align="center">
  <h3>🤖 AI-Powered Multi-Agent Enterprise Assistant System</h3>
  <p>A comprehensive dashboard for managing AI agents that handle customer feedback analysis, social media monitoring, and automated reporting.</p>
</div>

## ✨ Features

### 🎯 Core Functionality
- **Multi-Agent System**: CustomerAgent, MonitorAgent, and ReportAgent working in harmony
- **Task Decomposition**: Intelligent breakdown of complex business instructions
- **Real-time Monitoring**: Live tracking of agent activities and task progress
- **Interactive Chat**: Direct communication with AI agents
- **File Upload**: CSV data processing for customer feedback analysis

### 📊 Analytics & Reporting
- **Performance Metrics**: System efficiency, response times, and resource usage
- **Customer Analytics**: Sentiment analysis, satisfaction rates, and feedback tracking
- **Social Media Monitoring**: Brand mentions, sentiment tracking, and engagement metrics
- **Automated Reports**: Customizable report generation with multiple formats

### 🌐 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Internationalization**: Support for English and Chinese languages
- **Real-time Updates**: Live notifications and progress tracking

### 🔧 Technical Features
- **Modern Architecture**: Built with Next.js 15 and TypeScript
- **Component Library**: shadcn/ui components with Tailwind CSS
- **State Management**: React hooks and context for efficient state handling
- **API Integration**: RESTful API client with mock data fallback
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/opspilot-dashboard.git
   cd opspilot-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit `.env.local` and configure your settings:
   \`\`\`env
   # Optional: Backend API URL (if not set, runs in demo mode)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   
   # Optional: Additional configuration
   NEXT_PUBLIC_APP_NAME=OpsPilot
   NEXT_PUBLIC_APP_VERSION=1.0.0
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

\`\`\`
opspilot-dashboard/
├── app/                          # Next.js App Router pages
│   ├── analytics/               # Analytics dashboard
│   ├── chat/                    # Chat interface
│   ├── customers/               # Customer management
│   ├── login/                   # Authentication
│   ├── monitoring/              # Social media monitoring
│   ├── reports/                 # Report generation
│   ├── settings/                # System settings
│   ├── task-history/            # Task history
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Dashboard home
├── components/                   # Reusable React components
│   ├── analytics/               # Analytics components
│   ├── auth/                    # Authentication components
│   ├── chat/                    # Chat interface components
│   ├── customers/               # Customer management components
│   ├── monitoring/              # Monitoring components
│   ├── notifications/           # Notification system
│   ├── reports/                 # Report components
│   ├── settings/                # Settings components
│   ├── task-history/            # Task history components
│   ├── ui/                      # shadcn/ui components
│   └── ...                      # Other shared components
├── lib/                         # Utility libraries
│   ├── api/                     # API client and utilities
│   ├── data/                    # Mock data and types
│   ├── i18n/                    # Internationalization
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
├── middleware.ts                # Next.js middleware
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
\`\`\`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | - | No |
| `NEXT_PUBLIC_APP_NAME` | Application name | OpsPilot | No |
| `NEXT_PUBLIC_APP_VERSION` | Application version | 1.0.0 | No |

### Demo Mode

If `NEXT_PUBLIC_API_URL` is not configured, the application runs in **demo mode** with:
- Mock data for all features
- Simulated API responses
- Full UI functionality without backend dependency

## 🎨 Customization

### Theming

The application uses Tailwind CSS with shadcn/ui components. Customize the theme in:

- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - CSS variables and global styles
- `components/theme-provider.tsx` - Theme context

### Internationalization

Add new languages by:

1. Creating a new dictionary file in `lib/i18n/dictionaries/`
2. Adding the locale to `lib/i18n/config.ts`
3. Updating the language switcher component

### Components

All UI components are built with shadcn/ui and can be customized:

\`\`\`bash
# Add new shadcn/ui components
npx shadcn@latest add [component-name]

# Update existing components
npx shadcn@latest add [component-name] --overwrite
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Configure environment variables** in the Vercel dashboard

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Docker

1. **Build the Docker image**
   \`\`\`bash
   docker build -t opspilot-dashboard .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 opspilot-dashboard
   \`\`\`

### Static Export

For static hosting (GitHub Pages, Netlify, etc.):

\`\`\`bash
npm run build
npm run export
\`\`\`

## 🧪 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |

### Code Quality

The project includes:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)
- **Husky** for git hooks (optional)

### Testing

\`\`\`bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
\`\`\`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes**
4. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
5. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Update documentation for significant changes
- Test your changes thoroughly
- Ensure responsive design compatibility

## 📝 API Integration

### Backend Requirements

The dashboard expects a REST API with the following endpoints:

\`\`\`
POST /auth/token          # Authentication
POST /auth/register       # User registration
GET  /health             # Health check
POST /upload-customers   # File upload
POST /parse-tasks        # Task parsing
POST /run-agents         # Agent execution
POST /chat/ask           # Chat interface
GET  /static/reports/*   # Report downloads
\`\`\`

### Mock Data

When running without a backend, the application uses mock data from:

- `lib/data/customers.ts` - Customer data
- `lib/data/monitoring.ts` - Social media data
- `lib/data/reports.ts` - Report data
- `lib/data/analytics.ts` - Analytics data
- `lib/data/tasks.ts` - Task history
- `lib/data/agents.ts` - Agent configurations

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

**TypeScript Errors**
\`\`\`bash
# Check types
npm run type-check

# Regenerate types
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Styling Issues**
\`\`\`bash
# Rebuild Tailwind
npm run build:css
\`\`\`

### Performance Optimization

- Enable Next.js Image Optimization
- Use dynamic imports for large components
- Implement proper caching strategies
- Optimize bundle size with webpack-bundle-analyzer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Chart.js](https://www.chartjs.org/) - Data visualization

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/your-username/opspilot-dashboard/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/opspilot-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/opspilot-dashboard/discussions)
- **Email**: support@opspilot.com

---

<div align="center">
  <p>Made with ❤️ by the OpsPilot Team</p>
  <p>
    <a href="https://github.com/your-username/opspilot-dashboard">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/opspilot">🐦 Follow on Twitter</a> •
    <a href="https://opspilot.com">🌐 Visit Website</a>
  </p>
</div>
\`\`\`

```dockerfile file="Dockerfile"
# Use the official Node.js runtime as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
