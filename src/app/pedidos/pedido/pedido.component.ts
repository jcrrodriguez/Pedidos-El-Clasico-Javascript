import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  selectedDate: string | undefined;
  pedidos$: Observable<any[]> = EMPTY;

  constructor(private pedidosService: PedidosService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedDate = params['date'];
      console.log('Date param:', this.selectedDate);

      if (this.selectedDate !== undefined) {
        this.pedidosService.getSelectedPedidos(this.selectedDate);
        this.pedidos$ = this.pedidosService.pedidos$;
      }
    });
  }
}
