import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Filtros } from '../../models/filtros.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-filtros-personajes',
  styleUrl: './filtros-personajes.component.scss',
  templateUrl: './filtros-personajes.component.html',
})

export class FiltrosPersonajes {
  @Input() clases: string[] = [];
  @Output() aplicar = new EventEmitter<Filtros>();
  @Output() restablecer = new EventEmitter<void>();

  texto = '';
  clase = '';

  onApply(): void {
    this.aplicar.emit({ texto: this.texto.trim(), clase: this.clase });
  }

  onReset(f: NgForm): void {
    this.texto = '';
    this.clase = '';
    f.resetForm({ texto: '', clase: '' });
    this.restablecer.emit();
  }
}
