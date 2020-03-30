# JavaScript start

Als het goed is heeft iedereen nu node geinstalleerd en snapt deze naar aanleiding
van de video's hoe JavaScript in grote lijnen werkt.

We gaan nu kijken hoe javascript quirks in de praktijk werken.

* scope en hoisting & (iife)
* prototypal inheritance
* this en event listeners

# Scoping & Hoisting en dat voorkomen
De scope van js is niet altijd veilig.

Bekijk de volgende volgorde en voorspel wat er gaat gebeuren op de console:

```js
var foo = 'foo';
foobar();

bar = "jean jacques";
console.log(foo, bar, baz, hendrik)
var baz;

function foobar () {
  hendrik = "hallo"
  console.log('hello from foobar')
}
```


```js
console.log(local);
var local = "global";

(function () {
  local = "local";
  console.log(local);
})();

console.log(local);
```

## Prototype
Classes bestaan niet echt in JS, maar prototypes:

Dus bijvoorbeeld een 
```java
public class Animal {
    int age;
    public Animal(int age) {
        this.age = age;
    }
    abstract public void greet () 
}

public class Dog extends Animal {
    public void greet() {
        System.out.println('woof');
    }
}

public class Cat extends Animal {
    public void greet() {
        System.out.println('meow');
    }
}
```

Zou strict genomen niet kunnen bestaan.

```js
function Animal(age) {
  this.age = age
}


function Dog (age) {
  // super call
  Animal.call(this, age);

  
  this.greet = function () {
      console.log('woof')
  }
}

var dog = new Dog(3)
dog.greet()
console.log(dog.age)
```

## This en event listeners
Schrijf in de browser omgeving een eventlistener voor een html-dom object:
```html
<div id="mijn-element"></div>
```

Tip gebruik [`.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) en [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
```js
var el = document.querySelector('css-query')
el.addEventListener // zoek op in MDN documentatie.