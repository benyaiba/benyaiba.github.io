var nimo = {
	aniamted: null,
	content: null,
	data: {
		radiusRange: [5, 20],
		speedRange: [-5, 5],
		scrollHeight: null,
		scrollWdith: null
	},
	balls: [],
	ele: {
		canvas: null
	},
	fn: {
		creatRandom: function (startInt, endInt) {
			var iResult;
			iResult = startInt + (Math.floor(Math.random() * (endInt - startInt + 1)));
			return iResult
		},
		init: function () {
			nimo.data.scrollWdith = document.body.clientWidth;
			nimo.data.scrollHeight = document.body.clientHeight;
			nimo.ele.canvas = document.getElementById('canvas-ke'+'leyi-com');
			nimo.content = nimo.ele.canvas.getContext('2d');
			nimo.ele.canvas.width = nimo.data.scrollWdith - 50;
			nimo.ele.canvas.height = nimo.data.scrollHeight - 100;
		},
			addBall: function () {
			var aRandomColor = [];
			aRandomColor.push(nimo.fn.creatRandom(0, 255));
			aRandomColor.push(nimo.fn.creatRandom(0, 255));
			aRandomColor.push(nimo.fn.creatRandom(0, 255));
			var iRandomRadius = nimo.fn.creatRandom(nimo.data.radiusRange[0], nimo.data.radiusRange[1]);
			var oTempBall = {
				coordsX: nimo.fn.creatRandom(iRandomRadius, nimo.ele.canvas.width - iRandomRadius),
				coordsY: nimo.fn.creatRandom(iRandomRadius, nimo.ele.canvas.height - iRandomRadius),
				radius: iRandomRadius,
				bgColor: 'rgba(' + aRandomColor[0] + ',' + aRandomColor[1] + ',' + aRandomColor[2] + ',0.5)'
			};
			oTempBall.speedX = nimo.fn.creatRandom(nimo.data.speedRange[0], nimo.data.speedRange[1]);
			if (oTempBall.speedX === 0) {
				oTempBall.speedX = 1
			}
			if (oTempBall.speedY === 0) {
				oTempBall.speedY = 1
			}
			oTempBall.speedY = nimo.fn.creatRandom(nimo.data.speedRange[0], nimo.data.speedRange[1]);
			nimo.balls.push(oTempBall)
		},
			drawBall: function (bStatic) {
			var i, iSize;
			nimo.content.clearRect(0, 0, nimo.ele.canvas.width, nimo.ele.canvas.height)
			for (var i = 0, iSize = nimo.balls.length; i < iSize; i++) {
			var oTarger = nimo.balls[i];
			nimo.content.beginPath();
			nimo.content.arc(oTarger.coordsX, oTarger.coordsY, oTarger.radius, 0, 10);
			nimo.content.fillStyle = oTarger.bgColor;
			nimo.content.fill();
			if (!bStatic) {
			if (oTarger.coordsX + oTarger.radius >= nimo.ele.canvas.width) {
				oTarger.speedX = -(Math.abs(oTarger.speedX))
			}
			if (oTarger.coordsX - oTarger.radius <= 0) {
				oTarger.speedX = Math.abs(oTarger.speedX)
			}
			if (oTarger.coordsY - oTarger.radius <= 0) {
				oTarger.speedY = Math.abs(oTarger.speedY)
			}
			if (oTarger.coordsY + oTarger.radius >= nimo.ele.canvas.height) {
				oTarger.speedY = -(Math.abs(oTarger.speedY))
			}
			oTarger.coordsX = oTarger.coordsX + oTarger.speedX;
			oTarger.coordsY = oTarger.coordsY + oTarger.speedY;
			}
			}
		},
		run: function () {
			nimo.fn.drawBall();
			nimo.aniamted = setTimeout(function () {
				nimo.fn.drawBall();
				nimo.aniamted = setTimeout(arguments.callee, 10)
			}, 10)
		},
		stop: function () {
		clearTimeout(nimo.aniamted)
	}
	}
}
window.onload = function () {
	nimo.fn.init();
	var i;
	for (var i = 0; i < 10; i++) {
		nimo.fn.addBall();
	}
	nimo.fn.run();
	document.getElementById('stop-kel'+'eyi-com').onclick = function () {
	nimo.fn.stop()
	}
	document.getElementById('run-keley'+'i-com').onclick = function () {
	nimo.fn.stop()
	nimo.fn.run()
	}
	document.getElementById('addBall-k'+'eleyi-com').onclick = function () {
	var i;
	for (var i = 0; i < 10; i++) {
		nimo.fn.addBall();
	}
	nimo.fn.drawBall(true);
	}
}
