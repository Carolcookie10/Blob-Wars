import React, { useState } from "react";
import Board from "./Board";

export default function Game(props) {
  const players = props.playerNames.length;

  const template = Array.from(Array(8), (_) => Array(8).fill(0));
  template[0][0] = 1;
  template[7][0] = 2;
  if (players > 2) {
    template[7][7] = 3;
    if (players > 3) {
      template[0][7] = 4;
    }
  } else {
    template[0][7] = 1;
    template[7][7] = 2;
  }

  const [tiles, setTiles] = useState(template.map((arr) => arr.slice()));
  const [slctd, setSlctd] = useState([]); // selected tiles 2 tiles away
  const [slctd2, setSlctd2] = useState([]); // selected tiles next to blob
  const [player, setPlayer] = useState(1);
  const [currX, setCurrX] = useState(0);
  const [currY, setCurrY] = useState(0);
  const [Scores, setScores] = useState([1, 1, 1, 1]);

  console.log(props.playerNames);

  function handleBlobClick(colour, x1, y1) {
    const newSlctd = [];
    const newSlctd2 = [];

    for (let x = x1 - 2; x < x1 + 3; x++) {
      for (let y = y1 - 2; y < y1 + 3; y++) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
          tiles[x][y] || newSlctd.push(y * 8 + x); // selects empty tiles only
        }
      }
    }
    for (let x = x1 - 1; x < x1 + 2; x++) {
      for (let y = y1 - 1; y < y1 + 2; y++) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
          tiles[x][y] || newSlctd2.push(y * 8 + x);
        }
      }
    }
    setSlctd(newSlctd);
    setSlctd2(newSlctd2);
    setCurrX(x1);
    setCurrY(y1);
  }

  function handleTileClick(x2, y2, double) {
    const newTiles = [...tiles];
    const newScores = [...Scores];
    for (var x = x2 - 1; x < x2 + 2; x++) {
      for (var y = y2 - 1; y < y2 + 2; y++) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
          if (newTiles[x][y] && newTiles[x][y] !== player) {
            newScores[newTiles[x][y] - 1] = newScores[newTiles[x][y] - 1] - 1;
            newTiles[x][y] = player;
            newScores[player - 1] = newScores[player - 1] + 1;
          } // selects empty tiles only}
        }
      }
    }
    newTiles[x2][y2] = player;
    console.log(double, currX, currY);
    if (!double) {
      newTiles[currX][currY] = 0;
    } else {
      newScores[player - 1] = newScores[player - 1] + 1;
      console.log(player - 1);
    }
    setTiles(newTiles);
    setSlctd([]);
    setSlctd2([]);
    setScores(newScores);
    setPlayer(player >= players ? 1 : player + 1);
  }

  function skip() {
    setPlayer(player >= players ? 1 : player + 1);
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
        {"Player: " + props.playerNames[player - 1]}
      </h1>
      {props.playerNames.map((name, player) => (
        <h4 style={{ display: "inline", padding: 20 }}>
          {name + ": " + Scores[player]}
        </h4>
      ))}
      <button style={{ display: "inline", padding: 10 }} onClick={skip}>
        skip turn
      </button>
      <Board
        tiles={tiles}
        handleBlobClick={handleBlobClick}
        handleTileClick={handleTileClick}
        player={player}
        slctd={slctd}
        slctd2={slctd2}
      ></Board>
    </div>
  );
}
