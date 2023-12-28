import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionModalComponent } from './direccion-modal.component';

describe('DireccionModalComponent', () => {
  let component: DireccionModalComponent;
  let fixture: ComponentFixture<DireccionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DireccionModalComponent]
    });
    fixture = TestBed.createComponent(DireccionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
