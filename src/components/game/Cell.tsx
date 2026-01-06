import { cn } from '@/lib/utils';
import type { Player } from '@/hooks/useGameLogic';

interface CellProps {
  value: Player;
  onClick: () => void;
  isWinningCell: boolean;
  disabled: boolean;
}

const Cell = ({ value, onClick, isWinningCell, disabled }: CellProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || !!value}
      className={cn(
        'cell aspect-square rounded-xl border-2 border-border/50 bg-card/50',
        'flex items-center justify-center text-5xl sm:text-6xl md:text-7xl font-bold',
        'transition-all duration-300 ease-out backdrop-blur-sm',
        'hover:border-primary/50 hover:bg-card/80 hover:scale-[1.02]',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        'disabled:cursor-not-allowed disabled:hover:scale-100',
        isWinningCell && 'winning-cell border-primary bg-primary/20 scale-105',
        !value && !disabled && 'hover:shadow-lg hover:shadow-primary/20'
      )}
      aria-label={value ? `Cell marked ${value}` : 'Empty cell'}
    >
      {value && (
        <span
          className={cn(
            'animate-scale-in',
            value === 'X' ? 'text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]' : 'text-accent-foreground drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]'
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
};

export default Cell;
