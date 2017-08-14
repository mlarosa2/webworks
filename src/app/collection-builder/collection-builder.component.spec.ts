import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionBuilderComponent } from './collection-builder.component';

describe('CollectionBuilderComponent', () => {
  let component: CollectionBuilderComponent;
  let fixture: ComponentFixture<CollectionBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
