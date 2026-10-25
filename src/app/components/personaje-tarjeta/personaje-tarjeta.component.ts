import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../../models/personaje.model';
import { EtiquetaClase } from '../etiqueta-clase/etiqueta-clase.component';

@Component({
  imports: [EtiquetaClase],
  selector: 'app-personaje-tarjeta',
  styleUrl: './personaje-tarjeta.component.scss',
  templateUrl: './personaje-tarjeta.component.html',
})
export class PersonajeTarjeta {
  @Input({ required: true }) personaje!: Personaje;
  @Input() seleccionada = false;
  @Output() seleccionar = new EventEmitter<Personaje>();
  onClick(): void {
  this.seleccionar.emit(this.personaje);
  }
}

