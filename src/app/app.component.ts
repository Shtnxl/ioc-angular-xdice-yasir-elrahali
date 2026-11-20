import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Personaje } from './models/personaje.model';
import { Filtros } from './models/filtros.model';
import { PersonajesService } from './services/personajes.service';
import { PersonajeLista } from './components/personaje-lista/personaje-lista.component';
import { FiltrosPersonajes } from './components/filtros-personajes/filtros-personajes.component';

@Component({
  imports: [RouterOutlet, PersonajeLista, FiltrosPersonajes, DatePipe],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App implements OnInit {
  private readonly servicio = inject(PersonajesService);

  protected readonly title = signal('ioc-angular-xdice-yasir-elrahali');
  public appName = 'Xdice';

  readonly personajes = this.servicio.personajes;
  readonly total = this.servicio.total;
  readonly clases = this.servicio.clases;
  readonly estado = this.servicio.estado;
  readonly error = this.servicio.error;
  readonly seleccionado = signal<Personaje | null>(null);

  ngOnInit(): void {
    this.servicio.buscar({ texto: '', clase: '' });
  }

  onSeleccionar(p: Personaje): void {
    this.seleccionado.set(p);
  }

  onApply(f: Filtros): void {
    this.servicio.buscar(f);
  }

  onReset(): void {
    this.servicio.buscar({ texto: '', clase: '' });
  }

  onReintentar(): void {
    this.servicio.reintentar();
  }
}