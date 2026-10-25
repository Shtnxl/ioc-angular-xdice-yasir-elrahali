import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaClase } from './etiqueta-clase.component';

describe('EtiquetaClase', () => {
  let component: EtiquetaClase;
  let fixture: ComponentFixture<EtiquetaClase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaClase],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaClase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
