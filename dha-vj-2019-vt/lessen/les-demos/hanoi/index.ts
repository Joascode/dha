  enum Stok {
    Stok1 = 1,
    Stok2 = 2,
    Stok3 = 3,
  }

class Hanoi {
  constructor(private aantalStenen: number) {
  }

  aantalStappen = 0;

  losop(hoogte=aantalStenen, bronStok=Stok.Stok1, doelStok=Stok.Stok3) {
    if (hoogte===1) {
      this.aantalStappen++;
      console.log(`${this.aantalStappen}: Verplaats steen ${hoogte} van ${bronStok} naar ${doelStok}.`);
    } else {
      let reserveStok = this.bepaalReserveStok(bronStok, doelStok);
      this.losop(hoogte-1, bronStok, reserveStok);
      this.losop(1, bronStok, doelStok);
      this.losop(hoogte-1, reserveStok, doelStok);
    }
  }

  private bepaalReserveStok(bronStok: Stok, doelStok: Stok): Stok {
    return 6 - bronStok - doelStok;
  }

}

var aantalStenen = 3;
let hanoi = new Hanoi(aantalStenen);

console.log(`Start hanoi(${aantalStenen})`);
hanoi.losop();
let totaalAantalStappen = hanoi.aantalStappen;
if (typeof(document)!=='undefined') {
  let aantalStappen = document.getElementById('aantalStappen');
  if (aantalStappen) {
    aantalStappen.innerText = ''+totaalAantalStappen;
  }
}
console.log(`Klaar! (in ${hanoi.aantalStappen} stappen)`);
