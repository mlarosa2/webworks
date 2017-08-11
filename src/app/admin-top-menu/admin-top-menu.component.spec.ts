import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopMenuComponent } from './admin-top-menu.component';

describe('AdminTopMenuComponent', () => {
  let component: AdminTopMenuComponent;
  let fixture: ComponentFixture<AdminTopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
