/**
 * 
 */

var source = new Source(400, 150);
var gravity = 0.5;
var limit = 300;
var totalFrame = 0;
var frame = 20;

function init() {
	
	var canvas = document.getElementById("main");
	if (canvas.getContext) {

		window.requestAnimationFrame(main);

	} else
		$(document).append("<p>looks like something went wrong in js:(</p>");
}

function main() {
	var ctx = document.getElementById("main").getContext("2d");

	update();
	draw(ctx);

	window.requestAnimationFrame(main);
}

function update() {
	source.tryDelete();
	source.moveAll();
	source.gravityOnAll();
	
	if (frame >= 11) {
		frame = 0;
		//source.spawnNew();
		source.spawnRand();
	}

	++totalFrame;
	++frame;
}

function draw(ctx) {

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 450);
	
	ctx.fillStyle = "black";
	ctx.font = "14px serif";
	ctx.fillText(totalFrame, 10, 15);
	ctx.fillText(frame, 10, 30);

	source.draw(ctx);
	source.drawAll(ctx);
}
