$(document).ready(function(){


var brushPreview = $('#brushPreview');
var brushSize = brushPreview.width();
var clickSize = new Array();
var curSize = brushSize;
var clickColor = new Array();
var curColor = brushPreview.css('backgroundColor');
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
context = document.getElementById('canvas').getContext("2d");
context.imageSmoothingEnabled = false;

$('#clearBtn').click(clearDown);
$('#undoBtn').click(undo);
$('#finishBtn').click(finish);
wingTemplate(8, true, true, true, false);

// Drawing canvas code

$('#canvas').on("mousedown touchstart", function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	curColor = brushPreview.css('backgroundColor');
			
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
});

$('#canvas').on("mousemove touchmove", function(e){
	if(paint){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

$('#canvas').on("mouseup touchend", function(e){
	paint = false;
});

$('#canvas').mouseleave(function(e){
	paint = false;
});

// Clip path to outline of wing
function wingTemplate(linewidth, fill, clip, first, final) {
	context.beginPath();
	context.lineWidth = linewidth;
	context.strokeStyle = "black";
	context.moveTo(324, 68);
	context.quadraticCurveTo(355, 75, 358, 105);
	context.quadraticCurveTo(336, 200, 332, 239);
	context.quadraticCurveTo(335, 270, 340, 276);
	context.quadraticCurveTo(414, 417, 422, 496);
	context.quadraticCurveTo(420, 532, 392, 550);
	context.quadraticCurveTo(231, 625, 232, 625);
	context.quadraticCurveTo(195, 644, 233, 636);
	context.quadraticCurveTo(333, 597, 357, 591);
	context.quadraticCurveTo(430, 578, 472, 656);
	context.quadraticCurveTo(502, 724, 508, 805);
	context.quadraticCurveTo(506, 840, 494, 881);
	context.quadraticCurveTo(462, 954, 422, 993);
	context.quadraticCurveTo(393, 1017, 355, 1018);
	context.quadraticCurveTo(268, 1016, 200, 964);
	context.quadraticCurveTo(133, 908, 97, 862);
	context.quadraticCurveTo(22, 768, 5, 728);
	context.quadraticCurveTo(5, 686, 8, 678);
	context.quadraticCurveTo(25, 634, 30, 597);
	context.quadraticCurveTo(40, 537, 48, 483);
	context.quadraticCurveTo(77, 350, 130, 252);
	context.quadraticCurveTo(228, 86, 324, 68);
//	context.stroke();
	if(fill) {
		context.fillStyle = "white";
		context.fill();
	}
	if(first) {
		context.save();
	}
	if(clip) {
		context.clip();
	}
	if(final) {
		context.restore();
//		context.stroke();
	}
}


function addClick(x, y, dragging)
{
	clickColor.push(curColor);
	curSize = brushPreview.width();
	clickSize.push(curSize);
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

function redraw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	wingTemplate(8, true, true, true, false);
	context.lineJoin = "round";

	for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.lineWidth = clickSize[i];
		context.stroke();
	}
}

function undo() {
	console.log("undo!");
	clickDrag.pop();
	clickX.pop();
	clickY.pop();
	clickSize.pop();
	clickColor.pop();
	redraw();
}


function clearDown() {
	console.log("clearing down");
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	clickDrag = [];
	clickX = [];
	clickY = [];
	clickSize = [];
	clickColor = [];
	wingTemplate(8, true);
}

function finish() {
	console.log("finishing...");
	wingTemplate(12, false, false, false, true);
	canvas.toBlob(function(blob) {
  		saveAs(blob, "NewButterfly.png");
  	});
	clearDown();
//	window.open(canvas.toDataURL("image/png"));
}


// Brush size slider
$('#brushSizeSlider').on('input', function(){
	brushPreview.width(this.value);
	brushPreview.height(this.value);
});


// Palette squares
$('.paletteSquare').click(function(){
	var color = $(this).css('backgroundColor');
	brushPreview.css('backgroundColor', color);
});


// Color picker
$('#colorPicker').show();
ColorPicker(
	document.getElementById('slider'),
	document.getElementById('picker'),

	function(hex, hsv, rgb) {
		console.log(hsv.h, hsv.s, hsv.v);         // [0-359], [0-1], [0-1]
		console.log(rgb.r, rgb.g, rgb.b);         // [0-255], [0-255], [0-255]
		brushPreview.css('backgroundColor', hex);
		clickColor.push()
});



});
