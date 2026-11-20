# Formularios y validaciones

## Formulario de búsqueda

Está en `src/app/components/filtros-personajes/` y es un formulario reactivo (`ReactiveFormsModule`). Lo reescribí a partir del de la EAC2, que era por plantilla con `ngModel`. Tiene dos campos:

- `texto`: búsqueda por nombre. Es opcional, y si lo dejo vacío se muestran todos los personajes.
- `clase`: un select con las clases que hay en los datos cargados, más la opción "Todas".

El botón **Buscar** emite los criterios con el `@Output` `aplicar` y está desactivado si el formulario es inválido o hay una validación en curso. El botón **Limpiar** resetea el formulario y emite `restablecer`. `App` recibe los dos eventos y llama a `PersonajesService.buscar()`, así que el componente del formulario no hace peticiones.

## Validaciones

Los validadores están en `src/app/validadores/personaje.validadores.ts`.

**Síncrono: `longitudMinima(3)`.** Si hay texto y tiene menos de 3 caracteres (sin contar espacios de los extremos), da el error `longitudMinima`. Con el campo vacío no da error, porque la búsqueda vacía es válida.

**Asíncrono: `terminoConResultados`.** Comprueba si el término tiene resultados en la API. Llama a `PersonajesService.hayResultados()`, que hace un GET, adapta los datos y mira si algún nombre contiene el texto. Si no hay ninguno, da el error `sinResultados`. Hice dos decisiones:

- El **debounce** es un `timer(400)` dentro del validador. Angular cancela la ejecución anterior cuando cambia el valor, así que si sigo escribiendo no se lanza la petición.
- Si la API falla, el validador devuelve `null` y no bloquea el formulario. Prefiero eso a dejar al usuario sin poder buscar.

Angular solo ejecuta el asíncrono cuando el síncrono ya pasa, así que con menos de 3 caracteres no se llama a la API.

## Mensajes de error

Solo se ven cuando el campo ha sido tocado o modificado (`touched` o `dirty`), para que no salgan nada más abrir la página:

- `longitudMinima`: "Escribe al menos 3 caracteres."
- `sinResultados`: "No hay personajes que coincidan con «texto»."
- Mientras se valida, sale "Comprobando…" con `role="status"`. Los errores llevan `role="alert"`.

El input lleva `aria-describedby` apuntando al contenedor de mensajes y `aria-invalid` cuando hay error.

## Historial de búsquedas

Lo gestiona `src/app/services/historial-busquedas.service.ts`:

- Guarda los últimos 5 términos válidos en `localStorage`, con la clave `xdice.historial`, el más reciente primero.
- Un término se guarda al pulsar Buscar, y solo si el formulario es válido y no está vacío.
- No guarda duplicados consecutivos: compara con el último guardado, sin distinguir mayúsculas. Si repito una búsqueda más antigua sí que se guarda otra vez; solo evito el duplicado seguido.
- Lectura y escritura van con `try/catch`. Al leer, además compruebo que lo guardado sea un array de textos; si no, empiezo con la lista vacía. Si `localStorage` falla, la app sigue funcionando y el historial vive solo en memoria.
- Se muestra en la interfaz como "Búsquedas recientes". Al pulsar un término, se rellena el campo y se lanza esa búsqueda directamente, sin esperar a la validación asíncrona, porque ese término ya se había validado antes.

## Limitaciones

- La comprobación asíncrona descarga la lista completa en cada comprobación, porque filtro en el servicio y no en la API. Con 10 personajes no se nota, pero con muchos datos habría que filtrar en el servidor.
- La comprobación mira solo el nombre, no la clase seleccionada.
