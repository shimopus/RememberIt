(function($, undefined) {
    var placeHolder = $("<div class='placeHolder'></div>");
    var currentReplacedBlock;

    function Block(blockElement) {
        this.blockElement = $(blockElement) || $("<div></div>");
        this.colNum = undefined;
        this.rowNum = undefined;
        this.top = undefined;
        this.left = undefined;
        this.width = undefined;
        this.height = undefined;

        this.initialize = function() {
            this.blockElement.draggable({
                helper: "clone",
                opacity: 0.5,
                revert: "invalid",
                revertDuration: 0,
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

        this.onDragStart = function(event, ui) {
            this.putPlaceHolder();
            ui.helper.css({
                width: this.width
            });
            console.log("start");
        };

        this.onDrag = function(event, ui) {
            var blockForReplace = this.getBlockForReplace(ui.offset);

            if (blockForReplace && blockForReplace !== currentReplacedBlock) {
                this.showPlaceForInsert(blockForReplace);
                ui.offset.top -= blockForReplace.height;
                console.log("drag " + blockForReplace.blockElement.html());
                currentReplacedBlock = blockForReplace;
            }
        };

        this.getBlockForReplace = function(currentOffset) {
            var overladenBlock = this.getOverladenBlock(currentOffset);
            if (overladenBlock != null) {
                var leftBorderX = overladenBlock.left;
                var rightBorderX = overladenBlock.left + overladenBlock.width;
                var topBorderY = overladenBlock.top;
                var bottomBorderY = overladenBlock.top + overladenBlock.height;


                var blockCenterCoords = {
                    top: currentOffset.top + Math.round(this.height / 2),
                    left: currentOffset.left + Math.round(this.width / 2)
                };

                if (!((leftBorderX <= blockCenterCoords.left && rightBorderX >= blockCenterCoords.left)
                    &&
                    (topBorderY <= blockCenterCoords.top && bottomBorderY >= blockCenterCoords.top))) {
                    return;
                }
            } else {
                return null;
            }

            return overladenBlock;
        };

        this.getOverladenBlock = function(currentOffset) {
            var _this = this;
            var maxOverlay = 1;
            var maxOverlayBlock = null;

            $.each(blocksGrid, function (colNum) {
                $.each(blocksGrid[colNum], function (rowNum, block) {
                    if (block.colNum === _this.colNum && block.rowNum === _this.rowNum) {
                        return true; //continue
                    }

                    /*var blockOffset = block.blockElement.offset(); //TODO Optimize it
                    blockOffset.width = block.width;
                    blockOffset.height = block.height;*/

                    currentOffset.width = _this.width;
                    currentOffset.height = _this.height;

                    var overlayFactor = _this.getBlocksIntersection(/*blockOffset*/block, currentOffset) || 0;
                    if (Math.max(maxOverlay, overlayFactor) === overlayFactor) {
                        maxOverlay = overlayFactor;
                        maxOverlayBlock = block;
                    }
                });
            });

            return maxOverlayBlock;
        };

        this.getBlocksIntersection = function(firstBlock, secondBlock) {
            var x0 = Math.max(firstBlock.left, secondBlock.left);
            var x1 = Math.min(firstBlock.left + firstBlock.width, secondBlock.left + secondBlock.width);

            if (x0 <= x1) {
                var y0 = Math.max(firstBlock.top, secondBlock.top);
                var y1 = Math.min(firstBlock.top + firstBlock.height, secondBlock.top + secondBlock.height);

                if (y0 <= y1) {
                    return (x1 - x0) * (y1 - y0);
                }
            }
            return null;
        };

        this.onDragStop = function() {
            this.removePlaceHolder();
            this.width = this.blockElement.width();
            console.log("stop");
        };

        this.showPlaceForInsert = function(blockForReplace) {
            blockForReplace.blockElement.after(this.blockElement);

            this.blockElement.css({
                width: blockForReplace.width,
                top: 0,
                left: 0
            });

            this.putPlaceHolder();

            var replacedRowNum = blockForReplace.rowNum;
            var replacedColNum = blockForReplace.colNum;
            blockForReplace.colNum = this.colNum;
            blockForReplace.rowNum = this.rowNum;
            this.colNum = replacedColNum;
            this.rowNum = replacedRowNum;
        };

        this.putPlaceHolder = function(top, left, width, height) {
            $("body").append(placeHolder);

            var offset = this.blockElement.offset();
            placeHolder.css({
                width: width || this.blockElement.width() + 2 + "px",
                height: height || this.blockElement.height() + 2 + "px",
                top: top || offset.top - 1 + "px",
                left: left || offset.left - 1 + "px"
            }).show();
        };

        this.removePlaceHolder = function() {
            placeHolder.hide();
        };
    }

    var blocksGrid = [];

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

        blocksGrid[colNum][rowNum] = block;
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
            $(tr).find("td").each(function(colNum, td) {
                $(td).find(".block").each(function(rowNum, block) {
                    addBlock(colNum, rowNum, new Block(block).initialize());
                });
            });
        });
    });
})(jQuery);
