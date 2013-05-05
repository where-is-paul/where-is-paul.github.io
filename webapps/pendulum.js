// based on yuqq.js's "Pendulum Wave" http://jsdo.it/yuqq.js/qjtB
// code adjusted to make timings as realistic as possible
var PendulumNumber = 20;
var Gamma = 210; //total period of dance
var maxN = 43; //number of oscillations performed by the biggest pendulum
var StartAngle = Math.PI/3; //in radians
var PendulumRadius = 10; //radius of pendulum bob in pixels
var g = 900.8127; //pixels per s^2 (100 pixels correspond to 1 metre)
var dt = 0.016; //in seconds
var k = 0.01; //dampening factor

setTimeout(function() {

    var cvs = {
        'elem': undefined,
        'width': 0,
        'height': 0,
        'ctx': undefined,
        'left': 0,
        'top': 0,
        'pos_x': 0,
        'pos_y': 0
    };

	function setupCanvas() {
		cvs.elem = document.getElementById('cvs');
		if (!cvs.elem || !cvs.elem.getContext) {
			return alert('require canvas support');
		};
		(function() {
			var b = document.body;
			var d = document.documentElement;
			cvs.width = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth);
			cvs.height = Math.max(b.clientHeight, b.scrollHeight, d.scrollHeight, d.clientHeight);
		})();
		cvs.elem.height = cvs.height;
		cvs.elem.width = cvs.width;
		cvs.ctx = cvs.elem.getContext('2d');
		cvs.left = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().left : 0;
		cvs.top = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().top : 0;
	}
	setupCanvas();
	
    setTimeout(function() {
        drawStaticObject();
        requestAnimationFrame(render);
    }, 0);

	var info = {
		'elem': undefined,
		'totalTime': 0,
		'lastTime': 0,
		'frame': 0,
		'fps': 0
	};
	info.elem = document.createElement('span');
	info.elem.setAttribute('id', 'fps');
	document.body.insertBefore(info.elem, cvs.elem.nextSibling);
	info.lastTime = (new Date()).getTime();

	function updateInfo() {
		var now = (new Date()).getTime();
		var delta = now - info.lastTime;
		info.delta = delta;
		info.lastTime = now;
		info.totalTime += delta;
		info.frame++;
		info.fps = (1000 * info.frame / info.totalTime).toFixed(2);
		info.elem.innerHTML = 'Frame/s: ' + info.fps;
	}

    var theta = [];
    var omega = [];
    var r = [];
    var colors = [];

    for (var i = 0; i < PendulumNumber; i++) {
		theta[i] = StartAngle;
		omega[i] = 0;
		r[i] = g*Math.pow(Gamma/(4*1.6857503548*(maxN+i)), 2);
		colors[i] = hsv2rgb(i * (360 / PendulumNumber), 80, 80);
	}

    function clearCanvas() {
        cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
    }
	
    function drawPendulum(delta) {
        var pos_x = cvs.width / 2;
        var pos_y = 0;

		for (var iter = 0; iter * dt < delta; iter++) {
			for (var i = 0; i < PendulumNumber; i++) {
				omega[i] -= (g / r[i] * Math.sin(theta[i]) + k * omega[i]) * dt;
				theta[i] += omega[i] * dt;
				var x = r[i] * Math.sin(theta[i]);
				var y = r[i] * Math.cos(theta[i]);
				cvs.ctx.beginPath();
				cvs.ctx.moveTo(pos_x, pos_y);
				cvs.ctx.lineTo(pos_x + x, pos_y + y);
				cvs.ctx.strokeStyle = colors[i];
				cvs.ctx.stroke();
				cvs.ctx.closePath();
				cvs.ctx.beginPath();
				cvs.ctx.arc(pos_x + x, pos_y + y, PendulumRadius, 0, 2 * Math.PI, false);
				cvs.ctx.fillStyle = colors[i];
				cvs.ctx.fill();
				cvs.ctx.closePath();
			}
		}
    }

    function drawStaticObject() {

    }

    function render() {
        clearCanvas();
		updateInfo();
		if (info.delta > 1) info.delta = 0.1; //hack incase window is minimized
        drawPendulum(info.delta/1000);
        requestAnimationFrame(render);
    }

}, 0);

//set window.requestAnimationFrame
(function(w, r) {
    w['r' + r] = w['r' + r] || w['webkitR' + r] || w['mozR' + r] || w['msR' + r] || w['oR' + r] ||
    function(c) {
        w.setTimeout(c, 1000 / 60);
    };
})(window, 'requestAnimationFrame');