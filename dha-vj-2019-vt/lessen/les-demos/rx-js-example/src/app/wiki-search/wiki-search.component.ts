import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wiki-search',
  templateUrl: './wiki-search.component.html',
  styleUrls: ['./wiki-search.component.css']
})
export class WikiSearchComponent implements OnInit {
  zoekterm: string;

  constructor() { }

  ngOnInit() {
    this.zoekterm = "start"
  }

}
