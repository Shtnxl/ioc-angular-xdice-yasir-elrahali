import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PERSONAJES } from './models/personaje.mock';
import { Personaje } from './models/personaje.model';
import { Filtros } from './models/filtros.model';
import { PersonajeLista } from './components/personaje-lista/personaje-lista.component';
import { FiltrosPersonajes } from './components/filtros-personajes/filtros-personajes.component';
import { DatePipe } from '@angular/common';

@Component({
  imports: [RouterOutlet, PersonajeLista, FiltrosPersonajes, DatePipe],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  protected readonly title = signal('ioc-angular-xdice-yasir-elrahali');
  public appName = 'Xdice';

  personajes: Personaje[] = PERSONAJES;
  personajesFiltrados: Personaje[] = PERSONAJES;
  clases: string[] = [...new Set(PERSONAJES.map((p) => p.clase))];
  seleccionado: Personaje | null = null;

  onSeleccionar(p: Personaje): void {
    this.seleccionado = p;
  }

  onApply(f: Filtros): void {
    const texto = f.texto.toLowerCase();
    this.personajesFiltrados = this.personajes.filter(
      (p) =>
        p.nombre.toLowerCase().includes(texto) &&
        (f.clase === '' || p.clase === f.clase)
    );
  }

  onReset(): void {
    this.personajesFiltrados = this.personajes;
  }
}