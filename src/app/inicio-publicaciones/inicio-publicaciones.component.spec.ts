import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPublicacionesComponent } from './inicio-publicaciones.component';

describe('InicioPublicacionesComponent', () => {
  let component: InicioPublicacionesComponent;
  let fixture: ComponentFixture<InicioPublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioPublicacionesComponent]
    });
    fixture = TestBed.createComponent(InicioPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
