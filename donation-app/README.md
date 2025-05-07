# Donation App

A mobile application built with React, Ionic, and Capacitor for managing donation items.

## Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)
- Android Studio (for Android development)
- JDK 11 or later

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
ionic serve
```

3. Add Android platform:

```bash
ionic capacitor add android
```

4. Build the app:

```bash
ionic build
```

5. Copy web assets to Android:

```bash
ionic capacitor copy android
```

6. Open in Android Studio:

```bash
ionic capacitor open android
```

## Building Android APK

1. Open the project in Android Studio
2. Go to Build > Build Bundle(s) / APK(s) > Build APK(s)
3. The APK will be generated in `android/app/build/outputs/apk/debug/`

## Features

- Splash screen
- Login screen
- View donation items
- Filter donation items by status
- Add new donation items

## API

The app integrates with the API at:
https://n3o-coding-task-react.azurewebsites.net/swagger/index.html
