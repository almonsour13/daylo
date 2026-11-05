# Daylo

Daylo is a mobile planner for organizing activities, building recurring routines, and keeping track of what's ahead. Activities and preferences are stored locally on the device; the app does not require an account or provide remote activity sync.

This repository contains the Daylo mobile app and its public landing page:

| Project | Description |
|---|---|
| [`mobile/`](./mobile/) | Expo and React Native app for planning activities on Android |
| [`landing-page/`](./landing-page/) | Next.js website with app information, feature details, FAQs, and Android download links |

## What Daylo does

- Create and edit activities with descriptions, dates, times, categories, priorities, and reminders.
- Set activities to repeat on a schedule, including daily, weekly, monthly, yearly, or selected weekdays.
- Review today's plans on Home or browse activities by date in the calendar.
- Search and filter activities, and manage recently deleted items.
- Receive local device notifications for activities when reminders are enabled.
- Choose light, dark, or system appearance and configure app preferences.

Activity data is kept in local SQLite storage; profile and preference data are saved locally as well. There is no cloud backup or account sync, so removing app data or uninstalling the app can remove locally stored information.

## Getting started

Each project is an independent npm application. Install dependencies and run commands from that project's directory.

### Mobile app

```powershell
cd mobile
npm install
npm start
```

Use the Expo development tools to launch the app on a configured device or emulator. Android-specific build and lint commands are documented in [`mobile/README.md`](./mobile/README.md).

### Landing page

```powershell
cd landing-page
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. More setup, environment, and deployment details are in [`landing-page/README.md`](./landing-page/README.md).

## Technology

- **Mobile:** Expo, React Native, TypeScript, React Navigation, SQLite, and Drizzle ORM.
- **Website:** Next.js App Router, React, TypeScript, and Tailwind CSS.

## Platform and privacy notes

The current download flow is for Android. Although the mobile project contains iOS configuration, an iOS release is not currently documented. Local reminders depend on notification permissions and device settings. Daylo does not add its own encryption to locally stored data; device security remains important.
