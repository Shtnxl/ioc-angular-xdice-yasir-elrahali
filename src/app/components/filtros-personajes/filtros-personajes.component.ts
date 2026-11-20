import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Filtros } from '../../models/filtros.model';
import { PersonajesService } from '../../services/personajes.service';
import { HistorialBusquedasService } from '../../services/historial-busquedas.service';
import { longitudMinima, terminoConResultados } from '../../validadores/personaje.validadores';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-filtros-personajes',
  styleUrl: './filtros-personajes.component.scss',
  templateUrl: './filtros-personajes.component.html',
})
export class FiltrosPersonajes {
  private readonly personajes = inject(PersonajesService);
  protected readonly historial = inject(HistorialBusquedasService);

  @Input() clases: string[] = [];
  @Output() aplicar = new EventEmitter<Filtros>();
  @Output() restablecer = new EventEmitter<void>();

  readonly formulario = new FormGroup({
    texto: new FormControl('', {
      nonNullable: true,
      validators: [longitudMinima(3)],
      asyncValidators: [terminoConResultados((t) => this.personajes.hayResultados(t))],
    }),
    clase: new FormControl('', { nonNullable: true }),
  });

  get texto() {
    return this.formulario.controls.texto;
  }

  onSubmit(): void {
    if (this.formulario.invalid || this.formulario.pending) {
      return;
    }
    const { texto, clase } = this.formulario.getRawValue();
    this.historial.agregar(texto);
    this.aplicar.emit({ texto: texto.trim(), clase });
  }

  onReset(): void {
    this.formulario.reset({ texto: '', clase: '' });
    this.restablecer.emit();
  }

  usarHistorial(termino: string): void {
    this.formulario.patchValue({ texto: termino });
    this.aplicar.emit({ texto: termino, clase: this.formulario.controls.clase.value });
  }
}