import { Personaje } from '../models/personaje.model';
import { PersonajeApi } from '../models/personaje-api.model';

const CLASES: Record<string, string> = {
  fighter: 'Guerrero', wizard: 'Mago', rogue: 'Pícaro', cleric: 'Clérigo',
  barbarian: 'Bárbaro', bard: 'Bardo', paladin: 'Paladín', ranger: 'Explorador',
  sorcerer: 'Hechicero', druid: 'Druida',
};

function limpiarTexto(valor: string | null | undefined): string {
  return (valor ?? '').trim().replace(/\s+/g, ' ');
}

function normalizarClase(valor: string): string {
  const clave = valor.trim().toLowerCase();
  return CLASES[clave] ?? 'Clase desconocida';   
}

function numeroSeguro(valor: string | number, defecto: number): number {
  const n = Number(valor);
  return Number.isFinite(n) ? n : defecto;
}

export function adaptarPersonajeApi(api: PersonajeApi): Personaje {
  return {
    id: api.id,
    nombre: limpiarTexto(api.name),
    descripcion: limpiarTexto(api.description) || 'Sin descripción',
    clase: normalizarClase(api.class),
    subclase: limpiarTexto(api.subclass),       
    nivel: numeroSeguro(api.level, 1),
    fechaCreacion:  (api.created_at ?? '').slice(0, 10),
    vivo: api.alive ?? true,
  };
}

export function adaptarPersonajesApi(lista: PersonajeApi[]): Personaje[] {
  return lista.map(adaptarPersonajeApi);
}