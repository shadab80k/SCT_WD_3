import { cn } from '@/lib/utils';
import type { GameMode } from '@/hooks/useGameLogic';

interface ScoreBoardProps {
  scores: { x: number; o: number; draws: number };
  gameMode: GameMode;
}

const ScoreBoard = ({ scores, gameMode }: ScoreBoardProps) => {
  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      <div className="score-card text-center px-4 sm:px-6 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 min-w-[80px] sm:min-w-[100px]">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">
          {gameMode === 'pvc' ? 'You' : 'Player X'}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-primary">{scores.x}</p>
      </div>
      
      <div className="score-card text-center px-4 sm:px-6 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 min-w-[80px] sm:min-w-[100px]">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Draws</p>
        <p className="text-2xl sm:text-3xl font-bold text-muted-foreground">{scores.draws}</p>
      </div>
      
      <div className="score-card text-center px-4 sm:px-6 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 min-w-[80px] sm:min-w-[100px]">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">
          {gameMode === 'pvc' ? 'AI' : 'Player O'}
        </p>
        <p className={cn(
          "text-2xl sm:text-3xl font-bold",
          gameMode === 'pvc' ? 'text-destructive' : 'text-accent-foreground'
        )}>
          {scores.o}
        </p>
      </div>
    </div>
  );
};

export default ScoreBoard;
