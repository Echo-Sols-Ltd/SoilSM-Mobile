# Quick Start Guide

Get the SoilSmart mobile app running in minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Android Studio (for Android) or Xcode (for iOS on macOS)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. iOS Setup (macOS only)

```bash
cd ios && pod install && cd ..
```

### 3. Start Metro Bundler

```bash
npm start
```

Keep this terminal running.

### 4. Run the App

**For Android:**
```bash
npm run android
```

**For iOS (macOS only):**
```bash
npm run ios
```

## First Time Setup

### Android

1. Open Android Studio
2. Open SDK Manager
3. Install Android SDK Platform 33
4. Create an Android Virtual Device (AVD)
5. Start the emulator

### iOS (macOS only)

1. Open Xcode
2. Install Xcode Command Line Tools: `xcode-select --install`
3. Install CocoaPods: `sudo gem install cocoapods`
4. Run `pod install` in the `ios` directory

## Common Issues

### Metro Bundler Won't Start

```bash
npm start -- --reset-cache
```

### Android Build Fails

```bash
cd android && ./gradlew clean && cd ..
npm start -- --reset-cache
```

### iOS Build Fails

```bash
cd ios && pod deintegrate && pod install && cd ..
```

### Port Already in Use

Kill the process using port 8081:
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8081 | xargs kill -9
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Review [SETUP.md](SETUP.md) for advanced setup

## Need Help?

- Check the [Troubleshooting](#troubleshooting) section in README.md
- Open an issue on GitHub
- Contact the development team

