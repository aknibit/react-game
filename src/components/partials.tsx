import { Player } from "../utils/gameLogic";

export const boardCell = (
  player: Player | undefined,
  pos: number,
  callback: (pos: number) => void,
) => {
  return (
    <div
      key={pos}
      className={`
        ${player === "red" && "bg-red-800"}
        ${player === "blue" && "bg-blue-800"}
        ${player === undefined && "bg-gray-800"}
        flex-1 h-12 cursor-pointer
      `}
      onClick={() => {
        callback(pos);
      }}
    />
  );
};

export const TurnIndicator = ({ player }: { player: Player | undefined }) => {
  return (
    <div className={`${player === "red" ? "bg-red" : "bg-blue"} p-elm`}>
      <p>
        Turn for{" "}
        <span
          className={`${
            player === "red" ? "text-red-400" : "text-blue-400"
          } font-bold`}
        >
          {player}{" "}
        </span>
        team
      </p>
    </div>
  );
};

export const WinnerAnnouncement = ({
  winnner,
}: {
  winnner: Player | undefined;
}) => {
  return (
    <div className={`${winnner === "red" ? "bg-red" : "bg-blue"} p-elm`}>
      <p>
        🎉 Winner is{" "}
        <span
          className={`${
            winnner === "red" ? "text-red-400" : "text-blue-400"
          } font-bold`}
        >
          {winnner}{" "}
        </span>
        team
      </p>
    </div>
  );
};
