console.log("test");
var persoon = {};
persoon.naam = function() { return this.voornaam + " " + this.achternaam; };

console.log("test 2");

function Person(voornaam, achternaam) {
  this.voornaam = voornaam;
  this.achternaam = achternaam;
  this.prototype = persoon;
}

console.log("test 3");

var janssen = new Person("Jan", "Janssen");
// jansen.voornaam = "Jans";
console.log(janssen.naam);

console.log("test 4");
