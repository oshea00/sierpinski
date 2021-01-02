import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const canvasRef = useRef(null);
  const width = window.innerWidth - 100;
  const height = Math.floor(width / 2 - 100);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  return (
    <div className="App">
      <h1>Sierpinksi's Triangle</h1>
      <div className="canvas" style={{ width, height }}>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      <button
        className="go"
        onClick={(e) => {
          const ctx = canvasRef.current.getContext("2d");
          const pixel = ctx.createImageData(1, 1);
          pixel.data[0] = 0xff;
          pixel.data[1] = 0xff;
          pixel.data[2] = 0xff;
          pixel.data[3] = 0xff;
          let line = [];
          line[Math.floor(width / 2)] = 1;

          function nextGen() {
            let nextRow = [];
            for (let p = 1; p < width - 1; p++) {
              nextRow[p] = line[p - 1] ^ line[p + 1];
            }
            line = nextRow;
          }

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              if (line[x] === 1) {
                ctx.putImageData(pixel, x, y);
              }
            }
            nextGen();
          }
        }}
      >
        Draw
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
