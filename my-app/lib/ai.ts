import { Cell } from "../components/Board";

type Player = "red" | "orange";

function getAvailableRow(board: Cell[][], col: number): number | null {
  for (let row = board.length - 1; row >= 0; row--) {
    if (!board[row][col]) return row;
  }
  return null;
}

function checkWin(board: Cell[][], player: Player): boolean {
  const height = board.length;
  const width = board[0].length;

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (
        c + 3 < width &&
        board[r][c] === player &&
        board[r][c + 1] === player &&
        board[r][c + 2] === player &&
        board[r][c + 3] === player
      )
        return true;

      if (
        r + 3 < height &&
        board[r][c] === player &&
        board[r + 1][c] === player &&
        board[r + 2][c] === player &&
        board[r + 3][c] === player
      )
        return true;

      if (
        r + 3 < height &&
        c + 3 < width &&
        board[r][c] === player &&
        board[r + 1][c + 1] === player &&
        board[r + 2][c + 2] === player &&
        board[r + 3][c + 3] === player
      )
        return true;

      if (
        r - 3 >= 0 &&
        c + 3 < width &&
        board[r][c] === player &&
        board[r - 1][c + 1] === player &&
        board[r - 2][c + 2] === player &&
        board[r - 3][c + 3] === player
      )
        return true;
    }
  }

  return false;
}

function evaluatePosition(board: Cell[][], player: Player): number {
  // Heuristic scoring of board for player:
  // Counts 2-in-a-rows and 3-in-a-rows (not blocked)
  // +10 for each 2-in-a-row, +50 for each 3-in-a-row

  const height = board.length;
  const width = board[0].length;
  let score = 0;

  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal /
    [-1, 1], // diagonal \
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

          if (board[nr][nc] === player) {
            count++;
          } else if (board[nr][nc] !== null) {
            blocked = true;
            break;
          } else {
            // empty cell - potential to extend sequence
            break;
          }
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

    // Clone board and simulate AI move
    const boardCopy = board.map((r) => [...r]);
    boardCopy[row][col] = aiPlayer;

    // 1) Win immediately?
    if (checkWin(boardCopy, aiPlayer)) {
      return col;
    }

    // 2) Block opponent win?
    // We'll check opponent winning moves inside scoring.

    // Evaluate board score for AI after move
    let score = evaluatePosition(boardCopy, aiPlayer);

    // Also evaluate potential opponent score after this move, to avoid helping them
    let oppScore = 0;
    for (let oppCol = 0; oppCol < width; oppCol++) {
      const oppRow = getAvailableRow(boardCopy, oppCol);
      if (oppRow === null) continue;
      const oppBoardCopy = boardCopy.map((r) => [...r]);
      oppBoardCopy[oppRow][oppCol] = humanPlayer;
      if (checkWin(oppBoardCopy, humanPlayer)) {
        // Very bad if opponent can win next turn
        oppScore = 1000;
        break;
      }
      oppScore = Math.max(oppScore, evaluatePosition(oppBoardCopy, humanPlayer));
    }

    // Penalize moves that enable opponent winning
    score -= oppScore;

    // Small randomness for imperfection
    score += Math.random() * 5;

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [col];
    } else if (score === bestScore) {
      bestMoves.push(col);
    }
  }

  if (bestMoves.length === 0) {
    // Pick first available as fallback
    for (let col = 0; col < width; col++) {
      if (getAvailableRow(board, col) !== null) return col;
    }
    return 0;
  }

  // Pick random among best moves
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}
