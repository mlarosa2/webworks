import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-collection-item',
  templateUrl: './update-collection-item.component.html',
  styleUrls: ['./update-collection-item.component.css']
})
export class UpdateCollectionItemComponent implements OnInit {
  @Input() belongsTo: string;
  constructor() { }

  ngOnInit() {
  }

}
