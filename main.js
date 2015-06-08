/**
 * 
 */

var sources = [];
var lines = [];

var gravity = 0.2;
var limit = 450;
var totalFrame = 0;
var frame = 20;

var canvas;
var ctx;

function init() {
	canvas = document.getElementById("main");
	canvas.ondblclick = newSource;
	
	if ((ctx = canvas.getContext("2d")) != null)
		window.requestAnimationFrame(main);
	else
		$(document).append("<p>looks like something went wrong in js:(</p>");
	
}

function main() {

	update();
	draw();

	window.requestAnimationFrame(main);
}


function update() {
	for (var i = 0; i < sources.length; i++) {
		sources[i].moveOffScreen();
		sources[i].moveAll();
		sources[i].gravityOnAll();
	}

	if (frame >= 33) {
		frame = 0;
		for (var i = 0; i < sources.length; i++)
			//sources[i].spawnNew();
			sources[i].spawnRand();

	}

	++totalFrame;
	++frame;
}

function draw() {

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 450);

	ctx.fillStyle = "black";
	ctx.font = "14px serif";
	ctx.fillText(totalFrame, 10, 15);
	ctx.fillText(frame, 10, 30);
	
	for (var i = 0; i < sources.length; i++) {
		sources[i].draw();
		sources[i].drawAll();
	}
}

function newSource(e) {
	//console.log(e.pageX + "; " + e.pageY);
	sources.push(new Source(e.pageX - 12, e.pageY - 12));
}