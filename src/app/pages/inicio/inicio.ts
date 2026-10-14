import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InventarioService } from '../../core/services/inventario.service';
import { RemisionService } from '../../core/services/remision.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  styleUrl: './inicio.scss',
  templateUrl: './inicio.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Inicio implements OnInit {
  private remisionService = inject(RemisionService);
  private inventarioService = inject(InventarioService);

  cargando = true;
  resumen = { pendientes: 0, despachadas: 0, entregadas: 0, stockBajo: 0 };

  ngOnInit(): void {
    forkJoin([this.remisionService.getRemisiones(), this.inventarioService.getArticulos()]).subscribe(
      ([remisiones, articulos]) => {
        this.resumen = {
          pendientes: remisiones.filter((r) => r.estado === 'pendiente').length,
          despachadas: remisiones.filter((r) => r.estado === 'despachado').length,
          entregadas: remisiones.filter((r) => r.estado === 'entregado').length,
          stockBajo: articulos.filter((a) => a.stock <= 10).length,
        };
        this.cargando = false;
      },
    );
  }
}
