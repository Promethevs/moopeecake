/**
 * Line object
 */

/**
 * Line constructor
 */
function Line() {
	/**
	 * x coord of the start
	 */
	this.x_start = 0;
	/**
	 * y coord of the start
	 */
	this.y_start = 0;
	/**
	 * x coord of the end
	 */
	this.x_end = 0;
	/**
	 * y coord of the end
	 */
	this.y_end = 0;
	
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
		//e = window.event;
		this.setStartCoords(x, y);
	};

	/**
	 * end drawing a line
	 */
	this.endDrawingCoords = function(x, y) {
		//e = window.event;
		this.setEndCoords(x, y);
	};
	
	/**
	 * draw a line
	 */
	this.draw = function() {
		//console.log("Drawing begin");
			
		//console.log("x0: "+this.getXStart());
		//console.log("y0: "+this.getYStart());
		//console.log("x1: "+this.getXEnd());
		//console.log("y1: "+this.getYEnd());
		
		ctx.beginPath();
		ctx.moveTo(this.getXStart(), this.getYStart());
		ctx.lineTo(this.getXEnd(), this.getYEnd());
		ctx.stroke();
		ctx.closePath();
	};

};