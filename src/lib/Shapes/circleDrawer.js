export default function circleDrawer(ctx,cx,cy,rad,fill,stroke) {
    ctx.fillStyle=fill;
    ctx.strokeStyle=stroke;
    ctx.beginPath();
    ctx.arc(cx,cy,rad,0,2*Math.PI)
    ctx.stroke();
    ctx.fill();
}