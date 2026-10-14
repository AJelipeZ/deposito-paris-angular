export type EstadoRemision = 'pendiente' | 'despachado' | 'entregado' | 'rechazado';

export interface ItemRemision {
  codigo: number;
  descripcion: string;
  cantidad: number;
  precio: number;
}

export interface Remision {
  id: number;
  cliente: string;
  telefono: string;
  fecha: string;
  estado: EstadoRemision;
  conductor: string;
  observaciones: string;
  items: ItemRemision[];
}

export interface Articulo {
  id: number;
  nombre: string;
  stock: number;
}
