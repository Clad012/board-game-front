import React, { useState, useEffect } from "react";
import ActionBar from "./ActionBar/ActionBar";
import Card from "react-bootstrap/Card";
import NodeComponent from "./Node/Node";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

interface Node {
  col: number;
  row: number;
  isWall: boolean;
  recentlyBuilt: boolean;
  isEndZone: boolean;
  isPlayer1: boolean;
  isPlayer2: boolean;
  tile: boolean;
  isTornadoX: boolean;
  isTornadoY: boolean;
  nextTornadoX: boolean;
  nextTornadoY: boolean;
}

interface NodeCoordinates {
  row: number;
  col: number;
}
const playerID = uuidv4();

export default function Grid() {

  const [socket, setSocket] = useState(
    io.connect("http://localhost:5000/", {
      transports: ["websocket", "polling"],
    })
  );

  const [grid, setGrid] = useState<Node[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [nbPlayer, setNbPlayer] = useState(0);
  const [nbTurns, setNbTurns] = useState(0);
  const [recentlyBuiltWalls, setRecentlyBuiltWalls] = useState<Node[]>([]);
  const [gridGenerated, setGridGenerated] = useState(false);
  const [actionsLeft, setActionsLeft] = useState(0);

  const [
    nextNodeCoordinates,
    setNextTornadoCoordiantes,
  ] = useState<NodeCoordinates>({ row: -1, col: -1 });

  const [tornadoPlaced, setTornadoPlaced] = useState(false);
  const [currentTornado, setCurrentTornado] = useState<NodeCoordinates>();

  const [tornadoList, setTornadoList] = useState<NodeCoordinates[]>([]);
  const [activeTornados, setActiveTornados] = useState<NodeCoordinates[]>([]);
  const player1X = 23;
  const player1Y = 1;
  const player2X = 1;
  const player2Y = 23;

  const [playerX, setPlayerX] = useState(player1X);
  const [playerY, setPlayerY] = useState(player1Y);

  const [opponentX, setOpponentX] = useState(player2X);
  const [opponentY, setOpponentY] = useState(player2Y);

  const [isPlayer1, setIsPlayer1] = useState(true);

  const maxGridX = 25;
  const maxGridY = 25;

  useEffect(() => {
    socket.emit(
      "leave-room",
      "36d2f9e5-d94f-44f6-a23a-2ab5350b9ce722321",
      playerID
    );
    setTimeout(() => {
      socket.emit(
        "join-room",
        "36d2f9e5-d94f-44f6-a23a-2ab5350b9ce722321",
        playerID
      );
    }, 2000);

    //on Player 1
    socket.on("player-connected", (userId: string) => {
      setNbPlayer(nbPlayer + 1);
      if (!gameStarted && isPlayer1) {
        setIsPlayer1(true);

        console.log("Player Joined: " + userId);
        socket.emit("game-ready", playerID, !isPlayer1, nbPlayer);
        generateMaze(getInitialGrid());
        // setTimeout(() => {
        //   setPlayerX(23);
        //   setPlayerY(1);
        //   setGameStarted(true);
        //   handleTurn();
        // }, 2000);
      }
    });

    //On Player 2
    socket.on(
      "game-ready",
      (userId: string, playerType: boolean, nbOfPlayers: number) => {
        setNbPlayer(nbOfPlayers + 1);

        console.log(playerType ? "Player 1" : "Player 2");
        if (!gameStarted) {
          console.log("Game is Ready");
          setIsPlayer1(false);
          generateMaze(getInitialGrid());
          // setTimeout(() => {
          //   setPlayerX(1);
          //   setPlayerY(23);
          //   setGameStarted(true);
          // }, 2000);
        }
      }
    );

    socket.on("turn-end", (nextTornado: NodeCoordinates) => {
      if (nextTornado && nextTornado.col !== -1) {
        setCurrentTornado(nextTornado);
      }
      setTornadoPlaced(false);
      handleTurn();
      // let timeout = nbTurns === 0 ? 2000 : 20;
      // setTimeout(() => {
      //   handleTurn();
      // }, timeout);
    });

    socket.on(
      "action-done",
      (newGrid: Node[][], otherPlayerX: number, otherPlayerY: number) => {
        console.log({ otherPlayerX, otherPlayerY });
        setOpponentX(otherPlayerX);
        setOpponentY(otherPlayerY);
        if (newGrid.length > 0) setGrid(newGrid);
      }
    );
  }, []);

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < maxGridX; row++) {
      const currentRow = [];
      for (let col = 0; col < maxGridY; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col: number, row: number) => {
    return {
      col,
      row,
      isWall: false,
      recentlyBuilt: false,
      isEndZone: false,
      isPlayer1: false,
      isPlayer2: false,
      tile: false,
      isTornadoX: false,
      isTornadoY: false,
      nextTornadoX: false,
      nextTornadoY: false,
    };
  };
  const toggleWall = (row: number, col: number) => {
    const newGrid: Node[][] = grid.slice();
    const node: Node = newGrid[row][col];
    if (!node.recentlyBuilt || !node.isWall) {
      newGrid[row][col].recentlyBuilt = !node.isWall;
      newGrid[row][col].isWall = !node.isWall;
      if (!node.isWall) newGrid[row][col].tile = !node.isWall;

      if (newGrid[row][col].recentlyBuilt) {
        var recentlyBuiltWallsArray: Node[] = recentlyBuiltWalls;
        recentlyBuiltWallsArray.push(node);
        setRecentlyBuiltWalls(recentlyBuiltWallsArray);
        console.log(recentlyBuiltWalls);
      }

      setActionsLeft(actionsLeft - 1);
      setGrid(newGrid);
    }
    if (node.isWall) {
      newGrid[row][col].tile = true;
    }
    return newGrid;
  };

  const clearRecentlyBuiltWalls = (newGrid: Node[][]) => {
    console.log({ recentlyBuiltWalls });
    console.log({ newGrid });
    if (recentlyBuiltWalls.length > 0 && newGrid.length > 0) {
      recentlyBuiltWalls.forEach((el: Node) => {
        newGrid[el.row][el.col].recentlyBuilt = false;
      });
      setRecentlyBuiltWalls([]);
      setGrid(newGrid);
      socket.emit("action-done", newGrid, playerX, playerY);
    }
  };
  //Genrate the Maze
  const generateMaze = (grid: Node[][]) => {
    const newGrid: Node[][] = grid.slice();
    let twoPercent = getPurcentage(maxGridX, 0.2);
    // let fourPercent = getPurcentage(maxGridX, 0.4);
    // let fivePercent = getPurcentage(maxGridX, 0.5);
    let sixPercent = getPurcentage(maxGridX, 0.6);
    let eightPercent = getPurcentage(maxGridX, 0.8);
    let ninePercent = getPurcentage(maxGridX, 0.9);
    let i: number, j: number;
    for (i = 0; i < maxGridX; i++) {
      for (j = 0; j < maxGridY; j++) {
        if (
          i === 0 ||
          j === maxGridY - 1 ||
          i === maxGridX - 1 ||
          j === 0 ||
          (i % 4 === 0 &&
            i !== twoPercent &&
            i !== 12 &&
            i !== eightPercent &&
            i !== sixPercent &&
            (j < 4 || j > 8) &&
            i !== maxGridX - 2) ||
          (j % 4 === 0 &&
            j !== 16 &&
            j !== ninePercent &&
            j !== eightPercent &&
            j !== twoPercent &&
            j !== maxGridY - 2) ||
          (j === 18 && i > 8 && i < 16) ||
          (i === 12 && j > 18 && i < 24) ||
          (i === 6 && j > 4 && j < 8) ||
          (i === 14 && j > 4 && j < 8) ||
          (i === 20 && j > 12 && j < 24) ||
          (j === 16 && i > 0 && i < 4) ||
          (j === 19 && i > 4 && i < 8) ||
          (j === 16 && i > 16 && i < 20) ||
          (j === 20 && i > 20 && i < 24) ||
          (j === 11 && i > 10 && i < 14) ||
          (j === 13 && i > 10 && i < 14)
        ) {
          // animateToggleWall(grid[i][j], j);

          if (newGrid[i] && newGrid[i][j]) {
            (function (i: number, j: number) {
              setTimeout(function () {
                newGrid[i][j].isWall = true;
                animateToggleWall(i, j);
                if (i === maxGridX - 1 && j === maxGridY - 1) {
                  setGridGenerated(true);
                  setGrid(newGrid);
                }
              }, (i + j) * 100);
            })(i, j);
          }
        }
      }
    }

    newGrid[player2X][player2Y].isPlayer2 = true;
    newGrid[player1X][player1Y].isPlayer1 = true;
    newGrid[12][12].isEndZone = true;
    newGrid[12][12].isWall = false;
    setGrid(newGrid);
  };

  useEffect(() => {
    if (isMyTurn) {
      if (currentTornado) {
        var tornados: NodeCoordinates[] = tornadoList.slice();
        tornados.push(currentTornado);
        setTornadoList(tornados);
      }

      clearRecentlyBuiltWalls(grid);
      console.log({ tornadoList });

      generateNextTornado();
      generateTornado();

      if (nbTurns > 0) clearTornado();
      socket.emit("action-done", grid, playerX, playerY);
      console.log({ nbTurns });
    }
  }, [isMyTurn]);
  useEffect(() => {
    if (tornadoPlaced) {
      let tornadosActive: NodeCoordinates[] = activeTornados.slice();
      if (currentTornado) {
        tornadosActive.push(currentTornado);
        setActiveTornados(tornadosActive);
      }
    }
  }, [tornadoPlaced]);

  useEffect(() => {
    if (gridGenerated) {
      if (isPlayer1) {
        setPlayerX(player1X);
        setPlayerY(player1Y);
        setOpponentX(player2X);
        setOpponentY(player2Y);
        setIsMyTurn(true);
        handleTurn();
      } else {
        setPlayerX(player2X);
        setPlayerY(player2Y);
        setOpponentX(player1X);
        setOpponentY(player1Y);
        setIsMyTurn(false);
      }
      setGameStarted(true);
    }
  }, [gridGenerated]);

  // const randomNumber = (min: number, max: number, iter: number) => {
  //   let randomArray: Array<number> = [];
  //   let i: number = 0;
  //   for (i = 0; i < iter; i++) {
  //     let randomNb = Math.trunc(Math.random() * (max - min) + min);
  //     randomArray.push(randomNb);
  //   }
  //   return randomArray;
  // };
  const randomNumber = (min: number, max: number, isX: boolean = true) => {
    const chance: number = Math.random();
    if (chance > 0.4 && nbTurns > 0)
      if (isX) return opponentX;
      else return opponentY;
    return Math.trunc(Math.random() * (max - min) + min);
  };
  const getPurcentage = (value: number, purcent: number) => {
    return Math.trunc(value * purcent);
  };
  const animateToggleWall = (row: number, col: number) => {
    if (`node-${row}-${col}` !== "node-12-12") {
      let node = document.getElementById(`node-${row}-${col}`);
      if (node) node.classList.add("node-wall");
    }
  };

  //TurnManagment

  const checkMovement = (direction: string) => {
    if (grid.length > 0 && actionsLeft > 0 && isMyTurn)
      switch (direction) {
        case "up":
          if (
            !grid[playerX - 1][playerY].isWall ||
            grid[playerX - 1][playerY].isEndZone
          ) {
            movePlayer(playerX - 1, playerY);
          }

          break;
        case "down":
          if (
            !grid[playerX + 1][playerY].isWall ||
            grid[playerX - 1][playerY].isEndZone
          ) {
            movePlayer(playerX + 1, playerY);
          }

          break;

        case "right":
          if (
            !grid[playerX][playerY + 1].isWall ||
            grid[playerX - 1][playerY].isEndZone
          ) {
            movePlayer(playerX, playerY + 1);
          }

          break;

        case "left":
          if (
            !grid[playerX][playerY - 1].isWall ||
            grid[playerX - 1][playerY].isEndZone
          ) {
            movePlayer(playerX, playerY - 1);
          }

          break;
      }
  };
  const movePlayer = (x: number, y: number, action: number = 1) => {
    if (x < maxGridX && y < maxGridY && x >= 0 && y >= 0) {
      const newGrid: Node[][] = grid.slice();
      if (isPlayer1) {
        newGrid[playerX][playerY].isPlayer1 = false;
        newGrid[x][y].isPlayer1 = true;
      } else {
        newGrid[playerX][playerY].isPlayer2 = false;
        newGrid[x][y].isPlayer2 = true;
      }
      console.log(newGrid[playerX][playerY]);
      setActionsLeft(actionsLeft - action);
      setPlayerX(x);
      setPlayerY(y);
      console.log("Moving...");
      setGrid(newGrid);
      if (newGrid[x][y].isEndZone) {
        alert("You've WON!");
        socket.emit("action-done", newGrid, x, y);
      } else {
        handleEndTurn(x, y);
      }
    }
  };

  const handleTurn = () => {
    setActionsLeft(3);
    setIsMyTurn(true);
  };
  const handleEndTurn = (x: number = playerX, y: number = playerY) => {
    socket.emit("action-done", grid, x, y);
    setTimeout(() => {
      if (actionsLeft - 1 === 0) {
        checkTornadoHit(x, y);

        setIsMyTurn(false);
        setNbTurns(nbTurns + 1);
        socket.emit("turn-end", nextNodeCoordinates);
        console.log("Turn Ended");

        // resetTornadoAnimation();
      }
    }, 500);
  };

  const checkTornadoHit = (x: number, y: number) => {
    if (grid[x][y].isTornadoX || grid[x][y].isTornadoY) {
      const newGrid: Node[][] = grid.slice();
      if (isPlayer1) {
        newGrid[x][y].isPlayer1 = false;
        newGrid[player1X][player1Y].isPlayer1 = true;
      } else {
        newGrid[x][y].isPlayer2 = false;
        newGrid[player2X][player2Y].isPlayer2 = true;
      }
      console.log(newGrid[playerX][playerY]);
      setPlayerX(isPlayer1 ? player1X : player2X);
      setPlayerY(isPlayer1 ? player1Y : player2Y);
      console.log("Moving...");
      setGrid(newGrid);
      socket.emit("action-done", newGrid, x, y);
    }
  };

  // Events handling
  const handleMouseDown = (row: number, col: number) => {
    setMouseIsPressed(true);
    if (actionsLeft > 0 && isMyTurn) {
      console.log(grid[row][col]);
      toggleWall(row, col);
      console.log(grid[row][col]);
      resetTornadoAnimation();
      handleEndTurn();
    }
  };

  const generateNextTornado = () => {
    const row = randomNumber(1, 22, true);
    const col = randomNumber(1, 22, false);

    console.log({ row, col });
    if (row != -1 && col != -1) {
      const newGrid: Node[][] = grid.slice();
      console.log("------- Next Created -------");

      for (let i = 0; i < maxGridX; i++) {
        if (!newGrid[i][col].isEndZone) newGrid[i][col].nextTornadoX = true;
      }
      for (let i = 0; i < maxGridY; i++) {
        if (!newGrid[i][col].isEndZone) newGrid[row][i].nextTornadoY = true;
      }
      // var tornados: NodeCoordinates[] = tornadoList;
      // tornados.push(nextNodeCoordinates);
      // setTornadoList(tornados);
      setNextTornadoCoordiantes({
        row: row,
        col: col,
      });
      setGrid(newGrid);
    }
  };

  const generateTornado = () => {
    var tornados: NodeCoordinates[] = tornadoList.slice();
    const varTornado = currentTornado;
    if (varTornado) {
      const newGrid: Node[][] = grid.slice();
      const tornadoX = varTornado.row;
      const tornadoY = varTornado.col;
      console.log({ varTornado });
      console.log("-------Tornado Created & Next Removed -------");
      for (let i = 0; i < maxGridX; i++) {
        if (!newGrid[i][tornadoY].isEndZone) {
          newGrid[i][tornadoY].nextTornadoX = false;
          newGrid[i][tornadoY].isTornadoX = true;
        }
      }
      for (let i = 0; i < maxGridY; i++) {
        if (!newGrid[tornadoX][i].isEndZone) {
          newGrid[tornadoX][i].nextTornadoY = false;
          newGrid[tornadoX][i].isTornadoY = true;
        }
      }
      // setTornadoList(tornados);
      setGrid(newGrid);
      // setCurrentTornado(varTornado);
      setTornadoPlaced(true);
    }
  };
  const clearTornado = () => {
    var tornadosActive: NodeCoordinates[] = activeTornados.slice();
    const varTornado = tornadosActive.shift();
    if (varTornado && varTornado.row !== -1) {
      const newGrid: Node[][] = grid.slice();
      const tornadoX = varTornado.row;
      const tornadoY = varTornado.col;

      const nextTornado = currentTornado;
      if ((nextTornado && nextTornado.col !== tornadoY) || !nextTornado)
        for (let i = 0; i < maxGridX; i++) {
          if (!newGrid[i][tornadoY].isEndZone) {
            newGrid[i][tornadoY].isTornadoX = false;
            newGrid[i][tornadoY].nextTornadoX = false;
          }
        }
      if ((nextTornado && nextTornado.row !== tornadoX) || !nextTornado)
        for (let i = 0; i < maxGridY; i++) {
          if (!newGrid[tornadoX][i].isEndZone) {
            newGrid[tornadoX][i].isTornadoY = false;
            newGrid[tornadoX][i].nextTornadoY = false;
          }
        }
      setGrid(newGrid);
      setActiveTornados(tornadosActive);
      console.log({ tornadosActive: tornadosActive });
    }
  };

  const resetTornadoAnimation = () => {
    var el = document.querySelectorAll(".tornado-class-y");
    if (el) {
      el.forEach((x) => {
        if (x.classList.contains("tornado-y")) {
          x.classList.remove("tornado-y");
          void (x as HTMLElement).offsetWidth;
          x.classList.add("tornado-y");
        } else if (x.classList.contains("next-tornado-y")) {
          x.classList.remove("next-tornado-y");
          void (x as HTMLElement).offsetWidth;
          x.classList.add("next-tornado-y");
        }
      });
    }
    var el = document.querySelectorAll(".tornado-class-x");
    if (el) {
      el.forEach((x) => {
        if (x.classList.contains("tornado-x")) {
          x.classList.remove("tornado-x");
          void (x as HTMLElement).offsetWidth;
          x.classList.add("tornado-x");
        } else if (x.classList.contains("next-tornado-x")) {
          x.classList.remove("next-tornado-x");
          void (x as HTMLElement).offsetWidth;
          x.classList.add("next-tornado-x");
        }
      });
    }
  };
  // const handleMouseEnter = (row: number, col: number) => {
  //   if (!mouseIsPressed) return;
  //   const newGrid = toggleWall(grid, row, col);
  //   setGrid(newGrid);
  // };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };
  return (
    <>
      <ActionBar
        checkMovement={checkMovement}
        actionsLeft={actionsLeft}
        isPlayer1={isPlayer1}
      />
      <Card className="mt-2">
        <Card.Body>
          <div>
            <table className="board" id="board">
              <tbody>
                {grid.map((row: Array<Node>, rowIdx) => {
                  return (
                    <tr key={rowIdx}>
                      {row.map((node: Node, nodeIdx: number) => {
                        const {
                          row,
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
                        } = node;
                        return (
                          <NodeComponent
                            key={nodeIdx}
                            col={col}
                            isWall={isWall}
                            isEndZone={isEndZone}
                            isPlayer1={isPlayer1}
                            isPlayer2={isPlayer2}
                            recentlyBuilt={recentlyBuilt}
                            tile={tile}
                            isTornadoX={isTornadoX}
                            isTornadoY={isTornadoY}
                            nextTornadoX={nextTornadoX}
                            nextTornadoY={nextTornadoY}
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown={(row: number, col: number) =>
                              handleMouseDown(row, col)
                            }
                          
                            // onMouseEnter={(row: number, col: number) =>
                            //   handleMouseEnter(row, col)
                            // }
                            onMouseUp={() => handleMouseUp()}
                            row={row}
                          ></NodeComponent>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
