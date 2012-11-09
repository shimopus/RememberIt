(function($, undefined) {
    function Block(blockElement) {
        var Direction = {
            UP: "up",
            DOWN: "down",
            LEFT: "left",
            RIGHT: "right"
        };

        this.blockElement = $(blockElement) || $("<div></div>");
        this.realParent = this.blockElement.parent();
        this.colNum = undefined;
        this.rowNum = undefined;
        this.top = undefined;
        this.left = undefined;
        this.width = undefined;
        this.height = undefined;

        this.placeHolder = $("<div class='placeHolder'></div>");

        this.initialize = function() {
            this.blockElement.draggable({
                opacity: 0.5,
                revert: "invalid",
                zIndex: 100000
            });
            this.bindListeners();
            return this;
        };

        this.bindListeners = function() {
            this.blockElement.on("dragstart", bind(this.onDragStart, this));
            this.blockElement.on("drag", bind(this.onDrag, this));
            this.blockElement.on("dragstop", bind(this.onDragStop, this));
        };

        this.onDragStart = function() {
            this.putPlaceHolder();
            console.log("start");
        };

        this.prevOffset = null;

        this.onDrag = function(event, ui) {
            var currentOffset = ui.offset;

            //Determine direction
            if (!this.prevOffset) {
                return true;
            }

            var direction;
            var verticalDirection = {
                value: currentOffset.top - this.prevOffset.top,
                direction: this.value > 0 ? Direction.DOWN : Direction.UP
            };
            var horizontalDirectionVal = {
                value: currentOffset.left - this.prevOffset.left,
                direction: this.value > 0 ? Direction.RIGHT : Direction.LEFT
            };

            if (Math.max(Math.floor(verticalDirection.value), Math.floor(horizontalDirectionVal.value)) === Math.floor(verticalDirection.value)) {
                direction = verticalDirection.direction;
            } else {
                direction = horizontalDirectionVal.direction;
            }

            this.prevOffset = currentOffset;



            console.log("drag");
        };

        this.getOverladenBlock = function(direction) {
            var _this = this;
            $(blocksGrid).each(function(colNum, col) {
                $(blocksGrid[colNum]).each(function(rowNum, block) {
                    switch (direction) {
                        case Direction.UP: {
                            if (rowNum >= 1) {
                                var borderCoords = {
                                    top: _this.top,
                                    left: _this.left
                                };

                                for (var i = rowNum; i < blocksGrid[colNum].length; i--) {
                                    var block = blocksGrid[colNum][i];
                                    var blockOffset = block.offset();
                                    var center = {
                                        top: Math.round(blockOffset.top/2),
                                        left: Math.round(blockOffset.left/2)
                                    }
                                }

                            }
                            break;
                        }
                    }

                    return null;
                })
            });
        };

        this.onDragStop = function() {
            this.removePlaceHolder();
            console.log("stop");
        };

        this.putPlaceHolder = function() {
            $("body").append(this.placeHolder);
            var offset = this.blockElement.offset();
            this.placeHolder.css({
                width: this.blockElement.width() + 2 + "px",
                height: this.blockElement.height() + 2 + "px",
                top: offset.top - 1 + "px",
                left: offset.left - 1 + "px"
            });
        };

        this.removePlaceHolder = function() {
            this.placeHolder.remove();
        };
    }

    var blocksGrid = [{

    }];

    //--------------------------------------------    UTILS    --------------------------------------------------------
    function bind(func, context /*, args*/) {
        var bindArgs = Array.prototype.slice.call(arguments, 2);
        function wrapper() {
            var args = Array.prototype.slice.call(arguments);
            var unshiftArgs = bindArgs.concat(args);
            return func.apply(context, unshiftArgs);
        }
        return wrapper;
    }

    function addBlock(colNum, rowNum, block) {
        if (!blocksGrid[colNum]) {
            blocksGrid[colNum] = []
        }

        if (!blocksGrid[colNum][rowNum]) {
            blocksGrid[colNum][rowNum] = [];
        }

        blocksGrid[colNum][rowNum].push(block);
        block.colNum = colNum;
        block.rowNum = rowNum;

        var offset = block.blockElement.offset();

        block.top = offset.top;
        block.left = offset.left;
        block.width = block.blockElement.width();
        block.height = block.blockElement.height();
    }

    //-----------------------------------------    START POINT    -----------------------------------------------------
    $(function () {
        $("#widgetsContainer tr").each(function (index, tr){
            $(tr).find("td").each(function(rowNum, td) {
                $(td).find(".block").each(function(colNum, block) {
                    addBlock(colNum, rowNum, new Block(block).initialize());
                });
            });
        });
    });
})(jQuery);
