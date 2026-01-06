import { Button } from '@/components/ui/button';
import { RotateCcw, Users, Bot, Volume2, VolumeX, Moon, Sun, Trophy } from 'lucide-react';
import type { GameMode } from '@/hooks/useGameLogic';

interface GameControlsProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onReset: () => void;
  onResetScores: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const GameControls = ({
  gameMode,
  onModeChange,
  onReset,
  onResetScores,
  isMuted,
  onToggleMute,
  isDark,
  onToggleTheme,
}: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Game Mode Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={gameMode === 'pvp' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onModeChange('pvp')}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Player vs Player</span>
          <span className="sm:hidden">PvP</span>
        </Button>
        <Button
          variant={gameMode === 'pvc' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onModeChange('pvc')}
          className="gap-2"
        >
          <Bot className="h-4 w-4" />
          <span className="hidden sm:inline">Player vs AI</span>
          <span className="sm:hidden">vs AI</span>
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        <Button variant="secondary" size="lg" onClick={onReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          New Game
        </Button>
        <Button variant="ghost" size="lg" onClick={onResetScores} className="gap-2">
          <Trophy className="h-4 w-4" />
          Reset Scores
        </Button>
      </div>

      {/* Settings */}
      <div className="flex justify-center gap-2">
        <Button variant="ghost" size="icon" onClick={onToggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label={isDark ? 'Light mode' : 'Dark mode'}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
