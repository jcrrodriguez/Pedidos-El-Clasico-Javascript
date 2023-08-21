import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  pedidos$: Observable<any[]> = EMPTY;

  constructor(private pedidosService: PedidosService) {
  }

  ngOnInit() {
    this.pedidosService.getPedidosHoy();
    this.pedidos$ = this.pedidosService.pedidos$;
  }
}
