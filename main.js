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
 * gravity of all the balls;
 */

var animations = new Queue();

var gravity = 0.2;
/**
 * 
 */
var freq = 33;
/**
 * number of frames that have passed since start
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

var height;
var width;

/**
 * initializes global variables & functions, starts the animation
 */
function init() {
	canvas = document.getElementById("main");
	canvas.ondblclick = Controls.dblClick;
	canvas.onmousedown = Controls.mousePressed;
	canvas.onmousemove = Controls.mouseMoved;
	canvas.onmouseup = Controls.mouseReleased;
	window.onresize = Controls.resize;

	if ((ctx = canvas.getContext("2d")) != null) {
		Controls.resize();
		requestAnimationFrame(main);
	} else
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

	if (frame >= 60) {
		frame = 0;
		for (var i = 0; i < sources.length; i++)
			sources[i].spawnNew();
		// sources[i].spawnRand();

	}
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
	ctx.fillRect(0, 0, width, height);

	for (var elem = animations.first; elem != null; elem = elem.next) {
		elem.val.draw();
	}

	for (var i = 0; i < sources.length; i++) {
		sources[i].draw();
		sources[i].drawAllBalls();
	}
	for (var i = 0; i < lines.length; i++) {
		lines[i].draw();
	}

	Tutorial.draw();
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

function soundReflect(angle) {
	var audio = new Audio();
	audio.src = "sound/" + Math.floor(angle / (Math.PI / 6)) + ".wav";
	audio.play();
}

function distanceLine(line) {
	return distanceCoords(line.getXEnd(), line.getYEnd(), line.getXStart(),
			line.getYStart());
}

function distanceCoords(x1, y1, x2, y2) {
	return distanceVect(x1 - x2, y1 - y2);
}

function distanceVect(x, y) {
	return Math.sqrt(x * x + y * y);
}