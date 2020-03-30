function Animal(age,  name) {
  this.age = age
  this.name = name
}

Animal.prototype.toString = function () {
  return 'Hi I\'m ' + this.name + ' and I\'m ' + this.age + ' years old'
}

function Dog (age, name) {
  // super call
  Animal.call(this, age, name);
}
Dog.prototype = Animal.prototype

Dog.prototype.greet = function () {
  console.log('woof')
}

var dog = new Dog(3, 'Johnny')
dog.greet()
console.log(dog.age)

var otherDog = Object.create(Dog.prototype)
console.log(otherDog.toString())
otherDog.greet()
console.log(otherDog.age)

var anotherDog = Object.create(Dog.prototype, {
  age: { writable: true, value: 3},
  name: {writable: true, value: 'Beethoven'}
})
console.log(anotherDog.toString())