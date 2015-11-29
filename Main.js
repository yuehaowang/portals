/** Arithmetic comes from: https://scratch.mit.edu/projects/86663460/ */

LInit(30, "mydemo", 500, 600, main);

var pull = 1, twist = 4, shout = 1;
var pullChange = 0.01, shoutChange = 0.01, twistChange = 0.01;
var timer = 0, startTime;
var colorFlag = 0;

function main () {
	startTime = (new Date()).getTime();

	if (LGlobal.mobile) {
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}

	LGlobal.screen(LGlobal.FULL_SCREEN);

	LGlobal.stage.addEventListener(LEvent.WINDOW_RESIZE, function () {
		LGlobal.screen(LGlobal.FULL_SCREEN);
	});

	start();
}

function start () {
	var layer = new LSprite();
	layer.x = LGlobal.width / 2;
	layer.y = LGlobal.height / 2;
	addChild(layer);

	layer.addShape(LShape.RECT, [-LGlobal.width / 2, -LGlobal.height / 2, LGlobal.width, LGlobal.height]);

	layer.graphics.add(function () {
		var c = LGlobal.canvas;

		for (var i = 1; i <= 60; i++) {
			var angle = i * 6 / 180 * Math.PI;
			var r = Math.abs(30 * (pull + Math.sin((twist * 6 * (i + timer * 2) / 180 * Math.PI))));
			r = r % 60;

			var d = (2 + shout) * (60 - shout * r),
			x = d * Math.cos(angle),
			y = d * Math.sin(angle);

			c.save();

			c.beginPath();
			c.fillStyle = getColor();
			c.globalAlpha = r / 100;
			c.arc(x, y, r, 0, Math.PI * 2);
			c.fill();
			c.restore();
		}
	});

	layer.addEventListener(LEvent.ENTER_FRAME, function () {
		timer = ((new Date()).getTime() - startTime) / 1000;

		pull += pullChange;

		if (pull >= 2 || pull <= -2) {
			pullChange *= -1;
		}

		shout += shoutChange;

		if (shout >= 1 || shout <= -1) {
			shoutChange *= -1;
		}

		twist += twistChange;

		if (twist >= 30 || twist <= 2) {
			twistChange *= -1;
		}
	});

	layer.addEventListener(LMouseEvent.MOUSE_UP, function () {
		if (++colorFlag > 3) {
			colorFlag = 0;
		}
	});

	var hint = new LTextField();
	hint.color = "white";
	hint.text = "Tap to Change Color";
	hint.weight = "italic";
	hint.textAlign = "center";
	hint.x = LGlobal.width / 2;
	hint.y = LGlobal.height - 70;
	addChild(hint);
}

function getColor () {
	if (colorFlag == 0) {
		return "#48e700";
	} else if (colorFlag == 1) {
		return "#ed10ab";
	} else if (colorFlag == 2) {
		return "#2da0ff";
	} else if (colorFlag == 3) {
		var v = Math.floor(Math.random() * 10);

		if (v <= 3) {
			return "#48e700";
		} else if (v <= 6) {
			return "#ed10ab";
		} else if (v <= 10) {
			return "#2da0ff";
		}
	}
}