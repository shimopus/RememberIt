(function(undefined) {
    var CEvents = function (element) {
        return new CEvents.obj(element);
    };

    CEvents.obj = function(element) {
        if (!element.customEvents) {
            element.customEvents = {};
        }

        /**
         * Adds custom handler to element which cold be called by CEvents.trigger()
         *
         * @param type - type of event
         * @param handler - method which should be called when trigger method executes
         */
        this.on = function(type, handler) {
            if (!element ||
                element.nodeType === 2 /*attribute node*/ ||
                element.nodeType === 3 /*text node*/ ||
                element.nodeType === 8 /*comment node*/ ||
                !handler ||
                typeof handler !== "function") {
                return; //do not add handler
            }

            var handlers = element.customEvents[type];

            if (!handlers) {
                element.customEvents[type] = handlers = [];
            }

            handlers.push(handler);
        };

        /**
         * Removes all custom handlers from element by type
         *
         * @param type
         */
        this.off = function(type) {
            delete element.customEvents[type];
        };

        /**
         * Executes all custom handlers added to element
         *
         * @param type - type of custom handlers
         * @param arg1,...,argn - optional. Arguments that will be passed in each handler
         */
        this.trigger = function(type/*[, arg1[,...,argn]]*/) {
            var handlers = element.customEvents[type];

            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i];
                    handler.apply(element, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
    };

    window.CEvents = CEvents;
})();