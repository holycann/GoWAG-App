# GoWAG Frontend

This is the frontend application for GoWAG (Go WhatsApp Gateway), a powerful WhatsApp messaging gateway.

## Overview

The GoWAG frontend is built with:
- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Firebase Authentication

This application connects to the GoWAG backend API, which is built according to the architecture defined in the `ARCHITECTURE.md` file.

## Getting Started

### Prerequisites

- Node.js (18.x or newer)
- NPM or Yarn
- GoWAG Backend API running

### Installation

1. Clone the repository
2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following variables:
```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Backend API Integration

The frontend connects to the GoWAG backend via:

1. **REST API** - For most operations via Axios HTTP client
2. **WebSockets** - For real-time updates

### API Services

The following services are implemented to interact with the backend:

- **Auth Service** - User authentication and session management
- **WhatsApp Service** - Device connection and message handling
- **Auto-Reply Service** - Auto-reply rules and scheduled messages
- **Webhook Service** - Webhook configuration and management

## Core Features

- **Authentication** - Firebase-based authentication with JWT token handling
- **Device Connection** - QR code scanning for WhatsApp device linking
- **Messaging** - Send individual and bulk messages
- **Message History** - View and search past messages
- **Scheduled Messages** - Schedule messages for future delivery
- **Auto-Reply** - Configure automatic responses based on rules
- **Webhook Integration** - Configure external webhook notifications

## Project Structure

```
src/
├── app/               # Next.js app router structure
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard pages and components
│   └── ...
├── components/        # Shared UI components
├── lib/               # Utility functions and services
│   ├── services/      # API service modules
│   │   ├── auth-service.ts
│   │   ├── whatsapp-service.ts
│   │   ├── auto-reply-service.ts
│   │   └── webhook-service.ts
│   ├── api.ts         # Axios API client configuration
│   ├── auth-context.tsx # Authentication context provider
│   └── ...
└── ...
```

## Authentication Flow

1. User logs in using Firebase Authentication
2. Firebase returns a JWT token
3. Token is stored and sent with API requests
4. Protected routes check for authentication status

## Development Notes

- The frontend is designed to mock and integrate with the GoWAG backend architecture
- API calls are structured according to the backend endpoints defined in `ARCHITECTURE.md`
- All components use TypeScript interfaces for proper type checking
- Axios interceptors handle token management and error handling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
