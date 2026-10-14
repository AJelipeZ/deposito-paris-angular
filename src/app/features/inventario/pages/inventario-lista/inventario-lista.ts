import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Articulo } from '../../../../core/models/models';
import { InventarioService } from '../../../../core/services/inventario.service';

@Component({
  selector: 'app-inventario-lista',
  standalone: false,
  styleUrl: './inventario-lista.scss',
  templateUrl: './inventario-lista.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class InventarioLista implements OnInit {
  private inventarioService = inject(InventarioService);

  articulos: Articulo[] = [];
  cargando = true;
  busqueda = new FormControl('', { nonNullable: true });
  soloBajos = false;

  ngOnInit(): void {
    this.inventarioService.getArticulos().subscribe((datos) => {
      this.articulos = datos;
      this.cargando = false;
    });
  }

  get articulosFiltrados(): Articulo[] {
    const texto = this.busqueda.value.toLowerCase().trim();
    return this.articulos.filter(
      (a) =>
        (a.nombre.toLowerCase().includes(texto) || String(a.id).includes(texto)) &&
        (!this.soloBajos || a.stock <= 10),
    );
  }
}
