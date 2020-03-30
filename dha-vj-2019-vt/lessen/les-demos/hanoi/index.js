"use strict";
var Stok;
(function (Stok) {
    Stok[Stok["Stok1"] = 1] = "Stok1";
    Stok[Stok["Stok2"] = 2] = "Stok2";
    Stok[Stok["Stok3"] = 3] = "Stok3";
})(Stok || (Stok = {}));
var Hanoi = (function () {
    function Hanoi(aantalStenen) {
        this.aantalStenen = aantalStenen;
        this.aantalStappen = 0;
    }
    Hanoi.prototype.losop = function (hoogte, bronStok, doelStok) {
        if (hoogte === void 0) { hoogte = aantalStenen; }
        if (bronStok === void 0) { bronStok = Stok.Stok1; }
        if (doelStok === void 0) { doelStok = Stok.Stok3; }
        if (hoogte === 1) {
            this.aantalStappen++;
            console.log(this.aantalStappen + ": Verplaats steen " + hoogte + " van " + bronStok + " naar " + doelStok + ".");
        }
        else {
            var reserveStok = this.bepaalReserveStok(bronStok, doelStok);
            this.losop(hoogte - 1, bronStok, reserveStok);
            this.losop(1, bronStok, doelStok);
            this.losop(hoogte - 1, reserveStok, doelStok);
        }
    };
    Hanoi.prototype.bepaalReserveStok = function (bronStok, doelStok) {
        return 6 - bronStok - doelStok;
    };
    return Hanoi;
}());
var aantalStenen = 3;
var hanoi = new Hanoi(aantalStenen);
console.log("Start hanoi(" + aantalStenen + ")");
hanoi.losop();
var totaalAantalStappen = hanoi.aantalStappen;
if (typeof (document) !== 'undefined') {
    var aantalStappen = document.getElementById('aantalStappen');
    if (aantalStappen) {
        aantalStappen.innerText = '' + totaalAantalStappen;
    }
}
console.log("Klaar! (in " + hanoi.aantalStappen + " stappen)");
