import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionItemBuilderComponent } from './collection-item-builder.component';

describe('CollectionItemBuilderComponent', () => {
  let component: CollectionItemBuilderComponent;
  let fixture: ComponentFixture<CollectionItemBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionItemBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionItemBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
