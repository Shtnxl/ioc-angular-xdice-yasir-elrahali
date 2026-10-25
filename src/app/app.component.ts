import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PERSONAJES } from './models/personaje.mock';
import { Personaje } from './models/personaje.model';
import { PersonajeLista } from './components/personaje-lista/personaje-lista.component';
import { FiltrosPersonajes } from './components/filtros-personajes/filtros-personajes.component';

@Component({
  imports: [RouterOutlet, PersonajeLista, FiltrosPersonajes],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  protected readonly title = signal('ioc-angular-xdice-yasir-elrahali');
  public appName = 'Xdice';
   personajes: Personaje[] = PERSONAJES;
  seleccionado: Personaje | null = null;

  onSeleccionar(p: Personaje): void {
    this.seleccionado = p;
  }
}
