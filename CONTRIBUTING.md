# Contributing to SoilSmart Mobile

Thank you for your interest in contributing to SoilSmart Mobile! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/SoilSM-Mobile.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Code Style

- Follow the existing code style
- Use TypeScript for all new files
- Use functional components with hooks
- Follow React Native best practices
- Ensure all code is properly typed

## Translation Guidelines

When adding new text to the app:

1. Add the English translation to `src/i18n/locales/en.ts`
2. Add the Kinyarwanda translation to `src/i18n/locales/rw.ts`
3. Add the French translation to `src/i18n/locales/fr.ts`
4. Use the `useTranslation` hook in your components

## Testing

- Test on both iOS and Android when possible
- Test with different screen sizes
- Test language switching functionality
- Ensure accessibility features work

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure all tests pass
3. Request review from maintainers
4. Address any feedback

## Questions?

Open an issue for any questions or concerns.

