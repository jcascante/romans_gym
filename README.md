# Romans Gym

A modern fitness application built with React that helps users discover and manage workout programs. The app features a collection of workout templates and allows users to customize and save their own programs.

## Features

- **Workout Templates**: Browse a curated collection of workout programs
- **Filtering System**: Filter templates by focus area, duration, and gender
- **Program Management**: Add templates to your personal programs
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Dark Mode Support**: Built-in dark/light theme switching

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jcascante/romans_gym.git
cd romans_gym
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

### Building for Production

```bash
pnpm build
```

## Project Structure

```
romans_gym/
├── frontend/
│   ├── src/
│   │   ├── assets/          # Images and static assets
│   │   ├── components/      # React components
│   │   ├── App.jsx          # Main app component
│   │   ├── Layout.jsx       # Layout wrapper
│   │   ├── TemplatesPage.jsx # Templates browsing page
│   │   └── main.jsx         # App entry point
│   ├── public/              # Public assets
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.js       # Vite configuration
└── README.md               # This file
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

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