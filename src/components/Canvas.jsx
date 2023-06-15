"use client";
import circleDrawer from "@/lib/Shapes/circleDrawer";
import drawShapes from "@/lib/Shapes/drawShapes";
import rectDrawer from "@/lib/Shapes/rectDrawer";
import shapesHandler from "@/lib/Shapes/shapesHandler";
import { draftMode } from "next/dist/client/components/headers";
import React, { useEffect, useRef, useState } from "react";

export const Canvas = () => {
  const canvasRef = useRef(null);
  const [cords, setCords] = useState({ startX: 0, startY: 0, dx: 0, dy: 0 });
  const [shapes, setShapes] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shape, setShape] = useState("rect");
  const [fill, setFill] = useState("#000000");
  const [stroke, setStroke] = useState("#000000");

  useEffect(() => {
    const currentShapes = shapes;
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = fill;

    const onMouseDown = (e) => {
      e.preventDefault();
      setIsClicked(true);
      setCords({
        startX: e.clientX - canvas.offsetLeft,
        startY: e.clientY - canvas.offsetTop,
        dx: 0,
        dy: 0,
      });
      console.log(cords)
      if (isDrawing) {
        shapesHandler(shape, cords, currentShapes, fill,stroke,false);
      }
    };
    const onMouseUp = (e) => {
      e.preventDefault();
      setIsClicked(false);
      console.log(currentShapes);
      // setIsDrawing(false);
    };
    const onMouseMove = (e) => {
      if (!isClicked) return;
      console.log(isDrawing)
      setCords((prevCords) => ({
        ...prevCords,
        dx: e.clientX - canvas.offsetLeft - prevCords.startX,
        dy: e.clientY - canvas.offsetTop - prevCords.startY,
      }));
      if (isDrawing) {
        shapesHandler(shape, cords, currentShapes, fill,stroke,true);
      }
      setShapes(currentShapes);
    };
    // if (isDrawing) {
    //   if (shape == "rect") {
    //     rectDrawer(ctx, cords.startX,cords.startY,cords.dx,cords.dy);
    //   } else {
    //     circleDrawer(ctx, cords);
    //   }
    // }
    drawShapes(ctx,currentShapes);

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", onMouseMove);
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [setIsClicked, isClicked, cords, setCords, rectDrawer,shapesHandler,shapes,setShapes,shape,setShape]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex">
      <input type="color" onChange={(e) => setFill(e.target.value)} />
      <input type="color" onChange={(e) => setStroke(e.target.value)} />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          height: "800px",
          width: "800px",
          border: "1px solid black",
          backgroundColor: "white",
          marginTop: "0px",
        }}
      >
        canvas
      </canvas>
      <div className="flex w-[800px] justify-center ">
        <button
          className="h-10 bg-blue-500 w-20 border-black"
          onClick={() => {
            setIsDrawing(true);
            setShape("rect");
          }}
        >
          rect
        </button>
        <button
          className="h-10 bg-blue-500 w-20 border-black border-l-2"
          onClick={() => {
            setIsDrawing(true);
            setShape("circle");
          }}
        >
          circle
        </button>
        <button className="h-10 bg-red-500 w-20 border-black border" onClick={()=>setShapes([])}>clear</button>
      </div>
    </div>
  );
};
