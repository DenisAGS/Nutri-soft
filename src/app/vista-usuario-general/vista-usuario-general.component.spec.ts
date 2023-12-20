import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUsuarioGeneralComponent } from './vista-usuario-general.component';

describe('VistaUsuarioGeneralComponent', () => {
  let component: VistaUsuarioGeneralComponent;
  let fixture: ComponentFixture<VistaUsuarioGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaUsuarioGeneralComponent]
    });
    fixture = TestBed.createComponent(VistaUsuarioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
