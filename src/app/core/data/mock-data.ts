import { Articulo, Remision } from '../models/models';

// Datos de prueba (no hay backend)

export const CONDUCTORES = ['Porfirio Villa', 'Pedro Vargas', 'Anderson Ayala'];

export const ARTICULOS: Articulo[] = [
  { id: 101, nombre: 'Arena de concreto (bulto)', stock: 514 },
  { id: 102, nombre: 'Arena de pega (bulto)', stock: 320 },
  { id: 103, nombre: 'Cemento gris 50kg', stock: 230 },
  { id: 104, nombre: 'Cemento blanco 25kg', stock: 8 },
  { id: 105, nombre: 'Varilla corrugada 1/2', stock: 150 },
  { id: 106, nombre: 'Varilla corrugada 3/8', stock: 0 },
  { id: 107, nombre: 'Ladrillo tolete', stock: 2400 },
  { id: 108, nombre: 'Bloque de cemento 15', stock: 600 },
  { id: 109, nombre: 'Tubo PVC 1/2', stock: 85 },
  { id: 110, nombre: 'Tubo PVC sanitario 4', stock: 6 },
  { id: 111, nombre: 'Codo PVC 1/2', stock: 300 },
  { id: 112, nombre: 'Soldadura PVC 1/4 gal', stock: 12 },
  { id: 113, nombre: 'Teja de zinc 3m', stock: 40 },
  { id: 114, nombre: 'Alambre negro cal. 18 (kg)', stock: 3 },
  { id: 115, nombre: 'Puntilla 2 pulg (kg)', stock: 55 },
  { id: 116, nombre: 'Pintura vinilo blanco 1gal', stock: 0 },
  { id: 117, nombre: 'Brocha 3 pulg', stock: 25 },
  { id: 118, nombre: 'Pega cerámica 25kg', stock: 9 },
  { id: 119, nombre: 'Gravilla 1/2 (bulto)', stock: 170 },
  { id: 120, nombre: 'Malla electrosoldada', stock: 18 },
];

export const REMISIONES: Remision[] = [
  {
    id: 23301, cliente: 'Construcciones El Poblado', telefono: '3104567821', fecha: '2026-10-13',
    estado: 'pendiente', conductor: 'Pedro Vargas', observaciones: '',
    items: [
      { codigo: 103, descripcion: 'Cemento gris 50kg', cantidad: 20, precio: 32500 },
      { codigo: 101, descripcion: 'Arena de concreto (bulto)', cantidad: 40, precio: 5500 },
    ],
  },
  {
    id: 23302, cliente: 'María Fernanda Restrepo', telefono: '3157894512', fecha: '2026-10-13',
    estado: 'pendiente', conductor: 'Porfirio Villa', observaciones: 'Llamar antes de llegar',
    items: [{ codigo: 107, descripcion: 'Ladrillo tolete', cantidad: 500, precio: 1150 }],
  },
  {
    id: 23303, cliente: 'Ferreobras Bello', telefono: '3012456789', fecha: '2026-10-12',
    estado: 'despachado', conductor: 'Anderson Ayala', observaciones: '',
    items: [
      { codigo: 109, descripcion: 'Tubo PVC 1/2', cantidad: 10, precio: 9800 },
      { codigo: 111, descripcion: 'Codo PVC 1/2', cantidad: 20, precio: 900 },
    ],
  },
  {
    id: 23304, cliente: 'Juan Camilo Zapata', telefono: '3206541238', fecha: '2026-10-12',
    estado: 'entregado', conductor: 'Pedro Vargas', observaciones: '',
    items: [{ codigo: 105, descripcion: 'Varilla corrugada 1/2', cantidad: 30, precio: 28900 }],
  },
  {
    id: 23305, cliente: 'Luz Dary Cardona', telefono: '3014789632', fecha: '2026-10-11',
    estado: 'rechazado', conductor: 'Porfirio Villa', observaciones: 'El cliente no estaba',
    items: [{ codigo: 117, descripcion: 'Brocha 3 pulg', cantidad: 4, precio: 7800 }],
  },
  {
    id: 23306, cliente: 'Inversiones Laureles', telefono: '3118523697', fecha: '2026-10-11',
    estado: 'pendiente', conductor: 'Anderson Ayala', observaciones: '',
    items: [
      { codigo: 113, descripcion: 'Teja de zinc 3m', cantidad: 12, precio: 48500 },
      { codigo: 115, descripcion: 'Puntilla 2 pulg (kg)', cantidad: 5, precio: 9500 },
    ],
  },
];
