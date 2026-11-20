import { Injectable, signal } from '@angular/core';

const CLAVE = 'xdice.historial';
const MAXIMO = 5;

@Injectable({ providedIn: 'root' })
export class HistorialBusquedasService {
  private readonly _terminos = signal<string[]>(this.leer());
  readonly terminos = this._terminos.asReadonly();

  agregar(termino: string): void {
    const limpio = termino.trim();
    if (!limpio) {
      return;
    }
    const actual = this._terminos();
    if (actual[0]?.toLowerCase() === limpio.toLowerCase()) {
      return;
    }
    const nuevo = [limpio, ...actual].slice(0, MAXIMO);
    this._terminos.set(nuevo);
    this.guardar(nuevo);
  }

  private leer(): string[] {
    try {
      const bruto = localStorage.getItem(CLAVE);
      if (!bruto) {
        return [];
      }
      const datos: unknown = JSON.parse(bruto);
      return Array.isArray(datos)
        ? datos.filter((d): d is string => typeof d === 'string').slice(0, MAXIMO)
        : [];
    } catch {
      return [];
    }
  }

  private guardar(lista: string[]): void {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lista));
    } catch {
      // sin almacenamiento disponible: el historial solo vive en memoria
    }
  }
}