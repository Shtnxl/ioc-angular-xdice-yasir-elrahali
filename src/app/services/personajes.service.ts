import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Subject, catchError, map, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { adaptarPersonajesApi } from '../adaptadores/personaje.adaptador';
import { Filtros } from '../models/filtros.model';
import { PersonajeApi } from '../models/personaje-api.model';
import { Personaje } from '../models/personaje.model';

export type EstadoCarga = 'inicial' | 'cargando' | 'exito' | 'error';

const SIN_FILTROS: Filtros = { texto: '', clase: '' };

function filtrar(lista: Personaje[], f: Filtros): Personaje[] {
  const texto = f.texto.trim().toLowerCase();
  return lista.filter(
    (p) =>
      p.nombre.toLowerCase().includes(texto) &&
      (f.clase === '' || p.clase === f.clase)
  );
}

@Injectable({ providedIn: 'root' })
export class PersonajesService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/personajes`;

  private readonly _todos = signal<Personaje[]>([]);
  private readonly _personajes = signal<Personaje[]>([]);
  private readonly _estado = signal<EstadoCarga>('inicial');
  private readonly _error = signal<string | null>(null);

  readonly personajes = this._personajes.asReadonly();
  readonly total = computed(() => this._todos().length);
  readonly clases = computed(() =>
    [...new Set(this._todos().map((p) => p.clase))].sort()
  );
  readonly estado = this._estado.asReadonly();
  readonly error = this._error.asReadonly();

  private readonly consultas$ = new Subject<Filtros>();
  private ultimaConsulta: Filtros = SIN_FILTROS;

  constructor() {
    this.consultas$
      .pipe(
        tap(() => {
          this._estado.set('cargando');
          this._error.set(null);
        }),
        switchMap((filtros) =>
          this.http.get<PersonajeApi[]>(this.url).pipe(
            map(adaptarPersonajesApi),
            map((todos) => ({ todos, visibles: filtrar(todos, filtros) })),
            catchError(() => {
              this._estado.set('error');
              this._error.set('No se han podido cargar los personajes.');
              return EMPTY;
            })
          )
        )
      )
      .subscribe(({ todos, visibles }) => {
        this._todos.set(todos);
        this._personajes.set(visibles);
        this._estado.set('exito');
      });
  }

  buscar(filtros: Filtros): void {
    this.ultimaConsulta = filtros;
    this.consultas$.next(filtros);
  }

  reintentar(): void {
    this.buscar(this.ultimaConsulta);
  }
}