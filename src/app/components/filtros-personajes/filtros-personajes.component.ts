import { Component, EventEmitter, Output } from '@angular/core';
import { Filtros } from '../../models/filtros.model';

@Component({
  imports: [],
  selector: 'app-filtros-personajes',
  styleUrl: './filtros-personajes.component.scss',
  templateUrl: './filtros-personajes.component.html',
})
export class FiltrosPersonajes {
  @Output() aplicar = new EventEmitter<Filtros>();
  @Output() restablecer = new EventEmitter<void>();
}
