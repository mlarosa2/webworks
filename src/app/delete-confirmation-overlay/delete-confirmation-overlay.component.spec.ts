import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationOverlayComponent } from './delete-confirmation-overlay.component';

describe('DeleteConfirmationOverlayComponent', () => {
  let component: DeleteConfirmationOverlayComponent;
  let fixture: ComponentFixture<DeleteConfirmationOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
