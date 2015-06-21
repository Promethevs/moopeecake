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
var gravity = 0.02;
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
 * counter for updates
 */
var updates = 0;
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
		setInterval(main, 2);
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
	if (updates >= 9) {
		updates = 0;
		draw();
	}
	++updates;
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

	if (frame >= 400) {
		frame = 0;
		for (var i = 0; i < sources.length; i++)
			sources[i].spawnNew();
		// sources[i].spawnRand();

	}
	// ++totalFrame;
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

	ctx.fillStyle = "black";
	ctx.font = "14px serif";
	// ctx.fillText(totalFrame, 10, 15);
	ctx.fillText(frame, 10, 30);

	for (var i = 0; i < sources.length; i++) {
		sources[i].draw();
		sources[i].drawAllBalls();
	}
	for (var i = 0; i < lines.length; i++) {
		lines[i].draw();
	}
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

function soundReflect() {
  var audio = new Audio();
  audio.src = 'sound.wav';
  audio.play();
}

function distanceLine(l) {
	return distanceCoords(l.getXEnd(), l.getYEnd(), l.getXStart(), l
			.getYStart());
}

function distanceCoords(x1, y1, x2, y2) {
	return distanceVect(x1 - x2, y1 - y2);
}

function distanceVect(x, y) {
	return Math.sqrt(x * x + y * y);
}

function dot(l1, l2) {

	var x1 = l1.getXEnd() - l1.getXStart();
	var y1 = l1.getYEnd() - l1.getYStart();

	var x2 = l2.getXEnd() - l2.getXStart();
	var y2 = l2.getYEnd() - l2.getYStart();

	var res = x1 * x2 + y1 * y2;
	return res;
}

function cos(l1, l2) {
	return dot(l1, l2) / (distanceLine(l1) * distanceLine(l2));
}
