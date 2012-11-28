(function(undefined) {
    /**
     * CEvent module unify work with events in all modern browsers and IE7+
     *
     * @param element - DOM node or string to find by id
     * @return helper object assigned with element
     * @constructor
     */
    var CEvents = function (element/*or id as string*/) {
        //Is it DOM node?
        if (!element.tagName) {
            element = document.getElementById(element);
        }
        return new CEvents.obj(element)
    };

    CEvents.event = {
        /**
         * Adds preventDefault and stopPropagation methods for IE as in W3C spec.
         */
        fix: function(realEvent){
            if (!realEvent.preventDefault) {
                realEvent.preventDefault = function() {
                    this.returnValue = false;
                };

                realEvent.stopPropagation = function() {
                    this.cancelBubble = true;
                };
            }

            return realEvent;
        }
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

            //Add handleEvent as handler for this type of actions. Initialize handlers.
            if (!handlers) {
                element.customEvents[type] = handlers = [];
                //Check if on[xxx] attribute assigned
                if (element["on" + type]) {
                    handlers.push(element["on" + type]);
                    element["on" + type] = null;
                }

                if (element.addEventListener) {
                    element.addEventListener(type, this.handleEvent, false);

                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, this.handleEvent);
                }
            }

            handlers.push(handler);
        };

        this.handleEvent = function () {
            var event = CEvents.event.fix(event || window.event);
            var returnValue = true;
            var handlers = element.customEvents[event.type];

            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i];
                    if (handler.call(element, event) === false) {
                        returnValue = false;
                    }
                }
            }

            return returnValue;
        };

        /**
         * Removes all custom handlers from element by type
         *
         * @param type
         */
        this.off = function(type) {
            if (!element ||
                element.nodeType === 2 /*attribute node*/ ||
                element.nodeType === 3 /*text node*/ ||
                element.nodeType === 8 /*comment node*/
                ) {
                return; //do not remove handler
            }

            delete element.customEvents[type];
        };

        /**
         * Executes all custom handlers added to element
         *
         * @param type - type of custom handlers
         * @param arg1,...,argn - optional. Arguments that will be passed in each handler
         */
        this.trigger = function(type/*[, arg1[,...,argn]]*/) {
            if (!element ||
                element.nodeType === 2 /*attribute node*/ ||
                element.nodeType === 3 /*text node*/ ||
                element.nodeType === 8 /*comment node*/
                ) {
                return; //do not fire event
            }

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