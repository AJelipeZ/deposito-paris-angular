import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { ARTICULOS } from '../data/mock-data';
import { Articulo, ItemRemision } from '../models/models';

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private articulos = new BehaviorSubject<Articulo[]>(ARTICULOS);

  getArticulos(): Observable<Articulo[]> {
    return of(this.articulos.value).pipe(delay(600));
  }

  // Descuenta del stock lo que se entregó (crea un arreglo nuevo, no modifica el anterior)
  descontar(items: ItemRemision[]): void {
    const nuevos = this.articulos.value.map((articulo) => {
      const item = items.find((i) => i.codigo === articulo.id);
      return item ? { ...articulo, stock: articulo.stock - item.cantidad } : articulo;
    });
    this.articulos.next(nuevos);
  }
}
