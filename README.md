# GymApp

A modern comprehensive fitness application built with React and React Native that helps users discover and manage workout programs. The project includes both a web application and a mobile app, featuring comprehensive workout templates and allowing users to customize and save their own programs.

## Features

- **Workout Templates**: Browse a curated collection of workout programs
- **Filtering System**: Filter templates by focus area, duration, and gender
- **Program Management**: Add templates to your personal programs
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Dark Mode Support**: Built-in dark/light theme switching
- **Drag & Drop**: Interactive exercise reordering with drag and drop functionality
- **Landing Page**: Professional gym landing page with testimonials and features
- **Navigation**: Clean routing between templates, programs, and home page

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with PostCSS
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Drag & Drop**: @hello-pangea/dnd
- **Linting**: ESLint with React-specific rules

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm
- Expo CLI (for mobile app): `npm install -g @expo/cli`

### Web Application

1. Clone the repository:
```bash
git clone https://github.com/jcascante/gymapp.git
cd gymapp
```

2. Install dependencies:
```bash
cd frontend
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Mobile Application

1. Navigate to the mobile app directory:
```bash
cd mobile-app
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

### Building for Production

```bash
pnpm build
```

## Development with ngrok

This project is configured to work with ngrok for external access during development. This is useful for testing on mobile devices or sharing your development server with others.

### Prerequisites

1. Install ngrok:
   - **macOS**: `brew install ngrok`
   - **Windows**: Download from [ngrok.com](https://ngrok.com)
   - **Linux**: Download from [ngrok.com](https://ngrok.com)

2. Sign up for a free ngrok account at [ngrok.com](https://ngrok.com)

3. Get your authtoken from the ngrok dashboard and authenticate:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Running with ngrok

1. Start your development server:
```bash
cd frontend
pnpm dev
```

2. In a new terminal, start ngrok to expose your local server:
```bash
ngrok http 5173
```

3. ngrok will provide you with a public URL (e.g., `https://abc123.ngrok-free.app`) that you can use to access your app from anywhere.

### Configuration

The project is pre-configured to work with ngrok through the `vite.config.js` file, which includes:
- Host binding to allow external connections
- Allowed hosts for ngrok domains (`.ngrok-free.app` and `.ngrok.io`)

### Troubleshooting

- If you get CORS errors, make sure your ngrok URL is included in the `allowedHosts` array in `vite.config.js`
- For free ngrok accounts, you'll get a new URL each time you restart ngrok
- The development server must be running on port 5173 for ngrok to work properly

## Project Structure

```
gymapp/
├── frontend/                    # Web application (React + Vite)
│   ├── src/
│   │   ├── assets/              # Images and static assets
│   │   │   ├── bench_press_example.jpg
│   │   │   ├── logo.jpg
│   │   │   └── react.svg
│   │   ├── App.jsx              # Main app component with routing
│   │   ├── Layout.jsx           # Layout wrapper with navigation
│   │   ├── TemplatesPage.jsx    # Templates browsing page
│   │   ├── MyProgramsPage.jsx   # User's saved programs
│   │   ├── TemplateCustomizer.jsx # Template customization component
│   │   ├── main.jsx             # App entry point
│   │   ├── App.css              # App-specific styles
│   │   └── index.css            # Global styles
│   ├── public/                  # Public assets
│   ├── package.json             # Dependencies and scripts
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── eslint.config.js         # ESLint configuration
├── mobile-app/                  # Mobile application (React Native + Expo)
│   ├── src/
│   │   ├── screens/             # Screen components
│   │   │   ├── LandingPage.tsx  # Landing page with hero section
│   │   │   ├── TemplatesPage.tsx # Templates browsing page
│   │   │   ├── MyProgramsPage.tsx # User's saved programs
│   │   │   └── TemplateCustomizer.tsx # Template customization
│   │   ├── components/          # Reusable components
│   │   └── types/              # TypeScript type definitions
│   ├── assets/                  # Images and static assets
│   ├── App.tsx                  # Main app component with navigation
│   ├── package.json             # Dependencies and scripts
│   └── README.md               # Mobile app documentation
└── README.md                    # This file
```

## Available Scripts

### Web Application
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Mobile Application
- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## Key Components

### Web Application
- **LandingPage**: Professional gym landing page with hero section, features, and testimonials
- **TemplatesPage**: Browse and filter workout templates
- **MyProgramsPage**: View and manage saved workout programs
- **TemplateCustomizer**: Customize workout templates with drag & drop functionality
- **Layout**: Consistent layout wrapper with navigation

### Mobile Application
- **LandingPage**: Professional gym landing page with hero section, features, and testimonials
- **TemplatesPage**: Browse and filter workout templates with search functionality
- **MyProgramsPage**: View and manage saved workout programs
- **TemplateCustomizer**: Customize workout templates with exercise editing
- **Navigation**: Tab-based navigation with React Navigation

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
