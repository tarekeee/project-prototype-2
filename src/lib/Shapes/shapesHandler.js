class shape {
  constructor(type,fill,stroke) {
    this.type = type;
    this.fill= fill;
    this.stroke=stroke;
  }

  isInside({ clientX: x, clientY: y }) {
    switch (type) {
      case "rect":
        return (x - this.startX <= this.width && y - this.startY <= this.height);
        break;
    }
  }
}
class rect extends shape {
  constructor(startX, startY, width, height,fill,stroke) {
    super("rect",fill,stroke);
    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;
  }
}
class circle extends shape {
    constructor(cx,cy,rad,fill,stroke) {
        super("circle",fill,stroke);
        this.cx=cx;
        this.cy=cy;
        this.rad=rad;
    }
}
export default function shapesHandler(type, cords, shapes, fill,stroke, stillDrawing) {
  if (stillDrawing && shapes.length != 0) {
    switch (type) {
      case "rect":
        shapes[shapes.length - 1].stroke= stroke;
        shapes[shapes.length - 1].fill=fill;
        shapes[shapes.length - 1].startX = cords.startX;
        shapes[shapes.length - 1].startY = cords.startY;
        shapes[shapes.length - 1].width = cords.dx;
        shapes[shapes.length - 1].height = cords.dy;
        break;
      case "circle":
        shapes[shapes.length - 1].stroke= stroke;
        shapes[shapes.length - 1].fill=fill;
        shapes[shapes.length - 1].cx=cords.startX;
        shapes[shapes.length - 1].cy=cords.startY;
        shapes[shapes.length - 1].rad=Math.sqrt(cords.dx*cords.dx+cords.dy*cords.dy);
    }
  } else {
    switch (type) {
      case "rect":
        shapes.push(new rect(cords.startX, cords.startY, cords.dx, cords.dy,fill,stroke));
        break;
      case "circle":
        shapes.push(new circle(cords.startX,cords.startY,0,fill,stroke));
        break;
    }
  }
}
