import { Component } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent {
  pedidos$ = this.pedidosService.pedidos$;

  constructor(private pedidosService: PedidosService) { }

  addPedido(pedido: string) {
    this.pedidosService.addPedido({ name: pedido }).then(() => {
      console.log('Item added successfully!');
    }).catch((error) => {
      console.error('Error adding item: ', error);
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

