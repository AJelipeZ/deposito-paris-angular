import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstadoRemision, Remision } from '../../../../core/models/models';
import { RemisionService } from '../../../../core/services/remision.service';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-remision-detalle',
  standalone: false,
  styleUrl: './remision-detalle.scss',
  templateUrl: './remision-detalle.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RemisionDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private remisionService = inject(RemisionService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  remision?: Remision;
  cargando = true;
  guardando = false;
  columnas = ['descripcion', 'cantidad', 'precio', 'subtotal'];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.remisionService.getRemision(id).subscribe((remision) => {
      this.remision = remision;
      this.cargando = false;
    });
  }

  get total(): number {
    return this.remision?.items.reduce((suma, i) => suma + i.cantidad * i.precio, 0) ?? 0;
  }

  cambiarEstado(estado: EstadoRemision): void {
    if (!this.remision) return;

    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Cambiar estado',
        mensaje: `¿Seguro que quieres marcar la remisión N° ${this.remision.id} como ${estado}?`,
      },
    });

    ref.afterClosed().subscribe((confirmado) => {
      if (!confirmado || !this.remision) return;
      this.guardando = true;
      this.remisionService.cambiarEstado(this.remision.id, estado).subscribe({
        next: (actualizada) => {
          this.remision = actualizada;
          this.guardando = false;
          this.snackBar.open('Estado actualizado', 'OK', { duration: 3000 });
        },
        error: (err) => {
          this.guardando = false;
          this.snackBar.open('Error: ' + err.message, 'Cerrar', { duration: 4000 });
        },
      });
    });
  }
}
