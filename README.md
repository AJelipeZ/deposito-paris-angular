# Depósito París - Despacho de mercancía

Aplicación en Angular para manejar las remisiones (pedidos que salen de bodega) y el inventario de una ferretería en Medellín.

## Funcionalidad

- **Inicio:** resumen de remisiones pendientes, despachadas y entregadas, y de artículos con poco stock.
- **Remisiones:** lista con búsqueda por cliente o número y filtro por estado.
- **Detalle de remisión:** artículos, total y botones para cambiar el estado (pendiente → despachado → entregado, o rechazado). Pide confirmación antes de cambiar.
- **Nueva remisión:** formulario reactivo con validaciones (cliente, teléfono de 10 dígitos que empieza por 3, conductor y uno o varios artículos).
- **Inventario:** tabla con búsqueda y colores según el stock (verde, naranja si es bajo, rojo si está agotado). Al marcar una remisión como entregada se descuenta del inventario.

Los datos son de prueba: están en `src/app/core/data/mock-data.ts` y los servicios los devuelven como `Observable` con `of()` y `delay()` para simular una API. Al recargar la página se vuelven a los datos iniciales.

## Estructura

- `AppModule`: declara los componentes base (`App`, `Navbar`, `Inicio`, `NotFound`).
- `CoreModule`: módulo central; los servicios (`RemisionService`, `InventarioService`) son singleton.
- `SharedModule`: diálogo de confirmación, spinner, pipes (`cop` para pesos y `estado`) y los módulos de Angular Material.
- `features/remisiones` y `features/inventario`: módulos de funcionalidad cargados con lazy loading.
- Los componentes de las carpetas `pages` manejan la lógica (contenedores) y los de `components` solo muestran datos con `@Input` / `@Output` (presentación).

Todo está hecho con módulos (`standalone: false`).

## Librerías

- Angular 22
- Angular Material (componentes de interfaz)
- RxJS (Observables para simular la API)
- zone.js

## Instalación y ejecución

Requisitos: Node.js 22.22 o superior.

```bash
npm install
ng serve
```

Luego abrir http://localhost:4200
