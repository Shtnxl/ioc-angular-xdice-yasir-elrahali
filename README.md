# Xdice

## Autor/a
Yasir El Rahali

## Descripció
Xdice (Exploding Dice) es una ficha interactiva para juegos de rol de mesa, pensada para Web, móvil y tablet. La idea es que sea una alternativa abierta y gratuita a los gestores de fichas actuales. Más adelante tendrá modo campaña y modo solo, y exportar e importar la ficha en JSON.

## Versions utilitzades
- Node.js: 24.21.0
- npm: 11.19.0
- Angular CLI: 22.2.1
- Angular: 22
- Git: 2.50.1
- TypeScript: 6.0.x
- json-server: 1.0.0-beta.15 (dependencia de desarrollo)

## Com crear i executar el projecte
Creación:

    ng new ioc-angular-xdice-yasir-elrahali --routing --style=scss --ssr=false --standalone=true --file-name-style-guide=2016 --skip-git=true --package-manager=npm

Instalar dependencias y ejecutar (hacen falta dos terminales):

    npm install
    npm run api      # API local en http://localhost:4301
    ng serve         # app en http://localhost:4200

Tests y compilación:

    npm test -- --watch=false
    npm run build

La app queda en http://localhost:4200

## Estat de l'EAC1
EAC1 completada:

- Entorno verificado: Node.js, npm, Angular CLI y Git, con npm como gestor por defecto.
- Proyecto Angular creado con routing, SCSS, SSR desactivado, standalone y nombres `app.component.*`.
- Carpetas `components`, `services`, `models` y `pages` en `src/app`, cada una con su `.gitkeep`.
- Repositorio público con las ramas `main`, `ra1-setup`, `ra2-components`, `ra3-serveis` y `ra4-navegacio` publicadas. Los cambios de esta EAC están en `ra1-setup`.
- Página inicial personalizada con título, párrafo, tarjeta, `aside` y el texto "Projecte base llest".
- `ng serve` funciona y el hot reload está comprobado.


## Estat de l'EAC2
EAC2 (Unidad 2, componentes e interfaz) hecha en la rama `ra2-components`:

- Modelo `Personaje` y 10 personajes de prueba en `src/app/models`.
- Interfaz dividida en componentes standalone que se comunican con `@Input` y `@Output`.
- Formulario de filtros con `FormsModule` y `[(ngModel)]`: texto (obligatorio, mínimo 3 caracteres) y clase. Botón de aplicar deshabilitado si es inválido y botón de restablecer.
- Plantillas con `@for` (con `track`), `@if`/`@else`, contador de resultados, mensaje sin resultados, panel de detalle y pipe `date`.
- Enlace de salto al contenido, foco visible, etiquetas asociadas a los campos, `role="status"` y `role="alert"`, y diseño responsive.

## Estat de l'EAC3
EAC3 (Unidad 3, servicios, HTTP y formularios reactivos) hecha en la rama `ra3-serveis`:

- API local con json-server (`tools/api/xdice.json`, 10 personajes, puerto 4301). Se arranca con `npm run api`. La URL base está en `src/environments/environment.ts`.
- Modelo de la API (`PersonajeApi`), modelo interno (`Personaje`) y adaptador que normaliza los datos. Tabla de mapeo en `docs/models.md`.
- `PersonajesService` con `HttpClient`: GET, POST, estados de carga, error y éxito, reintento de la última consulta y `switchMap` en el flujo de búsqueda. Detalles en `docs/serveis.md`.
- Formulario de búsqueda reactivo con validador síncrono, validador asíncrono con debounce, mensajes de error, botón de limpiar e historial en `localStorage`. Detalles en `docs/formularis.md`.
- Banner de error con botón "Reintentar" cuando la API no responde.

## API local
- Fichero de datos: `tools/api/xdice.json`
- Puerto: 4301
- URL base: `http://localhost:4301`
- Endpoint: `http://localhost:4301/personajes`

## Servicios
| Servicio | Fichero | Qué hace |
|---|---|---|
| `PersonajesService` | `services/personajes.service.ts` | Peticiones a la API, estado y reintento |
| `HistorialBusquedasService` | `services/historial-busquedas.service.ts` | Historial de búsquedas en `localStorage` |

## Documentación técnica
- `docs/models.md`: modelos y adaptador
- `docs/serveis.md`: servicios
- `docs/formularis.md`: formulario y validaciones

## Rama
`ra3-serveis`: https://github.com/Shtnxl/ioc-angular-xdice-yasir-elrahali/tree/ra3-serveis

## Componentes creados
| Componente | Fichero | Qué hace |
|---|---|---|
| `PersonajeLista` | `personaje-lista.component.ts` | Pinta una tarjeta por personaje y reenvía la selección |
| `PersonajeTarjeta` | `personaje-tarjeta.component.ts` | Resume un personaje y avisa al pulsar |
| `EtiquetaClase` | `etiqueta-clase.component.ts` | Muestra la clase como distintivo |
| `FiltrosPersonajes` | `filtros-personajes.component.ts` | Formulario reactivo de búsqueda con validadores e historial |

## Enllaç del repositori
https://github.com/Shtnxl/ioc-angular-xdice-yasir-elrahali