=== Dha toren van Hanoi
Zie ook: https://codepen.io/bartvanderwal/post/hanoi

# Dha toren van Hanoi

Een niet triviaal voorbeeld van recursie. Veel beter dan het meestal aangehaalde faculteit (4!) of de Fibonnaci reeks. Zo wordt het ook opgevoerd als voorbeeld van recursie door Douglas Crockford in zijn boek 'JavaScript, the good parts'. Leuk voorbeeld voor demo van functionele JavaScript. Of TypeScript; want laten we wel wezen alle 'echte' functionele programmeertalen zijn statisch getypeerd.

```
enum Rods {
  Rod1 = 1, Rod2 = 2, Rod3 = 3
}

class Hanoi {
  constructor(private nrOfStones: number) {
  }

  public nrOfSteps = 0;

  solve(height=this.nrOfStones, source=Rods.Rod1, dest=Rods.Rod3) {
    if (height===1) {
      this.nrOfSteps++;
      console.log(`${this.nrOfSteps}: Move peg from rod ${source} to rod ${dest}.`);
    } else {
      let spareRod = this.determineSpareRod(source, dest);
      this.solve(height-1, source, spareRod);
      this.solve(1, source, dest);
      this.solve(height-1, spareRod, dest);
    }
  }

  private determineSpareRod(source: Rod, dest: Rod): Rod {
    return 6 - source - dest;
  }
}

let nrOfPegs = 4;
let hanoi = new Hanoi(nrOfPegs);
hanoi.solve();
console.log(`Done! (in ${hanoi.nrOfSteps} steps)`);
```