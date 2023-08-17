import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedidos$: Observable<any[]>;
  collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(firestore, 'pedidos');
    this.pedidos$ = collectionData(this.collectionRef);
  }

  addPedido(pedido:any): Promise<any> {
    return addDoc(this.collectionRef, pedido)
    .then(() => console.log('Pedido agregado a la lista'))
    .catch((error) => {
      console.error('Error agregando pedido: ', error);
      throw error;
    })
  }

  // getPedidos(): Observable<any> {
  //   const q = query(collection(this.firestore, 'pedidos'), orderBy('fechaCreacion', 'asc'));
  //   return collectionData(q);
  // }
}
