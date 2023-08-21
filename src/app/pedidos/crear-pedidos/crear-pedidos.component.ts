import { Component } from '@angular/core';
import { FieldValue, serverTimestamp } from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Pedido } from 'src/app/core/models';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent {
  pedidos$: Observable<any[]> = EMPTY;

  constructor(private pedidosService: PedidosService) {
  }
  
  ngOnInit() {
    this.pedidosService.getPedidosHoy();
    this.pedidos$ = this.pedidosService.pedidos$;
  }


  addPedido(namePedido: string) {
    const pedido: Pedido = {
      name: namePedido,
      date: serverTimestamp() as FieldValue
    };
  
    this.pedidosService.addPedido(pedido).catch((error) => {
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

