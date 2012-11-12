(function($, undefined) {
    var placeHolder = $("<div class='placeHolder'></div>");
    var currentReplacedBlock;

    var REPLACE_SIDE = {
        TOP: "top",
        BOTTOM: "bottom",
        END: "end",
        START: "start"
    };

    function Block(blockElement) {
        this.blockElement = $(blockElement) || $("<div></div>");
        this.colNum = undefined;
        this.rowNum = undefined;
        this.top = undefined;
        this.left = undefined;
        this.width = undefined;

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
        };

        this.onDrag = function(event, ui) {
            var forReplace = this.getBlockForReplace(ui.offset);

            if (forReplace && forReplace.block !== currentReplacedBlock) {
                this.replaceWith(forReplace.block, forReplace.side);
                this.adaptToNewPlace(forReplace.block, ui.helper);
                this.putPlaceHolder();
                currentReplacedBlock = forReplace.block;
            }
        };

        this.getBlockForReplace = function(currentOffset) {
            currentOffset.width = this.blockElement.width();
            currentOffset.height = this.blockElement.height();

            var overladenColNum = this.getOverladenColNum(currentOffset);

            if (overladenColNum !== null) {
                var overladenBlock = this.getOverladenBlock(currentOffset, overladenColNum);

                if (overladenBlock.block !== null) {
                    console.log("colNum: " + overladenColNum + ", block: " + overladenBlock.block.colNum + ":" + overladenBlock.block.rowNum);
                    /*var leftBorderX = overladenBlock.block.left;
                    var rightBorderX = overladenBlock.block.left + overladenBlock.block.width;
                    var topBorderY = overladenBlock.block.top;
                    var bottomBorderY = overladenBlock.block.top + overladenBlock.block.height;


                    var blockCenterCoords = {
                        top: currentOffset.top + Math.round(this.height / 2),
                        left: currentOffset.left + Math.round(this.width / 2)
                    };

                    if (!((leftBorderX <= blockCenterCoords.left && rightBorderX >= blockCenterCoords.left)
                        &&
                        (topBorderY <= blockCenterCoords.top && bottomBorderY >= blockCenterCoords.top))) {
                        return null;
                    }*/

                    if (overladenBlock.block.rowNum === 0) {

                    }
                }

                return overladenBlock;
            }

            return null;
        };

        this.getOverladenColNum = function(currentOffset) {
            var maxIntersect = -1;
            var overladenColNum = null;

            $.each(columns, function(colNum, columnDesc) {
                var currentMax = Math.max(maxIntersect, getBlocksIntersection(currentOffset, columnDesc));

                if (currentMax !== maxIntersect) {
                    overladenColNum = colNum;
                    maxIntersect = currentMax;
                }
            });

            if (maxIntersect > 0) {
                return overladenColNum;
            }

            return null;
        };

        this.getOverladenBlock = function(currentOffset, overladenColNum) {
            var _this = this;
            var maxOverlay = -1;
            var maxOverlayBlock = null;
            var lastBlock = null;

            $.each(blocksGrid, function (colNum) {
                $.each(blocksGrid[colNum], function (rowNum, block) {
                    if (block === _this || block.colNum !== overladenColNum) {
                        return true; //continue
                    }

                    lastBlock = block;

                    var blockOffset = block.blockElement.offset();
                    blockOffset.width = block.blockElement.width();
                    blockOffset.height = block.blockElement.height();

                    var overlayFactor = getBlocksIntersection(blockOffset, currentOffset);
                    if (Math.max(maxOverlay, overlayFactor) === overlayFactor) {
                        maxOverlay = overlayFactor;
                        maxOverlayBlock = block;
                    }
                });
            });

            if (maxOverlay <= 0) {
                return {
                    block: lastBlock,
                    side: REPLACE_SIDE.END
                };
            }

            return {
                block: maxOverlayBlock,
                side: REPLACE_SIDE.BOTTOM
            };
        };

        this.onDragStop = function() {
            this.removePlaceHolder();
            this.width = this.blockElement.width();
        };

        this.adaptToNewPlace = function(blockForReplace, draggableHelper){
            draggableHelper.css({
                width: blockForReplace.width
            });

            var replacedRowNum = blockForReplace.rowNum;
            var replacedColNum = blockForReplace.colNum;
            blockForReplace.colNum = this.colNum;
            blockForReplace.rowNum = this.rowNum;
            this.colNum = replacedColNum;
            this.rowNum = replacedRowNum;
        };

        this.replaceWith = function(blockForReplace, side) {
            switch (side) {
                case REPLACE_SIDE.TOP: {
                    blockForReplace.blockElement.before(this.blockElement);
                    break;
                }

                case REPLACE_SIDE.BOTTOM: {
                    blockForReplace.blockElement.after(this.blockElement);
                    break;
                }

                case REPLACE_SIDE.START: {
                    break;
                }

                case REPLACE_SIDE.END: {
                    blockForReplace.blockElement.parent().append(this.blockElement);
                    break;
                }
            }
            if (side === REPLACE_SIDE.TOP) {

            } else if (side === REPLACE_SIDE.BOTTOM) {

            }
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
    var columns = [];

    //--------------------------------------------    UTILS    --------------------------------------------------------
    function getBlocksIntersection(firstBlock, secondBlock) {
        var x0 = Math.max(firstBlock.left, secondBlock.left);
        var x1 = Math.min(firstBlock.left + firstBlock.width, secondBlock.left + secondBlock.width);

        if (x0 <= x1) {
            var y0 = Math.max(firstBlock.top, secondBlock.top);
            var y1 = Math.min(firstBlock.top + firstBlock.height, secondBlock.top + secondBlock.height);

            if (y0 <= y1) {
                return (x1 - x0) * (y1 - y0);
            }
        }
        return -1;
    }

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

    function addColumn(colNum, td) {
        td = $(td);
        var columnOffset = td.offset();
        columns[colNum] = {
            top: columnOffset.top,
            left: columnOffset.left,
            width: td.width(),
            height: td.height()
        }
    }

    //-----------------------------------------    START POINT    -----------------------------------------------------
    $(function () {
        $("#widgetsContainer tr").each(function (index, tr){
            $(tr).find("td").each(function(colNum, td) {
                addColumn(colNum, td);
                $(td).find(".block").each(function(rowNum, block) {
                    addBlock(colNum, rowNum, new Block(block).initialize());
                });
            });
        });
    });
})(jQuery);
