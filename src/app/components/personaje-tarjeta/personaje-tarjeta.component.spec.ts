import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonajeTarjeta } from './personaje-tarjeta.component';
import { Personaje } from '../../models/personaje.model';

const PERSONAJE_PRUEBA: Personaje = {
  id: 1,
  nombre: 'Prueba',
  descripcion: 'Personaje de prueba',
  clase: 'Mago',
  subclase: 'Evocador',
  nivel: 1,
  fechaCreacion: '2026-01-01',
};

describe('PersonajeTarjeta', () => {
  let component: PersonajeTarjeta;
  let fixture: ComponentFixture<PersonajeTarjeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajeTarjeta],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajeTarjeta);
    fixture.componentRef.setInput('personaje', PERSONAJE_PRUEBA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
