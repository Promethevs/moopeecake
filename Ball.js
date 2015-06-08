/**
 * 
 */

var freeId = 0;

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 10;
	this.speed = {x:0, y:0};
	this.id = freeId++;
	
	this.move = function() {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	this.gravity = function() {
		this.speed.y+=gravity;
	};
	
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = "black";
	    ctx.fill();
	    ctx.font = "18px serif";
		ctx.fillText(this.id, this.x + this.radius, this.y - this.radius);
	};
}