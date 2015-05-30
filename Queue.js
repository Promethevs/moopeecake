/**
 * 
 */

function Queue() {

	this.length = 0;
	this.first = null;
	this.last = null;

	this.empty = function() {
		return length == 0;
	};

	this.length = function() {
		return length;
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

		++length;
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
		--length;
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
	var q = new Queue();
	var out = "";

	for (var i = 1; i <= 10; i++) {
		q.enqueue(i);
		out += " " + i
	}
	console.log(out);

	while (!q.empty()) {
		console.log(q.peek());
		q.dequeue(i);
		console.log(q.peek());
	}
}