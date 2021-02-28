// based on yuqq.js's "Pendulum Wave" http://jsdo.it/yuqq.js/qjtB
// code adjusted to make timings as realistic as possible
var PendulumNumber = 12;
var Gamma = 190; //total period of dance
var maxN = 35; //number of oscillations performed by the biggest pendulum
var theta0 = 30*Math.PI/180; //in radians
var PendulumRadius = 10; //radius of pendulum bob in pixels
var g = (0.8)*981.27; //pixels per s^2 (100 pixels correspond to 1 metre)
var dt = 0.03; //in seconds
var k = 0.00; //dampening factor

function f(theta, x) {
    //input theta as rad.
    var k = Math.sin(theta / 2);
    return 1 / Math.sqrt(1 - Math.pow(k * Math.sin(x), 2));
}

function integrate(g, lower, upper) {
    var mesh = 10000;
    var dx = (upper - lower) / mesh;

    //computes an elliptic integral of the first kind
    //between 0 and pi/2. using simpsons though.
    //the accuracy should be enough.
    var res = 0;
    for (var i = 0; i < mesh; i++) {
        res += (g(i * dx) + 4*g((i+0.5) * dx) + g((i+1)*dx)) * (dx/6);
    }

    return res;
}

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
	
	function init() {
		for (var i = 0; i < PendulumNumber; i++) {
			theta[i] = theta0;
			omega[i] = 0;
			var func = function (x) {
				return f(theta0, x);
			}
			var I = integrate(func, 0, Math.PI / 2);
			r[i] = g*Math.pow(Gamma/(4*I*(maxN+i)), 2);
			//r[i] += r[i]*(Math.random()-1)/50;
			colors[i] = hsv2rgb(i * (360 / PendulumNumber), 80, 80);
		}
	}
	init();
	function clearCanvas() {
		cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
	}

    function drawPendulum(delta) {
        var pos_x = cvs.width / 2;
        var pos_y = 0;

		for (var iter = 0; iter * dt < delta; iter++) {
			for (var i = 0; i < PendulumNumber; i++) {
				var sgn = (omega[i] > 0 ? 1 : -1);
				omega[i] -= (g / r[i] * Math.sin(theta[i]) + sgn * k * Math.pow(omega[i], 2) ) * dt;
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
	
	$(function () {
		var timer;
		$('input').keyup(function () {
			clearTimeout(timer);
			var ms = 200; // milliseconds
			function updateTable() {
				Gamma = parseFloat($('#gamma').val()) ? parseFloat($('#gamma').val()) : Gamma;
				maxN = parseInt($('#N').val()) ? parseInt($('#N').val()) : maxN;
				theta0 = parseFloat($('#theta0').val())*(Math.PI/180) ? parseFloat($('#theta0').val())*(Math.PI/180) : theta0;
				PendulumNumber = parseInt($('#num').val()) ? parseInt($('#num').val()) : PendulumNumber;
				init();
			}
			updateTable();
		});
	});

}, 0);

//set window.requestAnimationFrame
(function(w, r) {
    w['r' + r] = w['r' + r] || w['webkitR' + r] || w['mozR' + r] || w['msR' + r] || w['oR' + r] ||
    function(c) {
        w.setTimeout(c, 1000 / 60);
    };
})(window, 'requestAnimationFrame');
