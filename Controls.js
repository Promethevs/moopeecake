/**
 * 
 */

var Controls = {

	editingSource : undefined,
	editingLine : undefined,
	editingPoint : undefined,

	dblClick : function(e) {

		for (var i = 0; i < sources.length; i++)
			if (distanceCoords(sources[i].x, sources[i].y, e.pageX
					- this.offsetLeft, e.pageY - this.offsetTop) <= 12) {
				Controls.deleteSource(i);
				Tutorial.deletedElem();
				return null;
			}
		for (var i = 0; i < lines.length; i++)
			for (var i = 0; i < lines.length; i++)
				if (distanceCoords(lines[i].x_start, lines[i].y_start, e.pageX
						- this.offsetLeft, e.pageY - this.offsetTop) <= 12
						|| distanceCoords(lines[i].x_end, lines[i].y_end,
								e.pageX - this.offsetLeft, e.pageY
										- this.offsetTop) <= 12) {
					Controls.deleteLine(i);
					Tutorial.deletedElem();
					return null;
				}

		Controls.newSource(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	},

	newSource : function(x, y) {
		sources.push(new Source(x - 4, y - 4));
		Tutorial.drawnSource();
	},

	deleteSource : function(num) {
		sources[num] = sources[sources.length - 1];
		sources.pop();
	},

	deleteLine : function(num) {
		lines[num] = lines[lines.length - 1];
		lines.pop();
	},

	mousePressed : function(e) {
		for (var i = 0; i < sources.length; i++)
			if (sources[i].editing === true) {
				Controls.editingSource = i;
				return;
			}

		for (var i = 0; i < lines.length; i++)
			if (lines[i].editing === true) {
				Controls.editingLine = i;
				return;
			}

		Controls.newLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	},

	newLine : function(x, y) {
		line = new Line(x, y, x, y);
		line.editing = true;

		Controls.editingPoint = 1;
		lines.push(line);
		Controls.editingLine = lines.length - 1;
	},

	mouseMoved : function(e) {
		if (Controls.editingLine != undefined) {
			Controls.editLine(e.pageX - this.offsetLeft, e.pageY
					- this.offsetTop);
			return;
		} else if (Controls.editingSource != undefined) {
			Controls.editSource(e.pageX - this.offsetLeft, e.pageY
					- this.offsetTop);
			return;
		}

		for (var i = 0; i < sources.length; i++)
			if (distanceCoords(sources[i].x, sources[i].y, e.pageX
					- this.offsetLeft, e.pageY - this.offsetTop) <= 12) {
				sources[i].editing = true;
			} else
				sources[i].editing = false;

		for (var i = 0; i < lines.length; i++)
			if (distanceCoords(lines[i].x_start, lines[i].y_start, e.pageX
					- this.offsetLeft, e.pageY - this.offsetTop) <= 12) {
				Controls.editingPoint = 0;
				lines[i].editing = true;
			} else if (distanceCoords(lines[i].x_end, lines[i].y_end, e.pageX
					- this.offsetLeft, e.pageY - this.offsetTop) <= 12) {
				Controls.editingPoint = 1;
				lines[i].editing = true;
			} else
				lines[i].editing = false;
	},

	editSource : function(x, y) {
		if (this.editingSource != undefined) {
			sources[Controls.editingSource].x = x;
			sources[Controls.editingSource].y = y;
			Tutorial.movedElem();
		}
	},

	editLine : function(x, y) {
		if (Controls.editingLine != undefined) {
			if (Tutorial.drawnStart)
				Tutorial.movedElem();
			if (Controls.editingPoint == 0)
				lines[Controls.editingLine].setStartCoords(x, y);
			else if (Controls.editingPoint == 1)
				lines[Controls.editingLine].setEndCoords(x, y);
			Tutorial.drawnStart();
		}
	},

	mouseReleased : function(e) {
		if (lines.length > 0 && lines[lines.length - 1].empty()) {
			lines.pop();
			Controls.editingLine = undefined;
		}

		if (Controls.editingLine != undefined)
			Controls.endLine();
		if (Controls.editingSource != undefined)
			Controls.endSource();
	},

	endSource : function() {
		if (Controls.editingSource != undefined) {

			sources[Controls.editingSource].editing = false;
			Controls.editingSource = undefined;
		}
	},

	endLine : function() {
		if (Controls.editingLine != undefined) {

			lines[Controls.editingLine].editing = false;
			Tutorial.drawnEnd();
			Controls.editingLine = undefined;
			Controls.editingPoint = undefined;
		}
	},

	resize : function() {
		width = window.innerWidth - 32;
		height = window.innerHeight - 48;

		ctx.canvas.width = width;
		ctx.canvas.height = height;
	},

}