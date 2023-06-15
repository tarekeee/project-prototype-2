import shapesDrawer from "./shapesDrawer";

export default function drawShapes(ctx,shapes) {
    for (let i = 0 ; i< shapes.length;i++) {
        shapesDrawer(ctx,shapes[i]);
    }
}