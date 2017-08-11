import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-top-menu',
  templateUrl: './admin-top-menu.component.html',
  styleUrls: ['./admin-top-menu.component.css']
})

export class AdminTopMenuComponent implements OnInit {
  @Input() userName: String;
  
  constructor() { }

  ngOnInit() {
  }

}
