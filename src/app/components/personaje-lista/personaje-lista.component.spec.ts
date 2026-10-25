import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonajeLista } from './personaje-lista.component';

describe('PersonajeLista', () => {
  let component: PersonajeLista;
  let fixture: ComponentFixture<PersonajeLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajeLista],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajeLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
