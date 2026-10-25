import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrosPersonajes } from './filtros-personajes.component';

describe('FiltrosPersonajes', () => {
  let component: FiltrosPersonajes;
  let fixture: ComponentFixture<FiltrosPersonajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosPersonajes],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosPersonajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
