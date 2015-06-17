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
	this.radius = 6;
	/**
	 * speed vector
	 */
	this.speed = {
		x : 0,
		y : 0
	};

	/**
	 * move ball by one iteration off speed vector
	 */
	this.move = function() {

		for (var i = 0; i < lines.length; i++)
			if (this.collidedBrute(lines[i])) {
				this.reflect(lines[i]);
			}

		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	/**
	 * apply gravity on a Ball
	 */
	this.gravity = function() {
		this.speed.y += gravity;
	};

	this.collidedBrute = function(line) {
		return Math.sqrt((this.x - line.x_start) * (this.x - line.x_start)
				+ (this.y - line.y_start) * (this.y - line.y_start))
				+ Math.sqrt((this.x - line.x_end) * (this.x - line.x_end)
						+ (this.y - line.y_end) * (this.y - line.y_end)) >= Math
				.sqrt((line.x_start - line.x_end) * (line.x_start - line.x_end)
						+ (line.y_start - line.y_end)
						* (line.y_start - line.y_end) - 12)
				&& Math.sqrt((this.x - line.x_start) * (this.x - line.x_start)
						+ (this.y - line.y_start) * (this.y - line.y_start))
						+ Math.sqrt((this.x - line.x_end)
								* (this.x - line.x_end) + (this.y - line.y_end)
								* (this.y - line.y_end)) <= Math
						.sqrt((line.x_start - line.x_end)
								* (line.x_start - line.x_end)
								+ (line.y_start - line.y_end)
								* (line.y_start - line.y_end) + 12);

	};

	this.reflect = function(line) {

		var xEnd = this.x;
		var yEnd = this.y;

		var xStart = this.x - this.speed.x;
		var yStart = this.y - this.speed.y;
		
		var vect = new Line(xStart, yStart, xEnd, yEnd);
		
		var cosa = cos(line, vect);

		this.speed.x = distanceLine(vect) * cosa;
		var sina = Math.sqrt(1 - cosa * cosa);
		if(this.speed.y>0)
			this.speed.y = -1 * distanceLine(vect) * sina;
		else
			this.speed.y = distanceLine(vect) * sina;
			
	}

	/**
	 * draw a ball
	 */
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	};
}