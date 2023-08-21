import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { startOfDay, endOfDay } from 'date-fns';
import { Pedido } from '../core/models';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedidos$: Observable<any[]>;
  collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(firestore, 'pedidos');
    this.pedidos$ = collectionData(this.collectionRef, { idField: 'id' });
  }


  getAllPedidos(): void {
    const q = query(this.collectionRef, orderBy('date', 'desc'));
    this.pedidos$ = collectionData(q, { idField: 'id' });
  }

  getPedidosByDate(date: Date): void {
    const start = Timestamp.fromDate(startOfDay(date));
    const end = Timestamp.fromDate(endOfDay(date));
  
    const q = query(
      this.collectionRef,
      where('date', '>=', start),
      where('date', '<=', end)
    );
  
    this.pedidos$ = collectionData(q, { idField: 'id' });
  }

  getPedidosHoy(): void {
    const todayStart = Timestamp.fromDate(startOfDay(new Date()));
    const todayEnd = Timestamp.fromDate(endOfDay(new Date()));

    const q = query(
      this.collectionRef,
      where('date', '>=', todayStart),
      where('date', '<=', todayEnd)
    );

    this.pedidos$ = collectionData(q, { idField: 'id' });
  }

  addPedido(pedido: Pedido): Promise<any> {
    return addDoc(this.collectionRef, pedido)
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
