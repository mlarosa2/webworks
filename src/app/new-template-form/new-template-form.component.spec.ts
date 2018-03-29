import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTemplateFormComponent } from './new-template-form.component';

describe('NewTemplateFormComponent', () => {
  let component: NewTemplateFormComponent;
  let fixture: ComponentFixture<NewTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
