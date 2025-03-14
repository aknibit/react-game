import { useState } from "react";
import {
  Player,
  Cell,
  assignRandomPlayers,
  initializeBoard,
  redrawBoard,
  checkWinner,
} from "../utils/gameLogic";
import {
  boardCell,
  TurnIndicator,
  WinnerAnnouncement,
} from "@/components/partials";

export default function Home() {
  const [cols, setCols] = useState(10);
  const [nextPlayer, setNextPlayer] = useState<Player>();
  const [board, setBoard] = useState<Cell[]>([]);
  const [winner, setWinner] = useState<Player>();
  const isGameRunning = Boolean(nextPlayer) && !winner;
  const isGameOver = Boolean(winner);

  const resetGame = () => {
    setWinner(undefined);
    setNextPlayer(undefined);
    setBoard([]);
  };

  const newGame = () => {
    setWinner(undefined);
    if (cols > 200) {
      alert("The board is too big to be rendered on a single line");
      return;
    }
    if (cols < 5) {
      alert("There is not enough space for a fair game");
    }
    setNextPlayer(Math.random() > 0.5 ? Player.Red : Player.Blue);
    const emptyBoard = initializeBoard(cols);
    const initialBoard = assignRandomPlayers(emptyBoard, cols);
    setBoard(initialBoard);
  };

  const executeMove = (col: number) => {
    if (isGameOver || !nextPlayer) return;
    if (board[col].player === nextPlayer) {
      alert("You can't move to your own cell");
      return;
    }
    const updatedBoard = redrawBoard(board, col, nextPlayer);
    setBoard(updatedBoard);

    const winningPlayer = checkWinner(updatedBoard, nextPlayer);
    if (winningPlayer) {
      setWinner(nextPlayer);
      setNextPlayer(undefined);
    } else {
      setNextPlayer((val) => (val === Player.Red ? Player.Blue : Player.Red));
    }
  };

  return (
    <div className="holder">
      <section className="config-area">
        <input
          className="bg-gray-700 p-2"
          hidden={nextPlayer ? true : false}
          type="number"
          value={cols}
          onChange={(ev) => {
            setCols(Number(ev.target.value));
          }}
        />
        {isGameRunning && (
          <button
            className="bg-yellow-800 p-elm cursor-pointer"
            onClick={resetGame}
          >
            RESTART
          </button>
        )}
        {!isGameRunning && (
          <button
            className="bg-green-800 p-elm cursor-pointer"
            onClick={newGame}
          >
            START
          </button>
        )}
      </section>

      <section className="center flex w-full gap-1">
        {board.map((data, pos) => boardCell(data.player, pos, executeMove))}
      </section>

      <section>
        {isGameRunning && <TurnIndicator player={nextPlayer} />}
        {isGameOver && <WinnerAnnouncement winnner={winner} />}
      </section>
    </div>
  );
}
