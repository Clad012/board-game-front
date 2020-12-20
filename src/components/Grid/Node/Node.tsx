import React from "react";
import "./Node.css";
import "./Tornado.css";

interface NodeType {
  col: number;
  row: number;
  isWall: boolean;
  mouseIsPressed: boolean;
  recentlyBuilt: boolean;
  isEndZone: boolean;
  isPlayer1: boolean;
  isPlayer2: boolean;
  tile: boolean;
  isTornadoX: boolean;
  isTornadoY: boolean;
  nextTornadoX: boolean;
  nextTornadoY: boolean;
  isBonus: boolean;
  onMouseDown: (x: number, y: number) => void;
  onMouseUp: () => void;
}

export default function NodeComponent(props: NodeType) {
  // const [audio] = useState(new Audio("/sounds/destroy.wav"));
  // const [playing, setPlaying] = useState(false);
  // const toggle = () => setPlaying(!playing);
  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  // }, [playing]);

  const {
    col,
    isWall,
    recentlyBuilt,
    isEndZone,
    isPlayer1,
    isPlayer2,
    tile,
    isTornadoX,
    isTornadoY,
    nextTornadoX,
    nextTornadoY,
    onMouseDown,
    onMouseUp,
    row,
    isBonus,
  } = props;

  const classPlayer1 = isPlayer1 ? " player1" : "";
  const classPlayer2 = isPlayer2 ? " player2" : "";
  const wallClass =
    isWall && !isPlayer1 && !isPlayer2 ? " node-wall" : " square";
  const isEndZoneClass = isEndZone ? " end-zone" : "";
  const recentlyBuiltClass = recentlyBuilt ? " recently-built" : "";
  const bonusClass = isBonus ? " bonus" : "";
  const classTornadoX =
    isTornadoX && !isWall && !isPlayer1 && !isPlayer2 && !isBonus
      ? " tornado-x tornado-class-x"
      : "";
  const classTornadoY =
    isTornadoY && !isWall && !isPlayer1 && !isPlayer2 && !isBonus
      ? " tornado-y tornado-class-y"
      : "";
  const classNextTornadoX =
    nextTornadoX &&
    !isTornadoX &&
    !isTornadoY &&
    !isWall &&
    !isPlayer1 &&
    !isPlayer2 &&
    !isBonus
      ? " next-tornado-x tornado-class-x"
      : "";
  const classNextTornadoY =
    nextTornadoY &&
    !isTornadoY &&
    !isTornadoX &&
    !isWall &&
    !isPlayer1 &&
    !isPlayer2 &&
    !isBonus
      ? " next-tornado-y tornado-class-y"
      : "";
  const tileClass =
    !isWall &&
    !isEndZone &&
    !isPlayer1 &&
    !isPlayer2 &&
    !recentlyBuilt &&
    tile &&
    !isBonus
      ? " tile"
      : "";
  const bothTornados =
    ((nextTornadoX && isTornadoX) || (nextTornadoY && isTornadoY)) &&
    !isWall &&
    !isPlayer2 &&
    !isPlayer1 &&
    !recentlyBuilt &&
    !isBonus
      ? " both-tornados"
      : "";
  const extraClassName =
    wallClass +
    isEndZoneClass +
    recentlyBuiltClass +
    tileClass +
    classPlayer1 +
    classPlayer2 +
    classTornadoX +
    classTornadoY +
    classNextTornadoX +
    classNextTornadoY +
    bothTornados +
    bonusClass;

  // const extraClassName = isEndZone
  //   ? "end-zone"
  //   : recentlyBuilt
  //   ? "recently-built"
  //   : isWall && !isEndZone
  //   ? "node-wall"
  //   : isPlayer1
  //   ? "player1"
  //   : isPlayer2
  //   ? "player2"
  //   : "tile";

  return (
    <td
      id={`node-${row}-${col}`}
      className={`node${extraClassName}`}
      onMouseDown={() => {
        onMouseDown(row, col);
      }}
      onMouseUp={() => onMouseUp()}
    ></td>
  );
}
