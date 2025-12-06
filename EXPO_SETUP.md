# Expo Go Setup Guide

This guide will help you set up the SoilSmart app to run with Expo Go on your device.

## Prerequisites

1. **Install Expo Go on your device:**
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Install Expo CLI globally:**
   ```bash
   npm install -g expo-cli
   ```

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Expo Development Server

```bash
npm start
```

This will:
- Start the Metro bundler
- Display a QR code in your terminal
- Open Expo DevTools in your browser

## Running on Your Device

### Option 1: Scan QR Code (Recommended)

1. **Make sure your device and computer are on the same Wi-Fi network**

2. **For Android:**
   - Open Expo Go app
   - Tap "Scan QR code"
   - Scan the QR code from your terminal or browser

3. **For iOS:**
   - Open Camera app (iOS 11+)
   - Point at the QR code
   - Tap the notification to open in Expo Go

### Option 2: Use Expo DevTools

1. When you run `npm start`, Expo DevTools opens in your browser
2. Click "Run on Android device/emulator" or "Run on iOS simulator"
3. Or scan the QR code from the browser

### Option 3: Manual Connection

If QR code doesn't work:

1. **Find your computer's IP address:**
   - Windows: `ipconfig` (look for IPv4 Address)
   - macOS/Linux: `ifconfig` or `ip addr`

2. **In Expo Go app:**
   - Tap "Enter URL manually"
   - Enter: `exp://YOUR_IP_ADDRESS:8081`

## Troubleshooting

### QR Code Not Working

1. **Check network connection:**
   - Ensure device and computer are on same Wi-Fi
   - Try disabling VPN or firewall temporarily

2. **Use tunnel mode:**
   ```bash
   npm start -- --tunnel
   ```
   Note: Tunnel mode requires Expo account (free)

### Connection Issues

1. **Reset Metro bundler:**
   ```bash
   npm start -- --reset-cache
   ```

2. **Check firewall settings:**
   - Allow port 8081 through firewall
   - Windows: Check Windows Defender Firewall

3. **Try different connection method:**
   - Use tunnel mode if LAN doesn't work
   - Use USB connection for Android (requires `adb`)

### App Not Loading

1. **Clear Expo Go cache:**
   - Android: Settings → Apps → Expo Go → Clear Cache
   - iOS: Delete and reinstall Expo Go

2. **Check for errors:**
   - Look at terminal for error messages
   - Check Expo Go app for error details

## Development Tips

### Hot Reloading

- Shake your device to open developer menu
- Enable "Fast Refresh" for automatic reloading
- Press `r` in terminal to reload manually

### Debugging

- Shake device → "Debug Remote JS" to use Chrome DevTools
- Use `console.log()` statements (visible in terminal)
- Check Expo DevTools in browser for logs

### Network Access

If your app needs to access local network services:
- Use your computer's IP address instead of `localhost`
- Ensure firewall allows connections

## Building for Production

Expo Go is for development only. For production:

1. **Build standalone app:**
   ```bash
   expo build:android
   expo build:ios
   ```

2. **Or use EAS Build:**
   ```bash
   npm install -g eas-cli
   eas build --platform android
   eas build --platform ios
   ```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Go Guide](https://docs.expo.dev/get-started/expo-go/)
- [Troubleshooting Guide](https://docs.expo.dev/troubleshooting/clear-cache/)

## Quick Commands

```bash
# Start development server
npm start

# Start with tunnel (if LAN doesn't work)
npm start -- --tunnel

# Start with cache reset
npm start -- --reset-cache

# Start for web
npm run web
```

