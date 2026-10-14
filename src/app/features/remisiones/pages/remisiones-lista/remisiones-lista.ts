import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Remision } from '../../../../core/models/models';
import { RemisionService } from '../../../../core/services/remision.service';

@Component({
  selector: 'app-remisiones-lista',
  standalone: false,
  styleUrl: './remisiones-lista.scss',
  templateUrl: './remisiones-lista.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RemisionesLista implements OnInit {
  private remisionService = inject(RemisionService);
  private router = inject(Router);

  remisiones: Remision[] = [];
  cargando = true;
  busqueda = new FormControl('', { nonNullable: true });
  filtroEstado = new FormControl('todos', { nonNullable: true });

  ngOnInit(): void {
    this.remisionService.getRemisiones().subscribe((datos) => {
      this.remisiones = datos;
      this.cargando = false;
    });
  }

  // Filtra por cliente o número y por estado
  get remisionesFiltradas(): Remision[] {
    const texto = this.busqueda.value.toLowerCase().trim();
    const estado = this.filtroEstado.value;
    return this.remisiones.filter(
      (r) =>
        (estado === 'todos' || r.estado === estado) &&
        (r.cliente.toLowerCase().includes(texto) || String(r.id).includes(texto)),
    );
  }

  verDetalle(id: number): void {
    this.router.navigate(['/remisiones', id]);
  }
}
