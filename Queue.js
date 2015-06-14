/**
 * Implementation of a linked queue
 */

/**
 * Queue constructor
 */
function Queue() {

	this.length = 0;
	this.first = null;
	this.last = null;

	this.empty = function() {
		return this.length === 0;
	};

	this.enqueue = function(value) {
		if (this.empty()) {
			this.last = new Node(value);
			this.first = this.last;
		} else if (this.length == 1) {
			this.last = new Node(value);
			this.last.prev = this.first;
			this.first.next = this.last;
		} else {
			var temp = new Node(value);
			temp.prev = this.last;
			this.last.next = temp;
			this.last = temp;
		}

		++this.length;
	};

	this.dequeue = function() {
		if (this.empty()) {
			return;

		} else if (length == 1) {
			this.first == null;
			this.last == null;

		} else {
			this.first.next.prev = null;
			this.first = this.first.next;
		}
		--this.length;
	};

	this.peek = function() {
		if (this.first != undefined)
			return this.first.val;
		else
			return undefined;
	}
}

function Node(value) {
	this.val = value;
	this.next = null;
	this.prev = null;
}

var testQueue = function() {
	var q1 = new Queue();
	var q2 = new Queue();
	var out1 = "";
	var out2 = "";

	for (var i = 1; i <= 10; i++) {
		q1.enqueue(i);
		q2.enqueue(i);
		out1 += " " + i
		out2 += " " + i
	}
	console.log(out1);
	console.log(out2);

	while (!q1.empty()) {
		console.log(q1.peek());
		console.log(q2.peek());
		q1.dequeue(i);
		q2.dequeue(i);
		console.log(q1.peek());
		console.log(q2.peek());
	}
}