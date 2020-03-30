import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private myWorker = new Worker('worker.js')
  
  constructor(public navCtrl: NavController) {
  }

  text: string
  checkIsInt(input: number): boolean {
    if (input!==parseInt(input.toString())) {
      throw new Error(`The number ${input} is not an integer.`)
    }
    return true
  }
  
  randomArray(from: number = 0, to: number = 100, size: number = 100): Array<number> {
    if (!this.checkIsInt(from) || !this.checkIsInt(to) || !this.checkIsInt(size)) {
      throw new Error(`All parameters should be (whole) number (from: ${from}, to: ${to}, size: ${size}).`)
    }
    if (from>=to) throw new Error(`From (${from} should be smaller than to (${to}).`)
    if (size<1) throw new Error(`The size of the request array is ${size}, but should be 1 or larger.`)
    let result = []
    let diff = to-from    
    for(let i = 0; i<size; i++) {
      let rando = parseInt((Math.random()*diff).toString())
      let number = from+rando
      result.push(number)
    }
    return result
  }

  ionViewDidLoad() {
    this.text = `De wereld is je oester.`
    console.log('Hello, World!')
    // Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
    this.myWorker = new Worker('worker.js')
    let array = this.randomArray()
    this.myWorker.postMessage(array)
    console.log('Message posted to worker')

    this.myWorker.onmessage = function(e) {
      //result.textContent = e.data
      console.log('Message received from worker:', e.data)
    }
  }
}
