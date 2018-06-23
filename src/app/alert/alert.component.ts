import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('alertState', [
      state('success', style({backgroundColor: 'green', transform: 'translateY(50px)'})),
      state('error', style({backgroundColor: 'red'})),
      transition('void => *', [
        animate(2000)
      ]),
      transition('* => void', [
        animate(2000, style({transform: 'translateY(0px)', opacity: 0}))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  private message: string;
  private state: string = 'void';

  constructor(private alertService: AlertService) {
    alertService.showBanner$.subscribe(
      alert => {
        this.state   = alert.state;
        this.message = alert.message;
      }
    );
  }

  ngOnInit() { }

  setVoidState(): void {
    setTimeout(() => {
      this.state = 'void';
    }, 3500);
  }
}
