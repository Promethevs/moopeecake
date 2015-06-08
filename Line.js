function Line() {
	this.x_start = 0;
	this.y_start = 0;
	this.x_end = 0;
	this.y_end = 0;
	
	this.getXStart = function() {
		return this.x_start;
	};
	
	this.getYStart = function() {
		return this.y_start;
	};
	
	this.getXEnd = function() {
		return this.x_end;
	};
	
	this.getYEnd = function() {
		return this.y_end;
	};
	
	this.setStartCoords = function(xs, ys) {
		this.x_start = xs;
		this.y_start = ys;
	};
	
	this.setEndCoords = function(xe, ye) {
		this.x_end = xe;
		this.y_end = ye;
	};
	
	this.startDrawingCoords = function(e) {
		e = window.event;
		this.setStartCoords(e.pageX, e.pageY);
	};

	this.endDrawingCoords = function(e) {
		e = window.event;
		this.setEndCoords(e.pageX, e.pageY);
	};
	
	this.draw = function(ctx) {
		console.log("Drawing begin");
			
		console.log("x0: "+this.getXStart());
		console.log("y0: "+this.getYStart());
		console.log("x1: "+this.getXEnd());
		console.log("y1: "+this.getYEnd());
		
		ctx.beginPath();
		ctx.moveTo(this.getXStart(), this.getYStart());
		ctx.lineTo(this.getXEnd(), this.getYEnd());
		ctx.stroke();
		ctx.closePath();
	};

};