import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriologosComponent } from './nutriologos.component';

describe('NutriologosComponent', () => {
  let component: NutriologosComponent;
  let fixture: ComponentFixture<NutriologosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutriologosComponent]
    });
    fixture = TestBed.createComponent(NutriologosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
