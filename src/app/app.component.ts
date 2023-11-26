import { Component } from '@angular/core';
import { EMPTY, Observable, filter, map, tap } from 'rxjs';
import { PedidosService } from './services/pedidos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pedidos$: Observable<any[]> = EMPTY;

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.pedidosThreeMonth();
    this.pedidos$.subscribe(pedidos => console.log(pedidos))
  }

  deletePedido(pedidoId: string) {
    this.pedidosService.deletePedido(pedidoId)
      .catch((error) => {
        console.error('Error deleting item: ', error);
      });
  }
}
