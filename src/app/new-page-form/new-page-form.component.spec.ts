import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPageFormComponent } from './new-page-form.component';

describe('NewPageFormComponent', () => {
  let component: NewPageFormComponent;
  let fixture: ComponentFixture<NewPageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
