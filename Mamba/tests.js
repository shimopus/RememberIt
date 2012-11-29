test("Basic working with custom event", function() {
    expect(4);

    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div></div>").children("div");

    var fixture = $fixture[0];
    var eventName = "custom";

    var fnc = function() {
        ok(true, "function was triggered");
    };

    CEvents(fixture).on(eventName, fnc);
    ok(!!fixture.events, "element has events");
    ok(fnc.$$guid, "event has $$guid");
    deepEqual(fixture.events[eventName][fnc.$$guid], fnc, "function was added as handler");

    CEvents(fixture).trigger(eventName);

    CEvents(fixture).off(eventName);

    CEvents(fixture).trigger(eventName);
});

test("Basic working with DOM event", function() {
    expect(5);

    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div></div>").children("div");

    var fixture = $fixture[0];
    var eventName = "click";  //do not chane. Not all events could be triggered

    var fnc = function() {
        ok(true, "function was triggered");
    };

    CEvents(fixture).on(eventName, fnc);
    ok(!!fixture.events, "element has events");
    ok(fnc.$$guid, "event has $$guid");
    deepEqual(fixture.events[eventName][fnc.$$guid], fnc, "function was added as handler");

    CEvents(fixture).trigger(eventName);
    fixture[eventName]();

    CEvents(fixture).off(eventName);

    CEvents(fixture).trigger(eventName);
    fixture[eventName]();
});

test("Working with on[xxx] DOM attribute", function() {
    expect(9);

    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div></div>").children("div");

    var fixture = $fixture[0];
    var eventName = "click";  //do not chane. Not all events could be triggered

    var fnc = function() {
        ok(true, "function was triggered");
    };
    var fnc2 = function() {
        ok(true, "function2 was triggered");
    };

    fixture["on" + eventName] = fnc;
    CEvents(fixture).on(eventName, fnc2);

    ok(!!fixture.events, "element has events");
    ok(fnc.$$guid, "function has $$guid");
    ok(fnc2.$$guid, "function2 has $$guid");
    deepEqual(fixture.events[eventName][fnc.$$guid], fnc, "function was added as handler");
    deepEqual(fixture.events[eventName][fnc2.$$guid], fnc2, "function2 was added as handler");

    CEvents(fixture).trigger(eventName);
    fixture[eventName]();

    CEvents(fixture).off(eventName);

    CEvents(fixture).trigger(eventName);
    fixture[eventName]();
});

test("Working with addEventListener DOM events", function() {
    expect(7);

    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div></div>").children("div");

    var fixture = $fixture[0];
    var eventName = "click";  //do not chane. Not all events could be triggered

    var fnc = function() {
        ok(true, "function was triggered");
    };
    var fnc2 = function() {
        ok(true, "function2 was triggered");
    };

    fixture.addEventListener(eventName, fnc, false);
    CEvents(fixture).on(eventName, fnc2);

    ok(!!fixture.events, "element has events");
    ok(!fnc.$$guid, "function does not have $$guid");
    ok(fnc2.$$guid, "function2 has $$guid");
    deepEqual(fixture.events[eventName][fnc2.$$guid], fnc2, "function2 was added as handler");

    CEvents(fixture).trigger(eventName);

    CEvents(fixture).off(eventName);

    CEvents(fixture).trigger(eventName); //It should trigger only native event
});

test("Create CEvents from id", function() {
    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div id=\"test\"></div>").children("div");

    var fixture = $fixture[0];

    CEvents("test");
    ok(fixture.events, "CEvents has been initialized successfully");
});

test("Add same handlers and remove specific handlers", function() {
    expect(3);

    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div></div>").children("div");
    var eventName = "mousedown";

    var fixture = $fixture[0];
    var fnc = function() {
        ok(true, "function was triggered");
    };

    //Should be added only once
    fixture["on" + eventName] = fnc;
    CEvents(fixture).on(eventName, fnc);
    CEvents(fixture).on(eventName, fnc);

    CEvents(fixture).on("custom2", fnc);

    CEvents(fixture).trigger(eventName);
    CEvents(fixture).trigger("custom2");

    CEvents(fixture).off(eventName, fnc);

    CEvents(fixture).trigger(eventName);
    CEvents(fixture).trigger("custom2");

    CEvents(fixture).off("custom2", fnc);

    CEvents(fixture).trigger(eventName);
    CEvents(fixture).trigger("custom2");
});

test("Bubble handling", function() {
    expect(1);

    var $fixture = $("#qunit-fixture");
    $fixture = $fixture.append( "<div></div>").children("div");
    var eventName = "mousedown";

    var fixture = $fixture[0];
    var fnc = function() {
        ok(true, "function was triggered");
    };

    CEvents(window.document).on(eventName, fnc);

    CEvents(fixture).trigger(eventName);

    //clear global event listeners
    CEvents(window.document).off(eventName);
});