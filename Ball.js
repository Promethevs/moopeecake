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

	/*
	 * this.collidedBrute = function(line) { return Math.sqrt((this.x -
	 * line.x_start) * (this.x - line.x_start) + (this.y - line.y_start) *
	 * (this.y - line.y_start)) + Math.sqrt((this.x - line.x_end) * (this.x -
	 * line.x_end) + (this.y - line.y_end) * (this.y - line.y_end)) >= Math
	 * .sqrt((line.x_start - line.x_end) * (line.x_start - line.x_end) +
	 * (line.y_start - line.y_end) (line.y_start - line.y_end) - 12) &&
	 * Math.sqrt((this.x - line.x_start) * (this.x - line.x_start) + (this.y -
	 * line.y_start) * (this.y - line.y_start)) + Math.sqrt((this.x -
	 * line.x_end) (this.x - line.x_end) + (this.y - line.y_end) (this.y -
	 * line.y_end)) <= Math .sqrt((line.x_start - line.x_end) (line.x_start -
	 * line.x_end) + (line.y_start - line.y_end) (line.y_start - line.y_end) +
	 * 12);
	 *  };
	 */

	this.collidedBrute = function(line) {

		var x1 = line.x_start;
		var y1 = line.y_start;
		var x2 = line.x_end;
		var y2 = line.y_end;
		var x3 = this.x;
		var y3 = this.y;
		var x4 = this.x + this.speed.x;
		var y4 = this.y + this.speed.y;
		var temp1 = ((y2 - y1) * (x3 - x1) - (x2 - x1) * (y3 - y1))
				* ((y2 - y1) * (x4 - x1) - (x2 - x1) * (y4 - y1));
		var temp2 = ((y4 - y3) * (x1 - x3) - (y1 - y3) * (x4 - x3))
				* ((y4 - y3) * (x2 - x3) - (y2 - y3) * (x4 - x3));
		if (temp1 < 0 && temp2 < 0)
			return true;
		else
			return false;

	}

	this.reflect = function(line) {

		soundReflect();
		var lineGenAng = Math.atan2(line.getYEnd() - line.getYStart(), line
				.getXEnd()
				- line.getXStart())
				+ Math.PI;

		var speedGenAng = Math.atan2(this.speed.y, this.speed.x) + Math.PI;
		var speedLineAng = speedGenAng - lineGenAng;

		var resLineAng;
		if (speedLineAng < Math.PI)
			resLineAng = Math.PI - speedLineAng;
		else
			resLineAng = 3 * Math.PI - speedLineAng;
		var resGenAng = resLineAng + lineGenAng;

		var speedDist = distanceVect(this.speed.x, this.speed.y)
		this.speed.x = speedDist * Math.cos(resGenAng);
		this.speed.y = speedDist * Math.sin(resGenAng);

		animations.enqueue(new Animation(this.x, this.y, speedDist * 5,
				this.color));
		soundReflect(speedLineAng);

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
		ctx.strokeStyle = "#fff";
		ctx.stroke();
	};

}