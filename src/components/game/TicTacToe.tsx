import { useEffect, useState } from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useConfetti } from '@/hooks/useConfetti';
import Board from './Board';
import GameStatus from './GameStatus';
import ScoreBoard from './ScoreBoard';
import GameControls from './GameControls';

const TicTacToe = () => {
  const {
    board,
    currentPlayer,
    gameMode,
    winner,
    winningLine,
    isDraw,
    isThinking,
    scores,
    makeMove,
    resetGame,
    resetScores,
    changeGameMode,
  } = useGameLogic();

  const { isMuted, toggleMute, playMoveSound, playWinSound, playLoseSound, playDrawSound, playClickSound } = useSoundEffects();
  const { fireCelebration } = useConfetti();
  
  const [isDark, setIsDark] = useState(true);

  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    playClickSound();
  };

  // Play sounds and confetti on game events
  useEffect(() => {
    if (winner) {
      // In PvC mode, if O wins (computer), player loses
      if (gameMode === 'pvc' && winner === 'O') {
        playLoseSound();
      } else {
        playWinSound();
        fireCelebration();
      }
    } else if (isDraw) {
      playDrawSound();
    }
  }, [winner, isDraw, gameMode, playWinSound, playLoseSound, playDrawSound, fireCelebration]);

  const handleCellClick = (index: number) => {
    if (!board[index] && !winner && !isDraw && !isThinking) {
      playMoveSound();
      makeMove(index);
    }
  };

  const handleReset = () => {
    playClickSound();
    resetGame();
  };

  const handleResetScores = () => {
    playClickSound();
    resetScores();
  };

  const handleModeChange = (mode: 'pvp' | 'pvc') => {
    playClickSound();
    changeGameMode(mode);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {gameMode === 'pvc' ? 'Challenge the unbeatable AI' : 'Play with a friend'}
          </p>
        </header>

        {/* Score Board */}
        <ScoreBoard scores={scores} gameMode={gameMode} />

        {/* Game Status */}
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
          isThinking={isThinking}
          gameMode={gameMode}
        />

        {/* Game Board */}
        <div className="flex justify-center">
          <div className="w-full max-w-[320px] sm:max-w-[380px]">
            <Board
              board={board}
              winningLine={winningLine}
              onCellClick={handleCellClick}
              disabled={!!winner || isDraw || isThinking}
            />
          </div>
        </div>

        {/* Controls */}
        <GameControls
          gameMode={gameMode}
          onModeChange={handleModeChange}
          onReset={handleReset}
          onResetScores={handleResetScores}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground/60 mt-4">
          Built with ❤️ by Shadab using React & TypeScript
        </footer>
      </div>
    </div>
  );
};

export default TicTacToe;
