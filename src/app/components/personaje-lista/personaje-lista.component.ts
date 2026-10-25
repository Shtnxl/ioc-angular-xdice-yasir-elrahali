import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../../models/personaje.model';
import { PersonajeTarjeta } from '../personaje-tarjeta/personaje-tarjeta.component';

@Component({
  imports: [PersonajeTarjeta],
  selector: 'app-personaje-lista',
  styleUrl: './personaje-lista.component.scss',
  templateUrl: './personaje-lista.component.html',
})
export class PersonajeLista {
  @Input({ required: true }) personajes!: Personaje[];
  @Input() idSeleccionado: number | null = null;
  @Output() seleccionar = new EventEmitter<Personaje>();
}
