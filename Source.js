/**
 * Source object
 */

/**
 * Source constructor
 * 
 * @param Number
 *            x - x coordinate
 * @param Number
 *            y - y coordinate
 */
function Source(x, y) {
	/**
	 * x coord
	 */
	this.x = x;
	/**
	 * y coord
	 */
	this.y = y;

	/**
	 * queue containing all elements
	 */
	this.elems = new Queue();

	/**
	 * spawn new ball
	 */
	this.spawnNew = function() {
		this.elems.enqueue(new Ball(this.x, this.y));
	};
	/**
	 * spawns new ball with a random speed vector
	 */
	this.spawnRand = function() {
		this.spawnNew();
		this.elems.last.val.speed.x += (Math.random() * 10) - 5;
		this.elems.last.val.speed.y += (Math.random() * -10) - 5;
	};

	/**
	 * deletes the first ball if it has moved off screen
	 */
	this.moveOffScreen = function() {
		var elem = this.elems.peek();
		if (elem != undefined && elem.y >= limit + elem.radius)
			this.elems.dequeue();
	};

	/**
	 * move all balls
	 */
	this.moveAll = function() {
		for (var elem = this.elems.first; elem != null; elem = elem.next) {
			elem.val.move();
		}
	};

	/**
	 * apply gravity on all balls
	 */
	this.gravityOnAll = function() {
		for (var elem = this.elems.first; elem != null; elem = elem.next) {
			elem.val.gravity();
		}
	};

	/**
	 * draw the Source
	 */
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 8, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.stroke();
	};

	/**
	 * draw all balls ejected from the source
	 */
	this.drawAllBalls = function() {
		for (var elem = this.elems.first; elem != null || elem != undefined; elem = elem.next) {
			elem.val.draw();
		}
	};
}