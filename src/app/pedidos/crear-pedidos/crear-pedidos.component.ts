import { Component, OnDestroy } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, Subscription, debounceTime, map, switchMap, take } from 'rxjs';
import { Pedido } from 'src/app/core/models';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent implements OnDestroy {
  pedidos$: Observable<any[]> = EMPTY;
  uniqueDates: string[] = [];
  isProductRepeatedSubscription!: Subscription;
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.pedidosService.getPedidosHoy();
    this.pedidosService.pedidos$.pipe(
      map(pedidos => {
        this.uniqueDates = pedidos.map(pedido => this.pedidosService.convertTimestamp(pedido.date));
        this.pedidos = pedidos;  // Update the local variable with emitted values
        return pedidos;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.isProductRepeatedSubscription) {
      this.isProductRepeatedSubscription.unsubscribe();
    }
  }


  addPedido(namePedido: string) {
    const timestamp = Timestamp.now();
    const humanReadableDate = this.pedidosService.convertTimestamp(timestamp);

    let errorMessage = '';

    if (!namePedido) {
      errorMessage = 'El campo no puede estar vacío.';
    } else if (namePedido.length > 25) {
      errorMessage = 'El producto no puede exceder los 25 caracteres.';
    } else if (!/^[A-Za-z0-9\s]+$/.test(namePedido)) {
      errorMessage = 'El producto no puede contener caracteres especiales.';
    }

    if (errorMessage) {
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: errorMessage }
      });
      return;
    }

    this.isProductRepeatedSubscription = this.pedidosService.isProductRepeated(namePedido)
      .pipe(
        switchMap((isRepeated) => {

          if (isRepeated) {
            errorMessage = 'El producto ya existe en la lista.';
            this.dialog.open(ErrorDialogComponent, {
              data: { errorMessage: errorMessage }
            });
            // Return an observable that emits a boolean indicating whether the product is repeated
            return EMPTY;
          } else {
            // Return an observable that emits the pedido list
            return this.pedidosService.pedidos$.pipe();
          }
        }),
        take(1)
      )
      .subscribe((pedidosHoy) => {
        if (pedidosHoy.length >= 25) {
          const errorMessage = 'No puede haber más de 25 productos en un mismo pedido';
          this.dialog.open(ErrorDialogComponent, {
            data: { errorMessage: errorMessage }
          });
        } else {
          const pedido: Pedido = {
            name: namePedido,
            date: timestamp,
            humanReadableDate: humanReadableDate,
          };

          this.pedidosService.addPedido(pedido).then(() => {
          })
            .catch((error) => {
              console.error('Error adding pedido: ', error);
            });
        }
      });
  }

  deletePedido(pedidoId: string) {
    this.pedidosService.deletePedido(pedidoId)
      .catch((error) => {
        console.error('Error deleting item: ', error);
      });
  }
}

