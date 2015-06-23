/**
 * Line object
 */

/**
 * Default line contructor
 */
function Line() {
	return Line(0, 0, 0, 0);
}

/**
 * Line constructor
 */
function Line(x_start, y_start, x_end, y_end) {
	/**
	 * x coord of the start
	 */
	this.x_start = x_start;
	/**
	 * y coord of the start
	 */
	this.y_start = y_start;
	/**
	 * x coord of the end
	 */
	this.x_end = x_end;
	/**
	 * y coord of the end
	 */
	this.y_end = y_end;

	this.editing = false;

	/**
	 * getter for x_start
	 */
	this.getXStart = function() {
		return this.x_start;
	};

	/**
	 * getter for y_start
	 */
	this.getYStart = function() {
		return this.y_start;
	};

	/**
	 * getter for x_end
	 */
	this.getXEnd = function() {
		return this.x_end;
	};

	/**
	 * getter for y_end
	 */
	this.getYEnd = function() {
		return this.y_end;
	};

	/**
	 * setter for start x & y
	 */
	this.setStartCoords = function(xs, ys) {
		this.x_start = xs;
		this.y_start = ys;
	};

	/**
	 * setter for end x & y
	 */
	this.setEndCoords = function(xe, ye) {
		this.x_end = xe;
		this.y_end = ye;
	};

	/**
	 * start drawing a line
	 */
	this.startDrawingCoords = function(x, y) {
		// e = window.event;
		this.setStartCoords(x, y);
	};

	/**
	 * end drawing a line
	 */
	this.endDrawingCoords = function(x, y) {
		// e = window.event;
		this.setEndCoords(x, y);
	};

	this.empty = function(){
		return this.x_start == this.x_end && this.y_start == this.y_end;
	};
	
	/**
	 * draw a line
	 */
	this.draw = function() {

		ctx.beginPath();
		ctx.moveTo(this.getXStart(), this.getYStart());
		ctx.lineTo(this.getXEnd(), this.getYEnd());
		ctx.strokeStyle = "#000";
		ctx.stroke();
		ctx.closePath();

		if (this.editing === true && distanceLine(this) > 0)
			if (Controls.editingPoint == 0) {
				ctx.fillStyle = "black";
				ctx.fillRect(this.getXStart() - 3, this.getYStart() - 3, 6, 6);
			} else if (Controls.editingPoint == 1) {
				ctx.fillStyle = "black";
				ctx.fillRect(this.getXEnd() - 3, this.getYEnd() - 3, 6, 6);
			}
	};

};