# GymApp Mobile App

A React Native mobile application that allows users to create and manage their own workout programs. This is the mobile version of the GymApp web application, built with React Native, TypeScript, and Expo.

## Features

- **Workout Templates**: Browse a curated collection of workout programs
- **Filtering System**: Filter templates by focus area, duration, and gender
- **Program Management**: Add templates to your personal programs
- **Template Customization**: Edit and customize workout templates
- **Modern UI**: Clean, intuitive interface designed for mobile
- **Cross-Platform**: Works on both iOS and Android
- **Navigation**: Tab-based navigation between templates and programs
- **Responsive Design**: Optimized for mobile screens

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: React Navigation v7
- **Icons**: Expo Vector Icons (Ionicons)
- **Build Tool**: Expo CLI
- **Package Manager**: npm
- **Development**: Expo Go for testing

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jcascante/gymapp.git
cd gymapp/mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with Expo Go app on your mobile device, or run on simulator:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For web: `npm run web`

## Project Structure

```
mobile-app/
├── src/
│   ├── screens/              # Screen components
│   │   ├── LandingPage.tsx   # Landing page with hero section
│   │   ├── TemplatesPage.tsx # Templates browsing page
│   │   ├── MyProgramsPage.tsx # User's saved programs
│   │   └── TemplateCustomizer.tsx # Template customization
│   ├── components/           # Reusable components
│   └── types/               # TypeScript type definitions
├── assets/                  # Images and static assets
├── App.tsx                  # Main app component with navigation
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## Key Components

- **LandingPage**: Professional gym landing page with hero section, features, and testimonials
- **TemplatesPage**: Browse and filter workout templates with search functionality
- **MyProgramsPage**: View and manage saved workout programs
- **TemplateCustomizer**: Customize workout templates with exercise editing
- **Navigation**: Tab-based navigation with React Navigation

## Features in Detail

### Landing Page
- Hero section with call-to-action
- Features showcase with icons
- Customer testimonials
- Contact information

### Templates Page
- Search functionality
- Category, duration, and gender filters
- Template cards with exercise count
- Add to My Programs functionality
- View template details

### My Programs Page
- List of saved programs
- Program statistics (exercise count, date added)
- Start workout functionality
- Edit and delete programs
- Empty state with call-to-action

### Template Customizer
- Edit template name and description
- Add/remove exercises
- Configure sets, reps, and notes
- Save customized templates

## Development

### Adding New Features
1. Create new screen components in `src/screens/`
2. Add navigation routes in `App.tsx`
3. Update types in `src/types/index.ts` if needed
4. Test on both iOS and Android

### Styling
- Uses React Native StyleSheet for styling
- Follows the same color scheme as the web app
- Responsive design for different screen sizes

### State Management
- Currently uses local state with useState
- Can be extended with Context API or Redux for global state

## Deployment

### Expo Build
1. Install EAS CLI: `npm install -g @expo/eas-cli`
2. Configure EAS: `eas build:configure`
3. Build for platforms:
   - iOS: `eas build --platform ios`
   - Android: `eas build --platform android`

### App Store Deployment
1. Create app store listings
2. Submit builds through EAS
3. Follow platform-specific guidelines

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Juan Cascante - [GitHub](https://github.com/jcascante)

## Related Projects

- [GymApp Web App](../frontend/) - The web version of this application 