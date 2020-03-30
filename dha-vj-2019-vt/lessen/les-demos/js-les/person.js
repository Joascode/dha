var personA = {
  naam: "Wisse",

}

var student = {
  studentno: 1231231,
  oerkreet: function () {
    console.log('5.5 is de nieuwe 10')
  }
}

personA.groet = function () {
  console.log('Hi ho, ik ben: ' + this.naam)
}

var personB = Object.assign({}, personA)
Object.assign(personB, student)
personB.naam = "Niels"
personB.oerkreet()






function blaat (zegsel) {
  console.log(zegsel, this.name)
}



function Person (name) {
  this.name = name
}

Person.prototype.greet = function () {
  console.log('prototypal inheritance baby: ' + this.name)
  console.log(this)
}

var personB = new Person('Huh')
// personB.greet()

var personA = new Person('Harry')
// personA.greet()


var el = document.querySelector('#mijn-element')
el.addEventListener('click', personA.greet.bind(personA))