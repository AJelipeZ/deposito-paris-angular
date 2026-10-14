import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, throwError } from 'rxjs';
import { REMISIONES } from '../data/mock-data';
import { EstadoRemision, Remision } from '../models/models';
import { InventarioService } from './inventario.service';

@Injectable({ providedIn: 'root' })
export class RemisionService {
  private inventario = inject(InventarioService);
  private remisiones = new BehaviorSubject<Remision[]>(REMISIONES);

  getRemisiones(): Observable<Remision[]> {
    return of(this.remisiones.value).pipe(delay(700));
  }

  getRemision(id: number): Observable<Remision | undefined> {
    const remision = this.remisiones.value.find((r) => r.id === id);
    return of(remision).pipe(delay(400));
  }

  crear(datos: Omit<Remision, 'id' | 'estado'>): Observable<Remision> {
    const ultimoId = Math.max(...this.remisiones.value.map((r) => r.id));
    const nueva: Remision = { ...datos, id: ultimoId + 1, estado: 'pendiente' };
    this.remisiones.next([nueva, ...this.remisiones.value]);
    return of(nueva).pipe(delay(500));
  }

  cambiarEstado(id: number, estado: EstadoRemision): Observable<Remision> {
    const actual = this.remisiones.value.find((r) => r.id === id);
    if (!actual) {
      return throwError(() => new Error('La remisión no existe'));
    }

    const actualizada: Remision = { ...actual, estado };
    this.remisiones.next(this.remisiones.value.map((r) => (r.id === id ? actualizada : r)));

    // Cuando se entrega se descuenta el inventario
    if (estado === 'entregado') {
      this.inventario.descontar(actualizada.items);
    }
    return of(actualizada).pipe(delay(500));
  }
}
