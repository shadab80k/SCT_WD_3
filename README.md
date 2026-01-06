# 🎮 Tic-Tac-Toe Game

A modern, feature-rich Tic-Tac-Toe game built with React, TypeScript, and Vite. Challenge your friends or test your skills against an unbeatable AI!


## ✨ Features

- **Two Game Modes**
  - 👥 **Player vs Player (PvP)**: Play with a friend on the same device
  - 🤖 **Player vs Computer (PvC)**: Challenge an unbeatable AI opponent

- **Rich User Experience**
  - 🎨 Beautiful gradient UI with smooth animations
  - 🌓 Dark/Light theme toggle
  - 🎵 Interactive sound effects (with mute option)
  - 🎉 Celebration confetti on winning
  - 📊 Real-time score tracking
  - ⚡ Responsive design for all devices

- **Smart AI**
  - Implements the Minimax algorithm
  - Guaranteed unbeatable performance
  - Strategic move selection

## 🛠️ Technologies Used

- **Frontend Framework**: [React](https://react.dev/) ^18.3.1
- **Language**: [TypeScript](https://www.typescriptlang.org/) ^5.8.3
- **Build Tool**: [Vite](https://vitejs.dev/) ^5.4.19
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) ^3.4.17
- **State Management**: React Hooks
- **Routing**: [React Router](https://reactrouter.com/) ^6.30.1
- **Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_REPOSITORY_URL>
```

2. Navigate to the project directory:
```bash
cd SCT_WD_3-main
```

3. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎯 How to Play

1. **Choose Your Mode**: Select either Player vs Player or Player vs Computer
2. **Make Your Move**: Click on any empty cell to place your mark (X or O)
3. **Win the Game**: Get three of your marks in a row (horizontally, vertically, or diagonally)
4. **Track Progress**: View your score on the scoreboard
5. **Customize Experience**: Toggle sound effects and themes to your preference

## 📂 Project Structure

```
SCT_WD_3-main/
├── public/              # Static assets
│   ├── favicon.svg      # App favicon
│   └── sounds/          # Sound effect files
├── src/
│   ├── components/      # React components
│   │   ├── game/       # Game-specific components
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Custom React hooks
│   │   ├── useGameLogic.ts
│   │   ├── useSoundEffects.ts
│   │   └── useConfetti.ts
│   ├── pages/          # Page components
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.ts      # Vite configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

## 🎨 Key Components

- **TicTacToe**: Main game component managing game state and UI
- **Board**: Renders the 3x3 game grid
- **Cell**: Individual cell component with click handlers
- **GameStatus**: Displays current game status and player turn
- **ScoreBoard**: Tracks and displays player scores
- **GameControls**: Mode selection and game settings

## 🧠 Custom Hooks

- **useGameLogic**: Manages game state, win detection, and AI moves
- **useSoundEffects**: Handles all sound effects and audio controls
- **useConfetti**: Controls celebration confetti animations

## 🎵 Sound Effects

The game includes immersive sound effects for:
- Player moves
- Winning
- Losing (vs AI)
- Draw games
- Button clicks

All sounds can be muted using the sound toggle button.

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 👨‍💻 Author

**Shadab**

Built with ❤️ using React & TypeScript

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling

---

**Enjoy the game! 🎮**
