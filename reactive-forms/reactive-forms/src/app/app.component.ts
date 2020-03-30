import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-forms';
  name = new FormControl('');
  profileForm = new FormGroup({
    firstName: new FormControl('Joas'),
    lastName: new FormControl('Kramer'),
  });

  updateName() {
    this.name.setValue('Nancy');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  httpCall() {
    const object ={
      base_stat: 'lol',
      id: 1
    }

    return {
      ...object,
      baseStat: object.base_stat
    }
  }
}
