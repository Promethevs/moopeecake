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

	this.collidedBruteNotWorking = function(line) {

		var x1 = line.getXStart();
		var y1 = line.getYStart();

		var x2 = line.getXEnd();
		var y2 = line.getYEnd();

		return Math.abs((this.x - x1) / (x2 - x1) - (this.y - y1) / (y2 - y1)) == 0;
	}

	this.reflect = function(line) {

		var lineGenAng = Math.atan2(line.getYEnd() - line.getYStart(),
				line.getXEnd() - line.getXStart()) + Math.PI;
		
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

/*		ctx.beginPath();
		ctx.moveTo(100, this.y);
		ctx.lineTo(700, this.y);

		ctx.moveTo(this.x, 50);
		ctx.lineTo(this.x, 400);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(this.x, this.y, 20, 0, lineGenAng, true);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(this.x, this.y, 40, 0, speedGenAng, true);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(this.x, this.y, 60, 0, resGenAng, true);
		ctx.stroke();
		ctx.closePath();

		var finished;*/

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