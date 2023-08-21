import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css']
})
export class ListPedidosComponent implements OnInit {
  pedidos$: Observable<any[]> = EMPTY;

  constructor(private pedidosService: PedidosService) {
  }

  ngOnInit() {
    this.pedidosService.getAllPedidos();
    this.pedidos$ = this.pedidosService.pedidos$;
  }
  
}
