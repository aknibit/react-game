export enum Player {
  Red = "red",
  Blue = "blue",
}

export interface Cell {
  player: Player | undefined;
}

export const initializeBoard = (cols: number): Cell[] => {
  const board: Cell[] = [];
  for (let i = 0; i < cols; i++) {
    board.push({ player: undefined });
  }
  return board;
}

export const assignRandomPlayers = (board: Cell[], cols: number): Cell[] => {
    const newBoard = [...board];
    const assignRandomly = (player: Player, count: number) => {
        let assigned = 0;
        while (assigned < count) {
        const randomCell = newBoard[Math.floor(Math.random() * cols)];
        if (randomCell.player === undefined) {
            randomCell.player = player;
            assigned++;
        }
        }
    };
    assignRandomly(Player.Red, Math.floor(cols * 0.2));
    assignRandomly(Player.Blue, Math.floor(cols * 0.2));
    return newBoard;
};

export const redrawBoard = (board: Cell[], col: number, nextPlayer: Player): Cell[] => {
    const newBoard = board.map(cell => ({ ...cell }));
    newBoard[col].player = nextPlayer;
  
    const flipCells = (direction: number) => {
      const gapCells = [];
      for (let i = col + direction; i >= 0 && i < newBoard.length; i += direction) {
        if (newBoard[i].player !== nextPlayer) {
          gapCells.push(i);
        } else {
          const gapColors = gapCells.map(index => newBoard[index].player);
          if (gapColors.every(color => color === gapColors[0])) {
            gapCells.forEach(index => (newBoard[index].player = nextPlayer));
          }
          break;
        }
      }
    };
  
    flipCells(-1);
    flipCells(1);
    return newBoard;
};

export const checkWinner = (board: Cell[], currentPlayer: Player): Player | undefined => {
    const otherPlayer = currentPlayer === Player.Red ? Player.Blue : Player.Red;
    const existsOtherPlayer = board.some(cell => cell.player === otherPlayer);
    return existsOtherPlayer ? undefined : currentPlayer;
};