export interface Personaje {
    id: number;
    fechaCreacion: string;
    nombre: string;
    descripcion: string;
    clase: string;
    subclase?: string;
    nivel: number;
    vivo?: boolean;
}