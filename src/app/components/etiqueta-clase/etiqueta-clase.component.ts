import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-etiqueta-clase',
  styleUrl: './etiqueta-clase.component.scss',
  templateUrl: './etiqueta-clase.component.html',
})
export class EtiquetaClase {
  @Input({ required: true }) clase!: string;
}
