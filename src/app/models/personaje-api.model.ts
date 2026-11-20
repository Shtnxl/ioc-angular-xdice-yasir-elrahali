export interface PersonajeApi {
  id: string;
  name: string;
  description?: string | null;
  class: string;
  subclass?: string | null;
  level: string | number;
  created_at: string;
  alive?: boolean;
}