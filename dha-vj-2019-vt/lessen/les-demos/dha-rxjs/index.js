/* Without key selector */
Rx = require("rxjs")
var source = Rx.Observable.from([
    42, 42, 24, 42, 24
])
.distinct();

var subscription = source.subscribe(
    (x) => { console.log('Next: ' + x.toString()); },
    (err) => { console.log('Error: ' + err); },
    () => { console.log('Completed'); });