(function() {
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

    /**
     * Helper for CEvents work
     *
     * @type {Object}
     */
    CEvents.event = {
        $$guid: 1, //Unique counter

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
        },

        handleEvent: function () {
            var event = CEvents.event.fix(event || window.event);
            var returnValue = true;
            var handlers = this.events[event.type];

            if (handlers) {
                for (var i in handlers) {
                    if (handlers.hasOwnProperty(i)) {
                        var handler = handlers[i];
                        if (handler.call(this, event) === false) {
                            returnValue = false;
                        }
                    }
                }
            }

            return returnValue;
        }
    };

    CEvents.obj = function(element) {
        if (!element.events) {
            element.events = {};
        }

        /**
         * Adds handler to element which cold be called by CEvents.trigger()
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

            var handlers = element.events[type];

            //Add handleEvent as handler for this type of actions. Initialize handlers.
            if (!handlers) {
                element.events[type] = handlers = {};
                //Check if on[xxx] attribute assigned
                if (element["on" + type]) {
                    handlers[0] = element["on" + type];
                    element["on" + type] = null;
                }

                if (element.addEventListener) {
                    element.addEventListener(type, CEvents.event.handleEvent, false);

                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, CEvents.event.handleEvent);
                }
            }

            if (!handler.$$guid) {
                handler.$$guid = CEvents.event.$$guid++;
            }

            //Do not add the same handlers twice
            handlers[handler.$$guid] = handler;
        };

        /**
         * Removes all handlers from element by type.
         * Parameter handler is optional. It will be deleted all handlers of this type if it was not defined.
         *
         * @param type
         * @param handler - handler which you want to delete
         */
        this.off = function(type, handler) {
            if (!element ||
                element.nodeType === 2 /*attribute node*/ ||
                element.nodeType === 3 /*text node*/ ||
                element.nodeType === 8 /*comment node*/
                ) {
                return; //do not remove handler
            }

            var handlers = element.events[type];
            if (handlers) {
                //remove specific handler
                if (handler) {
                    if (handlers[handler.$$guid]) {
                        delete handlers[handler.$$guid];
                    }
                } else { //otherwise remove all handlers
                    if (element.removeEventListener) {
                        element.removeEventListener(type, CEvents.event.handleEvent, false);
                    } else if (element.detachEvent) {
                        element.detachEvent(type, CEvents.event.handleEvent);
                    }
                    delete element.events[type];
                }
            }
        };

        /**
         * Executes all handlers added to element
         *
         * @param type - type of handlers
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

            //Get nodes for bubble events
            var path = [];

            var elem = element;
            var last = elem;

            for (; elem; elem = elem.parentNode) {
                path.push(elem);
                last = elem;
            }

            // Add window only if we have document
            if (last === (element.ownerDocument || document)) {
                //Add window correct if node have been detached or not added in document
                path.push(element.defaultView || element.parentWindow || window);
            }

            //Execute handlers
            for (var i = 0; i < path.length; i++) {
                elem = path[i];
                if (elem.events) {
                    var handlers = elem.events[type];

                    if (handlers) {
                        for (i in handlers) {
                            if (handlers.hasOwnProperty(i)) {
                                handlers[i].apply(element, Array.prototype.slice.call(arguments, 1));
                            }
                        }
                    }
                }
            }
        };
    };

    window.CEvents = CEvents;
})();