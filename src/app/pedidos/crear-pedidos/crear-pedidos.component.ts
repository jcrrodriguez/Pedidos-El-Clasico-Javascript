import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, debounceTime, map, take } from 'rxjs';
import { Pedido } from 'src/app/core/models';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent {
  pedidos$: Observable<any[]> = EMPTY;
  uniqueDates: string[] = [];

  constructor(private pedidosService: PedidosService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.pedidosService.getPedidosHoy();
    this.pedidos$ = this.pedidosService.pedidos$.pipe(
      map(pedidos => {
        this.uniqueDates = pedidos.map(pedido => this.pedidosService.convertTimestamp(pedido.date));
        return pedidos;
      })
    );
    this.pedidos$ = this.pedidosService.pedidos$;
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
  
    this.pedidosService.getPedidosHoy(); // Fetch pedidos for today
  
    this.pedidosService.pedidos$.pipe(
      debounceTime(100), // Adjust the time as needed to wait for data update
      take(1)
    ).subscribe(pedidos => {
      if (pedidos && pedidos.length >= 25) {
        errorMessage = 'No puede haber más de 25 productos en un mismo pedido';
        this.dialog.open(ErrorDialogComponent, {
          data: { errorMessage: errorMessage }
        });
      } else {
        // Continue with adding the pedido
        const pedido: Pedido = {
          name: namePedido,
          date: timestamp,
          humanReadableDate: humanReadableDate,
        };
  
        this.pedidosService.addPedido(pedido).then(() => {
          console.log('Pedido added successfully!');
        }).catch((error) => {
          console.error('Error adding pedido: ', error);
        });
      }
    });
  }
  
  


  deletePedido(pedidoId: string) {
    this.pedidosService.deletePedido(pedidoId).then(() => {
      console.log('Item deleted successfully!');
    }).catch((error) => {
      console.error('Error deleting item: ', error);
    });
  }
}

