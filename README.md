# AdVenture AI

A modern web application built with Next.js, TypeScript, and Radix UI components. This project leverages the latest web technologies to deliver a responsive and accessible user interface.

## 🚀 Features

- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **Radix UI** for accessible, unstyled components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Chart.js** for data visualization
- **MongoDB** (via Mongoose) for data storage
- **React Hook Form** with Zod validation
- **Dark/Light** mode support
- **Responsive** design

## 📦 Prerequisites

- Node.js 18.0.0 or later
- npm or pnpm (recommended)
- MongoDB (for local development)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ads_venture-ai.git
   cd ads_venture-ai
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Update the `.env.local` file with your configuration.

4. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
ads_venture-ai/
├── app/               # App router pages and layouts
├── components/        # Reusable UI components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── models/            # Database models
├── public/            # Static files
└── styles/            # Global styles
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and TypeScript
