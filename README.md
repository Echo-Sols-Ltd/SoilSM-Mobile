# SoilSmart Mobile App

A comprehensive mobile application for farmers to monitor soil health, manage tasks, and connect with the agricultural community. Built with React Native and TypeScript.

## Features

- 🌱 **Soil Health Monitoring**: Track temperature, humidity, soil moisture, and light intensity
- 📋 **Task Management**: Create, organize, and track farming tasks with priority levels
- 👥 **Community**: Connect with other farmers, share experiences, and learn together
- 📊 **Soil Analytics**: View detailed soil reports, pH levels, and AI-powered recommendations
- 💬 **Messaging**: Communicate with support team and other farmers
- ⚙️ **Settings**: Customize notifications, privacy settings, and language preferences
- 🌍 **Multi-language Support**: Available in English, Kinyarwanda, and French

## Problem Statement

Farmers across Africa face declining soil fertility, poor irrigation practices, and limited access to modern guidance. Traditional methods often rely on guesswork, leading to wasted resources and reduced crop yields. Climate change is making these challenges worse, leaving communities vulnerable and threatening food security.

## Objectives

- Monitor soil health using affordable sensors
- Automate water and compost delivery
- Provide AI-powered agricultural guidance
- Promote community sharing of agricultural technology

## Tech Stack

- **React Native** 0.72.6
- **TypeScript** 5.3.3
- **React Navigation** 6.x
- **i18next** for internationalization
- **AsyncStorage** for local data persistence

## Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Echo-Sols-Ltd/SoilSM-Mobile.git
cd SoilSM-Mobile
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods:
```bash
cd ios && pod install && cd ..
```

4. Start the Metro bundler:
```bash
npm start
```

5. Run on iOS:
```bash
npm run ios
```

6. Run on Android:
```bash
npm run android
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/         # Screen components
│   ├── auth/       # Authentication screens
│   └── main/       # Main app screens
├── navigation/      # Navigation configuration
├── theme/          # Theme configuration (colors, typography, spacing)
├── i18n/           # Internationalization files
│   └── locales/    # Translation files (en, rw, fr)
└── utils/          # Utility functions
```

## Language Support

The app supports three languages:
- **English (en)**: Default language
- **Kinyarwanda (rw)**: Native language of Rwanda
- **French (fr)**: Widely spoken in Africa

Users can change the language in Settings, and the preference is saved locally.

## Features in Detail

### Authentication
- Landing page with welcome screen
- User registration and login
- Password reset flow with verification
- Social login options (Google, Facebook)

### Dashboard
- Real-time soil metrics display
- Water usage charts
- Upcoming tasks overview
- Recent activities feed

### Tasks
- Create and manage farming tasks
- Set priorities (high, medium, low)
- Calendar view
- Task completion tracking

### Community
- Social feed with posts
- Like and comment on posts
- Share agricultural experiences
- Connect with other farmers

### Soil Monitoring
- pH level tracking
- Soil analysis reports
- AI-powered recommendations
- Soil health notifications

### Messages
- Chat with support team
- Message other farmers
- Real-time messaging interface

### Settings
- Account management
- Notification preferences
- Privacy and security settings
- Language selection
- Help center and support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@soilsmart.com or open an issue in the repository.

## Acknowledgments

- Design inspiration from Figma: [SoilSmart Design](https://www.figma.com/design/M9Eosu9lcKRebkwlbqPhMQ/SoilSmart?node-id=0-1&p=f&t=g9K75afJb1p1cIMr-0)
