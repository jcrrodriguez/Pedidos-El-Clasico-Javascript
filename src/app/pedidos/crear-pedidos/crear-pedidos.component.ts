import { Component } from '@angular/core';
import { FieldValue, Timestamp, serverTimestamp } from '@angular/fire/firestore';
import { EMPTY, Observable, map } from 'rxjs';
import { Pedido } from 'src/app/core/models';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent {
  pedidos$: Observable<any[]> = EMPTY;
  uniqueDates: string[] = [];

  constructor(private pedidosService: PedidosService) {
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
  
  
  deletePedido(pedidoId: string) {
    this.pedidosService.deletePedido(pedidoId).then(() => {
      console.log('Item deleted successfully!');
    }).catch((error) => {
      console.error('Error deleting item: ', error);
    });
  }
}

