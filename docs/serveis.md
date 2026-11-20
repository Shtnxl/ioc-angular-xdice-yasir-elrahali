# Servicios

## HttpClient

Inyecto `HttpClient` con `inject(HttpClient)` directamente en el servicio. No he configurado `provideHttpClient()` en `app.config.ts`, porque en Angular 22 no hace falta si no uso opciones como interceptores.

La URL base de la API está en `src/environments/environment.ts` (`apiUrl`, `http://localhost:4301`), y el servicio construye el endpoint `/personajes` a partir de ahí. Los componentes no conocen URLs ni hacen peticiones.

## PersonajesService

Está en `src/app/services/personajes.service.ts`. Se encarga de toda la comunicación con la API.

| Método | Qué hace | Petición |
|---|---|---|
| `buscar(filtros)` | Guarda la consulta y la lanza | `GET /personajes` |
| `reintentar()` | Repite la última consulta guardada | `GET /personajes` |
| `crear(nuevo)` | Crea un personaje y vuelve a cargar la lista | `POST /personajes` |
| `hayResultados(texto)` | Dice si algún nombre contiene el texto (lo usa la validación asíncrona del formulario) | `GET /personajes` |

### Estado que expone

Todo son signals de solo lectura (`asReadonly()`), porque la app no usa zone.js y la vista tiene que leer signals para repintarse:

- `personajes`: los personajes que se muestran, ya filtrados.
- `total`: cuántos personajes hay en total (para el "Mostrando X de Y").
- `clases`: las clases que existen en los datos, para el select del filtro.
- `estado`: `inicial`, `cargando`, `exito` o `error`.
- `error`: el mensaje de error, o `null`.

### Flujo de búsqueda y `switchMap`

En el constructor hay un `Subject` (`consultas$`) y `buscar()` emite en él. El flujo es:

1. `tap`: pongo el estado en `cargando` y limpio el error.
2. `switchMap`: lanza el GET. Si llega otra consulta con la anterior todavía en curso, cancela la petición anterior y se queda con la nueva.
3. `map(adaptarPersonajesApi)`: paso los datos del modelo de la API al modelo interno.
4. `map`: filtro por texto y clase. El filtro lo hago aquí, en el servicio, después de adaptar los datos, porque la API tiene las clases en inglés y las mías son en español.
5. `subscribe`: guardo los datos y pongo el estado en `exito`.

El `catchError` está **dentro** del `switchMap`. Así un error de red no mata el flujo: pone el estado en `error`, guarda el mensaje y la siguiente consulta funciona normal.

### Reintentar

`buscar()` guarda siempre la última consulta en `ultimaConsulta`, y `reintentar()` la vuelve a emitir. El botón "Reintentar" del banner de error llama a este método.

### POST

`crear()` convierte los datos al formato de la API con `prepararPersonajeApi` (la dirección contraria del adaptador), hace el POST y adapta la respuesta. Devuelve el `Observable` sin suscribirse; quien lo llama es quien se suscribe. Al terminar, el `tap` repite la última consulta para que la lista incluya el nuevo.

Para probarlo, la app tiene el botón "Crear personaje de ejemplo". Ojo: json-server guarda los cambios en `tools/api/xdice.json`, así que después hay que restaurar el archivo con `git checkout tools/api/xdice.json`.

## HistorialBusquedasService

Está en `src/app/services/historial-busquedas.service.ts`. Guarda en `localStorage` los últimos 5 términos de búsqueda. Los detalles están en `docs/formularis.md`.

## Limitaciones

- El error del POST no se muestra en la interfaz (solo el del GET).
- Cada búsqueda descarga la lista completa y filtra en el cliente. Con 10 personajes da igual, pero con más datos habría que filtrar en la API.
- Mientras se carga, la lista desaparece y sale "Cargando personajes…"; no conservo la lista anterior.
