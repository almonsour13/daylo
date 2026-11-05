# Daylo

Daylo is a mobile planner for organizing activities by date and time, viewing recurring routines, and setting local reminders. It is built with Expo and React Native. Activity records are stored in a device-local SQLite database; profile, onboarding, and preference values are stored separately with AsyncStorage.

The repository contains an Android native project and Expo configuration for Android, iOS, and web. The checked-in build scripts cover Android. No release status or roadmap is specified in the repository.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Environment configuration](#environment-configuration)
- [Commands](#commands)
- [Application startup](#application-startup)
- [Navigation](#navigation)
- [Data and persistence](#data-and-persistence)
- [State management and data flow](#state-management-and-data-flow)
- [Core workflows](#core-workflows)
- [UI and styling](#ui-and-styling)
- [Permissions and native behavior](#permissions-and-native-behavior)
- [Testing and quality checks](#testing-and-quality-checks)
- [Build and release](#build-and-release)
- [Troubleshooting](#troubleshooting)
- [Development guidelines](#development-guidelines)
- [Contributing](#contributing)
- [Security and privacy](#security-and-privacy)
- [Known limitations](#known-limitations)
- [License and project information](#license-and-project-information)

## Features

- **Activity planning:** Create and edit activities with a name, optional description, date, start/end times, category, priority, and reminder setting.
- **Repeat schedules:** Choose one-time, daily, weekdays, weekly, monthly, yearly, or custom weekdays. Recurring activities are evaluated for the selected date rather than copied into separate database rows.
- **Home and calendar views:** Review the current day's activities and navigate dates using the home week strip or calendar.
- **Activity management:** Search, filter by status/category/priority, select multiple activities for bulk deletion, or edit a single selected activity.
- **Recently Deleted:** Soft-delete and restore activities, permanently delete selected records, or empty the trash. Deleted items are automatically purged after 30 days.
- **Local reminders:** Schedule device notifications for enabled activities, with configurable reminder lead time and sound preferences.
- **Onboarding and preferences:** Save a local profile and preferences for theme, reminders, reminder lead time, notification sound, and time format.
- **Appearance:** Use light, dark, or system theme, with DM Sans font assets loaded during startup.

Notifications require operating-system permission and can be disabled in Daylo settings or at the device level. There is no account or remote activity synchronization implemented in the application source.

## Technology stack

| Area | Technologies | Use in Daylo |
|---|---|---|
| Mobile runtime | Expo SDK 54, React Native 0.81.5, React 19.1 | Native application runtime and Expo tooling |
| Language | TypeScript 5.9, strict mode | Application source and navigation/data types |
| Navigation | React Navigation 7 | Root stack, onboarding/settings stacks, and bottom tabs |
| Database | Expo SQLite, Drizzle ORM | Local activity storage, typed schema, and startup migrations |
| Small persisted values | AsyncStorage | Profile, settings, onboarding completion, and welcome-drawer state |
| Query and client state | TanStack React Query 5, Zustand 5, React Context | SQLite-backed query caching, profile/preferences state, and onboarding state |
| UI and animation | NativeWind 5 preview, Tailwind CSS 4, Reanimated 4, Gesture Handler | Utility-class styling, theme styles, and animated/native interactions |
| Device features | Expo Notifications, Expo Font | Local notifications and font loading |
| Date utilities | date-fns 4 | Calendar/date calculations and recurrence handling |
| Tooling | ESLint 9 with Expo config, Drizzle Kit, EAS CLI configuration | Linting, migration configuration, and configured Android build profiles |

`expo-router` is present as a dependency and config plugin, but the application entry point registers `src/App.tsx`, whose screens use React Navigation. React Navigation is the active navigation implementation.

## Architecture

Daylo uses a feature-oriented React Native structure with shared infrastructure. It is a practical UI/hooks/services arrangement rather than a strict Clean Architecture or MVVM implementation.

- `src/features/` groups screens, components, hooks, and feature-specific state by product area.
- Feature screens compose reusable UI and invoke hooks or services for data operations.
- `src/shared/services/` contains database and AsyncStorage operations, activity scheduling logic, and notification scheduling.
- `src/shared/db/` owns the SQLite connection, Drizzle schema, and migrations.
- TanStack Query caches reads performed against the local database and coordinates refetching after mutations; it is not evidence of a server API.
- Zustand stores hold the in-memory profile and settings used by the UI. The corresponding values are loaded from or saved to AsyncStorage by services.
- React Context provides onboarding state. Transient form, selection, and view state is held in React component state or feature hooks.

## Project structure

```text
.
├── android/                 # Checked-in Android native project
├── assets/images/           # App icons, splash art, and other images
├── scripts/                 # Project reset script
├── src/
│   ├── App.tsx               # Providers and root navigator
│   ├── features/
│   │   ├── activity/         # Activity list, form, filters, and selection
│   │   ├── calendar/         # Calendar and selected-day list
│   │   ├── home/             # Daily overview and week strip
│   │   ├── onboarding/      # Onboarding screens and steps
│   │   └── settings/        # Preferences, profile, and recently deleted
│   ├── navigation/          # Root, tab, onboarding, and settings navigators
│   ├── screens/             # Shared splash screen
│   └── shared/
│       ├── components/      # Shared UI primitives and feedback components
│       ├── context/         # Onboarding context
│       ├── db/              # SQLite connection, Drizzle schema, migrations
│       ├── hooks/           # App initialization and shared hooks
│       ├── lib/             # Query client
│       ├── providers/       # Theme provider
│       ├── services/        # Persistence, activity, profile, settings, reminders
│       ├── stores/          # Zustand profile and settings stores
│       ├── types/           # Shared domain and navigation types
│       └── utils/           # Styling, time, logging, and UI helpers
├── app.json                 # Expo app and plugin configuration
├── eas.json                 # EAS build and submit profiles
├── package.json             # Dependencies and npm scripts
└── README.md
```

The repository does not contain a checked-in `ios/` directory. There is no app-level `app/` route tree despite the Expo Router dependency.

## Prerequisites

- Node.js and npm. The repository has a `package-lock.json`, but does not pin a Node.js version or define an `engines` range.
- For local Android builds: Android Studio, Android SDK, an available emulator or connected device, and a Java/Gradle toolchain compatible with the checked-in Android project.
- For local iOS builds: macOS and Xcode. The repository does not include an iOS native project.
- For EAS builds/submission: EAS CLI available as `eas` on `PATH`, an Expo account, and any required build credentials.

The project includes `expo-dev-client`. Expo Go and a custom development client are not interchangeable: use a development build when you need the native configuration and modules compiled for this app.

## Installation and setup

```sh
git clone https://github.com/almonsour13/daylo.git
cd daylo
npm ci
npm start
```

`npm start` starts the Expo development server. Use the terminal shortcuts to open an available target, or connect a device running a compatible development client. `npm run android` builds and launches the local Android app and requires a configured Android toolchain.

No application `.env` file or database provisioning step is required by the current source.

## Environment configuration

No environment variables are referenced in the inspected application source or build configuration, and no `.env` example file is present. The Expo project ID and app identifiers are configured in [app.json](./app.json); EAS build profiles are in [eas.json](./eas.json).

## Commands

The following scripts are defined in [package.json](./package.json):

| Command | Purpose |
|---|---|
| `npm start` | Start the Expo development server. |
| `npm run android` | Build/run the native Android app locally. |
| `npm run ios` | Build/run locally for iOS; requires macOS and Xcode. |
| `npm run web` | Start the Expo web target. Web feature parity is not established. |
| `npm run lint` | Run Expo's ESLint configuration. |
| `npm run prebuild` | Generate native project files with Expo prebuild; review native changes before committing. |
| `npm run build:development` | EAS development build for Android. |
| `npm run build:development:local` | Local EAS development build for Android. |
| `npm run build:preview` | EAS internal preview build for Android. |
| `npm run build:preview:local` | Local EAS preview build for Android. |
| `npm run build:android` | EAS production build for Android. |
| `npm run build:local` | Local EAS production build for Android. |
| `npm run submit:android` | Submit an Android production build through EAS Submit. |
| `npm run reset-project` | Runs a starter-template reset script; see the warning below. |

There is no `test`, `typecheck`, or migration-generation script in `package.json`. TypeScript is installed as a development dependency, so `npx tsc --noEmit` can be used as a direct type-check command.

> **Warning:** `npm run reset-project` is not a routine cleanup command. It prompts to move or delete starter-template directories (including `scripts/`) and creates a new Expo Router `app/` directory. Do not run it unless you intentionally want that reset behavior.

## Application startup

1. [index.ts](./index.ts) registers `src/App.tsx` as the Expo root component and imports Gesture Handler.
2. `App` installs Gesture Handler, onboarding, safe-area, React Query, and theme providers.
3. `RootNavigator` calls `useAppInit`. The hook loads DM Sans fonts, opens/migrates the SQLite database, and reads profile and settings from AsyncStorage.
4. Once initialization is ready, the root stack displays onboarding or the main tab navigator according to the saved onboarding flag. A splash screen is shown while fonts/data initialization is pending.
5. After the database is ready, maintenance purges expired deleted activities and synchronizes local activity notifications. The same maintenance is triggered when the app returns to the foreground.

## Navigation

The app uses React Navigation stacks and a bottom-tab navigator:

| Navigator | Screens |
|---|---|
| Root | Onboarding, Main, ActivityFormScreen, Settings |
| Main tabs | HomeScreen, CalendarScreen, ActivityScreen |
| Onboarding | OnboardingIntroScreen, OnboardingStepsScreen |
| Settings | SettingsScreen, ThemeScreen, ProfileEditScreen, RecentlyDeletedScreen |

The activity form accepts optional `activityId` and `date` route parameters: `activityId` selects an existing record for editing, and `date` supplies the initial date when creating an activity. Shared root route types are declared in [src/shared/types/navigation.ts](./src/shared/types/navigation.ts).

## Data and persistence

### SQLite activity data

The app opens `app.db` with Expo SQLite and wraps it with Drizzle ORM. The schema currently defines one table, `activity`, with indexes on `status` and `date`. There are no foreign-key relationships in the current schema.

Activity rows include an ID, name, optional description, date (`YYYY-MM-DD`), start and end times, repeat type, JSON-encoded custom weekdays, priority, category, notification flag, status, timestamps, and nullable `deletedAt`.

Database migrations in `src/shared/db/migrations/` are bundled and applied during app initialization by `initDb()`. The migration registry is `migrations.js`; there is no npm migration command. If changing the schema, review the generated SQL, journal/snapshot metadata, and the bundled migration registry together.

`activityService` reads and writes SQLite directly. Daily/calendar queries retrieve records dated on or before the selected date and evaluate recurrence rules in application code. A one-time activity matches only its stored date; recurring activities are not expanded into per-occurrence rows.

Delete is initially a soft delete (`status: "deleted"` with a deletion timestamp). Users can restore or permanently delete records; deleted records older than 30 days are purged during startup/foreground maintenance.

### AsyncStorage

`StorageService` uses React Native AsyncStorage for the profile, application settings, onboarding completion, and welcome-drawer state. These values are independent of SQLite activity rows; profile and settings are not database tables.

## State management and data flow

- **Component/feature state:** Selected calendar date/month, form input, search/filter values, and selection mode are maintained locally in screens or feature hooks.
- **Persisted data:** Activity operations go through `activityService` and SQLite. Profile and settings operations use their services and AsyncStorage.
- **Shared in-memory state:** Zustand stores expose the loaded profile and settings/preferences to components. Onboarding completion is exposed by `OnboardingContext`.
- **Query cache:** TanStack React Query loads lists and selected-day records from the local service. Mutation hooks perform writes and invalidate activity-related query keys so affected views reload.

For example, the activity form calls the activity mutation hook, which writes the record through `activityService`; on success it refreshes activity queries and synchronizes the corresponding local reminder.

## Core workflows

### Create or edit an activity

The root stack opens `ActivityFormScreen`. The form collects activity details and schedule settings, calls create/update mutations, and returns to the prior screen after a successful save. Editing loads the activity by ID. The mutation layer invalidates relevant queries and updates that activity's scheduled notification.

In development builds (`__DEV__`), a new form is initialized with sample “Morning Run” values; production builds start with an empty form. This is development-only sample form state, not seeded database content.

### Review activities

The home view queries activities for the current day. The calendar view queries for the selected date. Recurrence matching and start-time sorting are handled by `activityService`; activity-list queries use TanStack Query and show loading, empty, and error states.

The Activity tab supports text search, status/category/priority filters, and multi-selection actions. Query invalidation is shared across these views after activity mutations.

### Trash and restore

Deleting an activity marks the row deleted and cancels its reminders. The Recently Deleted settings screen can restore or permanently remove trashed records. Startup/foreground maintenance permanently removes records after the 30-day retention period.

### Schedule reminders

When an activity has reminders enabled, the notification service cancels prior notifications for that activity and schedules a start-time reminder plus an optional lead-time reminder. It supports one-time and recurring trigger types. Changes to reminder preferences rebuild the scheduled notifications.

## UI and styling

The project uses NativeWind utility classes with Tailwind CSS 4 and theme variables in [src/global.css](./src/global.css). Shared visual primitives are under `src/shared/components/ui/`; prefer those components and the existing theme classes when building screens. `ThemeProvider` applies the active light/dark theme and status-bar style. Theme preference can be light, dark, or system.

DM Sans is loaded through Expo Google Fonts. Reanimated and Gesture Handler are used for native interactions and animations. The app also uses React Native SVG and Expo vector icons.

## Permissions and native behavior

Expo Notifications is used for on-device reminders. The onboarding permission step requests notification permission; scheduling can also request permission. If the user denies permission, the service does not schedule reminders. Android notification channels are configured by the notification service.

The `expo-background-task` and `expo-task-manager` packages are dependencies, but no background task registration/use was found in the application source. Notification reconciliation occurs at app startup and when the app returns to the foreground, not through a documented periodic background task. Operating-system notification delivery and permission settings still apply.

## Testing and quality checks

The package defines `npm run lint` using Expo's ESLint configuration. TypeScript is configured with `strict: true`; run `npx tsc --noEmit` for a direct type check.

There is no test script in `package.json`, and no test/spec files were found under `src/`. Unit, integration, and end-to-end test coverage is therefore not documented as available.

## Build and release

EAS profiles in [eas.json](./eas.json) define development, preview, and production builds. The npm build scripts currently target Android only:

- **Development:** internal distribution with a development client.
- **Preview:** internal distribution.
- **Production:** automatic app-version incrementing; the configured Android submit profile is production.

Remote EAS builds require EAS CLI access and the credentials/configuration requested by Expo. The `:local` variants run EAS Build on the development machine and require its native build toolchain. The Android Gradle project is checked in under `android/`.

The Expo config declares iOS support (including tablet support), and `npm run ios` is present, but there is no checked-in `ios/` project or iOS-specific EAS npm script. Local iOS builds require macOS/Xcode. The web start script exists, but web behavior has not been verified as equivalent to the native app.

## Troubleshooting

- **Metro cannot resolve a module or serves stale output:** stop the development server and restart with `npx expo start --clear`.
- **Expo package versions are incompatible:** run `npx expo install --check` to inspect installed versions against the configured SDK before changing dependencies.
- **Native module or app configuration changes do not appear in the installed app:** rebuild/reinstall the development client; Metro reload alone does not replace native binaries.
- **Android device is not detected:** confirm the emulator is running or USB debugging is enabled, then check `adb devices` from an Android SDK command prompt.
- **Database migration fails:** inspect the device logs for the migration error and check the migration SQL, journal, and `migrations.js` registry. Avoid clearing app storage as a generic fix; that can remove local activities and preferences.
- **A reminder does not arrive:** check Daylo's reminder setting, the activity's own reminder switch, Android/iOS notification permission, and the device's notification settings.

## Development guidelines

- Keep feature-specific screens, hooks, components, and state in the matching `src/features/<feature>/` area; put genuinely cross-feature UI and infrastructure in `src/shared/`.
- Use the existing service and mutation-hook path for activity persistence rather than accessing the database from screen components.
- Add screens to the appropriate React Navigation navigator and keep route names/parameters in `src/shared/types/navigation.ts`.
- For schema changes, update the Drizzle schema and add a migration. Check that the generated SQL and metadata are included in the migration bundle imported by `src/shared/db/migrations/migrations.js`.
- Reuse shared UI primitives and theme classes. Keep TypeScript strict and avoid untyped data at module boundaries.
- Report persistence failures through the existing error/logging and user-feedback patterns; do not silently present failed writes as successful.
- Add tests when test infrastructure is introduced; currently the repository does not define a test runner or test files under `src/`.

## Contributing

No separate contribution policy is present. A reasonable contribution workflow is:

1. Create a focused branch and keep changes scoped to one behavior.
2. Install dependencies with `npm ci`.
3. Run `npm run lint` and `npx tsc --noEmit`; manually exercise the affected Android flow where possible.
4. For database changes, include and review the migration and its migration-registry entry.
5. Open a pull request describing user-visible changes, validation performed, and any native rebuild or data-migration implications.

## Security and privacy

The application source stores activities in local SQLite and profile/settings/onboarding values in AsyncStorage. No application API client or remote activity-sync flow was found. The repository does not document app-level encryption for these stores, so do not treat local persistence as encrypted.

The SQLite logger currently writes SQL statements and bind parameters to the console in [src/shared/db/index.ts](./src/shared/db/index.ts). Avoid putting secrets or sensitive data in logs and review logging behavior before distributing builds. Notification content includes the activity name and reminder text and is displayed by the operating system according to device settings.

## Known limitations

- No application account, backend API, or remote data synchronization is implemented in the inspected source.
- Periodic background-task registration is absent even though background-task packages are dependencies.
- Automated test infrastructure is not configured in `package.json`, and no tests were found under `src/`.
- The package does not pin a Node.js version. The repository has Android native files but no checked-in iOS native project.
- The Expo Router package/plugin is configured, while the actual entry and navigation flow use React Navigation.
- No roadmap is maintained in the repository.

## License and project information

The package is named `daylo` and marked `"private": true` in [package.json](./package.json). No `LICENSE` file was found, so no license is specified in this repository. Do not assume that the code is available for redistribution or reuse under an open-source license.
