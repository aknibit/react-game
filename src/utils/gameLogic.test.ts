import { initializeBoard, assignRandomPlayers, redrawBoard, checkWinner, Player, Cell } from './gameLogic';

describe('gameLogic.ts', () => {

  test('create board', () => {
    const board = initializeBoard(5);
    expect(board).toHaveLength(5);
    board.forEach(cell => expect(cell.player).toBeUndefined());
  });

  test('20% board assignation to each player (with 5 columns)', () => {
    const cols = 5;
    const board = initializeBoard(cols);
    const newBoard = assignRandomPlayers(board, cols);

    const redCount = newBoard.filter(cell => cell.player === Player.Red).length;
    const blueCount = newBoard.filter(cell => cell.player === Player.Blue).length;

    expect(redCount).toBe(Math.floor(cols * 0.2));
    expect(blueCount).toBe(Math.floor(cols * 0.2));
  });

  test('20% board assignation to each player (with 40 columns)', () => {
    const cols = 50;
    const board = initializeBoard(cols);
    const newBoard = assignRandomPlayers(board, cols);

    const redCount = newBoard.filter(cell => cell.player === Player.Red).length;
    const blueCount = newBoard.filter(cell => cell.player === Player.Blue).length;

    expect(redCount).toBe(Math.floor(cols * 0.2));
    expect(blueCount).toBe(Math.floor(cols * 0.2));
  });

  test('redraw cells correctly left to right', () => {
    const testBoard: Cell[] = [
      { player: Player.Red },
      { player: Player.Blue },
      { player: Player.Blue },
      { player: undefined },
      { player: Player.Red },
    ];

    const col = 3;
    const resultBoard = redrawBoard(testBoard, col, Player.Red);

    expect(resultBoard[col].player).toBe(Player.Red);
    expect(resultBoard[1].player).toBe(Player.Red);
    expect(resultBoard[2].player).toBe(Player.Red);
  });

  test('avoid moving to own cell', () => {
    const testBoard: Cell[] = [
      { player: Player.Red },
      { player: Player.Blue },
      { player: Player.Blue },
      { player: undefined },
      { player: Player.Red },
    ];

    const col = 0;
    const resultBoard = redrawBoard(testBoard, col, Player.Red);

    expect(resultBoard).toEqual(testBoard);
  });

  test('no filling gaps if there are mixtures of colors between your cells', () => {
    const testBoard: Cell[] = [
      { player: Player.Blue },
      { player: Player.Red },
      { player: undefined },
      { player: Player.Red }
    ];

    const col = 3;
    const resultBoard = redrawBoard(testBoard, col, Player.Blue);

    expect(resultBoard[col].player).toBe(Player.Blue);
    expect(resultBoard[1].player).toBe(Player.Red);
    expect(resultBoard[2].player).toBeUndefined();
  });

  test('no filling gaps if your color is not found left or right', () => {
    const testBoard: Cell[] = [
      { player: Player.Red },
      { player: undefined },
      { player: undefined },
      { player: undefined },
      { player: Player.Red },
      { player: undefined }
    ];

    const col = 2;
    const resultBoard = redrawBoard(testBoard, col, Player.Blue);
    const blueCount = resultBoard.filter(cell => cell.player === Player.Blue).length;

    expect(blueCount).toBe(1);
  });

  test('checkWinner returns undefined if game continues', () => {
    const board: Cell[] = [
      { player: Player.Red },
      { player: Player.Blue },
      { player: undefined },
    ];

    const col = 2;
    const resultBoard = redrawBoard(board, col, Player.Blue);

    expect(checkWinner(resultBoard, Player.Red)).toBeUndefined();
    expect(checkWinner(resultBoard, Player.Blue)).toBeUndefined();
  });

  test('checkWinner correctly identifies winner', () => {
    const board: Cell[] = [
      { player: Player.Red },
      { player: Player.Blue },
      { player: undefined },
    ];

    const col = 2;
    const resultBoard = redrawBoard(board, col, Player.Red);

    expect(checkWinner(resultBoard, Player.Red)).toBe(Player.Red);
  });

});