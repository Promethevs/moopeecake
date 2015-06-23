var Tutorial = {

	source : false,
	start : false,
	end : false,
	moved : false,
	deleted : false,

	drawnSource : function() {
		this.source = true;
	},

	drawnStart : function() {
		if (this.source)
			this.start = true;
	},

	drawnEnd : function() {
		if (this.start)
			this.end = true;
	},

	movedElem : function() {
		if (this.end)
			this.moved = true;
	},

	deletedElem : function() {
		if (this.moved)
			this.deleted = true;
	},

	draw : function() {
		ctx.font = "20px Arial";
		ctx.fillStyle = "#555";

		if (!this.source)
			ctx.fillText("Doubleclick to place a Source. →", 70, 70);
		else if (!this.start){
			ctx.fillText(
					"Hold down and move the mouse",
					70, 70);
		ctx.fillText(
				"to start drawing a line. ↘",
				70, 100);
		}
		else if (!this.end)
			ctx.fillText("Release to end drawing. ↝", 70, 70);
		else if (!this.moved)
			ctx.fillText(
					"Drag a source, or a line's end to change it's position.",
					70, 70);
		else if (!this.deleted)
			ctx.fillText("Doubleclick it to delete.", 70, 70);
		else
			ctx.fillText("Enjoy!", 70, 70);
	}
}
