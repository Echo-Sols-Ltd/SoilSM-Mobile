# SoilSmart Mobile - Setup Guide

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **Xcode** (for iOS development on Mac)
- **Android Studio** (for Android development)
- **Java Development Kit (JDK)** 11 or higher

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup (Mac only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Start Metro Bundler**
   ```bash
   npm start
   ```

4. **Run on iOS**
   ```bash
   npm run ios
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

## Environment Setup

### Android

1. Install Android Studio
2. Set up Android SDK (API 21 or higher)
3. Configure ANDROID_HOME environment variable
4. Start an Android emulator or connect a device

### iOS (Mac only)

1. Install Xcode from App Store
2. Install Xcode Command Line Tools: `xcode-select --install`
3. Install CocoaPods: `sudo gem install cocoapods`
4. Open Xcode and accept license agreements

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

3. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

4. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

## Development

### Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
│   ├── auth/      # Authentication screens
│   └── main/      # Main app screens
├── navigation/     # Navigation configuration
├── theme/         # Theme (colors, typography, spacing)
├── i18n/          # Internationalization
│   └── locales/   # Translation files
└── utils/         # Utility functions
```

### Adding a New Screen

1. Create the screen component in `src/screens/`
2. Add it to the appropriate navigator in `src/navigation/`
3. Add translations to all language files in `src/i18n/locales/`

### Adding Translations

1. Add the key-value pair to `src/i18n/locales/en.ts`
2. Add the same key with translations to:
   - `src/i18n/locales/rw.ts` (Kinyarwanda)
   - `src/i18n/locales/fr.ts` (French)
3. Use `useTranslation()` hook in your component

## Building for Production

### Android

```bash
cd android
./gradlew assembleRelease
```

### iOS

1. Open `ios/SoilSmart.xcworkspace` in Xcode
2. Select Product > Archive
3. Follow the App Store submission process

## Testing

Run tests with:
```bash
npm test
```

## Code Quality

Lint your code:
```bash
npm run lint
```

## Support

For issues or questions, please open an issue on GitHub.

