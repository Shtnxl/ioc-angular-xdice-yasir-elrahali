export interface Personaje {
    id: string;
    fechaCreacion: string;
    nombre: string;
    descripcion: string;
    clase: string;
    subclase?: string;
    nivel: number;
    vivo?: boolean;
}