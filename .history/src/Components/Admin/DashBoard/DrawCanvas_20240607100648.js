import React, { useEffect, useState } from "react";

function DrawCanvas() {
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    // Thực hiện vẽ hình trước khi component render
    context.fillStyle = "red";
    context.fillRect(0, 0, 100, 100);

    setCtx(context);
  }, []);

  return (
    <div>
      <canvas id="myCanvas" width="200" height="200" />
      <button
        onClick={() => {
          if (ctx) {
            // Vẽ hình sau khi component đã render
            ctx.fillStyle = "blue";
            ctx.fillRect(100, 100, 100, 100);
          }
        }}
      >
        Draw on Canvas
      </button>
    </div>
  );
}

export default DrawCanvas;
