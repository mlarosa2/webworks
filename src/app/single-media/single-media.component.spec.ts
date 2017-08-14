import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMediaComponent } from './single-media.component';

describe('SingleMediaComponent', () => {
  let component: SingleMediaComponent;
  let fixture: ComponentFixture<SingleMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
