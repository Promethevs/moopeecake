/**
 * 
 */

/**
 * @param Number
 *            x
 * @param Number
 *            y
 */
function Source(x, y) {
	this.x = x;
	this.y = y;

	this.elems = new Queue();

	this.spawnNew = function() {
		this.elems.enqueue(new Ball(this.x, this.y));
	};	
	this.spawnRand = function() {
		this.spawnNew();
		this.elems.last.val.speed.x += (Math.random()*10)-5;
		this.elems.last.val.speed.y += (Math.random()*-10)-5;
	};

	this.tryDelete = function(limit) {
		var elem = this.elems.peek();
		if (elem != undefined && elem.y >= limit + elem.radius)
			this.elems.dequeue();
	};

	this.moveAll = function() {
		for (var elem = this.elems.first; elem != null; elem = elem.next) {
			elem.val.move();
		}
	};

	this.gravityOnAll = function(n) {
		for (var elem = this.elems.first; elem != null; elem = elem.next) {
			elem.val.gravity(n);
		}
	};

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 12, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.stroke();
	};
	this.drawAll = function(ctx) {
		for (var elem = this.elems.first; elem != null || elem != undefined; elem = elem.next) {
			elem.val.draw(ctx);
		}
	};
}