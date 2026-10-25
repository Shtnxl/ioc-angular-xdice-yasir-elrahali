import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonajeTarjeta } from './personaje-tarjeta.component';

describe('PersonajeTarjeta', () => {
  let component: PersonajeTarjeta;
  let fixture: ComponentFixture<PersonajeTarjeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajeTarjeta],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajeTarjeta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
