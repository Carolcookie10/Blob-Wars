import React from "react";

export default function Tile(props) {
  //   console.log(props.x, props.y, props.z);
  let x = (7 - props.x + props.y) * 6.25; // 2d coordinates to isometric coords
  let y = (14 - props.x - props.y) * 6.25;

  const blbColour = () => {
    switch (props.colour) {
      case 1:
        return "red";
      case 2:
        return "blue";
      case 3:
        return "yellow";
      case 4:
        return "green";
      default:
        return "white";
    }
  };

  return (
    // <button style={{ position: "absolute", left: props.x, top: props.y }}>
    //   test
    // </button> style="stroke:

    <svg
      viewBox="0 0 40 20"
      width="12.5%"
      style={{ position: "absolute", left: x + "%", top: y + "%" }}
      pointerEvents="none" // prevents bounding box blocking clicks
    >
      <path
        d="M 20 0 L 0 10 L 20 20 L 40 10 Z"
        fill={
          props.slctd.includes(props.pos)
            ? props.slctd2.includes(props.pos)
              ? "rgb(" + (100 - 2 * y) + ",150,10)"
              : "rgb(" + (125 - 2 * y) + ",175,35)"
            : "rgb(" + (150 - 2 * y) + ",200,60)"
        } // gives the tiles a nice gradient
        stroke={"rgb(0,50,0)"}
        strokeWidth={0.5}
        onClick={() => {
          props.tileClick();
        }}
        pointerEvents="visible" // allows for clicks within the actual svg
        paintOrder="strokes" // renders outlines on top
      ></path>

      {props.colour && (
        <circle
          stroke="black"
          fill={blbColour()} // blob colour
          cx="20"
          cy="5"
          r="9"
          pointerEvents="visible"
          onClick={props.blbClick}
        />
      )}
    </svg>
  );
}
