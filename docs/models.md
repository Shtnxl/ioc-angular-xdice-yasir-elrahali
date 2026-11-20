# Modelos y adaptador

## Modelo de la API (`PersonajeApi`)

Es lo que devuelve json-server desde `tools/api/xdice.json` (`http://localhost:4301/personajes`). Los campos están en inglés y a propósito dejé datos sucios en el JSON: espacios de más, niveles como texto, clases en mayúsculas, descripciones vacías, campos que faltan. Está en `src/app/models/personaje-api.model.ts`.

## Modelo interno (`Personaje`)

Es el que usa la app: componentes, filtros y tests. Campos en español y datos ya limpios. Está en `src/app/models/personaje.model.ts`.

## Adaptador

`src/app/adaptadores/personaje.adaptador.ts` pasa de `PersonajeApi` a `Personaje` con funciones puras (`adaptarPersonajeApi` para uno y `adaptarPersonajesApi` para la lista). Así los componentes nunca ven el formato de la API y, si cambia, solo toco este archivo.

## Tabla de mapeo

| Campo API | Campo interno | Qué hago | Ejemplo |
|---|---|---|---|
| `id` | `id` | Lo dejo igual (string) | `"pj-001"` → `"pj-001"` |
| `name` | `nombre` | `trim` y quito espacios dobles | `"  Thorin Piedrafuerte "` → `"Thorin Piedrafuerte"` |
| `description` | `descripcion` | Limpio el texto; si queda vacío pongo `"Sin descripción"` | `""` → `"Sin descripción"` |
| `class` | `clase` | `trim`, minúsculas y traducción inglés → español | `"WIZARD"` → `"Mago"`, `" cleric "` → `"Clérigo"` |
| `subclass` | `subclase` | Limpio el texto; `null` o vacío pasa a `undefined` | `null` → `undefined` |
| `level` | `nivel` | Lo convierto a número; si no se puede, `1` | `"5"` → `5` |
| `created_at` | `fechaCreacion` | Me quedo con los 10 primeros caracteres (`YYYY-MM-DD`) | `"2026-09-12T10:30:00Z"` → `"2026-09-12"` |
| `alive` | `vivo` | Si no viene, lo doy por vivo | (no viene) → `true` |

## Decisiones

- Si la clase no está en el mapa, sale como `"Clase desconocida"`. Prefiero eso a que la vista se rompa por una clase nueva.
- Si falta `alive`, lo doy por vivo. La API no lo dice, así que es una decisión mía.
- Si `level` no es un número válido, uso `1`.
- La fecha solo la recorto, no compruebo el formato. Con las fechas del JSON (con hora y sin hora) va bien, pero es una limitación.
- `sorcerer` lo traduzco como `"Hechicero"`. En el mock de la EAC2 no había esa clase, así que el filtro de clases ahora tiene alguna más.
