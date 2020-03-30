var Test;
(function (Test) {
    var Counter = function (start) {
        var counter;
        function getValue() {
            return counter;
        }
        function inc() {
            counter += 1;
        }
        function reset() {
            counter = start || 0;
        }
        if (start !== undefined && typeof start !== "number") {
            throw Error("Parameter 'start' moet een number zijn, of leeg; niet '" + start + "'!");
        }
        reset();
        // Voorbeeld van een 'revealing module' pattern.
        return { inc: inc, getValue: getValue, reset: reset };
    };
    var counter1 = Counter();
    counter1.inc();
    var counter2 = Counter(counter1.getValue());
    counter2.inc();
    counter1.reset();
    console.log("Counter 1: " + counter1.getValue());
    console.log("Counter 2: " + counter2.getValue());
})(Test || (Test = {}));
