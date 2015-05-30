/**
 * 
 */

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 10;
	this.speed = {x:0, y:0};
	
	this.move = function() {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	this.gravity = function(n) {
		this.speed.y+=n;
	};
	
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = "black";
	    ctx.fill();
	};
}