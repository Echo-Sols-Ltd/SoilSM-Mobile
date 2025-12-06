# Build Checklist

Use this checklist to ensure your app is ready to build and run.

## Pre-Build Checklist

### ✅ Dependencies
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] All npm packages installed (`npm install`)
- [ ] iOS pods installed (macOS only: `cd ios && pod install`)

### ✅ Development Environment
- [ ] Android Studio installed (for Android)
- [ ] Xcode installed (for iOS, macOS only)
- [ ] Android SDK Platform 33 installed
- [ ] Android emulator or device ready
- [ ] iOS Simulator or device ready (macOS only)

### ✅ Configuration Files
- [ ] `package.json` scripts configured
- [ ] `babel.config.js` properly configured
- [ ] `metro.config.js` exists
- [ ] `app.json` has correct app name
- [ ] Android `build.gradle` configured
- [ ] iOS `Podfile` configured

## Build Verification

### Android Build
```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Start Metro
npm start

# In another terminal, build and run
npm run android
```

**Expected Result:** App launches on Android emulator/device

### iOS Build (macOS only)
```bash
# Install pods
cd ios && pod install && cd ..

# Start Metro
npm start

# In another terminal, build and run
npm run ios
```

**Expected Result:** App launches on iOS Simulator/device

## Post-Build Verification

### ✅ App Functionality
- [ ] App launches without crashes
- [ ] Authentication screens load
- [ ] Navigation works
- [ ] All screens accessible
- [ ] Language switching works
- [ ] No console errors

### ✅ Performance
- [ ] App loads quickly
- [ ] Animations smooth
- [ ] No memory leaks
- [ ] No performance warnings

## Production Build

### Android APK
```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### Android AAB (Google Play)
```bash
cd android
./gradlew bundleRelease
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS Archive
1. Open `ios/SoilSmart.xcworkspace` in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Distribute App

## Troubleshooting

If build fails:
1. Clean build: `npm run clean`
2. Reset Metro cache: `npm start -- --reset-cache`
3. Reinstall dependencies: `npm run clean:all`
4. Check error logs for specific issues

## Notes

- Always test on both Android and iOS before production
- Ensure all environment variables are set
- Verify API endpoints are configured
- Check that all assets are included

