# SoilSmart Mobile App

A React Native mobile application for smart soil monitoring and agricultural management.

## Features

- 🌱 **Smart Soil Monitoring** - Track soil metrics and health
- 📊 **Dashboard** - Real-time data visualization
- 📝 **Task Management** - Organize and track agricultural tasks
- 👥 **Community** - Connect with other farmers
- 💬 **Messaging** - Communicate with support team
- 🌍 **Multi-language Support** - English, French, and Kinyarwanda
- 🔐 **Authentication** - Secure user authentication

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Java Development Kit (JDK)** 11 or higher

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Echo-Sols-Ltd/SoilSM-Mobile.git
   cd soilsm-mob
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Start Metro Bundler

In one terminal, start the Metro bundler:
```bash
npm start
```

### Run on Android

In another terminal:
```bash
npm run android
```

**Requirements:**
- Android Studio installed
- Android emulator running or physical device connected
- USB debugging enabled on physical device

### Run on iOS (macOS only)

In another terminal:
```bash
npm run ios
```

**Requirements:**
- Xcode installed
- iOS Simulator or physical device

## Building for Production

### Android

1. **Generate a signed APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

2. **Generate a signed AAB (for Google Play):**
   ```bash
   ./gradlew bundleRelease
   ```
   The AAB will be located at: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS

1. Open the project in Xcode:
   ```bash
   open ios/SoilSmart.xcworkspace
   ```

2. Select your target device/simulator
3. Product → Archive
4. Follow the prompts to distribute your app

## Project Structure

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen components
│   ├── auth/       # Authentication screens
│   └── main/       # Main app screens
├── navigation/      # Navigation configuration
├── contexts/       # React contexts (Auth, etc.)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── i18n/           # Internationalization
└── theme/          # Theme configuration
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Development

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Follow React Native best practices
- Write tests for new features

### Adding New Features

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Write tests
4. Run linter: `npm run lint`
5. Commit and push
6. Create pull request

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Troubleshooting

### Android Build Issues

- Clean build: `cd android && ./gradlew clean && cd ..`
- Clear Metro cache: `npm start -- --reset-cache`
- Reinstall node modules: `rm -rf node_modules && npm install`

### iOS Build Issues

- Clean build: `cd ios && xcodebuild clean && cd ..`
- Reinstall pods: `cd ios && pod deintegrate && pod install && cd ..`
- Clear derived data in Xcode

### Metro Bundler Issues

- Reset cache: `npm start -- --reset-cache`
- Clear watchman: `watchman watch-del-all`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License.

## Support

For support, email support@soilsmart.com or open an issue in the repository.
