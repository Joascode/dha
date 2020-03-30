var erree = ["ienie", "mienie", "meinie", "moe"];

console.log("start");
erree.forEach(function(el, index) {
    console.log(`${index}. El: ${el}`);
})
console.log("einde");

console.log("start");
erree.forEach(function(el, index) {
    setTimeout(function() {
        console.log(`${index}. El ${el}`);
    }, 0);
});
console.log("einde");