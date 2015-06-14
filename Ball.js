/**
 * Ball object
 */

/**
 * Ball constructor
 */
function Ball(x, y) {
	/**
	 * x coord
	 */
	this.x = x;
	/**
	 * y coord
	 */
	this.y = y;
	/**
	 * color of the Ball
	 */
	this.color = getRandomColor();
	/**
	 * radius of the Ball
	 */
	this.radius = 10;
	/**
	 * speed vector
	 */
	this.speed = {x:0, y:0};
	
	/**
	 * move ball by one iteration off speed vector 
	 */
	this.move = function() {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	/**
	 * apply gravity on a Ball
	 */
	this.gravity = function() {
		this.speed.y+=gravity;
	};
	
	/**
	 * draw a ball
	 */
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.font = "18px serif";
		ctx.fillText(this.id, this.x + this.radius, this.y - this.radius);
	};
}