import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, map, tap } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css']
})

export class ListPedidosComponent implements OnInit {
  pedidos$: Observable<any[]> = EMPTY;
  uniqueDates: string[] = [];

  constructor(private pedidosService: PedidosService) {
  }

  ngOnInit() {
    this.pedidosService.getAllPedidos();
    this.pedidos$ = this.pedidosService.pedidos$.pipe(
      map(pedidos => {
        this.uniqueDates = [...new Set(pedidos.map(pedido => this.pedidosService.convertTimestamp(pedido.date)))];
        return pedidos;
      }),
      tap(x => console.log(x))
    );

    this.pedidos$.subscribe();
  }
  


}