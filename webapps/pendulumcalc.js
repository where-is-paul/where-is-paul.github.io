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

$(function () {
    var timer;
    $('input').keyup(function () {
        clearTimeout(timer);
        var ms = 200; // milliseconds
        var gamma = parseFloat($('#gamma').val());
        var N = parseInt($('#N').val());
        var theta0 = parseFloat($('#theta0').val())*(Math.PI/180);
        var num = parseInt($('#num').val());

        var grav = 9.81;
        var updateTable = function () {
            if (!num) num = 15;
            
            var list = $('#results');
            list.find("tr:gt(0)").remove();
            var func = function (x) {
                return f(theta0, x);
            }
            var I = integrate(func, 0, Math.PI / 2);
            for (var n = 0; n < num; n++) {
                var len = grav * Math.pow(gamma / (4 * I * (N + n)), 2);

                var tr = $('<tr>');

                var idx = $('<td>');
                idx.append(n);
                var res = $('<td>');
                res.append(len.toFixed(5));

                tr.append(idx);
                tr.append(res);

                list.append(tr);
            }
        }
        if (gamma && N && (theta0 || theta0 < 1e-8)) timer = setTimeout(updateTable, ms);
    });
});