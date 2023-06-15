import circleDrawer from "./circleDrawer";
import rectDrawer from "./rectDrawer";

export default function shapesDrawer(ctx,shape) {
    switch (shape.type) {
        case "rect":
            rectDrawer(ctx,shape.startX,shape.startY,shape.width,shape.height,shape.fill,shape.stroke);
        break;
        case "circle":
            circleDrawer(ctx,shape.cx,shape.cy,shape.rad,shape.fill,shape.stroke);
        break;
        
    }
}