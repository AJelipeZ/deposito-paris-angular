import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONDUCTORES } from '../../../../core/data/mock-data';
import { Articulo } from '../../../../core/models/models';
import { InventarioService } from '../../../../core/services/inventario.service';
import { RemisionService } from '../../../../core/services/remision.service';

@Component({
  selector: 'app-nueva-remision',
  standalone: false,
  styleUrl: './nueva-remision.scss',
  templateUrl: './nueva-remision.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NuevaRemision implements OnInit {
  private fb = inject(FormBuilder);
  private remisionService = inject(RemisionService);
  private inventarioService = inject(InventarioService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  conductores = CONDUCTORES;
  articulos: Articulo[] = [];
  guardando = false;

  form = this.fb.group({
    cliente: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
    conductor: ['', Validators.required],
    observaciones: ['', Validators.maxLength(200)],
    items: this.fb.array([this.nuevoItem()]),
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.inventarioService.getArticulos().subscribe((datos) => (this.articulos = datos));
  }

  nuevoItem() {
    return this.fb.group({
      codigo: [null as number | null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [null as number | null, [Validators.required, Validators.min(1)]],
    });
  }

  agregarItem(): void {
    this.items.push(this.nuevoItem());
  }

  quitarItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();
    const items = valores.items.map((item) => ({
      codigo: item.codigo!,
      descripcion: this.articulos.find((a) => a.id === item.codigo)?.nombre ?? '',
      cantidad: item.cantidad!,
      precio: item.precio!,
    }));

    this.guardando = true;
    this.remisionService
      .crear({
        cliente: valores.cliente!,
        telefono: valores.telefono!,
        conductor: valores.conductor!,
        observaciones: valores.observaciones ?? '',
        fecha: new Date().toISOString().slice(0, 10),
        items,
      })
      .subscribe((nueva) => {
        this.guardando = false;
        this.snackBar.open(`Remisión N° ${nueva.id} creada`, 'OK', { duration: 3000 });
        this.router.navigate(['/remisiones']);
      });
  }
}
