import { Component } from '@angular/core';

enum Operands {
  plus = '+',
  minus = '-',
  multiplication = '×',
  divide = '÷',
  percent = '%',
  plusMinus = '±',
  comma = ',',
  equals = '=',
  openBracket = '(',
  closedBracket = ')',
  squareRoot = '²√x',
  squared = 'x²',
  sinus = 'sin',
  sinusH = 'sinh',
  second = '2ⁿᵈ',
  oneDivided = '1/x',
  notX = 'x!',
  rad = 'Rad',
  degrees = 'Deg',
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  displayValue = '0';
  currentOperand = '';
  operands = Operands;
  isUserTyping = false;
  previousValue: number | undefined;
  percentValue = false;
  portait = true;
  useRadius = true;
  get currentValue() {
    return parseFloat(this.displayValue);
  }

  constructor() {
    this.clearAll();
  }

  clearAll() {
    this.displayValue = '0';
    this.isUserTyping = false;
  }

  touchDigit(event: MouseEvent) {
    let digit = (<HTMLButtonElement>event.target).innerText;
    console.log(digit);
    if (digit === Operands.comma) {
      digit = '.';
    }
    if (!this.isUserTyping) {
      this.displayValue = digit;
      this.isUserTyping = true;
    } else {
      this.displayValue += digit;
    }
  }

  touchUnaryOperand(event: MouseEvent) {
    const operand = (<HTMLButtonElement>event.target).innerText;
    console.log(operand);
    console.log(this.operands.sinus);
    console.log(this.operands.sinusH);
    console.log(operand === Operands.sinus);
    console.log(operand === Operands.sinusH);
    switch (operand) {
      case Operands.percent:
        if (this.percentValue) {
          this.displayValue = (this.currentValue * 100).toString();
          this.percentValue = false;
        } else {
          this.displayValue = (this.currentValue / 100).toString();
          this.percentValue = true;
        }
        break;
      case Operands.plusMinus:
        console.log(Operands.plusMinus);
        this.displayValue = (-1 * this.currentValue).toString();
        break;
      case Operands.squared:
        console.log(Operands.squared);
        this.displayValue = (this.currentValue * this.currentValue).toString();
        break;
      case Operands.squareRoot:
        console.log(Operands.squareRoot);
        this.displayValue = Math.sqrt(this.currentValue).toString();
        break;
      case Operands.oneDivided:
        console.log(Operands.oneDivided);
        this.displayValue = (1 / this.currentValue).toString();
        break;
      case Operands.notX:
        console.log(Operands.notX);
        let notXAccumulator = this.currentValue;
        for (let i = this.currentValue - 1; i > 1; i--) {
          notXAccumulator *= i;
        }
        this.displayValue = notXAccumulator.toString();
        break;
      case Operands.sinus:
        console.log(Operands.sinus);
        this.displayValue = this.useRadius
          ? Math.sin(this.currentValue).toString()
          : Math.sin(this.toDegrees(this.currentValue)).toString();
        break;
      case Operands.sinusH:
        console.log(Operands.sinusH);
        this.displayValue = this.useRadius
          ? Math.sinh(this.currentValue).toString()
          : Math.sinh(this.toDegrees(this.currentValue)).toString();
        break;
    }
  }

  switchRadiusDegrees() {
    this.useRadius = !this.useRadius;
  }

  touchBinaryOperand(event: MouseEvent) {
    this.currentOperand = (<HTMLButtonElement>event.target).innerText;
    this.previousValue = parseFloat(this.displayValue);
    this.isUserTyping = false;
    this.percentValue = false;
    this.displayValue = '0';
  }

  touchEquals(event: MouseEvent) {
    switch (this.currentOperand) {
      case Operands.minus:
        this.displayValue = (this.previousValue - this.currentValue).toString();
        break;
      case Operands.plus:
        this.displayValue = (this.previousValue + this.currentValue).toString();
        break;
      case Operands.multiplication:
        this.displayValue = (this.previousValue * this.currentValue).toString();
        break;
      case Operands.divide:
        this.displayValue = (this.previousValue / this.currentValue).toString();
        break;
    }
    this.currentOperand = '';
    this.previousValue = undefined;
  }

  private toDegrees(angle: number) {
    return angle * (Math.PI / 180);
  }
}
