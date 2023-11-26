import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, where } from '@angular/fire/firestore';
import { Observable, map, take } from 'rxjs';
import { startOfDay, endOfDay } from 'date-fns';
import { subMonths } from 'date-fns';
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

  getSelectedPedidos(selectedDate: string): void {
    const q = query(
      this.collectionRef,
      orderBy('date', 'desc'),
      where('humanReadableDate', '==', selectedDate)
    );

    this.pedidos$ = collectionData(q, { idField: 'id' });
  }

  convertTimestamp(timestamp: Timestamp): string {
    let date = timestamp.toDate();
    let dd: string = date.getDate().toString();
    let mm: string = (date.getMonth() + 1).toString(); // Adding 1 to get the correct month (January is 0)
    let yyyy: string = date.getFullYear().toString();

    // Pad the day and month with leading zeros if necessary
    if (dd.length === 1) {
      dd = '0' + dd;
    }
    if (mm.length === 1) {
      mm = '0' + mm;
    }

    const formattedDate = `${dd}/${mm}/${yyyy}`;
    return formattedDate;
  }

  isProductRepeated(name: string): Observable<boolean> {
    const q = query(
      this.collectionRef,
      where('name', '==', name),
    );

    return collectionData(q).pipe(
      map((pedidos) => pedidos.length > 0),
      take(1)
    );
  }

  pedidosThreeMonth(): Observable<any[]> {
    const threeMonthsAgo = Timestamp.fromDate(subMonths(new Date(), 3));

    const q = query(
      this.collectionRef,
      where('date', '<', threeMonthsAgo)
    );

    return collectionData(q, { idField: 'id' });
  };

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
      .catch((error) => {
        console.error('Error eliminando pedido: ', error);
        throw error;
      });
  }
}
