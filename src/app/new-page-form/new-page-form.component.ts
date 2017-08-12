import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';
import { Page } from '../page';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.css']
})
export class NewPageFormComponent implements OnInit {

  constructor(private pageService: PageService) { }

  ngOnInit() {
  }

  model = new Page('', '');

  onSubmit(): void {
    this.pageService.createNewPage(this.model.title, this.model.body);
  }

}
