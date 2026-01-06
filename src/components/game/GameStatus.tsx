import { cn } from '@/lib/utils';
import type { Player, GameMode } from '@/hooks/useGameLogic';

interface GameStatusProps {
  currentPlayer: 'X' | 'O';
  winner: Player;
  isDraw: boolean;
  isThinking: boolean;
  gameMode: GameMode;
}

const GameStatus = ({ currentPlayer, winner, isDraw, isThinking, gameMode }: GameStatusProps) => {
  const getStatusMessage = () => {
    if (winner) {
      if (gameMode === 'pvc') {
        return winner === 'X' ? '🎉 You Win!' : '🤖 AI Wins!';
      }
      return `🎉 Player ${winner} Wins!`;
    }
    if (isDraw) return "🤝 It's a Draw!";
    if (isThinking) return '🤔 AI is thinking...';
    
    if (gameMode === 'pvc') {
      return currentPlayer === 'X' ? '🎮 Your Turn' : '🤖 AI Turn';
    }
    return `🎮 Player ${currentPlayer}'s Turn`;
  };

  const isEndGame = winner || isDraw;

  return (
    <div
      className={cn(
        'text-center py-4 px-6 rounded-xl transition-all duration-500',
        'bg-card/50 backdrop-blur-sm border border-border/30',
        isEndGame && 'animate-pulse bg-primary/10 border-primary/30',
        isThinking && 'animate-pulse'
      )}
    >
      <p
        className={cn(
          'text-xl sm:text-2xl font-semibold',
          winner && 'text-primary',
          isDraw && 'text-muted-foreground'
        )}
      >
        {getStatusMessage()}
      </p>
    </div>
  );
};

export default GameStatus;
