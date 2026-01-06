import { useState, useCallback } from 'react';

export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameMode = 'pvp' | 'pvc';

interface WinResult {
  winner: Player;
  line: number[] | null;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
];

// Check for winner
const checkWinner = (board: Board): WinResult => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combo };
    }
  }
  return { winner: null, line: null };
};

// Check if board is full (draw)
const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

// Minimax algorithm for unbeatable AI
const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number => {
  const { winner } = checkWinner(board);
  
  // Terminal states
  if (winner === 'O') return 10 - depth; // AI wins
  if (winner === 'X') return depth - 10; // Player wins
  if (isBoardFull(board)) return 0; // Draw

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const evalScore = minimax(board, depth + 1, false, alpha, beta);
        board[i] = null;
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const evalScore = minimax(board, depth + 1, true, alpha, beta);
        board[i] = null;
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return minEval;
  }
};

// Get best move for AI
const getBestMove = (board: Board): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false, -Infinity, Infinity);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

export const useGameLogic = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setIsThinking(false);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ x: 0, o: 0, draws: 0 });
  }, []);

  const makeMove = useCallback((index: number) => {
    if (board[index] || winner || isDraw || isThinking) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(prev => ({
        ...prev,
        [result.winner!.toLowerCase()]: prev[result.winner!.toLowerCase() as 'x' | 'o'] + 1
      }));
      return;
    }

    if (isBoardFull(newBoard)) {
      setIsDraw(true);
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);

    // AI move in PvC mode
    if (gameMode === 'pvc' && nextPlayer === 'O') {
      setIsThinking(true);
      setTimeout(() => {
        const aiMove = getBestMove([...newBoard]);
        if (aiMove !== -1) {
          const aiBoard = [...newBoard];
          aiBoard[aiMove] = 'O';
          setBoard(aiBoard);

          const aiResult = checkWinner(aiBoard);
          if (aiResult.winner) {
            setWinner(aiResult.winner);
            setWinningLine(aiResult.line);
            setScores(prev => ({ ...prev, o: prev.o + 1 }));
          } else if (isBoardFull(aiBoard)) {
            setIsDraw(true);
            setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
          } else {
            setCurrentPlayer('X');
          }
        }
        setIsThinking(false);
      }, 500); // Small delay for better UX
    }
  }, [board, currentPlayer, winner, isDraw, gameMode, isThinking]);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  }, [resetGame]);

  return {
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
  };
};
