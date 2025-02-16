# Pomodoro Timer Web App

This is a simple **Pomodoro Timer** web application that helps users stay productive by implementing the Pomodoro technique. Users can start and pause a **25-minute** timer, track completed study sessions, and view statistics for their study progress. The app integrates with **Supabase** to store and retrieve session data.

## Features
- **Start/Pause Timer**: Run a 25-minute Pomodoro timer.
- **Session Logging**: Automatically logs study sessions to Supabase.
- **Date Selection**: View past study sessions for a selected date.
- **Statistics View**: Displays total study time and number of sessions per day.
- **Database Integration**: Uses Supabase for session storage and retrieval.

## Tech Stack
- **Next.js** (React Framework)
- **TypeScript**
- **Supabase** (Database & Authentication)
- **Tailwind CSS** (Styling)
- **Vercel** (Deployment)
---

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install Dependencies
Ensure you have Node.js installed, then run: 
```sh
npm install
```
### 3. Set Up Environment Variables
Create a .env.local file in the root directory and add the following: 
```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```sh
npm run dev
```

