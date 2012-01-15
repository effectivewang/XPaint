CanvasRenderingContext2D.prototype.ellipse = function (x, y, w, h) {
    var ctx = this;

    var kappa = .5522848;
    ox = (w / 2) * kappa,       // control point offset horizontal
          oy = (h / 2) * kappa, // control point offset vertical
          xe = x + w,           // x-end
          ye = y + h,           // y-end
          xm = x + w / 2,       // x-middle
          ym = y + h / 2;       // y-middle

    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
}

CanvasRenderingContext2D.prototype.heart = function (x, y, w, h) {
    /*
    Circle 1 , Circle 2
      Curve 1, Curve 2
*/
    var center1 = { x: x - w / 2, y: y - h * 0.25 };
    var center2 = { x: x + w / 2, y: y - h * 0.25 };
    var radius = w / 4;

    // Draw circles upside
    this.moveTo(center1.x, center1.y);
    this.arc(center1.x, center1.y, radius, 0, Math.PI);
    this.moveTo(center2.x, center2.y);
    this.arc(center2.x, center2.y, radius, 0, Math.PI);

    // Draw

}

CanvasRenderingContext2D.prototype.circle = function (lastPos, curPos) {
    var x = (lastPos.x + curPos.x) / 2;
    var y = (lastPos.y + curPos.y) / 2;

    var radius = getDistance(lastPos, curPos) / 2;

    this.arc(x, y, radius, 0, Math.PI * 2);
}

CanvasRenderingContext2D.prototype.polygon = function (sides, x, y, w, h) {

}
