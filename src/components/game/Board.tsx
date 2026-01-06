import Cell from './Cell';
import type { Board as BoardType } from '@/hooks/useGameLogic';

interface BoardProps {
  board: BoardType;
  winningLine: number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

const Board = ({ board, winningLine, onCellClick, disabled }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-card/30 backdrop-blur-md border border-border/30 shadow-2xl">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Board;
