import { Component } from '@angular/core';
import { EMPTY, Observable, map, switchMap, tap } from 'rxjs';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-home-maipu',
  templateUrl: './home-maipu.component.html',
  styleUrls: ['./home-maipu.component.css']
})
export class HomeMaipuComponent {
  pedidos$: Observable<any[]> = EMPTY;
  pedidosExpired: string[] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.pedidosThreeMonth().pipe(
      map(pedidos => {
        this.pedidosExpired = pedidos.map(pedido => pedido.id);
        return pedidos;
      }),
      tap(pedidos => {
        console.log(pedidos);
        console.log(this.pedidosExpired);
      }),
      switchMap(() => {
        const deletePromises = this.pedidosExpired.map(pedidoId =>
          this.pedidosService.deletePedido(pedidoId)
        );
        return Promise.all(deletePromises);
      })
    ).subscribe(() => {
      console.log('All expired pedidos deleted successfully.');
    });
  }
}
