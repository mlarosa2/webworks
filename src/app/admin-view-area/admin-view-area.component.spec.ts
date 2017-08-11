import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAreaComponent } from './admin-view-area.component';

describe('AdminViewAreaComponent', () => {
  let component: AdminViewAreaComponent;
  let fixture: ComponentFixture<AdminViewAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
