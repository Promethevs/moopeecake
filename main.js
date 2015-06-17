/**
 * Root of the program
 */

/**
 * array of all sources.
 */
var sources = [];
/**
 * array of all lines.
 */
var lines = [];
/**
 * variable containing unfinished line.
 */
var l;

/**
 * gravity of all the balls;
 */
var gravity = 0.2;
/**
 * Y coordinate at which a ball will be destroyed.
 */
var limit = 450;
/**
 * number of frames that have passed since start
 */
var totalFrame = 0;
/**
 * counter for frames
 */
var frame = 20;

/**
 * variable containing HTML canvas element
 */
var canvas;
/**
 * 2D context of canvas
 */
var ctx;

/**
 * initializes global variables & functions, starts the animation
 */
function init() {
	canvas = document.getElementById("main");
	canvas.ondblclick = newSource;
	canvas.onmousedown = function(e) {
		l = new Line();
		l.startDrawingCoords(e.pageX, e.pageY);
	};
	canvas.onmouseup = function(e) {
		l.endDrawingCoords(e.pageX, e.pageY);
		l.draw(ctx);
		lines.push(l);
	};

	if ((ctx = canvas.getContext("2d")) != null)
		window.requestAnimationFrame(main);
	else
		$(document).append("<p>looks like something went wrong in js:(</p>");

}

/**
 * main loop of the program:
 * <ul>
 * <li>updates all elements</li>
 * <li>draws all elements</li>
 * </ul>
 */
function main() {

	update();
	draw();

	window.requestAnimationFrame(main);

}

/**
 * updates all elements:
 * <ol>
 * <li>checks if projectiles moved off screen</li>
 * <li>moves all projectiles to their next position</li>
 * <li>applies gravity on all projectiles</li>
 * <li>spawns new projectiles</li>
 * </ol>
 */
function update() {
	for (var i = 0; i < sources.length; i++) {
		sources[i].moveOffScreen();
		sources[i].moveAll();
		sources[i].gravityOnAll();
	}

	if (frame >= 33) {
		frame = 0;
		for (var i = 0; i < sources.length; i++)
			sources[i].spawnNew();
		// sources[i].spawnRand();

	}

	++totalFrame;
	++frame;
}

/**
 * draws all elements:
 * <ol>
 * <li>draws all Sources</li>
 * <li>draws all projectiles</li>
 * <li>draws all lines</li>
 * </ol>
 */
function draw() {

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 450);

	// ctx.fillStyle = "black";
	// ctx.font = "14px serif";
	// ctx.fillText(totalFrame, 10, 15);
	// ctx.fillText(frame, 10, 30);

	for (var i = 0; i < sources.length; i++) {
		sources[i].draw();
		sources[i].drawAllBalls();
	}
	for (var i = 0; i < lines.length; i++) {
		lines[i].draw();
	}
	;
}

/**
 * makes new Source
 * 
 * @param e -
 *            double click event
 */
function newSource(e) {
	// console.log(e.pageX + "; " + e.pageY);
	sources.push(new Source(e.pageX - 12, e.pageY - 12));
}

/**
 * generates random color
 * 
 * @returns {String} a random color
 */
function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


function distanceLine(l) {
	return distanceCoords(l.getXEnd(), l.getYEnd(), l.getXStart(), l.getYStart());
}

function distancePoints(x, y) {
	return Math.sqrt(x*x + y*y);
}

function distanceCoords(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) - (y1 - y2) * (y1 - y2));
}

function dot(l, x, y) {
	
	var x1 = l.getXEnd() - l.getXStart();
	var y1 = l.getYEnd() - l.getYStart();

	var res = x1 * x + y1 * y; 
	return res;
}

function cos(l, x, y) {
	return dot(l, x,y) / (distanceLine(l) * distancePoints(x, y));
}