import { Cell } from "../components/Board";

type Player = "red" | "orange";

/** Returns the lowest available row in a column, or null if full */
function getAvailableRow(board: Cell[][], col: number): number | null {
  for (let row = board.length - 1; row >= 0; row--) {
    if (!board[row][col]) return row;
  }
  return null;
}

/** Checks if a player has 4 in a row anywhere on the board */
function checkWin(board: Cell[][], player: Player): boolean {
  const height = board.length;
  const width = board[0].length;

  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal down-right
    [-1, 1],  // diagonal up-right
  ];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      for (const [dr, dc] of directions) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= height || nc < 0 || nc >= width) break;
          if (board[nr][nc] === player) count++;
        }
        if (count === 4) return true;
      }
    }
  }
  return false;
}

/** Heuristic evaluation: scores sequences of 2 or 3 in a row for AI strategy */
function evaluatePosition(board: Cell[][], player: Player): number {
  const height = board.length;
  const width = board[0].length;
  let score = 0;

  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal down-right
    [-1, 1],  // diagonal up-right
  ];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (board[r][c] !== player) continue;

      for (const [dr, dc] of directions) {
        let count = 1;
        let blocked = false;

        for (let i = 1; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= height || nc < 0 || nc >= width) break;

          if (board[nr][nc] === player) count++;
          else if (board[nr][nc] !== null) {
            blocked = true;
            break;
          } else break; // empty space can extend sequence
        }

        if (!blocked) {
          if (count === 2) score += 10;
          else if (count === 3) score += 50;
        }
      }
    }
  }

  return score;
}

/**
 * Returns the best column index for the AI to play
 * Uses heuristic evaluation and prevents opponent from winning immediately
 */
export function getBestMove(
  board: Cell[][],
  aiPlayer: Player,
  humanPlayer: Player
): number {
  const width = board[0].length;
  let bestScore = -Infinity;
  let bestMoves: number[] = [];

  for (let col = 0; col < width; col++) {
    const row = getAvailableRow(board, col);
    if (row === null) continue;

    // Simulate AI move
    const boardCopy = board.map((r) => [...r]);
    boardCopy[row][col] = aiPlayer;

    // Immediate win?
    if (checkWin(boardCopy, aiPlayer)) return col;

    // Evaluate AI move
    let score = evaluatePosition(boardCopy, aiPlayer);

    // Check potential opponent responses to block threats
    let oppScore = 0;
    for (let oppCol = 0; oppCol < width; oppCol++) {
      const oppRow = getAvailableRow(boardCopy, oppCol);
      if (oppRow === null) continue;
      const oppBoardCopy = boardCopy.map((r) => [...r]);
      oppBoardCopy[oppRow][oppCol] = humanPlayer;
      if (checkWin(oppBoardCopy, humanPlayer)) {
        oppScore = 1000; // avoid letting opponent win
        break;
      }
      oppScore = Math.max(oppScore, evaluatePosition(oppBoardCopy, humanPlayer));
    }

    score -= oppScore; // penalize moves that allow opponent advantage
    score += Math.random() * 5; // small randomness for imperfection

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [col];
    } else if (score === bestScore) {
      bestMoves.push(col);
    }
  }

  // Fallback if no moves found
  if (bestMoves.length === 0) {
    for (let col = 0; col < width; col++) {
      if (getAvailableRow(board, col) !== null) return col;
    }
    return 0;
  }

  // Pick randomly among best scoring columns
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}
