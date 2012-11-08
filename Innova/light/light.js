(function (Raphael, $) {
    "use strict"

    function Coordinates(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;

        this.fromElement = function(element) {
            var currentOffset = element.offset();
            this.x = currentOffset.left;
            this.y = currentOffset.top;
            this.width = element.width();
            this.height = element.height();

            return this;
        }
    }

    function Canvas() {
        this.coordinates = new Coordinates();
        this.path = {
            x: 0, y: 0,
            x1: 0, y1: 0,
            x2: 0, y2: 0
        };
    }

    function getCanvasAttributes(start, end) {
        var startCoords = new Coordinates().fromElement(start);
        var endCoords = new Coordinates().fromElement(end);
        var canvasPath;


        if (startCoords.x < endCoords.x && startCoords.y < endCoords.y
            ||
            startCoords.x >= endCoords.x && startCoords.y >= endCoords.y) {
            canvasPath = {
                x1: endCoords.x + endCoords.width, y1: endCoords.y,
                x2: endCoords.x, y2: endCoords.y + endCoords.height
            };
            //Start - in left top  End - in right bottom
            if (startCoords.x < endCoords.x && startCoords.y < endCoords.y) {
                canvasPath.x = startCoords.x + startCoords.width;
                canvasPath.y = startCoords.y + startCoords.height;
            } else
            //Start - in right bottom End - in left top
            {
                canvasPath.x = startCoords.x;
                canvasPath.y = startCoords.y;
            }
        } else
        if (startCoords.x < endCoords.x && startCoords.y >= endCoords.y
            ||
            startCoords.x >= endCoords.x && startCoords.y < endCoords.y) {
            canvasPath = {
                x1: endCoords.x, y1: endCoords.y,
                x2: endCoords.x + endCoords.width, y2: endCoords.y + endCoords.height
            };

            //Start - in left bottom End - in right top
            if (startCoords.x < endCoords.x && startCoords.y >= endCoords.y) {
                canvasPath.x = startCoords.x + startCoords.width;
                canvasPath.y = startCoords.y;
            } else
            //Start - in right top End - in left bottom
            {
                canvasPath.x = startCoords.x;
                canvasPath.y = startCoords.y + startCoords.height;
            }
        }

        var canvas = new Canvas();
        canvas.coordinates = getCanvasCoordinatesByPath(canvasPath);
        canvas.path = makeCanvasPathRelative(canvasPath, canvas.coordinates);

        return canvas;
    }

    function getCanvasCoordinatesByPath(canvasPath) {
        var coordinates = new Coordinates();
        coordinates.x = Math.min(canvasPath.x, canvasPath.x1, canvasPath.x2);
        coordinates.y = Math.min(canvasPath.y, canvasPath.y1, canvasPath.y2);
        coordinates.width = Math.max(canvasPath.x, canvasPath.x1, canvasPath.x2) - coordinates.x;
        coordinates.height = Math.max(canvasPath.y, canvasPath.y1, canvasPath.y2) - coordinates.y;

        return coordinates;
    }

    function makeCanvasPathRelative(canvasPath, canvasCoords) {
        var path = {};
        path.x = canvasPath.x - canvasCoords.x;
        path.x1 = canvasPath.x1 - canvasCoords.x;
        path.x2 = canvasPath.x2 - canvasCoords.x;
        path.y = canvasPath.y - canvasCoords.y;
        path.y1 = canvasPath.y1 - canvasCoords.y;
        path.y2 = canvasPath.y2 - canvasCoords.y;

        return path;
    }

    var paper;

    function initializeCanvas(start, end) {
        var canvas = getCanvasAttributes(start, end);

        drawLight(canvas);
    }

    function reinitializeCanvas(start, end) {
        paper.remove();
        initializeCanvas(start, end);
    }

    function drawLight(canvas) {
        paper = Raphael(
            canvas.coordinates.x, canvas.coordinates.y,
            canvas.coordinates.width, canvas.coordinates.height);

        paper.path(Raphael.format("M{0},{1}L{2},{3}L{4},{5}L{6},{7}z",
            canvas.path.x, canvas.path.y,
            canvas.path.x1, canvas.path.y1,
            canvas.path.x2, canvas.path.y2,
            canvas.path.x, canvas.path.y))
            .attr({
                fill: "90-#fff:5-#000:95",
                "fill-opacity": "0.5",
                stroke: "none",
                opacity: "0.05"
            });
    }

    function initDnDAndResize(start, end) {
        var reinit = function () {
            reinitializeCanvas(start, end);
        };

        $.each([start, end], function (i, element) {
            element.draggable({
                drag: reinit,
                stop: reinit
            }).resizable({
                    resize: reinit,
                    stop: reinit
                });
        });
    }

    $(function() {
        var start = $("#start");
        var end = $("#end");
        initializeCanvas(start, end);
        initDnDAndResize(start, end);
    });
})(Raphael, jQuery);