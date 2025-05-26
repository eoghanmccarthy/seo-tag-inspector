# SEO Meta Tag Analyzer

A powerful, visual tool that analyzes and visualizes SEO meta tags from any website with Google and social media previews.

## 🚀 Features

- **Instant SEO Analysis**: Enter any URL to get immediate SEO insights
- **Visual Score Metrics**: Easy-to-understand visual representation of SEO performance
- **Meta Tag Summary**: Comprehensive overview of meta tags with visual indicators
- **Google Search Preview**: See how your page appears in Google search results
- **Social Media Previews**: View Open Graph and Twitter Card previews
- **Actionable Recommendations**: Get prioritized suggestions to improve SEO
- **Recent Analyses History**: Quick access to your previously analyzed websites

## 💻 Technologies Used

### Frontend
- **React**: UI library for building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **TanStack Query (React Query)**: Data fetching and state management
- **Wouter**: Lightweight routing solution
- **Recharts**: Composable charting library for data visualization
- **Lucide React**: Beautiful icon set

### Backend
- **Express**: Web server framework
- **Cheerio**: Web scraping and HTML parsing
- **Drizzle ORM**: TypeScript ORM for database operations
- **Zod**: TypeScript-first schema validation
- **Axios**: HTTP client for making requests

### Development Tools
- **Vite**: Next-generation frontend build tool
- **ESBuild**: Extremely fast JavaScript bundler
- **TypeScript**: Static type checking

## 📊 How It Works

1. **Enter a URL**: Provide any website URL in the input field
2. **Analyze**: The system fetches the website's HTML and extracts meta tags
3. **Score Calculation**: SEO factors are analyzed and scored
4. **Visualization**: Results are presented in an intuitive, visual dashboard
5. **Recommendations**: Actionable suggestions are provided based on the analysis

## 🏗️ Project Structure

```
project/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and API clients
│   │   └── pages/        # Page components
├── server/               # Express backend
│   ├── routes.ts         # API endpoints
│   └── storage.ts        # Data storage interface
└── shared/               # Shared code between frontend and backend
    └── schema.ts         # Data schema definitions
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the displayed URL

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React, TypeScript, and Express
