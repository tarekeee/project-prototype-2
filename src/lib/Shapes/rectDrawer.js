export default function rectDrawer(ctx, startX,startY,width,height,fill,stroke) {
    ctx.fillStyle=fill;
    ctx.strokeStyle=stroke;
    ctx.fillRect(startX,startY,width,height);
    ctx.strokeRect(startX,startY,width,height);
}