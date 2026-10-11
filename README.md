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

## Com crear i executar el projecte
Creación:

    ng new ioc-angular-xdice-yasir-elrahali --routing --style=scss --ssr=false --standalone=true --file-name-style-guide=2016 --skip-git=true --package-manager=npm

Instalar dependencias y ejecutar:

    npm install
    ng serve

La app queda en http://localhost:4200

## Estat de l'EAC1
EAC1 completada:

- Entorno verificado: Node.js, npm, Angular CLI y Git, con npm como gestor por defecto.
- Proyecto Angular creado con routing, SCSS, SSR desactivado, standalone y nombres `app.component.*`.
- Carpetas `components`, `services`, `models` y `pages` en `src/app`, cada una con su `.gitkeep`.
- Repositorio público con las ramas `main`, `ra1-setup`, `ra2-components`, `ra3-serveis` y `ra4-navegacio` publicadas. Los cambios de esta EAC están en `ra1-setup`.
- Página inicial personalizada con título, párrafo, tarjeta, `aside` y el texto "Projecte base llest".
- `ng serve` funciona y el hot reload está comprobado.

## Enllaç del repositori
https://github.com/Shtnxl/ioc-angular-xdice-yasir-elrahali