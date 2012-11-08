(function (Raphael, $) {
    "use strict"

    $(function() {
        initializeCanvas("canvas", "start", "end");
    });

    function getCanvasAttributes(startElementId, endElementId) {
        var start = $("#" + startElementId);
        var end = $("#" + endElementId);

        var startCoords = start.offset();
        var endCoords = end.offset();
        var canvasCoords = {};

        if (startCoords.left > endCoords.left) {
            canvasCoords.left = endCoords.left;
        } else {
            canvasCoords.left = startCoords.left;
        }
        canvasCoords.width = Math.abs(startCoords.left - endCoords.left);

        if (startCoords.top > endCoords.top) {
            canvasCoords.top = endCoords.top;
        } else {
            canvasCoords.top = startCoords.top;
        }
        canvasCoords.height = Math.abs(startCoords.top - endCoords.top);

        return canvasCoords;
    }

    function initializeCanvas(canvasId, startElementId, endElementId) {
        var canvasCoords = getCanvasAttributes(startElementId, endElementId);

        drawLight("#" + canvasId, canvasCoords);
    }

    function drawLight(canvasId, canvasCoords) {
        var paper = Raphael(canvasCoords.top, canvasCoords.left, canvasCoords.width, canvasCoords.height);

        paper.ellipse(canvasCoords.top, canvasCoords.left, 100, 100).attr({fill: "r(.8,.8) white-green", stroke: "none"});
    }
})(Raphael, jQuery);