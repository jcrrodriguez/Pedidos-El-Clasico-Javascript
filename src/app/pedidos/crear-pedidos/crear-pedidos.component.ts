import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, subscribeOn } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent {

  pedidos$: Observable<any[]>;
  


  constructor(private pedidosService: PedidosService, private firestore: Firestore) {
    const pCollection = collection(this.firestore, 'pedidos');
    this.pedidos$ = collectionData(pCollection);
   }

  addPedido(pedido: string) {
    this.pedidosService.addPedido({ name: pedido }).then(() => {
      console.log('Item added successfully!');  
    }).catch((error) => {
      console.error('Error adding item: ', error);
    });
  }

}
