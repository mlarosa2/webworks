import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollectionItemComponent } from './update-collection-item.component';

describe('UpdateCollectionItemComponent', () => {
  let component: UpdateCollectionItemComponent;
  let fixture: ComponentFixture<UpdateCollectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCollectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCollectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
