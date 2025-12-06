# Expo Go Quick Start

Get your app running on your device in 3 steps!

## Step 1: Install Expo Go

Download and install Expo Go on your phone:
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Start and Scan

```bash
npm start
```

This will:
1. Start the development server
2. Show a QR code in your terminal
3. Open Expo DevTools in your browser

**Then on your phone:**
- **Android**: Open Expo Go → Tap "Scan QR code" → Scan the code
- **iOS**: Open Camera app → Point at QR code → Tap notification

## That's It! 🎉

Your app should now load on your device. Make sure your phone and computer are on the **same Wi-Fi network**.

## Troubleshooting

**QR code not working?**
- Check Wi-Fi connection (same network)
- Try tunnel mode: `npm start -- --tunnel`
- Or manually enter URL in Expo Go

**App not loading?**
- Shake device → Reload
- Or press `r` in terminal to reload

**Need more help?**
See [EXPO_SETUP.md](EXPO_SETUP.md) for detailed instructions.

