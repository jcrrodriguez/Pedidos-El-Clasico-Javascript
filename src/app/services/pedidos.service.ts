import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedidos$: Observable<any[]>;
  collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(firestore, 'pedidos');
    this.pedidos$ = collectionData(this.collectionRef, {idField: 'id'});
  }

  addPedido(pedido:any): Promise<any> {
    return addDoc(this.collectionRef, pedido)
      .then(() => console.log('Pedido agregado a la lista'))
      .catch((error) => {
        console.error('Error agregando pedido: ', error);
        throw error;
      });
  }

  deletePedido(pedidoId: string): Promise<void> {
    const pedidoRef = doc(this.firestore, 'pedidos', pedidoId);
    return deleteDoc(pedidoRef)
      .then(() => console.log('Pedido eliminado!'))
      .catch((error) => {
        console.error('Error eliminando pedido: ', error);
        throw error;
      });
  }
}
