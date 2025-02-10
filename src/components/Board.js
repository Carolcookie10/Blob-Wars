import React from "react";
import Tile from "./Tile";

export default function Board(props) {
  // let tilemap = ;

  return (
    <div
      style={{
        width: "80%",
        aspectRatio: 2,
        border: "solid blue",
        background: "black",
        position: "relative",
        margin: "auto",
      }}
    >
      {props.tiles.map((row, x) =>
        row.map((colour, y) => (
          <Tile
            key={y * 8 + x}
            pos={y * 8 + x}
            x={x}
            y={y}
            colour={colour}
            slctd={props.slctd}
            slctd2={props.slctd2}
            tileClick={(colour) => {
              //prettier-ignore
              props.slctd.includes(y * 8 + x) // decides wether to use dark tile behaviour
                  ? props.handleTileClick(x,y,props.slctd2.includes(y * 8 + x)
                    )
                  : console.log("not selected");
            }}
            blbClick={(colour) => {
              props.player === props.tiles[x][y]
                ? props.handleBlobClick(props.tiles[x][y], x, y)
                : console.log("wrong blob");
            }}
          />
        ))
      )}
    </div>
  );
}
