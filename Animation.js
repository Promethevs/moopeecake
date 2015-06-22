/**
 * Animation constructor
 */
function Animation(x, y, maxRadius, color) {
	/**
	 * x coord
	 */
	this.x = x;
	/**
	 * y coord
	 */
	this.y = y;
	/**
	 * color of the Animation
	 */
	this.color = color;
	/**
	 * bigger radius of the Ball
	 */
	this.radiusBig = 1;
	/**
	 * smaller radius of the Ball
	 */
	this.radiusSmall = 1;
	/**
	 * max radius of the Ball
	 */
	this.maxRadius = maxRadius;

	/**
	 * draw
	 */
	this.draw = function() {
		
		if(this.radiusBig<=this.maxRadius)
			this.radiusBig += 5;
		if(this.radiusSmall<this.maxRadius+10)
			this.radiusSmall += 3;
		else{
			animations.dequeue();
			return;
		}
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radiusBig, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radiusSmall, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = "#fff";
		ctx.fill();
	};

}
