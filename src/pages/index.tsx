import { useState } from "react";

enum Player {
  Red = "red",
  Blue = "blue",
}

export default function Home() {
  const [cols, setCols] = useState(10);
  const [nextPlayer, setNextPlayer] = useState<Player>();

  const startGame = () => {
    if (nextPlayer) {
      setNextPlayer(undefined);
    } else {
      setNextPlayer(Math.random() > 0.5 ? Player.Red : Player.Blue);
    }
  };

  const executeMove = (col: number) => {
    console.log(nextPlayer, "clicked", col);
    const nextOne = nextPlayer === Player.Red ? Player.Blue : Player.Red;
    setNextPlayer(nextOne);
  };

  return (
    <div className="bg-gray-900 grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <section className="flex gap-2 items-center sm:items-start">
        <input
          className="bg-gray-700 p-2"
          hidden={nextPlayer ? true : false}
          type="number"
          placeholder="cols"
          value={cols}
          onChange={(ev) => {
            setCols(Number(ev.target.value));
          }}
        />
        <button className="bg-green-800 py-2 px-4" onClick={startGame}>
          {nextPlayer ? "RESTART" : "START"}
        </button>
      </section>

      <section className="center">
        <div className="flex gap-1">
          {nextPlayer &&
            Array.from({ length: cols }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 h-12 w-12 flex items-center justify-center text-white"
                onClick={() => {
                  executeMove(i);
                }}
              ></div>
            ))}
        </div>
      </section>

      <section>
        {nextPlayer && (
          <div
            className={`${nextPlayer === "red" ? "bg-red-800/30" : "bg-blue-800/30"} py-2 px-4`}
          >
            <p>
              Turn for{" "}
              <span
                className={`${nextPlayer === "red" ? "text-red-400" : "text-blue-400"} font-bold`}
              >
                {nextPlayer}{" "}
              </span>
              team
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
